import mongoose, { Schema, Document, Model, Types } from 'mongoose';

interface ITicketDocument extends Document {
  title: string;
  price: number;
  userId: Types.ObjectId;
}

interface ITicketModel extends Model<ITicketDocument> {}

const ticketSchema = new Schema<ITicketDocument>(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    userId: {
      type: Types.ObjectId,
      required: true,
    },
  },
  {
    toJSON: {
      versionKey: false,
      virtuals: true,
      transform: (doc, ret) => {
        delete ret._id;
      },
    },
  }
);

export const Ticket = mongoose.model<ITicketDocument, ITicketModel>(
  'Ticket',
  ticketSchema
);
