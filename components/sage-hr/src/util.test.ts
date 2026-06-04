import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { fetchAllRecords } from "./util";

const createMockClient = (getMock: jest.Mock): Pick<HttpClient, "get"> => ({
  get: getMock,
});

describe("fetchAllRecords", () => {
  let getMock: jest.Mock;

  beforeEach(() => {
    getMock = jest.fn();
  });

  it("single page: returns records when meta.next_page is null", async () => {
    const records = [
      { id: 1, name: "John" },
      { id: 2, name: "Jane" },
    ];
    getMock.mockResolvedValueOnce({
      data: {
        data: records,
        meta: { current_page: 1, next_page: null, total_pages: 1 },
      },
    });

    const client = createMockClient(getMock) as unknown as ReturnType<any>;
    const result = await fetchAllRecords(client, "/employees");

    expect(getMock).toHaveBeenCalledTimes(1);
    expect(getMock).toHaveBeenCalledWith("/employees", { params: { page: 1 } });
    expect(result).toEqual(records);
  });

  it("multi-page: follows meta.next_page until null", async () => {
    getMock
      .mockResolvedValueOnce({
        data: {
          data: [{ id: 1 }],
          meta: { current_page: 1, next_page: 2, total_pages: 3 },
        },
      })
      .mockResolvedValueOnce({
        data: {
          data: [{ id: 2 }],
          meta: { current_page: 2, next_page: 3, total_pages: 3 },
        },
      })
      .mockResolvedValueOnce({
        data: {
          data: [{ id: 3 }],
          meta: { current_page: 3, next_page: null, total_pages: 3 },
        },
      });

    const client = createMockClient(getMock) as unknown as ReturnType<any>;
    const result = await fetchAllRecords(client, "/positions");

    expect(getMock).toHaveBeenCalledTimes(3);
    expect(result).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }]);

    
    expect(getMock.mock.calls[0][1].params.page).toBe(1);
    expect(getMock.mock.calls[1][1].params.page).toBe(2);
    expect(getMock.mock.calls[2][1].params.page).toBe(3);
  });

  it("empty data: returns empty array", async () => {
    getMock.mockResolvedValueOnce({
      data: {
        data: [],
        meta: { current_page: 1, next_page: null, total_pages: 1 },
      },
    });

    const client = createMockClient(getMock) as unknown as ReturnType<any>;
    const result = await fetchAllRecords(client, "/teams");

    expect(getMock).toHaveBeenCalledTimes(1);
    expect(result).toEqual([]);
  });

  it("passes extra params through to each request", async () => {
    getMock.mockResolvedValueOnce({
      data: {
        data: [{ id: 1 }],
        meta: { current_page: 1, next_page: null },
      },
    });

    const client = createMockClient(getMock) as unknown as ReturnType<any>;
    await fetchAllRecords(client, "/employees", { status: "active" });

    expect(getMock.mock.calls[0][1].params).toEqual({
      status: "active",
      page: 1,
    });
  });
});
