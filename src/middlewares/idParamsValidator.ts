import { NextFunction, Request, Response } from "express";


export async function validateIdParams(req: Request, res: Response, next: NextFunction) {
    const id = +req.params.id;

    if(isNaN(id)){
        throw {
            type: "not_found",
            message: "Incorrect credential id"
        }
    }
    res.locals.id = {id};
    next()
}