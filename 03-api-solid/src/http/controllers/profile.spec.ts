import request from 'supertest'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { app } from "../../app";


describe("Profile (e2e)", () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it("should be able to get profile", async () => {
        await request(app.server)
            .post('/users')
            .send({
                name: "teste2",
                email: "teste2@teste.com",
                password: "123456789"
            })

        const authResponse = await request(app.server)
            .post('/session')
            .send({
                email: "teste2@teste.com",
                password: "123456789"
            })

        const { token } = authResponse.body;
        const profileResponse = await request(app.server)
            .get('/me')
            .set('Authorization', `Bearer ${token}`)
            .send()

        expect(profileResponse.statusCode).toEqual(200)
        expect(profileResponse.body.user).toEqual(
            expect.objectContaining({
                email: "teste2@teste.com"
            })
        )

    })

})

