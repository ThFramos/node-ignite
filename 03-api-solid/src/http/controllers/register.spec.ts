import request from 'supertest'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { app } from "../../app";


describe("Register (e2e)", () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it("should be able to register", async () => {

        const response = await request(app.server)
            .post('/users')
            .send({
                name: "teste2",
                email: "teste2@teste.com",
                password: "123456789"
            })

        expect(response.statusCode).toEqual(201)

    })

})

