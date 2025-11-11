const Notification = require("../models/Notification");

class NotificationService {
  async createNotification(data) {
    return await Notification.create(data);
  }

  async listNotificationsByUser(userId, page = 1, limit = 10) {
    const query = { userId, deleted: false };
    const skip = (page - 1) * limit;
    const notifications = await Notification.find(query)
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await Notification.countDocuments(query);

    return {
      data: notifications,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    };
  }

  async markAsRead(id) {
    const notification = await Notification.findByIdAndUpdate(
      id,
      { read: true },
      { new: true }
    );
    if (!notification) throw new Error("Notificação não encontrada.");
    return notification;
  }

  async removeNotification(id) {
    const notification = await Notification.findByIdAndUpdate(
      id,
      { deleted: true },
      { new: true }
    );
    if (!notification) throw new Error("Notificação não encontrada.");
    return { message: "Notificação removida com sucesso." };
  }
}

module.exports = NotificationService;
