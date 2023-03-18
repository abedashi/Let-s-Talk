import { Request, Response } from 'express';
import { PrismaClient, Storys } from '@prisma/client';
import asyncHandler from 'express-async-handler';

const prisma = new PrismaClient();

interface AuthReq extends Request {
  user?: any;
}

export const story = asyncHandler(async (req: AuthReq, res: Response) => {
  try {
    const { url, content } = req.body;

    if (!url || !content) {
      throw new Error('please add all fields!');
    }

    let existingStory: Storys | null = null;
    try {
      existingStory = await prisma.storys.findFirst({
        where: { userId: req.user.id },
      });
    } catch (error) {
      res.status(400);
      throw error;
    }

    if (existingStory) {
      try {
        await prisma.images.create({
          data: {
            content,
            url,
            storyId: existingStory.id,
          },
        });
        res.status(201).json({ message: 'Image added to your storys' });
      } catch (error) {
        throw error;
      }
    } else {
      try {
        await prisma.storys.create({
          data: {
            userId: req.user.id,
            images: {
              create: {
                content: 'hi',
                url,
              },
            },
          },
        });

        res.status(201).json({ message: 'success' });
      } catch (error) {
        throw error;
      }
    }
  } catch (error) {
    res.status(400);
    throw error;
  }
});

export const getStorys = asyncHandler(async (req: AuthReq, res: Response) => {
  const storys = await prisma.storys.findMany({
    include: {
      images: true,
    },
  });

  res.status(200).json(storys);
});

export const getStory = asyncHandler(async (req: AuthReq, res: Response) => {
  const story = await prisma.storys.findFirst({
    where: {
      userId: req.user.id,
    },
    include: { images: true },
  });

  res.status(200).json(story);
});
