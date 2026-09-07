import mongoose from 'mongoose';
import { disconnectDatabase } from '../config/database.js';
import {
  ActivityModel,
  LeaderboardModel,
  TeamModel,
  UserModel,
  WorkoutModel,
} from '../models/index.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    await Promise.all([
      UserModel.deleteMany({}),
      TeamModel.deleteMany({}),
      ActivityModel.deleteMany({}),
      LeaderboardModel.deleteMany({}),
      WorkoutModel.deleteMany({}),
    ]);
    const [alex, sam] = await UserModel.create([
      { username: 'alex', email: 'alex@example.com', name: 'Alex Morgan' },
      { username: 'sam', email: 'sam@example.com', name: 'Sam Rivera' },
    ]);
    await TeamModel.create({ name: 'OctoFitters', description: 'A friendly fitness team', members: [alex._id, sam._id] });
    await ActivityModel.create([
      { user: alex._id, type: 'Running', duration: 30, distance: 5, points: 50 },
      { user: sam._id, type: 'Cycling', duration: 45, distance: 12, points: 60 },
    ]);
    await LeaderboardModel.create([
      { user: alex._id, points: 50 },
      { user: sam._id, points: 60 },
    ]);
    await WorkoutModel.create([
      { title: 'Quick Cardio', description: 'A short cardio session', difficulty: 'beginner', duration: 20, activities: ['Running', 'Jumping jacks'] },
      { title: 'Strength Builder', description: 'A full-body strength session', difficulty: 'intermediate', duration: 40, activities: ['Squats', 'Push-ups'] },
    ]);

    console.log('Database seeding complete');
    await disconnectDatabase();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
