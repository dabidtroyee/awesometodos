const dns = require('node:dns');
// Force Node to use Google and Cloudflare DNS to find MongoDB
dns.setServers(['8.8.8.8', '1.1.1.1']);

require("dotenv").config();
const express = require("express");
const { connectToMongoDB } = require("./database");
const path = require('path');
const app = express();

// 1. Middlewares
app.use(express.json()); // Mahalaga ito para mabasa ang JSON data mula sa frontend

// 2. API Routes (DAPAT NAUNA ITO)
const router = require("./routes");
app.use("/api", router);

// 3. Static Files (Frontend)
const buildPath = path.join(__dirname, '..', 'client', 'vite-project', 'dist');
app.use(express.static(buildPath));

// 4. Wildcard Route (DAPAT ITO ANG PINAKAHULI)
// Ito ang sasagot sa lahat ng request na hindi dumaan sa /api
app.get('*path', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

const port = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectToMongoDB();
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        });
    } catch (err) {
        console.error("Failed to connect to MongoDB", err);
    }
};
startServer();