const NotificationService = require("../../../src/service/NotificationService");
const Notification = require("../../../src/models/Notification");
jest.mock("../../../src/models/Notification");

describe("NotificationService", () => {
  let service;

  beforeEach(() => {
    service = new NotificationService();
    jest.clearAllMocks();
  });

  // 🟢 Criar notificação
  it("deve criar uma notificação com sucesso", async () => {
    const mockData = { userId: "123", title: "Aviso", message: "Nova mensagem" };
    const mockCreated = { ...mockData, _id: "abc123" };

    Notification.create.mockResolvedValue(mockCreated);

    const result = await service.createNotification(mockData);

    expect(Notification.create).toHaveBeenCalledWith(mockData);
    expect(result).toEqual(mockCreated);
  });

  // 🟠 Marcar notificação como lida
  it("deve marcar uma notificação como lida", async () => {
    const mockId = "abc123";
    const mockUpdated = { _id: mockId, read: true };

    Notification.findByIdAndUpdate.mockResolvedValue(mockUpdated);

    const result = await service.markAsRead(mockId);

    expect(Notification.findByIdAndUpdate).toHaveBeenCalledWith(
      mockId,
      { read: true },
      { new: true }
    );
    expect(result).toEqual(mockUpdated);
  });

  it("deve lançar erro ao tentar marcar notificação inexistente como lida", async () => {
    Notification.findByIdAndUpdate.mockResolvedValue(null);

    await expect(service.markAsRead("naoExiste")).rejects.toThrow("Notificação não encontrada.");
  });

  // 🔴 Remover notificação (soft delete)
  it("deve remover uma notificação (soft delete)", async () => {
    const mockId = "abc123";
    const mockDeleted = { _id: mockId, deleted: true };

    Notification.findByIdAndUpdate.mockResolvedValue(mockDeleted);

    const result = await service.removeNotification(mockId);

    expect(Notification.findByIdAndUpdate).toHaveBeenCalledWith(
      mockId,
      { deleted: true },
      { new: true }
    );
    expect(result).toEqual({ message: "Notificação removida com sucesso." });
  });

  it("deve lançar erro ao tentar remover notificação inexistente", async () => {
    Notification.findByIdAndUpdate.mockResolvedValue(null);

    await expect(service.removeNotification("naoExiste")).rejects.toThrow("Notificação não encontrada.");
  });
});
