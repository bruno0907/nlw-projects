import express from 'express'
import cors from 'cors'
import { routes } from './routes'

require('dotenv').config()

const PORT = 3333

const app = express()
app.use(cors())
app.use(express.json())


app.use(routes)

app.listen(3333, () => console.log(`Server running at http://localhost:${PORT}`))