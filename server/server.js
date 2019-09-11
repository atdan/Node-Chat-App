const path = require('path');//built in
const express = require(`express`);

const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;

var app = express();

app.use(express.static(publicPath));


app.listen(port, () => {
    console.log(`server started on port ${port}`)
});
