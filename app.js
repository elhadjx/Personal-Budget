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

app.get('/envelopes/:envelopeId', (req, res) => {
    const { envelopeId } = req.params
    const envelope = envelopes.filter(env => env.id == envelopeId)[0]
    res.send(envelope)
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

app.listen(PORT, () => {
    console.log('Listening on http://localhost:' + PORT)
})