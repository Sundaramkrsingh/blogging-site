import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import { signupInput, signinInput } from '@sundaram_11/medium-common'

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: {
      prisma: PrismaClient;
    }
}>()

userRouter.use('/*', async (c, next) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate())

  c.set('prisma', prisma)
  await next()
})

userRouter.post('/signup', async (c) => {
  const body = await c.req.json()
  const success = signupInput.safeParse(body)
  
  if(!success.success) 
  {
    c.status(411)
    return c.json({
      message: 'Invalid Inputs'
    })
  }
  
  try {
    const prisma = c.get('prisma')
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name
      }
    })

    const jwt = await sign({
      id: user.id,
    }, c.env.JWT_SECRET)

    return c.text(jwt)  

  } catch(e) {
    console.log(e)
    c.status(411)
    return c.text('Some problem Occured')
  }
})


  
userRouter.post('/signin', async (c) => {
  const body = await c.req.json()
  const success = signinInput.safeParse(body)
  
  if(!success.success) 
  {
    c.status(411)
    return c.json({
      message: 'Invalid Inputs'
    })
  }
  
  try {
    const prisma = c.get('prisma')
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
        password: body.password
      }
    })

    if(!user)
    {
      c.status(403) 
      return c.text('User not found')
    }

    const jwt = await sign({
      id: body.id
    }, c.env.JWT_SECRET)

    c.status(200)
    return c.text(jwt)
    
  } catch(e) {
      console.log(e) 
      c.status(411)
      return c.text('Some problem occured')
  }
})