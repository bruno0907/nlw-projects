import Fastify from "fastify";
import cors from '@fastify/cors'
import { prisma } from "./lib/prisma";
import { appRoutes } from "./routes";

const port = 3333

const app = Fastify()

app.register(cors)
app.register(appRoutes)

app.listen({ port }, (err, address) => {
  if(err) {
    app.log.error(err)
  }
  console.log(`Server is now listening on ${address}`)
})

