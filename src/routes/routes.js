const express = require("express");
const router = express.Router();
const NotificationController = require("../controller/NotificationController");
const notificationController = new NotificationController();
// Criar notificação
router.post("/", (req, res) => notificationController.create(req, res));

// Listar notificações de um usuário (paginadas)
router.get("/user/:userId", (req, res) => notificationController.listByUser(req, res));

// Marcar notificação como lida
router.patch("/:id/read", (req, res) => notificationController.markAsRead(req, res));

// Remover notificação (soft delete)
router.delete("/:id", (req, res) => notificationController.remove(req, res));

module.exports = router;
