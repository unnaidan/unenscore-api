import { PrismaClient } from '@prisma/client';
import { hashSync } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    const { id } = await prisma.organization.create({
        data: {
            name: 'Unen ББСБ'
        }
    });
    await prisma.user.create({
        data: {
            name: 'Болд',
            surname: 'Доржсүрэн',
            position: 'Гүйцэтгэх захирал',
            role: 'admin',
            email: 'unnaidan@gmail.com',
            emailVerified: true,
            password: hashSync('admin123'),
            organizationId: id
        }
    });
}

main()
    .catch((e) => {
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });