import express = require("express");
import * as http from 'http';
import * as https from 'https';
import {CONFIG} from "./configuration";
import {stateRepository} from "./state-repository";

stateRepository.initDirectory()

const app = express()

function path(p:string) {
  return '/api/'+p;
}

function server() {
  return CONFIG.isHttps() ?
    https.createServer(CONFIG.getCerts(), app) :
    http.createServer(app)
}

app.use(express.json())

app.use(express.static(__dirname+'/public'));

//TODO state ctrl auslagern
//TODO dedicated logging lib
//TODO handle missing keys
app.post(path('state/:stateId'), (req: express.Request, res: express.Response) => {
  stateRepository.save(req.params.stateId, req.body);
  res.sendStatus(200)
});

app.get(path('state/:stateId'), (req: express.Request, res: express.Response) => {
  const data = stateRepository.get(req.params.stateId)

  if(data) {
    res.status(200).json(data)
  } else {
    res.sendStatus(404)
  }
})

app.get(path('status'), (req: express.Request, res: express.Response) => {
  const payload = {
    date: new Date(),
    message: 'OK'
  }

  res.status(200).json(payload)
});

server().listen(CONFIG.getPort(), CONFIG.host, () => {
  console.log(`config loaded:`, CONFIG)
  console.log(`Backend running at ${CONFIG.getProtocol()}://${CONFIG.host}:${CONFIG.getPort()}`)
})
