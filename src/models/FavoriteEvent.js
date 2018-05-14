import mongoose, { Schema } from 'mongoose';

import Event from './Event';
import { EVENT_FAVORITED } from '../graphql/resolvers/event-resolvers';
import { pubsub } from '../config/pubsub';

const FavoriteEventSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  events: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Event',
    },
  ],
});

FavoriteEventSchema.methods = {
  async userFavoritedEvent(eventId) {
    if (this.events.some(t => t.equals(eventId))) {
      this.events.pull(eventId);
      await this.save();

      const event = await Event.decFavoriteCount(eventId);

      const t = event.toJSON();

      pubsub.publish(EVENT_FAVORITED, { [EVENT_FAVORITED]: { ...t } });

      return {
        isFavorited: false,
        ...t,
      };
    }

    const event = await Event.incFavoriteCount(eventId);

    const t = event.toJSON();

    this.eventts.push(eventtId);
    await this.save();
    pubsub.publish(EVENT_FAVORITED, { [Event_FAVORITED]: { ...t } });
    return {
      isFavorited: true,
      ...t,
    };
  },
};

FavoriteEventSchema.index({ userId: 1 }, { unique: true });

export default mongoose.model('FavoriteEvent', FavoriteEventSchema);
