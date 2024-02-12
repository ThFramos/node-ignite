import dayjs from "dayjs";
import { Prisma } from "prisma/prisma-client";
import { prisma } from "../../lib/prisma";
import { CheckInInterfaceRepository } from "../check-in-interface-repository";

export class PrismaCheckinRepository implements CheckInInterfaceRepository {

    async create(data: Prisma.CheckInUncheckedCreateInput) {

        const checkIn = await prisma.checkIn.create({
            data
        })

        return checkIn
    }
    async findManyByUserId(userId: string, page: number) {
        const checkins = await prisma.checkIn.findMany({
            where: {
                user_id: userId
            },
            take: 20,
            skip: (page - 1) * 20
        })

        return checkins
    }
    async findById(id: string) {
        const checkin = await prisma.checkIn.findUnique({
            where: {
                id
            }
        })

        return checkin
    }
    async save(checkIn: { id: string; created_at: Date; validated_at: Date | null; user_id: string; gym_id: string; }) {
        const checkin = await prisma.checkIn.update({
            data: checkIn,
            where: {
                id: checkIn.id
            }

        })

        return checkin
    }
    async getUserCountFromMetrics(userId: string) {
        const count = await prisma.checkIn.count({
            where: {
                user_id: userId
            }
        })

        return count
    }
    async findCheckinOnTheDate(userId: string, created_at: Date) {
        const startOfTheDay = dayjs(created_at).startOf('date')
        const endtOfTheDay = dayjs(created_at).endOf('date')

        const checkIn = await prisma.checkIn.findFirst({
            where: {
                user_id: userId,
                created_at: {
                    gte: startOfTheDay.toDate(),
                    lte: endtOfTheDay.toDate()
                }
            }
        })

        return checkIn
    }

}