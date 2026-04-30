import { Request, Response } from "express"
import { prisma } from "@src/infra/db/prisma";
import { emailSchema } from "@src/modules/users/users.schemas";

export const getUsersHandler = async (req: Request, res: Response) => {
  const email = emailSchema.parse(req.params.email);

  if (email) {
    const user = await prisma.user.findMany({
      where: {
        email
      },
    });
    res.send(JSON.stringify(user));
  } else {
    throw new Error('Email');
  }
}