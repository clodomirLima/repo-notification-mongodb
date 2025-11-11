require("dotenv").config();
const express = require("express");
const notificationRoutes = require("./src/routes/routes");
require("./src/database/conectDB");

const app = express();

app.use(express.json());

app.use("/api/notifications", notificationRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
