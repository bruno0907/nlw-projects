import { FastifyInstance } from 'fastify'
import { randomUUID } from 'node:crypto'
import { extname, resolve } from 'node:path'
import { createWriteStream } from 'node:fs'
import { promisify } from 'node:util'
import { pipeline } from 'node:stream'

const pump = promisify(pipeline)

export async function uploadRoutes(app: FastifyInstance) {
  app.post('/upload', async (request, reply) => {
    const upload = await request.file({
      limits: {
        fileSize: 5_242_880, // 5mb in bytes
      },
    })

    if (!upload) {
      return reply.status(400).send('File not found.')
    }

    const mimeTypeRegex = /^(image|video)\/[a-zA-Z]+/

    const isValidfileFormat = mimeTypeRegex.test(upload.mimetype)

    if (!isValidfileFormat) {
      return reply.status(404).send('Invalid file format.')
    }

    const fileId = randomUUID()

    const extension = extname(upload.filename)

    const fileName = fileId.concat(extension)

    const writeSTream = createWriteStream(
      resolve(__dirname, '../../uploads', fileName),
    )

    await pump(upload.file, writeSTream)

    const fullUrl = request.protocol.concat('://').concat(request.hostname)
    const fileUrl = new URL(`/uploads/${fileName}`, fullUrl).toString()

    return {
      fileUrl,
    }
  })
}
