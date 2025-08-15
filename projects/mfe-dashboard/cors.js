const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

app.use(express.static('dist/mfe-dashboard'));

app.listen(4201, () => {
  console.log('mfe-dashboard running on port 4201');
});
