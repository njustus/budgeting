import type {AppState, Transaction} from "@/models";
import axios from "axios";
import * as R from "ramda";

export const synchronizer = {
    async sync(stateId: string, state: AppState): Promise<void> {

        await axios.post('/api/state/'+stateId, state)
        console.log('saved at ', stateId)
    },

    async getState(stateId: string): Promise<AppState> {
        const data = await axios.get('/api/state/'+stateId)
          .then((result) => result.data)
          .catch((err) => {
            if(404 === err?.response?.status) {
              return { transactions: [] }
            } else {
              throw err
            }
          })

        return data as AppState
    },

    mergeState(localState: AppState, backendState: AppState): AppState {
        //TODO handle deleted transactions on both sides?
      function findById(transactions: Transaction[], id: string): Transaction | undefined {
        return transactions.find(t => t.id === id)
      }

      function mergeTransactions(localTransactions: Transaction[], backendTransactions: Transaction[]): Transaction[] {
        function merge(localTx: Transaction, backendTx?: Transaction): Transaction {
          let result: Transaction | null = null;
          if(!backendTx) {
            result = localTx
          } else if(new Date(localTx.lastUpdate).getTime() >= new Date(backendTx.lastUpdate).getTime()) {
            //use constructor to force a date object (serialized dates are deserialized as strings!)
            result = localTx
          } else {
            result = backendTx
          }

          return {
            ...result,
            date: new Date(result.date),
            lastUpdate: new Date(result.lastUpdate)
          }
        }

        // first merge locals
        const mergedLocalTransactions = localTransactions.map(ltx => merge(ltx, findById(backendTransactions, ltx.id)))

        // then backend if it doesn't exist already
        const mergedBackendTransactions = backendTransactions
          .filter(btx => !findById(mergedLocalTransactions, btx.id))
          .map(btx => merge(btx, findById(localTransactions, btx.id)))

        return R.concat(mergedLocalTransactions, mergedBackendTransactions)
      }

      return {
        ...localState,
        transactions: mergeTransactions(localState.transactions, backendState.transactions)
      }
    }
}
