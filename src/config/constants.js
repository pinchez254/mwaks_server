export default {
  PORT: process.env.PORT || 3000,
  DB_URL: 'mongodb://localhost/event-development',
  GRAPHQL_PATH: '/graphql',
  JWT_SECRET: 'thisisasecret123',
  SUBSCRIPTIONS_PATH: '/subscriptions'
};
