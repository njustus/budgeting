import express = require("express");
import {stateRepository} from "./state-repository";

stateRepository.initDirectory()

const appConfig = {
  port: 3000,
  address: '0.0.0.0'
}

const app = express()

function path(p:string) {
  return '/api/'+p;
}

app.use(express.json())

app.use(express.static(__dirname+'/public'));

//TODO state ctrl auslagern
//TODO config aus ENV/yaml lesen
//TODO dedicated logging lib
//TODO proxy frontend/backend
//TODO include static files from frontend
app.post(path('state/:stateId'), (req: express.Request, res: express.Response) => {
  stateRepository.save(req.params.stateId, req.body);
  res.sendStatus(200)
});

app.get(path('state/:stateId'), (req: express.Request, res: express.Response) => {
  const data = stateRepository.get(req.params.stateId)
  res.status(200).json(data)
})

app.listen(appConfig.port, appConfig.address, () => {
  console.log(`Backend running at ${appConfig.address}:${appConfig.port}`)
})
