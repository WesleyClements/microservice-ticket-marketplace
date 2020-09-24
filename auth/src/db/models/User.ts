import mongoose, { Schema, Document, Model } from 'mongoose';
import bcrypt from 'bcrypt';

const PASSWORD_SALT_ROUNDS = 10;
const userRoles = (<T extends string>(...args: T[]) => args)('default', 'admin');
const defaultUserRole = 0;

export type UserRole = typeof userRoles[number];

interface IUserDocument extends Document {
  email: string;
  password: string;
  comparePassword: (password: string) => Promise<boolean>;
}

interface IUserModel extends Model<IUserDocument> {}

const userSchema = new Schema<IUserDocument>(
  {
    role: {
      type: String,
      default: userRoles[defaultUserRole],
      enum: userRoles,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      versionKey: false,
      virtuals: true,
      transform: (doc, ret) => {
        delete ret._id;
        delete ret.password;
      },
    },
  }
);

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
