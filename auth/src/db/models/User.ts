import mongoose, { Schema, Document, Model } from 'mongoose';
import bcrypt from 'bcrypt';

const PASSWORD_SALT_ROUNDS = 10;

interface IUserDocument extends Document {
  email: string;
  password: string;
  comparePassword: (password: string) => Promise<boolean>;
}

interface IUserModel extends Model<IUserDocument> {}

const userSchema = new Schema<IUserDocument>({
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

userSchema.pre('save', async function () {
  const user = this as IUserDocument;
  if (user.isModified('password')) {
    try {
      const salt = await bcrypt.genSalt(PASSWORD_SALT_ROUNDS);
      const hash = await bcrypt.hash(user.password, salt);
      user.password = hash;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
});

userSchema.methods.comparePassword = async function (password: string) {
  const user = this as IUserDocument;
  return bcrypt.compare(password, user.password);
};

export const User = mongoose.model<IUserDocument, IUserModel>('User', userSchema);
