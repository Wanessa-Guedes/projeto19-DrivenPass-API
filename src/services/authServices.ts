import bcrypt from "bcrypt";
import { authRepository, CreateUserData } from "../repositories/authRepository.js";


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


export const authServices = {
    signUp
}