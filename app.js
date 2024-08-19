const express = require('express');
const Envelope = require('./models/Envelope');
const e = require('express');
const app = express()
const PORT = 4055

let envelopes = []

app.use(express.json())


app.get('/', (req, res) => {
    res.send('ok')
})

app.get('/envelopes', (req, res) => {
    res.send(envelopes)
})


app.post('/envelopes', (req, res) => {
    req.body.id = envelopes.length + 1
    const envelope = new Envelope(req.body)
    if (!envelope || Object.keys(envelope) == 0) {
        res.status(400).send({ error: 'invalid envelope' })
        return;
    }
    envelopes.push(envelope)
    res.send(envelope)
})

app.get('/envelopes/:envelopeId', (req, res) => {
    const { envelopeId } = req.params
    const envelope = envelopes.filter(env => env.id == envelopeId)[0]
    res.send(envelope)
})

app.put('/envelopes/:envelopeId', (req, res) => {
    const { envelopeId } = req.params
    const e_index = envelopes.findIndex(env => env.id == envelopeId)
    const upd_env = { ...envelopes[e_index], ...req.body }
    // check if it's is a valid env by creating a new envelope
    const new_env = new Envelope(upd_env)
    if (!new_env || Object.keys(new_env) == 0) {
        res.status(400).send({ error: 'invalid envelope' })
        return;
    }
    envelopes[e_index] = upd_env;
    res.status(201).send(upd_env)

})

app.delete('/envelopes/:envelopeId', (req, res) => {
    const { envelopeId } = req.params
    envelopes.splice(envelopes.findIndex(env => env.id == envelopeId), 1)
    res.sendStatus(204)
})

app.listen(PORT, () => {
    console.log('Listening on http://localhost:' + PORT)
})