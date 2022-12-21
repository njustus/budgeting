import {beforeEach, describe, expect, it} from 'vitest'
import {createPinia, setActivePinia} from 'pinia'
import {useAppStore} from '@/stores/app-state'
import type {AppState, Transaction} from '@/models'
import {synchronizer} from './synchronizer'

describe('The synchronizer should', function () {
  let store: any = null

  beforeEach(function () {
    setActivePinia(createPinia())
    store = useAppStore()
  });

  function minimalState(transactions: Partial<Transaction>[]): AppState {
    return {
      transactions
    } as AppState
  }

  describe('"sync" 2 states', function () {
    it('taking youngest transaction in localState', function() {
      const localState = minimalState([
        {
          id: '1',
          lastUpdate: new Date(2022,1,2),
          title: 'local transaction',
          date: new Date(2000,1,1)
        }
      ])

      const backendState = minimalState([{
        id: '1',
        lastUpdate: new Date(2022,1,1),
        title: 'remote transaction',
        date: new Date(2000,1,1)
      }])

      const mergedState = synchronizer.mergeState(localState, backendState)
      expect(mergedState.transactions).toEqual(localState.transactions)
    });

    it('taking youngest transaction in backendState', function() {
      const localState = minimalState([
        {
          id: '1',
          lastUpdate: new Date(2022,1,2),
          title: 'local transaction',
          date: new Date(2000,1,1)
        }
      ])

      const backendState = minimalState([{
        id: '1',
        lastUpdate: new Date(2022,1,3),
        title: 'remote transaction',
        date: new Date(2000,1,1)
      }])

      const mergedState = synchronizer.mergeState(localState, backendState)
      expect(mergedState.transactions).toEqual(backendState.transactions)
    });

    it('include transactions that are missing in backendState', function() {
      const localState = minimalState([
        {
          id: '1',
          lastUpdate: new Date(2022,1,2),
          title: 'local transaction',
          date: new Date(2000,1,1)
        }
      ])
      const backendState = minimalState([])

      const mergedState = synchronizer.mergeState(localState, backendState)
      expect(mergedState.transactions).toEqual(localState.transactions)
    });

    it('include transactions that are missing in localState', function() {
      const localState = minimalState([])
      const backendState = minimalState([{
          id: '1',
          lastUpdate: new Date(2022,1,2),
          title: 'local transaction',
          date: new Date(2000,1,1)
        }])

      const mergedState = synchronizer.mergeState(localState, backendState)
      expect(mergedState.transactions).toEqual(backendState.transactions)
    });
  });
});
