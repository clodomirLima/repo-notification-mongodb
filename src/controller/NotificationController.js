const NotificationService = require("../service/NotificationService");

class NotificationController {
  constructor() {
    this.notificationService = new NotificationService();
  }

  async create(req, res) {
    try {
      const result = await this.notificationService.createNotification(req.body);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async listByUser(req, res) {
    try {
      const { userId } = req.params;
      const { page = 1, limit = 10 } = req.query;
      const result = await this.notificationService.listNotificationsByUser(userId, page, limit);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async markAsRead(req, res) {
    try {
      const { id } = req.params;
      const result = await this.notificationService.markAsRead(id);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }

  async remove(req, res) {
    try {
      const { id } = req.params;
      const result = await this.notificationService.removeNotification(id);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }
}

module.exports = new NotificationController();
