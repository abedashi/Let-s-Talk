import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

interface AuthenticatedRequest extends Request {
  user?: any;
}

const protect = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      const JWT_SECRET: string = process.env.JWT_SECRET!;
      // Verify token
      const decoded: any = jwt.verify(token, JWT_SECRET);

      // Get user from the token
      const user = await prisma.users.findUniqueOrThrow({
        where: { id: decoded.id },
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

      if (!user) {
        res.status(401);
        throw new Error('Not Authorized');
      }

      req.user = user;

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not Authorized');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not Authorized, no token');
  }
};

export { protect };
