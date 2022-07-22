import { prisma } from "../../src/config/databse.js";

function createSignUp(){
    const EMAIL = 'supertest@gmail.com';
    const PASSWORD = '1234567891011';
    const login = {email: EMAIL, password: PASSWORD};
    
    return login

}

export const authFactories = {
    createSignUp
}