import { Request, Response } from "express";
import { createUser, loginUser, getAllUsers } from "./user.service";
import { createdResponse, successResponse, errorResponse } from "../../utils/response";

export const signup = async (req: Request, res: Response) => {
  try {
    const user = await createUser(req.body);
    return createdResponse(res, user, "User created");
  } catch (err) {
    return errorResponse(res, err);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const user = await loginUser(req.body);
    return successResponse(res, user, "Logged in");
  } catch (err) {
    return errorResponse(res, err);
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    return successResponse(res, users, "Users fetched");
  } catch (err) {
    return errorResponse(res, err);
  }
};
