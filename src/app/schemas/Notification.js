import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    task: {
      type: Number,
      required: true,
    },
    user: {
      type: Number,
      required: false,
    },
    userread: {
      type: Boolean,
      required: true,
      default: false,
    },
    worker: {
      type: Number,
      required: false,
    },
    workerread: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model('Notification', NotificationSchema);
