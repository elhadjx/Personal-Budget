const express = require('express');
const Envelope = require('./models/Envelope');
const app = express()
const PORT = 4055 // env

let envelopes = []

app.use(express.json())

app.param('envelopeId', (req, res, next, id) => {
    let f_index = envelopes.findIndex(env => env.id == id);
    if (f_index < 0) {
        res.status(404).send({ error: 'envelope not found' })
        return;
    }
    req.envelopeId = id
    req.envelopeIndex = f_index
    next()
})

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
    const envelope = envelopes.filter(env => env.id == req.envelopeId)[0]
    res.send(envelope)
})

app.put('/envelopes/:envelopeId', (req, res) => {
    const upd_env = { ...envelopes[req.envelopeIndex], ...req.body }
    // check if it's is a valid env by creating a new envelope
    const new_env = new Envelope(upd_env)
    if (!new_env || Object.keys(new_env) == 0) {
        res.status(400).send({ error: 'invalid envelope' })
        return;
    }
    envelopes[req.envelopeIndex] = upd_env;
    res.status(201).send(upd_env)

})

app.delete('/envelopes/:envelopeId', (req, res) => {
    envelopes.splice(envelopes.findIndex(env => env.id == req.envelopeId), 1)
    res.sendStatus(204)
})

app.post('/envelopes/:fromId/:toId', (req, res) => {
    const { fromId, toId } = req.params
    const budget = req.body.budget

    // check if both envelopes exists
    const fromIndex = envelopes.findIndex(env => env.id == fromId)
    const toIndex = envelopes.findIndex(env => env.id == toId)
    const fromEnv = envelopes[fromIndex]
    const toEnv = envelopes[toIndex]

    if (!fromEnv || !toEnv || Object.keys(fromEnv) == 0 || Object.keys(toEnv) == 0) {
        res.status(404).send({ error: 'invlaid envelopes' })
        return;
    }

    if (!(typeof (budget) == 'number')) {
        res.status(400).send({ error: 'invalid budget' })
        return;
    }


    if (fromEnv.balance < budget) {
        res.status(400).send({ error: 'insufficient balance' })
        return;
    }


    envelopes[fromIndex].balance -= budget;
    envelopes[toIndex].balance += budget;

    res.status(200).send({ success: 'budget transferred' })

})

app.listen(PORT, () => {
    console.log('Listening on http://localhost:' + PORT)
})
