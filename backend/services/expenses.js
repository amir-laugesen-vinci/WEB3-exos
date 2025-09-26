
const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

async function getAllExpenses() {
  return await prisma.expense.findMany();
}

async function addExpense(expense) {
  return await prisma.expense.create({ data: expense });
}

// resetExpenses n'a plus de sens avec la base, on peut le désactiver ou le réécrire si besoin
async function resetExpenses() {
  // Optionnel : supprimer toutes les dépenses et réinsérer celles du fichier init
  const fs = require('fs');
  const path = require('path');
  const EXPENSES_INIT_FILE_PATH = path.join(__dirname, '../data/expenses.init.json');
  const initData = JSON.parse(fs.readFileSync(EXPENSES_INIT_FILE_PATH, 'utf8'));
  await prisma.expense.deleteMany();
  await prisma.expense.createMany({
    data: initData.map(e => ({
      date: new Date(e.date),
      description: e.description,
      payer: e.payer,
      amount: e.amount
    }))
  });
  return await prisma.expense.findMany();
}

module.exports = {
  getAllExpenses,
  addExpense,
  resetExpenses,
};
