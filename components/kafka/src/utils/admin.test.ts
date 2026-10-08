import type { Kafka } from "kafkajs";
import { vi } from "vitest";
import { withAdmin } from "./admin";
const adminMock = {
  connect: vi.fn(),
  listTopics: vi.fn(),
  disconnect: vi.fn(),
};
const kafka = { admin: () => adminMock } as unknown as Kafka;
beforeEach(() => {
  vi.clearAllMocks();
  adminMock.connect.mockResolvedValue(undefined);
  adminMock.disconnect.mockResolvedValue(undefined);
});
describe("withAdmin", () => {
  test("connects, runs the work, disconnects, and returns the work's result", async () => {
    adminMock.listTopics.mockResolvedValue(["order-events"]);
    const result = await withAdmin(kafka, (admin) => admin.listTopics());
    expect(result).toEqual(["order-events"]);
    expect(adminMock.connect).toHaveBeenCalledTimes(1);
    expect(adminMock.disconnect).toHaveBeenCalledTimes(1);
    const [connectOrder] = adminMock.connect.mock.invocationCallOrder;
    const [disconnectOrder] = adminMock.disconnect.mock.invocationCallOrder;
    expect(connectOrder).toBeLessThan(disconnectOrder);
  });
  test("still disconnects and rethrows the original error when the work fails", async () => {
    adminMock.listTopics.mockRejectedValue(new Error("broker unreachable"));
    adminMock.disconnect.mockRejectedValue(new Error("disconnect failed"));
    await expect(
      withAdmin(kafka, (admin) => admin.listTopics()),
    ).rejects.toThrow("broker unreachable");
    expect(adminMock.disconnect).toHaveBeenCalledTimes(1);
  });
});
