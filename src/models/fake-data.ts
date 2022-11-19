import type {Transaction} from './state';
import {TransactionRecurrence, TransactionType} from "./state";
import { v4 as uuidv4 } from 'uuid';

export function createFakeTransactions(): Transaction[] {
    const date = new Date(2021, 0, 1)
    const type = TransactionType.Income

    const gehalt = {name: 'Gehalt'}
    const einkommen = {name: 'Einkommen'}
    const bonus = {name: 'Bonus'}

    let transactions = [
        {
            id: uuidv4(),
            date,
            amount: 2850.58,
            title: "Gehalt monatl.",
            tags: [gehalt, einkommen],
            type,
            recurrence: TransactionRecurrence.monthly
        },
        {
            id: uuidv4(),
            date,
            amount: 450.45,
            title: "Bonus monatl.",
            tags: [gehalt, einkommen, bonus],
            type,
            recurrence: TransactionRecurrence.monthly
        },
        {
            id: uuidv4(),
            date: new Date(2021,11,30),
            amount: 2500,
            title: "Jahresbonus",
            tags: [gehalt, einkommen, bonus],
            type,
            recurrence: TransactionRecurrence.yearly
        },
        {
            id: uuidv4(),
            date: new Date(2021,0,5),
            amount: 900,
            title: "Miete",
            tags: [{name: 'Wohnen'}],
            type: TransactionType.Expense,
            recurrence: TransactionRecurrence.monthly
        },
        {
            id: uuidv4(),
            date: new Date(2021,0,5),
            amount: 19.99,
            title: "Vodafone Cable50",
            tags: [{name: 'Kommunikation'}],
            type: TransactionType.Expense,
            recurrence: TransactionRecurrence.monthly
        },
        {
            id: uuidv4(),
            date: new Date(2021,0,5),
            amount: 16.99,
            title: "Congstar Mobil",
            tags: [{name: 'Kommunikation'}],
            type: TransactionType.Expense,
            recurrence: TransactionRecurrence.monthly
        },
    ]

    return transactions
}
