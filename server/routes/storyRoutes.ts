import { Router } from 'express';
export const storyRouter = Router();

import {
  story,
  getMyStorys,
  getStorys,
  getStoryImages,
} from '../controllers/storyController';
import { protect } from '../middlewares/protect';

storyRouter.post('/add-story', protect, story);
storyRouter.get('/get-storys', protect, getStorys);
storyRouter.get('/get-my-story', protect, getMyStorys);
storyRouter.get('/get-story-images/:id', protect, getStoryImages);
