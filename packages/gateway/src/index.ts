import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { ApolloGateway } from '@apollo/gateway'

async function start() {
  const gateway = new ApolloGateway({
    serviceList: [
      { name: 'auth', url: 'http://localhost:4001' },
      { name: 'stores', url: 'http://localhost:4002' },
    ],
  })

  const app = express()

  const server = new ApolloServer({
    gateway,
    subscriptions: false,
    debug: true,
  })

  await server.start()

  server.applyMiddleware({ app })

  app.use((_, res) => {
    res.status(200).send('Hello!').end()
  })

  const port = 4000

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server started on: http://localhost:${port}`)
  })
}

start()
