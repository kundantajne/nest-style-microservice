const express = require('express');
const userRoutes = require('./modules/user/user.routes');
const dbConnect = require('./config/db');
const initDatabase = require('./config/db-init');

const app = express();
app.use(express.json());
app.use('/users', userRoutes);

const PORT = process.env.PORT || 3000;
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function startApp() {
  try {
    console.log("⏳ Waiting 15s for DB to be ready...");
    await wait(15000); // wait 15 seconds
    await initDatabase();
    await dbConnect();
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (err) {
    console.error("❌ Startup failed:", err.message);
    process.exit(1);
  }
}

startApp();
