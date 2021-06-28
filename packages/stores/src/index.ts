import type { GraphQLResolverMap } from 'apollo-graphql'
import { ApolloServer, gql } from 'apollo-server'
import { buildFederatedSchema } from '@apollo/federation'

const typeDefs = gql`
  type Store {
    id: ID!
    name: String!
  }

  type Query {
    allStores: [Store]!
    store(id: ID!): Store
  }
`

const stores = [
  { id: 1, name: 'Store 1' },
  { id: 2, name: 'Store 2' },
  { id: 3, name: 'Store 3' },
  { id: 4, name: 'Store 4' },
]

const resolvers: GraphQLResolverMap = {
  Query: {
    allStores: () => stores,
    store: (_, { id }) => stores.find(s => s.id == id),
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

server.listen(4002).then(({ url }) => {
  console.log(`Stores service: ${url}`)
})
