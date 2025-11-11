const mongoose = require("mongoose");

class Database {
  constructor() {
    this.connect();
  }

  async connect() {
    try {
      const mongoUri =
        process.env.MONGO_URI || "mongodb://127.0.0.1:27017/notifications_db";

      await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
      });

      console.log("Conectado ao MongoDB:", mongoUri);
    } catch (error) {
      console.error("Erro ao conectar ao MongoDB:", error.message);
      process.exit(1);
    }
  }

  async close() {
    await mongoose.connection.close();
    console.log("🔌 Conexão com MongoDB encerrada");
  }
}

module.exports = new Database();
