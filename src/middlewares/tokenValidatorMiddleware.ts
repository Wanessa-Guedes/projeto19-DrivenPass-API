import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export async function validateToken(req: Request, res: Response, next: NextFunction) {

    const authorization = req.headers.authorization;
    const token = authorization?.replace("Bearer ", "").trim();
    let error;
    const secretKey = process.env.JWT_SECRET_KEY;
    let userInfoToken;

    if(!token){
        throw {
            type: "unauthorized",
            message: "unauthorized"
        }
    }

    userInfoToken = jwt.verify(token, secretKey, function(err, decoded) {
        if (err){
            error = err;
        }
    }); 

    if(error){
        throw {
                type: "unauthorized", 
                message: "unauthorized"
        }
    } else {
        userInfoToken = jwt.verify(token, secretKey);
            // id -> email
    }

    res.locals.userInfo = {
        userId: userInfoToken.id,
        userEmail: userInfoToken.email
    }
    
    next()
}