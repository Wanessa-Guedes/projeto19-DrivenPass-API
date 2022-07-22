import supertest from "supertest";
import app from "./../src/app.js";
import { prisma } from "../src/config/databse.js";
import { authFactories } from "./factories/authFactories.js";


beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE users CASCADE`;
})

describe('teste cadastro e login na aplicação', () => {
    it('teste signup sucesso', async () => {
        const login = authFactories.createSignUp();
        const resultado = await supertest(app).post('/signup').send(login);
        console.log(resultado)
        expect(resultado.statusCode).toBe(201)
    })

    it('teste signup com email já cadastrado', async () => {
        const login = authFactories.createSignUp();
        const resultado = await supertest(app).post('/signup').send(login);
        expect(resultado.statusCode).toBe(201)
        const resultado2 = await supertest(app).post('/signup').send(login);
        expect(resultado2.statusCode).toBe(409);
    })

    it('teste signin sucesso', async () => {
        const login = authFactories.createSignUp();
        const resultado = await supertest(app).post('/signup').send(login);
        expect(resultado.statusCode).toBe(201)
        const resultado2 = await supertest(app).post('/signin').send(login);
        const token = resultado2.body.token;
        expect(token).not.toBeNull()
    })
})

afterAll(async () => {
    await prisma.$disconnect();
});
