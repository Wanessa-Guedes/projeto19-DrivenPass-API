import { Request, Response } from "express";
import { CreateUserData } from "../repositories/authRepository.js";
import { authServices } from "../services/authServices.js";



export async function signUp(req: Request, res: Response){

    const userInfo: CreateUserData = req.body;

    await authServices.signUp(userInfo);

    res.sendStatus(201);

}

export async function signIn(req: Request, res: Response) {
    
    const userInfo: CreateUserData = req.body;
    
    const token = await authServices.signIn(userInfo);

    res.status(200).send(token);
}