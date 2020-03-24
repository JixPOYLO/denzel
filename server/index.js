const cors = require('cors');
const express = require('express');
const imdb = require('./imdb');

const helmet = require('helmet');
const {PORT} = require('./constants');
const queryString = require('query-string');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const dbName = "datadenzel";
const collectionName = "movies";
//const actor = 'nm0000243';

console.log("Hello");


const url = 'mongodb+srv://JixPOYLO:mongo2020!@cluster0-cz1j7.mongodb.net/test?retryWrites=true&w=majority';

MongoClient.connect(url, {useUnifiedTopology: true} , function(err, client) {
  //assert.equal(null, err);
  if (err) throw err;
  console.log("Connected successfully to server");
 
  const db = client.db(dbName);

  const dbCollection= db.collection(collectionName);

  const app = express();

  module.exports = app;

  app.use(require('body-parser').json());
  app.use(cors());
  app.use(helmet());

  app.options('*', cors());

  app.get('/', (request, response) => {
    response.json({'Hey':'hey Jix'});
  });

  app.get('/movies/findOne', (request, response) => {
    dbCollection.findOne({}, (error, result) => {
      if (error) throw error;
      console.log(result.title);
    });
  });

  
  app.get('/movies/populate/:actor', async(request, response) => {
      // return full list

      let actor = request.query.actor;
      actor = actor? actor:'nm0000243';

      const movies = await imdb(actor)
      const data = dbCollecition.insert(movies)

      response.send({'total':data.length});

     /* let filedata= fs.readFileSync('moviesdenzel.json')
      let listmovies = JSON.parse(filedata)
      dbCollection.insertMany(listmovies,(err, result) => {
        if (err) throw err;
        console.log(result);
      });*/
      /*
      dbCollection.find().toArray((error, result) => {
        if (error) throw error;
        //response.json(result);
        response.json({'total': result.length})
        //console.log(result.length)

        //client.close();
        */
  
  });

  app.get('/movies', (request, response) => {

    dbCollection.aggregate([{ $match: {"metascore":{$gte:75}}},{ $sample: {size: 1 }}]).toArray((error, result) => { 
      if (error) throw error;
      response.json(result);

       //MongoDB query :
       // "metascore":{$gte:75} : movie that has a metascore rate > 75 <=> is a must-watch movie
       // sample : randomly selects the specified number of documents from its input so here juste one
       // match : filters the documents to pass only the documents that match the specified condition(s) to the next pipeline stage
   
    });
    
    //client.close();

  });	

  app.get('/movies/search', (request, response) => {
    let limit = parseInt(request.query.limit, 10)
		let metascore = parseInt(request.query.metascore, 10)
    limit = limit?limit:5
	  meta = metascore?metascore:0

    dbCollection.find({"metascore":{$gte:meta}}).sort({metascore: -1}).limit(limit).toArray((error, result) => { 
      if (error) throw error;
      const total=result.length  
      response.json(result)
      console.log(total)

       //MongoDB query :
       // "metascore":{$gte:meta} : movie that has a metascore rate > meta
       // sort : specifies the order in which the query returns matching documents 
       // limit : method on a cursor to specify the maximum number of documents the cursor will return.
   
    });
  
   //client.close();
  
  });	

  app.get('/movies/:id', (request, response) => {

    let id = request.query.id
	  id = id?id:'tt0477080'

    dbCollection.aggregate([{ $match: {"id":id}}]).toArray((error, result) => { 
      if (error) throw error;
      response.json(result);
      console.log("hola")

       //MongoDB query :
       // match on the movie's id that we want 
       // match : filters the documents to pass only the documents that match the specified condition(s) to the next pipeline stage
   
    });
  });

  app.post('/movies/:id', (request, response) => {

    let id = request.query.id
    id = id?id:'tt0477080'
    let date = request.body.date
    let review = request.body.review

    dbCollection.insert({id:id, date:date, review:review},(error, result) => { 
      if (error) throw error;
      response.json(result);
      console.log("hi")

       //MongoDB query :
       
   
    });
  });

  app.put('/movies/:id', (request, response) => {

    let id = request.query.id
    id = id?id:'tt0477080'
    let date = request.body.date
    let review = request.body.review
    let modif = {date:date, review:review}

    dbCollection.updateMany({id:id}, {$set: modif},(error, result) => { 
      if (error) throw error;
      response.json(result);
      console.log("yo")
      
    });

    /*dbCollection.updateMany({id:id}, {$set: modif},(error, result) => { 
      if (error) throw error;
      response.json(result);
      console.log("yo")
      
    });*/
  });



  





 

  app.listen(PORT);
  console.log(`📡 Running on port ${PORT}`);

});
