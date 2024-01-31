const express = require("express");
const bodyParser = require("body-parser");
const api = require("./apis");

const PORT = 3000;

const app = express();

app.use(bodyParser.json());
app.use(api);

app.listen(PORT, () => {
    console.log(`-----Server is running on port ${PORT}-----`);
});
