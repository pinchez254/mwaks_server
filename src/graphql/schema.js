export default `
  scalar Date

  type Status {
    message: String!
  }

  type Auth {
    token: String!
  }

  type User {
    _id: ID!
    username: String
    email: String!
    firstName: String
    lastName: String
    avatar: String
    createdAt: Date!
    updatedAt: Date!
  }

  type Me {
    _id: ID!
    username: String
    email: String!
    firstName: String
    lastName: String
    avatar: String
    createdAt: Date!
    updatedAt: Date!
  }

  type Event {
    _id: ID!
          category:String!
          event_heading:String!
          event_venue:String!
          event_date:String!
          event_date:Date!
          event_charges:String!
          event_img:String
          text:String!
          event_charges:String!
          
    views:Int      
    user: User!
    favoriteCount: Int!
    isFavorited: Boolean
    createdAt: Date!
    updatedAt: Date!
  }

  
  

  type Query {
    getEvent(_id: ID!): Event
    getEvents: [Event]
    getUserEvents: [Event]
    me: Me
  }

  type Mutation {
    createEvent(category:String!,
      event_heading:String!,
      event_venue:String!,
      event_date:String!,
      event_date:Date!,
      event_charges:String!,
      event_img:String,
      description:String!,
      event_charges:String!
      ): Event

      updateEvent(_id: ID!, text: String): Event
      deleteEvent(_id: ID!): Status
      favoriteEvent(_id: ID!): Event
      signup(email: String!, fullName: String!, password: String!, avatar: String, username: String): Auth
      login(email: String!, password: String!): Auth
  }

  type Subscription {
    eventAdded: Event
    eventFavorited: Event
  }

  schema {
    query: Query
    mutation: Mutation
    subscription: Subscription
  }
`;
