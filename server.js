const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/api/mensagem', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.get('/', (req, res) => {
    res.send({ express: 'ok!' });
  });

  app.listen(process.env.PORT || 8000); 