import Fastify from "fastify";
import cors from '@fastify/cors'
import { prisma } from "./lib/prisma";

const port = 3333

const app = Fastify()

app.register(cors)

app.get('/', async () => {  
  return 'Hello Fastify!'
})

app.get('/habits', async (req, res) => {
  const habbits = await prisma.habit.findFirst()

  return res.send(habbits)
})

app.post('/habits', async (req, res) => {
  const { title } = req.body

  await prisma.habit.create({
    data: {
      title
    }
  })

  return res.status(201).send()
})

app.listen({ port }, (err, address) => {
  if(err) {
    app.log.error(err)
  }
  console.log(`Server is now listening on ${address}`)
})

