import { Router } from 'express'
export const groupRouter = Router()

import { getGroups, getGroup } from '../controllers/groupController'
import { protect } from '../middlewares/protect'

groupRouter.get('/get-groups', protect, getGroups)
groupRouter.get('/get-group/:id', protect, getGroup)
