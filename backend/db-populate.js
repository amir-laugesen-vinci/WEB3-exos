const { PrismaClient } = require('./generated/prisma');
const expenses = require('./data/expenses.json');

const prisma = new PrismaClient();

async function main() {
  // Adapt data for Prisma (remove id, convert date)
  const data = expenses.map(e => ({
    date: new Date(e.date),
    description: e.description,
    payer: e.payer,
    amount: e.amount
  }));

  const result = await prisma.expense.createMany({ data });
  console.log(`${result.count} expenses inserted.`);
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  });
