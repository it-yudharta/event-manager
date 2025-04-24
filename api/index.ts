import { Hono } from 'hono'

type Bindings = {
  ASSETS: Fetcher
  DB: D1Database
}

const app = new Hono<{ Bindings: Bindings }>()

app.get('/api/events', async (c) => {
  let { results } = await c.env.DB.prepare("SELECT * FROM events").all()
  return c.json(results)
})

app.post('/api/events', async (c) => {
  const newId = crypto.randomUUID()
  const input = await c.req.json<any>()
  const query = `INSERT INTO events(id,name,place,time) values ("${newId}","${input.name}","${input.place}",${input.time})`
  const newEvent = await c.env.DB.exec(query)
  return c.json(newEvent)
})

app.get('/api/events/:id', async (c) => {
  const eventId = c.req.param('id')
  let { results } = await c.env.DB.prepare('SELECT * FROM events WHERE id = ?').bind(eventId).all()
  return c.json(results[0])
})

app.put('/api/events/:id', async (c) => {
  const eventId = c.req.param('id')

  const input = await c.req.json<any>()
  const query = `UPDATE events SET name = "${input.name}", place = "${input.place}", time = ${input.time} WHERE id = "${eventId}"`
  const event = await c.env.DB.exec(query)

  return c.json(event)
})

app.delete('/api/events/:id', async (c) => {
  const eventId = c.req.param('id')

  const query = `DELETE FROM events WHERE id = "${eventId}"`
  const event = await c.env.DB.exec(query)

  return c.json(event)
})

app.get('*', (c) => c.env.ASSETS.fetch(c.req.raw))

export default app
