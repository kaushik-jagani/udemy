const express = require('express');
const app = express();
app.use(express.static(`${__dirname}/public/overview.html`));

app.listen(2411, () => {
    console.log(`app is running ${2411}`);
  });