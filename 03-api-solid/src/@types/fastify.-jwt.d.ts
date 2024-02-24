import { string } from "zod"


declare module '@fastify/jwt' {
    export interface FastifyJWT {
        user: {
            sub: string
        }
    }
}