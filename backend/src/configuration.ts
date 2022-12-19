export const CONFIG = {
    host: process.env.HOST || 'localhost',
    _port: process.env.PORT || '3000',
    defaultEncoding: 'UTF-8',
    repositoryPath: process.env.REPOSITORY_PATH || '../private/',

    getPort(): number {
        return parseInt(this._port, 10)
    }
}