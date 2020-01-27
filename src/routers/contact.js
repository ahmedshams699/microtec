const express = require('express')
const Contact = require('../models/contact')
const router = new express.Router()

router.post('/contacts', async (req, res) => {
    const contact = new Contact(req.body)

    try {
        await contact.save()
        res.status(201).send(contact)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/contacts', async (req, res) => {
    try {
        const contacts = await Contact.find({})
        res.send(contacts)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/contacts/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const contact = await Contact.findById(_id)

        if (!contact) {
            return res.status(404).send()
        }

        res.send(contact)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/contacts/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        if (!contact) {
            return res.status(404).send()
        }

        res.send(contact)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/contacts/:id', async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id)

        if (!contact) {
            res.status(404).send()
        }

        res.send(contact)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router