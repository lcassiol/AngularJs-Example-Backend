var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {


  app.get('/contacts', (req, res) => {

    db.collection('contacts').find().toArray(function(err, docs) {
       if (err) {
         res.send({'error':'An error has occurred'});
       } else {
         res.send(docs);
       }
     });

     /*
     TODO utilizar mudar estrategia futuramente

     for (var i = 0, len = listDocs.length; i < len; i++) {
       console.log("-------operadora[i]")
       console.log(listDocs[0].operadora)
       const details = { '_id': new ObjectID(listDocs[0].operadora) };
       db.collection('operator').findOne(details, (err2, item) => {
          if (err2) {
            console.log('An error has occurred');
          } else {
            console.log("responseObject ");
            console.log(responseDocs);

            responseDocs[0].operadora = item;

          }
        });
     }*/

   });

  app.get('/contacts/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };

    db.collection('contacts').findOne(details, (err, item) => {
       if (err) {
         res.send({'error':'An error has occurred'});
       } else {
         res.send(item);
       }
     });
   });

   app.put('/contacts/:id', (req, res) => {
      const id = req.params.id;
      const details = { '_id': new ObjectID(id) };
      const note = { text: req.body.body, title: req.body.title };
      db.collection('contacts').update(details, note, (err, result) => {
        if (err) {
            res.send({'error':'An error has occurred'});
        } else {
            res.send(note);
        }
      });
    });


   app.delete('/contacts/:id', (req, res) => {
       const id = req.params.id;
       const details = { '_id': new ObjectID(id) };
       db.collection('contacts').remove(details, (err, item) => {
         if (err) {
           res.send({'error':'An error has occurred'});
         } else {
           res.send('Note ' + id + ' deleted!');
         }
       });
     });


  app.post('/contacts', (req, res) => {
      const contact = req.body;
      db.collection('contacts').insert(contact, (err, result) => {
        if (err) {
          res.send({ 'error': 'An error has occurred' });
        } else {
          res.send(result.ops[0]);
        }
      });
  });
};
