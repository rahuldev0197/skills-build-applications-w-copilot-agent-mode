import mongoose, { type InferSchemaType } from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    name: { type: String, required: true, trim: true },
    avatar: { type: String, trim: true },
  },
  { timestamps: true },
);

const teamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true },
);

const activitySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true, trim: true },
    duration: { type: Number, required: true, min: 0 },
    distance: { type: Number, min: 0 },
    points: { type: Number, required: true, min: 0, default: 0 },
    recordedAt: { type: Date, required: true, default: Date.now },
  },
  { timestamps: true },
);

const workoutSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    difficulty: { type: String, required: true, enum: ['beginner', 'intermediate', 'advanced'] },
    duration: { type: Number, required: true, min: 1 },
    activities: [{ type: String, trim: true }],
  },
  { timestamps: true },
);

const leaderboardSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    points: { type: Number, required: true, min: 0, default: 0 },
  },
  { timestamps: true },
);

export type User = InferSchemaType<typeof userSchema>;
export type Team = InferSchemaType<typeof teamSchema>;
export type Activity = InferSchemaType<typeof activitySchema>;
export type Workout = InferSchemaType<typeof workoutSchema>;
export type LeaderboardEntry = InferSchemaType<typeof leaderboardSchema>;

export const UserModel = mongoose.models.User || mongoose.model('User', userSchema);
export const TeamModel = mongoose.models.Team || mongoose.model('Team', teamSchema);
export const ActivityModel =
  mongoose.models.Activity || mongoose.model('Activity', activitySchema);
export const WorkoutModel =
  mongoose.models.Workout || mongoose.model('Workout', workoutSchema);
export const LeaderboardModel =
  mongoose.models.Leaderboard || mongoose.model('Leaderboard', leaderboardSchema);
