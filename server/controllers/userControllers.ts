import { Request, Response } from 'express';
import { PrismaClient, Users } from '@prisma/client';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import randomstring from 'randomstring';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export const verifyOtp = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { code } = req.body;

    if (!code) {
      res.status(400);
      throw new Error('Must provide code!');
    }
    let userCodeExists: Otp | null = null;

    userCodeExists = await prisma.otps.findUnique({ where: { code } });

    if (userCodeExists) {
      const user = await prisma.users.findUnique({
        where: { email: userCodeExists.email },
      });

      if (user) {
        await prisma.otps.deleteMany({
          where: { email: userCodeExists.email },
        });

        res.status(200).json({
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          about: user.about,
          display_photo: user.display_photo,
          accessToken: generateToken({ id: user.id }),
        });
      } else {
        res.status(400);
        throw new Error('Your OTP was wrong!');
      }
    } else {
      res.status(400);
      throw new Error('Your OTP was wrong!');
    }
  } catch (error) {
    res.status(400);
    throw error;
  }
});

interface Otp {
  email: string;
  code: string;
}

export const login = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error('Please add all fields!');
    }

    let user: NewUser | null = null;
    try {
      user = await prisma.users.findUnique({ where: { email } });
    } catch (err: any) {
      if (err.message.includes("Can't reach database server")) {
        res.status(500);
        throw new Error('Network error: Unable to connect to database server');
      }
      throw err;
    }

    // Check if user exists and password matches
    if (user && (await bcrypt.compare(password, user.password))) {
      const userHasCode = await prisma.otps.findFirst({
        where: { email },
      });

      try {
        // Delete old row code
        if (userHasCode) {
          const { id } = userHasCode;
          await prisma.otps.delete({ where: { id } });
        }
        const otp: Otp = await prisma.otps.create({
          data: {
            email,
            code: generateOTP(),
          },
        });

        // Send email to the logging in account
        await sendOTPEmail(email, otp.code);

        res.status(200).json({ message: `${email} please check your inbox!` });
      } catch (error) {
        if (userHasCode) {
          const { id } = userHasCode;
          await prisma.otps.delete({ where: { id } });
        }
        res.status(400);
        throw new Error('Something went wrong, please re-login again!');
      }
    } else {
      res.status(400);
      throw new Error('Invalid Credentials');
    }
  } catch (error) {
    res.status(400);
    throw error;
  }
});

interface NewUser {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export const signup = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { first_name, last_name, email, password, confirm_password } =
      req.body;

    if (!first_name || !last_name || !email || !password || !confirm_password) {
      res.status(400);
      throw new Error('Please add all fields');
    }

    // Check if user exists
    let user: NewUser | null = null;
    try {
      user = await prisma.users.findUnique({ where: { email } });
    } catch (err: any) {
      if (err.message.includes("Can't reach database server")) {
        res.status(500);
        throw new Error('Network error: Unable to connect to database server');
      }
      throw err;
    }

    if (user) {
      res.status(400);
      throw new Error('This email is already connected to an account');
    }

    if (password.length < 6) {
      res.status(400);
      throw new Error('Password must be at least 6 characters');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new User
    const newUser: NewUser = await prisma.users.create({
      data: {
        first_name,
        last_name,
        email,
        password: hashedPassword,
      },
    });

    if (newUser) {
      res.status(201).json({ message: `${email} created successfully!` });
    } else {
      res.status(400);
      throw new Error('Invalid Credentials');
    }
  } catch (error) {
    res.status(400);
    console.log(error);
    throw error;
  }
});

type UpdateBody = {
  about: string;
  display_photo: string;
};

interface AuthReq extends Request {
  user?: any;
}

export const updateUser = asyncHandler(async (req: AuthReq, res: Response) => {
  try {
    const { about, display_photo }: UpdateBody = req.body;

    let user: Users | null;
    try {
      user = await prisma.users.findUnique({
        where: { email: req.user.email },
      });
    } catch (error) {
      res.status(500);
      throw error;
    }

    if (user) {
      user.display_photo = display_photo || user.display_photo;
      user.about = about || user.about;
      await prisma.users.update({
        where: { id: user.id },
        data: {
          display_photo: user.display_photo,
          about: user.about,
        },
      });
      res.status(200).json({
        about: user.about,
        display_photo: user.display_photo,
        message: 'profile updated successfully',
      });
      req.user.about = user.about;
      req.user.display_photo = user.display_photo;
      await req.user.save();
    } else {
      res.status(404);
      throw new Error('User not found');
    }
    // req.user.
  } catch (error) {
    res.status(400);
    throw error;
  }
});

export const getContact = asyncHandler(async (req: AuthReq, res: Response) => {
  const id: string = req.params.id;
  console.log(id);
  const contact = await prisma.users.findFirst({
    where: { id },
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
  res.status(200).json(contact);
});

export const me = asyncHandler(async (req: AuthReq, res: Response) => {
  res.status(200).json(req.user);
});

// Generate JWT
const generateToken = (payload: { id: string | undefined }) => {
  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: '30d',
  });
};

interface MailOptions {
  from: string | undefined;
  to: string;
  subject: string;
  text: string;
}

function sendOTPEmail(email: string, otp: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    // create a nodemailer transporter using transport
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      port: 587,
      auth: {
        user: process.env.EMAIL_ADDRESSS,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // define email options
    const mailOptions: MailOptions = {
      from: process.env.EMAIL_ADDRESSS,
      to: email,
      subject: 'Your OTP for verification',
      text: `${otp} is your verification code for Let's Talk App Login.`,
    };

    // send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        console.log(`Email sent: ${info.response}`);
        resolve();
      }
    });
  });
}

function generateOTP() {
  return randomstring.generate({
    length: 6,
    charset: 'numeric',
  });
}
