const express = require('express');
const cors = require('cors');
const fs = require('fs');



const app = express();

app.use(express.json());
app.use(cors());

app.post('/api/mensagem', (req, res) => {
    var date = new Date().toLocaleDateString()
    const logger = fs.createWriteStream("messages/"+req.body.name+ ".json", {
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

app.get('/files', (req, res) => {
    fs.mkdirSync("messages")
    var files = fs.readdirSync("messages")
    res.send({files});
  });
app.post('/download', (req, res) => {
    console.log(req.query)
    var file = fs.readFileSync(`messages/${req.query.name.split(" ").join("")}`);
    res.send({file}); // Set disposition and send it.
  });


  app.listen(process.env.PORT || 8000); 