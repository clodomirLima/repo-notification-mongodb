const NotificationControllerClass = require("../../../src/controller/NotificationController");
const NotificationService = require("../../../src/service/NotificationService");

jest.mock("../../../src/service/NotificationService");

describe("NotificationController", () => {
  let mockReq, mockRes, NotificationController;

  beforeEach(() => {
    mockReq = { body: {}, params: {}, query: {} };
    mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    NotificationService.mockClear();
  });

  it("deve criar uma notificação e retornar 201", async () => {
    const mockServiceInstance = {
      createNotification: jest.fn().mockResolvedValue({ _id: "1", title: "Nova" }),
    };
    NotificationService.mockImplementation(() => mockServiceInstance);

    NotificationController = new NotificationControllerClass();
    mockReq.body = { title: "Nova", userId: "123", message: "Olá" };

    await NotificationController.create(mockReq, mockRes);

    expect(mockServiceInstance.createNotification).toHaveBeenCalledWith(mockReq.body);
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith({ _id: "1", title: "Nova" });
  });

  // ...demais testes iguais
});
