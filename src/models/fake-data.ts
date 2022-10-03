import { faker } from '@faker-js/faker';
import type { Transaction } from './state';

function createTransaction(monthIdx: number): Transaction {
    return {
        date: faker.date.between(new Date(2021,monthIdx, 1), new Date(2021,monthIdx, 30)),
        amount: parseFloat(faker.commerce.price())*(-1),
        title: faker.company.name(),
        description: faker.finance.transactionDescription()
    }
}

function createIncome(monthIdx: number): Transaction {
    return {
        date: new Date(2021, monthIdx, 3),
        amount: 2850.33,
        title: "Lohn/Gehalt/Rente"        
    }
}

export function createFakeTransactions(): Transaction[] {
    let transactions = []

    for(let month=0; month<12;month++) {
        transactions.push(createIncome(month))
        for(let idx=0; idx<50; idx++) {
            transactions.push(createTransaction(month))
        }
    }

    return transactions
}
