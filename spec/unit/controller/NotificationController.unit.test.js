const NotificationController = require("../../../src/controller/NotificationController");
const NotificationService = require("../../../src/service/NotificationService");

jest.mock("../../../src/service/NotificationService");

describe("NotificationController", () => {
  let mockReq, mockRes;

  beforeEach(() => {
    mockReq = {
      body: {},
      params: {},
      query: {},
    };

    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    NotificationService.mockClear();
  });

  // 🟢 Criar notificação
  it("deve criar uma notificação e retornar 201", async () => {
    const mockServiceInstance = {
      createNotification: jest.fn().mockResolvedValue({ _id: "1", title: "Nova" }),
    };
    NotificationService.mockImplementation(() => mockServiceInstance);

    mockReq.body = { title: "Nova", userId: "123", message: "Olá" };

    await NotificationController.create(mockReq, mockRes);

    expect(mockServiceInstance.createNotification).toHaveBeenCalledWith(mockReq.body);
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith({ _id: "1", title: "Nova" });
  });

  it("deve retornar erro 400 ao falhar criação", async () => {
    const mockServiceInstance = {
      createNotification: jest.fn().mockRejectedValue(new Error("Falha ao criar")),
    };
    NotificationService.mockImplementation(() => mockServiceInstance);

    await NotificationController.create(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({ error: "Falha ao criar" });
  });

  // 🟠 Listar notificações
  it("deve listar notificações do usuário", async () => {
    const mockResult = { data: [], total: 0 };
    const mockServiceInstance = {
      listNotificationsByUser: jest.fn().mockResolvedValue(mockResult),
    };
    NotificationService.mockImplementation(() => mockServiceInstance);

    mockReq.params.userId = "123";
    mockReq.query = { page: 1, limit: 10 };

    await NotificationController.listByUser(mockReq, mockRes);

    expect(mockServiceInstance.listNotificationsByUser).toHaveBeenCalledWith("123", 1, 10);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockResult);
  });

  // 🔵 Marcar como lida
  it("deve marcar notificação como lida", async () => {
    const mockResult = { _id: "abc", read: true };
    const mockServiceInstance = {
      markAsRead: jest.fn().mockResolvedValue(mockResult),
    };
    NotificationService.mockImplementation(() => mockServiceInstance);

    mockReq.params.id = "abc";

    await NotificationController.markAsRead(mockReq, mockRes);

    expect(mockServiceInstance.markAsRead).toHaveBeenCalledWith("abc");
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockResult);
  });

  // 🔴 Remover notificação
  it("deve remover notificação com sucesso", async () => {
    const mockResult = { message: "Notificação removida com sucesso." };
    const mockServiceInstance = {
      removeNotification: jest.fn().mockResolvedValue(mockResult),
    };
    NotificationService.mockImplementation(() => mockServiceInstance);

    mockReq.params.id = "xyz";

    await NotificationController.remove(mockReq, mockRes);

    expect(mockServiceInstance.removeNotification).toHaveBeenCalledWith("xyz");
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockResult);
  });
});
