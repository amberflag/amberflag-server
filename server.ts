import express, { Application, Request, Response } from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import { createClient } from '@supabase/supabase-js'
import cors from 'cors'

const PORT = process.env.PORT || 3000

const supabase = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_ANON_KEY || ''
)
const app: Application = express()
app.use(cors())
app.use(morgan('combined'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Reply to request with a welcome HTML
app.post('/', async (req: Request, res: Response) => {
  try {
    const { key, token } = req.body
    if (!key || !token) {
      throw 'Need key and token'
    }

    const { data, error } = await supabase.functions.invoke(
      'feature-flags-list',
      {
        body: JSON.stringify({ key, token })
      }
    )

    if (error) {
      throw error
    }
    if (!data) {
      throw 'not data found'
    }
    return res.json(data)
  } catch (err) {
    console.log('error', err)
    return res.status(400).send(err)
  }
})

app.listen(PORT, () => {
  console.log(`⚡️ Example app listening on port ${PORT}`)
})
