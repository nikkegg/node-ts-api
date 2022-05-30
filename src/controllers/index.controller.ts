import { Request, Response, NextFunction } from "express";

const index = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

export const indexController = { index };
