const express = require('express');
const cors = require('cors');
const fs = require('fs');
const mysql = require('mysql');

const app = express();

app.use(express.json());
app.use(cors());

app.post('/api/mensagem', (req, res) => {
    var date = new Date().toLocaleDateString()
    const logger = fs.createWriteStream("messages/"+req.body.name.split(" ").join("")+ ".json", {
        flags: 'a' // 'a' means appending (old data will be preserved)
      })
      var values = req.body;
      values.date = date
      logger.write(JSON.stringify(req.body) +"\n");
      res.send(req.body);
});

app.get('/', (req, res) => {
    res.send({ express: 'ok!' });
  });

app.get('/messages', (req, res) => {
    const connection = mysql.createConnection({
        host     : process.env.DBHOST,
        port     : process.env.DBPORT,
        user     : process.env.DBUSER,
        password : process.env.DBPASS,
        database : process.env.DB
      });
     
      connection.query("Select * from messages", function(error, results, fields){
          if(error) 
            res.json(error);
          else
            res.json(results);
          connection.end();
          console.log('executou!');
      });
  });
app.post('/message', (req, res) => {
    const connection = mysql.createConnection({
        host     : process.env.DBHOST,
        port     : process.env.DBPORT,
        user     : process.env.DBUSER,
        password : process.env.DBPASS,
        database : process.env.DB
      });

     var query = "INSERT INTO `ravydb`.`messages` (`name`, `email`, `subject`, `phone`, `message`, `date`) VALUES ('"+req.body.name+
     "', '"+req.body.email+"', '"+req.body.subject+"', '"+req.body.phone+"', '"+req.body.message+"', NOW())";
     console.log(query)


      connection.query(query, function(error, results, fields){
          if(error) 
            res.json(error);
          else
            res.json(results);
          connection.end();
          console.log('executou!');
      });
  });


  app.listen(process.env.PORT || 8000); 
