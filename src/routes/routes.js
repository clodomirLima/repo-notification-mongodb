const express = require("express");
const router = express.Router();
const NotificationController = require("../controller/NotificationController");

// Criar notificação
router.post("/", (req, res) => NotificationController.create(req, res));

// Listar notificações de um usuário (paginadas)
router.get("/user/:userId", (req, res) => NotificationController.listByUser(req, res));

// Marcar notificação como lida
router.patch("/:id/read", (req, res) => NotificationController.markAsRead(req, res));

// Remover notificação (soft delete)
router.delete("/:id", (req, res) => NotificationController.remove(req, res));

module.exports = router;
