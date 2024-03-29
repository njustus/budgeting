import {beforeEach, describe, expect, it} from 'vitest'
import {createPinia, setActivePinia} from 'pinia'
import {useAppStore} from './app-state'
import type {Transaction} from '@/models'
import {TransactionRecurrence, TransactionType} from '@/models'

describe('The TransactionStore should', function () {
    let store: any = null

    beforeEach(function () {
        setActivePinia(createPinia())
        store = useAppStore()
    })

    it('initialize', function () {
        expect(store).not.toBeNull()
        expect(store.sortedTransactions.length).toEqual(0);
    })

    it('sort transactions by date', function () {
        const txs: Transaction[] = [
            {
                id: '0',
                title: 'test1',
                amount: 1,
                startDate: new Date(2021, 4, 1),
                type: TransactionType.Expense,
                recurrence: TransactionRecurrence.once,
                tags: [],
              lastUpdate: new Date()
            },
            {
                id: '1',
                title: 'test2',
                amount: 2,
                startDate: new Date(2021, 1, 1),
                type: TransactionType.Expense,
                recurrence: TransactionRecurrence.once,
                tags: [],
              lastUpdate: new Date()
            },
            {
                id: '2',
                title: 'test3',
                amount: 3,
                startDate: new Date(2021, 3, 1),
                type: TransactionType.Expense,
                recurrence: TransactionRecurrence.once,
                tags: [],
              lastUpdate: new Date()
            }
        ]

        txs.forEach(tx => store.addTransaction(tx))

        expect(store.sortedTransactions.length).toEqual(3)
        expect(store.sortedTransactions.map((tx: Transaction) => tx.title)).toEqual([
            'test2', 'test3', 'test1'
        ])
    })

    describe('runningSum should', function () {
        it('calculate running sum of 2 elements', function () {
            const txs: Transaction[] = [
                {
                    id: '1',
                    title: 'test2',
                    amount: 2,
                    startDate: new Date(2021, 1, 1),
                    type: TransactionType.Expense,
                    recurrence: TransactionRecurrence.once,
                    tags: [],
                  lastUpdate: new Date()
                },
                {
                    id: '0',
                    title: 'test1',
                    amount: 1,
                    startDate: new Date(2021, 4, 1),
                    type: TransactionType.Expense,
                    recurrence: TransactionRecurrence.once,
                    tags: [],
                  lastUpdate: new Date()
                },
            ];

            txs.forEach(tx => store.addTransaction(tx))
            expect(store.runningSum).toEqual([-2, -3])
        })

        it('calculate running sum', function () {
            const txs: Transaction[] = [
                {
                    id: '1',
                    title: 'test2',
                    amount: 6,
                    startDate: new Date(2021, 1, 1),
                    type: TransactionType.Income,
                    recurrence: TransactionRecurrence.once,
                    tags: [],
                  lastUpdate: new Date()
                },
                {
                    id: '2',
                    title: 'test3',
                    amount: 3,
                    startDate: new Date(2021, 3, 1),
                    type: TransactionType.Expense,
                    recurrence: TransactionRecurrence.once,
                    tags: [],
                  lastUpdate: new Date()
                },
                {
                    id: '0',
                    title: 'test1',
                    amount: 1,
                    startDate: new Date(2021, 4, 1),
                    type: TransactionType.Expense,
                    recurrence: TransactionRecurrence.once,
                    tags: [],
                  lastUpdate: new Date()
                },
            ]

            txs.forEach(tx => store.addTransaction(tx))
            expect(store.runningSum).toEqual([6, 3, 2])
        })

        it('calculate sum of empty list', function () {
            expect(store.runningSum).toEqual([])
        })
    })
})
