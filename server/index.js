const dns = require('node:dns');
// Force Node to use Google and Cloudflare DNS to find MongoDB
dns.setServers(['8.8.8.8', '1.1.1.1']);

require("dotenv").config();
const express = require("express");
const { connectToMongoDB } = require("./database");
const path = require('path');

const path = require('path');

// 1. Hanapin ang tamang path papunta sa 'dist' folder
const frontendBuildPath = path.join(__dirname, '..', 'client', 'vite-project', 'dist');

// 2. I-serve ang static files
app.use(express.static(frontendBuildPath));

// 3. I-handle ang lahat ng routing sa frontend
app.get('*', (req, res) => {
    res.sendFile(path.join(frontendBuildPath, 'index.html'), (err) => {
        if (err) {
            console.error("Error sending index.html:", err);
            res.status(500).send("Frontend build not found. Check your paths.");
        }
    });
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