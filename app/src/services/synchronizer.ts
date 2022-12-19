import type { AppState } from "@/models/state";
import axios from "axios";

export const synchronizer = {
    async sync(stateId: string, state: AppState): Promise<void> {
        
        await axios.post('/api/state/'+stateId, state)
        console.log('saved at ', stateId)
    },

    async getState(stateId: string): Promise<AppState> {
        const data = await (await axios.get('/api/state/'+stateId)).data
        return data as AppState
    }
}