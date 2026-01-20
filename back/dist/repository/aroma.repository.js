import { prisma } from "../prisma";
export class AromaRepository {
    async getAll() {
        return await prisma.aroma.findMany();
    }
    async getById(id) {
        return await prisma.aroma.findUnique({
            where: { id }
        });
    }
    async getByName(aroma) {
        return await prisma.aroma.findUnique({
            where: { aroma }
        });
    }
    async create(aroma) {
        return await prisma.aroma.create({
            data: { aroma }
        });
    }
    async delete(id) {
        return await prisma.aroma.delete({
            where: { id }
        });
    }
}
//# sourceMappingURL=aroma.repository.js.map