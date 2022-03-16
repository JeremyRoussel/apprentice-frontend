// server/src/resolver.js

const chats = []
const CHAT_CHANNEL = 'CHAT_CHANNEL'

const resolvers = {
  Query: {
    chats () {
      return chats
    }
  },
  
  Mutation: {
    sendMessage (_, { from, message }, { pubsub }) {
      const chat = { id: chats.length + 1, from, message }
      
      chats.push(chat)
      pubsub.publish('CHAT_CHANNEL', { messageSent: chat })
      
      return chat
    }
  },
  
  Subscription: {
    messageSent: {
      subscribe: (_, __, { pubsub }) => {
        return pubsub.asyncIterator(CHAT_CHANNEL)
      }
    }
  }
}

module.exports = resolvers
