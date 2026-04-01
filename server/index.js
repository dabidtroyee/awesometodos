const dns = require('node:dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

require("dotenv").config();
const express = require("express");
const { connectToMongoDB } = require("./database");
const path = require('path');

const app = express();
app.use(express.json());


const router = require("./routes");
app.use("/api", router);


app.use(express.static(path.join(__dirname, '../client/vite-project/dist')));


app.get('*path', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/vite-project/dist/index.html'));
});

const port = process.env.PORT || 5000;

const startServer = async () => {
    await connectToMongoDB();
    app.listen(port, () => {
        console.log(`Server is listening on http://localhost:${port}`);
    });
};
startServer();