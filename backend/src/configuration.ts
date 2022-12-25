import * as fs from 'fs'

export const CONFIG = {
  host: process.env.HOST || 'localhost',
  _port: process.env.PORT || '3000',
  defaultEncoding: 'UTF-8',
  repositoryPath: process.env.REPOSITORY_PATH || '../private/',
  useHTTPS: process.env.HTTPS || false,
  certFiles: {
    crt: process.env.HTTPS_CRT || 'https.crt',
    key: process.env.HTTPS_KEY || 'https.key'
  },
  getPort(): number {
    return parseInt(this._port, 10)
  },
  getCerts(): {key:string, cert: string} {
    return {
      cert: fs.readFileSync(CONFIG.certFiles.crt).toString(),
      key: fs.readFileSync(CONFIG.certFiles.key).toString(),
    }
  },
  getProtocol(): string {
    return CONFIG.isHttps() ? 'https' : 'http'
  },
  isHttps(): boolean {
    return Boolean(CONFIG.useHTTPS)
  },
}
