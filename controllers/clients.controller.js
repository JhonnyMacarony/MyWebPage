const mongodb = require('mongodb');
var ObjectID = require('mongodb').ObjectID;



let dbName="clientDB"
let connectionString = `mongodb://localhost:27017/${dbName}`;
let collection = 'clients'


mongodb.connect(
  connectionString,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err, client) {
    db = client.db()
  }
)

let clientsController = {}


clientsController.getAll = async (req, res) =>{
    let data = await db.collection(collection).find().toArray()
    return data;
}

clientsController.getById = async (req, res) => {
  console.log(req.params.id);
    let id = ObjectID(req.params.id);
    let data = await db.collection(collection).findOne({_id:id});
    return data;
}

clientsController.createClient = async (req, res) =>{
  let client = {
    name: req.body.name,
    lastName: req.body.lastName,
    telephone: req.body.telephone,
    password: req.body.password,
    presentation: req.body.presentation,
            }
   let data = await db.collection(collection).insertOne( client )
   if(data){
    let clients = await db.collection(collection).find().toArray()
    return clients;
   }
}

clientsController.updateClient = async (req, res)=>{
  let id =  ObjectID(req.params.id)
  let response = await db.collection(collection).updateOne({_id: id}, {$set:{
    name: req.body.name,
    lastName: req.body.lastName,
    telephone: req.body.telephone,
    password: req.body.password,
    presentation: req.body.presentation,
      }})

  if(response){
    let data = await db.collection(collection).findOne({_id:id});
    return data;
  };
}

clientsController.deleteClient = async (req, res)=>{
      db.collection(collection).deleteOne({"_id": ObjectID(req.params._id)}).then((data)=>{
      if(data){
       return res.json({deleted:true})
      }
    })

}

module.exports = clientsController;
