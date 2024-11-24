const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function testPrisma() {
    try {
        const todos = await prisma.todo.findMany();
        console.log('Todos:', todos);
    } catch (err) {
        console.error('Prisma Error:', err);
    } finally {
        await prisma.$disconnect();
    }
}

testPrisma();
