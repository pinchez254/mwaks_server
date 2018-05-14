import Event from '../../models/Event';
import FavoriteEvent from '../../models/FavoriteEvent';
import { requireAuth } from '../../services/auth';
import { pubsub } from '../../config/pubsub';

const EVENT_ADDED = 'eventAdded';
export const EVENT_FAVORITED = 'eventFavorited';

export default {
  getEvent: async (_, { _id }, { user }) => {
    try {
      await requireAuth(user);
      return Event.findById(_id);
    } catch (error) {
      throw error;
    }
  },
  getEvents: async (_, args, { user }) => {
    try {
      await requireAuth(user);
      const p1 = Event.find({}).sort({ createdAt: -1 });
      const p2 = FavoriteEvent.findOne({ userId: user._id });
      const [events, favorites] = await Promise.all([p1, p2]);

      const eventsToSend = events.reduce((arr, event) => {
        const tw = event.toJSON();

        if (favorites.events.some(t => t.equals(event._id))) {
          arr.push({
            ...tw,
            isFavorited: true,
          });
        } else {
          arr.push({
            ...tw,
            isFavorited: false,
          })
        }

        return arr;
      }, []);

      return eventsToSend;
    } catch (error) {
      throw error;
    }
  },
  getUserEvents: async (_, args, { user }) => {
    try {
      await requireAuth(user);
      return Event.find({ user: user._id }).sort({ createdAt: -1 })
    } catch (error) {
      throw error;
    }
  },
  createEvent: async (_, args, { user }) => {
    try {
      await requireAuth(user);
      const event = await Event.create({ ...args, user: user._id });

      pubsub.publish(EVENT_ADDED, { [EVENT_ADDED]: event });

      return event;
    } catch (error) {
      throw error;
    }
  },
  updateEvent: async (_, { _id, ...rest }, { user }) => {
    try {
      await requireAuth(user);
      const event = await Event.findOne({ _id, user: user._id });

      if (!event) {
        throw new Error('Not found!');
      }

      Object.entries(rest).forEach(([key, value]) => {
        event[key] = value;
      });

      return event.save();
    } catch (error) {
      throw error;
    }
  },
  deleteEvent: async (_, { _id }, { user }) => {
    try {
      await requireAuth(user);
      const event = await Event.findOne({ _id, user: user._id });

      if (!event) {
        throw new Error('Not found!');
      }
      await event.remove();
      return {
        message: 'Delete Success!'
      }
    } catch (error) {
      throw error;
    }
  },
  favoriteEvent: async (_, { _id }, { user }) => {
    try {
      await requireAuth(user);
      const favorites = await FavoriteEvent.findOne({ userId: user._id });

      return favorites.userFavoritedEvent(_id);
    } catch (error) {
      throw error;
    }
  },
  eventAdded: {
    subscribe: () => pubsub.asyncIterator(EVENT_ADDED)
  },
  eventFavorited: {
    subscribe: () => pubsub.asyncIterator(EVENT_FAVORITED),
  }
};
