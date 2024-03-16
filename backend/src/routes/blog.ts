import { Hono } from "hono"
import { sign, decode, verify } from 'hono/jwt'
import { Prisma, PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { createBlogInput, updateBlogInput } from '@sundaram_11/medium-common'

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
    Variables: {
        userId: string;
        prisma: PrismaClient;
    }
}>()

// middleware
blogRouter.use('/*', async(c, next) => {
    try {
        const jwt = c.req.header('authorization')
        if (!jwt) {
            c.status(401);
            return c.json({ error: "unauthorized" });
        }

        const token = jwt.split(' ')[1]
        const payload = await verify(token, c.env.JWT_SECRET)
    
        if(!payload) 
        {
            c.status(403)
            return c.json({ error: 'unauthorized' })
        } 

        c.set('userId', payload.id)
        await next()
    } catch(e) {
        c.status(403)
        return c.json({ error: 'Issue in verifying user' })
    }
})
  


blogRouter.use('/*', async(c, next) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    c.set('prisma', prisma)
    await next()
    console.log('done')
})



blogRouter.post('/', async (c) => {
    const body = await c.req.json()
    const success = createBlogInput.safeParse(body)
    
    if(!success.success) {
        c.status(411)
        return c.json({
            message: 'Invlaid inputs'
        })
    }
    
    const prisma = c.get('prisma')
    const blog = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            published: true,
            authorId: c.get('userId')
        }
    })

    return c.json({
        id: blog.id
    })
})



blogRouter.put('/', async (c) => {
    const body = await c.req.json()
    const success = updateBlogInput.safeParse(body)
    
    if(!success.success) {
        c.status(411)
        return c.json({
            message: 'Invalid inputs'
        })
    }
    
    const prisma = c.get('prisma')
    const blog = await prisma.post.update({
        where: {
            id: body.id
        },
        data: {
            title: body.title,
            content: body.content,
        }
    })

    return c.json({
        id: blog.id
    })
})



// Add pagination
blogRouter.get('/bulk', async (c) => {
    const prisma = c.get('prisma')
    const blogs = await prisma.post.findMany({
        select: {
            title: true,
            content: true,
            id: true,
            author: {
                select: {
                    name: true
                }
            }       
        }
    })
    
    return c.json({
        blogs
    })
})  




blogRouter.get('/:id', async (c) => {
    try {
        const prisma = c.get('prisma')
        const blogId = c.req.param('id')

        const blog = await prisma.post.findFirst({
            where: {
                id: blogId
            },
            select: {
                id: true,
                title: true,
                content: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })

        return c.json({
            blog
        })
    } catch(e) {
        console.log(e)
        c.status(411)
        return c.json({
            message: 'Error while fetching blog post'
        })
    }
})