import * as fs from "fs";
import { CONFIG } from "./configuration";

export const stateRepository = {
  BASE_PATH: CONFIG.repositoryPath,
  ENCODING: CONFIG.defaultEncoding,

  initDirectory() {
    if(!fs.existsSync(this.BASE_PATH)) {
      console.log(`creating base directory: ${this.BASE_PATH}`)
      fs.mkdirSync(this.BASE_PATH)
    }
  },
  filePath(id: string) {
    return this.BASE_PATH+id+'.json'
  },
  save(id: string, state: any): void {
    const filePath = this.filePath(id)
    const content = JSON.stringify(state, null, 2)

    console.log(`saving state at ${filePath}`)
    fs.writeFileSync(filePath, content, {encoding: this.ENCODING})
  },

  get(id: string): any {
    const filePath = this.filePath(id)
    console.log(`reading from file ${filePath}`)

    const content = fs.readFileSync(filePath, {encoding: this.ENCODING}).toString()
    return JSON.parse(content)
  }
}

