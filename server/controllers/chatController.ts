import { Request, Response } from 'express';
import { PrismaClient, Storys } from '@prisma/client';
import asyncHandler from 'express-async-handler';

const prisma = new PrismaClient();

interface AuthReq extends Request {
  user?: any;
}

export const getChats = asyncHandler(async (req: AuthReq, res: Response) => {
  try {
    const storys = await prisma.chats.findMany({
      where: {
        OR: [{ contact_1: req.user.id }, { contact_2: req.user.id }],
      },
      include: {
        user1: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            about: true,
            display_photo: true,
          },
        },
        user2: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            about: true,
            display_photo: true,
          },
        },
        chat_messages: {
          select: {
            name: true,
            message: true,
            createdAt: true,
          },
        },
      },
    });

    res.status(200).json(storys);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

export const getChat = asyncHandler(async (req: AuthReq, res: Response) => {
  try {
    const { id } = req.params;
    const storys = await prisma.chats.findFirst({
      where: { id },
      include: {
        user1: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            about: true,
            display_photo: true,
          },
        },
        user2: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            about: true,
            display_photo: true,
          },
        },
        chat_messages: {
          select: {
            name: true,
            message: true,
            createdAt: true,
          },
        },
      },
    });

    res.status(200).json(storys);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

export const getContacts = asyncHandler(async (req: AuthReq, res: Response) => {
  try {
    const contacts = await prisma.users.findMany({
      where: {
        NOT: {
          id: req.user.id,
        },
        chats1: {
          none: {
            user2: {
              id: req.user.id,
            },
          },
        },
        chats2: {
          none: {
            user1: {
              id: req.user.id,
            },
          },
        },
      },
      select: {
        id: true,
        email: true,
        first_name: true,
        last_name: true,
        about: true,
        display_photo: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.status(200).json(contacts);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

export const addChatRoom = asyncHandler(async (req: AuthReq, res: Response) => {
  try {
    const { contact } = req.body;

    if (!contact) {
      res.status(400);
      throw new Error('No user selected!s');
    }

    const room = await prisma.chats.create({
      data: {
        contact_1: req.user.id,
        contact_2: contact,
      },
      include: {
        user1: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            about: true,
            display_photo: true,
          },
        },
        user2: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            about: true,
            display_photo: true,
          },
        },
      },
    });

    if (room) {
      res.status(201).json(room);
    } else {
      res.status(400);
      throw new Error('Room not created!');
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// export const getContacts = asyncHandler(async (req: AuthReq, res: Response) => {
//   const contacts = await prisma.users.findMany({
//     where: {
//       NOT: {
//         id: req.user.id,
//       },
//     },
//     select: {
//       id: true,
//       email: true,
//       first_name: true,
//       last_name: true,
//       about: true,
//       display_photo: true,
//       createdAt: true,
//       updatedAt: true,
//     },
//   });

//   res.status(200).json(contacts);
// });

export const me = asyncHandler(async (req: AuthReq, res: Response) => {
  res.status(200).json(req.user);
});
