import { NextFunction, Request, Response } from "express";
import { Injectable, NestMiddleware } from "@nestjs/common";
import { prisma } from "./prisma";

@Injectable()
export class UserDataMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.cookies["syncit-session-id"]) {
        next();
        return;
      }

      const session = await prisma.session.findFirst({
        where: { id: req.cookies["syncit-session-id"] },
        include: { user: true },
      });

      if (session?.user) {
        res.locals.userData = session.user;
      }
    } catch (e) {
      console.error("failed to get user data", e);
    }
    next();
  }
}
