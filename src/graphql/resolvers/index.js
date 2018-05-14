import GraphQLDate from 'graphql-date';

import EventResolvers from './event-resolvers';
import UserResolvers from './user-resolvers';
import User from '../../models/User';

export default {
  Date: GraphQLDate,
  Event: {
    user: ({ user }) => User.findById(user),
  },
  Query: {
    getEvent: EventResolvers.getEvent,
    getEvents: EventResolvers.getEvents,
    getUserEvents: EventResolvers.getUserEvents,
    me: UserResolvers.me
  },
  Mutation: {
    createEvent: EventResolvers.createEvent,
    updateEvent: EventResolvers.updateEvent,
    deleteEvent: EventResolvers.deleteEvent,
    favoriteEvent: EventResolvers.favoriteEvent,
    signup: UserResolvers.signup,
    login: UserResolvers.login
  },
  Subscription: {
    eventAdded: EventResolvers.eventAdded,
    eventFavorited: EventResolvers.eventFavorited
  }
};
