import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia, type Store } from 'pinia'
import { useAppStore } from './app-state'
import type { AppState, Transaction} from '@/models/state'
import {TransactionType, TransactionRecurrence} from '@/models/state'


describe('The TransactionStore should', function() {
    let store: Store<string, AppState> | null = null

    beforeEach(function() {
        setActivePinia(createPinia())
        store = useAppStore()
    })


    it('initialize', function() {
        expect(store).not.toBeNull()
        expect(store.sortedTransactions.length).toEqual(0);
    })

    it('sort transactions by date', function() {
        const txs: Transaction[] = [
            {
                title: 'test1',
                amount: 1,
                date: new Date(2021,4,1),
                type: TransactionType.Expense,
                recurrence: TransactionRecurrence.once,
                tags: []
            },
            {
                title: 'test2',
                amount: 2,
                date: new Date(2021,1,1),
                type: TransactionType.Expense,
                recurrence: TransactionRecurrence.once,
                tags: []
            },
            {
                title: 'test3',
                amount: 3,
                date: new Date(2021,3,1),
                type: TransactionType.Expense,
                recurrence: TransactionRecurrence.once,
                tags: []
            }
        ]

        txs.forEach(tx => store.addTransaction(tx))

        expect(store.sortedTransactions.length).toEqual(3)
        expect(store.sortedTransactions.map(tx => tx.title)).toEqual([
            'test1', 'test3', 'test2'
        ])
    })

    it('calculate running sum of 2 elements', function() {
        const txs: Transaction[] = [
            {
                title: 'test1',
                amount: 1,
                date: new Date(2021,4,1),
                type: TransactionType.Expense,
                recurrence: TransactionRecurrence.once,
                tags: []
            },
            {
                title: 'test2',
                amount: 2,
                date: new Date(2021,1,1),
                type: TransactionType.Expense,
                recurrence: TransactionRecurrence.once,
                tags: []
            },
        ];

        txs.forEach(tx => store.addTransaction(tx))
        expect(store.runningSum).toEqual([-1, -3])
    })

    it('calculate running sum', function() {
        const txs: Transaction[] = [
            {
                title: 'test1',
                amount: 1,
                date: new Date(2021,4,1),
                type: TransactionType.Expense,
                recurrence: TransactionRecurrence.once,
                tags: []
            },
            {
                title: 'test2',
                amount: 6,
                date: new Date(2021,1,1),
                type: TransactionType.Income,
                recurrence: TransactionRecurrence.once,
                tags: []
            },
            {
                title: 'test3',
                amount: 3,
                date: new Date(2021,3,1),
                type: TransactionType.Expense,
                recurrence: TransactionRecurrence.once,
                tags: []
            }
        ]

        txs.forEach(tx => store.addTransaction(tx))
        expect(store.runningSum).toEqual([-1, -4, 2])
    })
})
