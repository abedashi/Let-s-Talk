import { Router } from 'express';
export const storyRouter = Router();

import { story, getStorys, getStory } from '../controllers/storyController';
import { protect } from '../middlewares/protect';

storyRouter.post('/add-story', protect, story);
storyRouter.get('/get-storys', protect, getStorys);
storyRouter.get('/get-story', protect, getStory);
