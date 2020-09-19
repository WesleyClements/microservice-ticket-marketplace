import mongoose, { Schema, Document, Model } from 'mongoose';

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

interface IUserDocument extends Document {
  email: string;
  password: string;
}

interface IUserModel extends Model<IUserDocument> {}

export const User = mongoose.model<IUserDocument, IUserModel>('User', userSchema);
