import { Request, RequestHandler } from "express";
export interface CheckAuthProps extends Request {
  userId?: string;
}

export interface CheckAuthRouterProps extends RequestHandler {
  userId?: string;
}
