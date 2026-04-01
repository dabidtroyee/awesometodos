const dns = require('node:dns');
// Force Node to use Google and Cloudflare DNS to find MongoDB
dns.setServers(['8.8.8.8', '1.1.1.1']);

require("dotenv").config();
const express = require("express");
const { connectToMongoDB } = require("./database");
const path = require('path');

// Siguraduhin na ang path ay tumuturo sa 'dist' folder sa loob ng vite-project
app.use(express.static(path.join(__dirname, '../client/vite-project/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/vite-project/dist/index.html'));
});

const app = express();
app.use(express.json());

app.use(express.static(path.join(__dirname, 'build')));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'build/index.html'));
});

const router = require("./routes");
app.use("/api", router);

const port = process.env.PORT || 5000;

const startServer = async () => {
    await connectToMongoDB();
    app.listen(port, () => {
        console.log(`Server is listening on http://localhost:${port}`);
    });
};
startServer();