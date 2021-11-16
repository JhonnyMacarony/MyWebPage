const express = require('express');
const router = express.Router();
const clientsController = require('../controllers/clients.controller')

const getAll = async (req, res) => {
    await clientsController.getAll().then(clients =>{
        res.send(clients);
    })
    .catch(err =>{
        res.status(404).send(err)
    })
}

const getClientById = async (req, res) => {
    await clientsController.getClientById(req,res).then(client =>{
        res.send(client)
    })
    .catch(err =>{
        res.status(404).send(err)
    })
}

const create = async (req, res) => {
    await clientsController.createClient (req, res).then(clients=>{
        res.send(clients);
    })
    .catch(err=>{
        res.status(400).send(err)
    })
}

const update = async (req, res) =>{
    await clientsController.updateClient(req, res).then(client=>{
        res.send(client);
    })
    .catch(err=>{
        res.status(400).send(err)
    })
}

const remove = async (req, res)=>{
    await clientsController.deleteClient(req, res).then(()=>{
        res.send({deleted: true})
    })
    .catch(err=>{
        res.status(400).send(err)
    })
}

router.get('/', getAll);
router.get('/:id', getClientById);
router.post('/', create);
router.put('/upload/id:', update);
router.delete('/:_id', remove);

module.exports = router;