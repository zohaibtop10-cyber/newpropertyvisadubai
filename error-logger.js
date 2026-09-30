const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
app.post('/log', (req, res) => {
  console.log('\n--- ERROR RECEIVED FROM BROWSER ---');
  console.log(req.body);
  console.log('-----------------------------------\n');
  res.send('ok');
});
app.listen(3001, () => console.log('Error logger listening on 3001'));
