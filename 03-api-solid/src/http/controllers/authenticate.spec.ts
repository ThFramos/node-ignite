import request from 'supertest'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { app } from "../../app";


describe("Authenticate (e2e)", () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it("should be able to autheticate", async () => {
        await request(app.server)
            .post('/users')
            .send({
                name: "teste2",
                email: "teste2@teste.com",
                password: "123456789"
            })

        const response = await request(app.server)
            .post('/session')
            .send({
                email: "teste2@teste.com",
                password: "123456789"
            })
        expect(response.statusCode).toEqual(200)
        expect(response.body).toEqual({
            token: expect.any(String),
        })

    })

})

