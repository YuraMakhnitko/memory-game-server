import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { UsersProps } from "../models";

interface CheckAuthProps extends Request {
  userId?: string;
}

export const checkAuth = (
  req: CheckAuthProps,
  res: Response,
  next: NextFunction
) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");

  if (token) {
    try {
      const decoded = jwt.verify(token, "secret888") as UsersProps;

      req.userId = decoded._id;

      next();
    } catch (error) {
      return res.status(403).json({
        message: "Access denied",
      });
    }
  } else {
    return res.status(403).json({
      message: "Access denied",
    });
  }
};
