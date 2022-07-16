import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

import { authRepository, CreateUserData } from "../repositories/authRepository.js";

dotenv.config();

const hash = 10;

async function signUp(createUserData: CreateUserData) {

    createUserData.email = createUserData.email.toLowerCase();
    const email = createUserData.email;
    const password = createUserData.password;

    const isEmailRegistered = await authRepository.emailsRegistered(email);

    if(isEmailRegistered){
        throw {
            type: "conflict",
            message: "email already registered"
        }
    }
    
    createUserData.password = bcrypt.hashSync(password, hash);

    await authRepository.createUser(createUserData)
}

async function signIn(createUserData: CreateUserData) {

    const user = await authRepository.emailsRegistered(createUserData.email)
    if(!user){
        throw {
            type: "not_found",
            message: "User not registered!"
        }
    }

    if(!(bcrypt.compareSync(createUserData.password, user.password))){
        throw {
            type:"unauthorized", 
            message: "Incorrect password!"
        }
    }

    const secretKey = process.env.JWT_SECRET_KEY;
    const token = jwt.sign({id: user.id, email: user.email}, secretKey);

    await authRepository.startSession(token, user.id)

    return token

}

async function logOut(sessionId: number) {
    console.log(sessionId)
    const logOutSession = await authRepository.finishSession(sessionId)

    return logOutSession
}

export const authServices = {
    signUp,
    signIn,
    logOut
}