import { Router } from 'express';
import {
  ActivityModel,
  TeamModel,
  UserModel,
  WorkoutModel,
} from '../models/index.js';

const router = Router();

router.get('/users', async (_request, response, next) => {
  try {
    response.json(await UserModel.find().sort({ createdAt: -1 }));
  } catch (error) {
    next(error);
  }
});

router.post('/users', async (request, response, next) => {
  try {
    response.status(201).json(await UserModel.create(request.body));
  } catch (error) {
    next(error);
  }
});

router.get('/teams', async (_request, response, next) => {
  try {
    response.json(await TeamModel.find().populate('members', 'username name email'));
  } catch (error) {
    next(error);
  }
});

router.post('/teams', async (request, response, next) => {
  try {
    response.status(201).json(await TeamModel.create(request.body));
  } catch (error) {
    next(error);
  }
});

router.get('/activities', async (request, response, next) => {
  try {
    const filter = request.query.user ? { user: request.query.user } : {};
    response.json(await ActivityModel.find(filter).populate('user', 'username name').sort({ recordedAt: -1 }));
  } catch (error) {
    next(error);
  }
});

router.post('/activities', async (request, response, next) => {
  try {
    response.status(201).json(await ActivityModel.create(request.body));
  } catch (error) {
    next(error);
  }
});

router.get('/leaderboard', async (_request, response, next) => {
  try {
    const leaderboard = await ActivityModel.aggregate([
      { $group: { _id: '$user', points: { $sum: '$points' }, activities: { $sum: 1 } } },
      { $sort: { points: -1 } },
      { $lookup: { from: 'users', localField: '_id', foreignField: '_id', as: 'user' } },
      { $unwind: { path: '$user', preserveNullAndEmptyArrays: true } },
      { $project: { _id: 0, user: { _id: '$user._id', username: '$user.username', name: '$user.name' }, points: 1, activities: 1 } },
    ]);
    response.json(leaderboard);
  } catch (error) {
    next(error);
  }
});

router.get('/workouts', async (_request, response, next) => {
  try {
    response.json(await WorkoutModel.find().sort({ createdAt: -1 }));
  } catch (error) {
    next(error);
  }
});

router.post('/workouts', async (request, response, next) => {
  try {
    response.status(201).json(await WorkoutModel.create(request.body));
  } catch (error) {
    next(error);
  }
});

export default router;
