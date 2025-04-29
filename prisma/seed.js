// filepath: c:\Users\ASUS\Documents\DPM 25\ngingas\prisma\seed.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    await prisma.user.create({
        data: {
        username: 'admin',
        password: '1234', // Pastikan untuk mengenkripsi password di aplikasi nyata
        },
    });
    console.log('User admin created');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });