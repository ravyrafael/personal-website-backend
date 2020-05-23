const express = require('express');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/api/mensagem', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.get('/', (req, res) => {
    res.send({ express: 'ok!' });
  });

app.listen(port, () => console.log(`Listening on port ${port}`));