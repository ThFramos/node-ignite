import { Decimal } from "@prisma/client/runtime/library";
import { Gym, Prisma } from "prisma/prisma-client";
import { prisma } from "../../lib/prisma";
import { FindManyNearbyParams, GymsInterfaceRepository } from "../gyms-interface-repository";



export class PrismaGymsRepository implements GymsInterfaceRepository {
    async findById(id: string) {
        const gym = await prisma.gym.findUnique({
            where: {
                id
            }
        })

        return gym
    }
    async fndManyNearBy({ latitude, longitude }: FindManyNearbyParams) {
        const gyms = prisma.$queryRaw<Gym[]>`
        SELECT * from gyms
        WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10`

        return gyms
    }


    async searchMany(query: string, page: number) {
        const gyms = await prisma.gym.findMany(
            {
                where: {
                    title: {
                        contains: query
                    }
                },
                skip: 20,
                take: (page - 1) * 20

            }
        )

        return gyms
    }
    async create(data: Prisma.GymCreateInput) {
        const gym = prisma.gym.create({
            data
        })

        return gym
    }

}