const dns = require('node:dns');
// Force Node to use Google and Cloudflare DNS to find MongoDB
dns.setServers(['8.8.8.8', '1.1.1.1']);

require("dotenv").config();
const express = require("express");
const { connectToMongoDB } = require("./database");
const path = require('path');

// Ituro sa tamang 'dist' folder ng Vite
const buildPath = path.join(__dirname, '..', 'client', 'vite-project', 'dist');

app.use(express.static(buildPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
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