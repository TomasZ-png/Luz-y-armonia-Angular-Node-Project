import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

// const prismaOptions: any = {
//   datasources: {
//     db: { url: process.env.DATABASE_URL },
//   },
// };

// export const prisma = new PrismaClient(prismaOptions);
// import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient(); 