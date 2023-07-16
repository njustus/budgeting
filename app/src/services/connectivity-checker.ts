import axios from "axios";

export const connectivityChecker = {
  periodicCheck(fn: (isAlive: boolean) => void): void {
    async function run() {
      const payload = await axios.get('/api/status').then(
        (res) => res.data,
        (err) => null
      )

      console.log('[connectivityChecker] received payload', payload)
      fn(payload !== null)
    }

    window.setInterval(run, 10000)
  }
}
