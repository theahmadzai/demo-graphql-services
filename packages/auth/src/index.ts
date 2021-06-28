import { ApolloServer, gql } from 'apollo-server'
import { buildFederatedSchema } from '@apollo/federation'

const typeDefs = gql`
  type User {
    email: String!
  }

  type Query {
    me: User
  }
`

const resolvers = {
  Query: {
    me: () => ({ email: 'theahmadzai@hotmail.com' }),
  },
}

const server = new ApolloServer({
  schema: buildFederatedSchema([
    {
      typeDefs,
      resolvers,
    },
  ]),
})

server.listen(4001).then(({ url }) => {
  console.log(`Auth service: ${url}`)
})
