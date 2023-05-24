import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import asyncHandler from 'express-async-handler'

const prisma = new PrismaClient()

interface AuthReq extends Request {
  user?: any
}

export const getGroups = asyncHandler(async (req: AuthReq, res: Response) => {
  try {
    const groups = await prisma.group_members.findMany({
      where: {
        contactId: req.user.id,
      },
      include: {
        group: true,
      },
    })

    const groupList = groups.map((groupMember) => groupMember.group)

    res.status(200).json(groupList)
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
})

export const getGroup = asyncHandler(async (req: AuthReq, res: Response) => {
  try {
    const { id } = req.params
    const group = await prisma.groups.findFirst({
      where: { id },
      include: {
        group_members: {
          select: {
            member: {
              select: {
                id: true,
                first_name: true,
                last_name: true,
                display_photo: true,
              },
            },
          },
        },
        group_messages: {
          select: {
            name: true,
            message: true,
            createdAt: true,
          },
        },
      },
    })

    res.status(200).json(group)
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
})
