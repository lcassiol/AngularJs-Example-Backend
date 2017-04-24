var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {

  app.get('/operator', (req, res) => {

    db.collection('operator').find().toArray(function(err, docs) {
       if (err) {
         res.send({'error':'An error has occurred'});
       } else {
         res.send(docs);
       }
     });
   });

  app.get('/operator/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };

    db.collection('operator').findOne(details, (err, item) => {
       if (err) {
         res.send({'error':'An error has occurred'});
       } else {
         res.send(item);
       }
     });
   });

   app.put('/operator/:id', (req, res) => {
      const id = req.params.id;
      const details = { '_id': new ObjectID(id) };
      const note = { text: req.body.body, title: req.body.title };
      db.collection('operator').update(details, note, (err, result) => {
        if (err) {
            res.send({'error':'An error has occurred'});
        } else {
            res.send(note);
        }
      });
    });


   app.delete('/operator/:id', (req, res) => {
       const id = req.params.id;
       const details = { '_id': new ObjectID(id) };
       db.collection('operator').remove(details, (err, item) => {
         if (err) {
           res.send({'error':'An error has occurred'});
         } else {
           res.send('Note ' + id + ' deleted!');
         }
       });
     });


  app.post('/operator', (req, res) => {
    const operatorReq = req.body;
      db.collection('operator').insert(operatorReq, (err, result) => {
        if (err) {
          res.send({ 'error': 'An error has occurred' });
        } else {
          res.send(result.ops[0]);
        }
      });
  });
};
