import mongoose, { Schema } from 'mongoose';

const EventSchema = new Schema({
      description: {type: String},
      views: {type: Number, default: 0},
      comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
      category:String,
      event_heading:String,
      event_venue:String,
      event_date:Date,
      event_charges:String,
      event_img:String,
      event_views: { type: Number,default: 0 },
      attend_event:{ type: Number,default: 0 },       
      in_attendance:{},


    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
      favoriteCount: {
        type: Number,
        default: 0
  }
}, { timestamps: true });

EventSchema.statics = {
  incFavoriteCount(eventId) {
    return this.findByIdAndUpdate(eventId, { $inc: { favoriteCount: 1 } }, { new: true });
  },
  decFavoriteCount(eventId) {
    return this.findByIdAndUpdate(eventId, { $inc: { favoriteCount: -1 } }, { new: true });
  }
}

export default mongoose.model('Event', EventSchema);
