import {
  paginateV1Results,
  paginateV2Results,
  paginateV1CompanyActivity,
} from "./pagination";

const mockGet = jest.fn();
const mockClient = { get: mockGet } as any;

beforeEach(() => {
  mockGet.mockReset();
});




describe("paginateV1Results", () => {
  const endpoint = "/platform/api/employees";

  it("returns a single page when fetchAll is false", async () => {
    const page = [
      { id: "emp_123", displayName: "John Doe", role: "engineer" },
    ];
    mockGet.mockResolvedValueOnce({ data: page });

    const result = await paginateV1Results(mockClient, endpoint, false, {
      limit: 10,
      offset: 5,
    });

    expect(mockGet).toHaveBeenCalledTimes(1);
    expect(mockGet).toHaveBeenCalledWith(endpoint, {
      params: { limit: 10, offset: 5 },
    });
    expect(result).toEqual({ data: page });
  });

  it("aggregates two full pages and a partial page when fetchAll is true", async () => {
    const page1 = Array.from({ length: 100 }, (_, i) => ({
      id: `emp_${i}`,
      displayName: `Employee ${i}`,
      role: "engineer",
    }));
    const page2 = Array.from({ length: 100 }, (_, i) => ({
      id: `emp_${100 + i}`,
      displayName: `Employee ${100 + i}`,
      role: "designer",
    }));
    const page3 = [
      { id: "emp_200", displayName: "Last Employee", role: "manager" },
    ];

    mockGet
      .mockResolvedValueOnce({ data: page1 })
      .mockResolvedValueOnce({ data: page2 })
      .mockResolvedValueOnce({ data: page3 });

    const result = await paginateV1Results(mockClient, endpoint, true);

    expect(mockGet).toHaveBeenCalledTimes(3);
    expect((result.data as unknown[]).length).toBe(201);
  });

  it("returns empty array when first page is empty", async () => {
    mockGet.mockResolvedValueOnce({ data: [] });

    const result = await paginateV1Results(mockClient, endpoint, true);

    expect(mockGet).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ data: [] });
  });

  it("returns empty array when response is not an array", async () => {
    mockGet.mockResolvedValueOnce({ data: { message: "not an array" } });

    const result = await paginateV1Results(mockClient, endpoint, true);

    expect(mockGet).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ data: [] });
  });

  it("uses DEFAULT_V1_LIMIT of 100 when no limit is provided", async () => {
    mockGet.mockResolvedValueOnce({ data: [] });

    await paginateV1Results(mockClient, endpoint, true);

    expect(mockGet).toHaveBeenCalledWith(endpoint, {
      params: { limit: 100, offset: 0 },
    });
  });

  it("uses user-supplied limit and strips offset when fetchAll is true", async () => {
    mockGet.mockResolvedValueOnce({ data: [] });

    await paginateV1Results(mockClient, endpoint, true, {
      limit: 25,
      offset: 999,
    });

    expect(mockGet).toHaveBeenCalledWith(endpoint, {
      params: { limit: 25, offset: 0 },
    });
  });

  it("preserves extra params across paginated requests", async () => {
    const page1 = Array.from({ length: 100 }, (_, i) => ({ id: `emp_${i}` }));
    const page2 = [{ id: "emp_100" }];

    mockGet
      .mockResolvedValueOnce({ data: page1 })
      .mockResolvedValueOnce({ data: page2 });

    await paginateV1Results(mockClient, endpoint, true, {
      department: "engineering",
      status: "active",
    });

    expect(mockGet).toHaveBeenCalledWith(endpoint, {
      params: {
        department: "engineering",
        status: "active",
        limit: 100,
        offset: 0,
      },
    });
    expect(mockGet).toHaveBeenCalledWith(endpoint, {
      params: {
        department: "engineering",
        status: "active",
        limit: 100,
        offset: 100,
      },
    });
  });

  it("stops after MAX_PAGES (100) to prevent infinite loops", async () => {
    const fullPage = Array.from({ length: 100 }, (_, i) => ({
      id: `emp_${i}`,
    }));
    mockGet.mockResolvedValue({ data: fullPage });

    const result = await paginateV1Results(mockClient, endpoint, true);

    expect(mockGet).toHaveBeenCalledTimes(100);
    expect((result.data as unknown[]).length).toBe(10_000);
  });
});




describe("paginateV2Results", () => {
  const endpoint = "/platform/api/v2/workers";

  it("returns a single page when fetchAll is false", async () => {
    const responseBody = {
      data: [{ id: "w_1", name: "Jane" }],
      next_link: "https://api.rippling.com/v2/workers?cursor=abc",
    };
    mockGet.mockResolvedValueOnce({ data: responseBody });

    const result = await paginateV2Results(mockClient, endpoint, false, {
      order_by: "name",
    });

    expect(mockGet).toHaveBeenCalledTimes(1);
    expect(mockGet).toHaveBeenCalledWith(endpoint, {
      params: { order_by: "name" },
    });
    expect(result).toEqual({ data: responseBody });
  });

  it("aggregates two pages following next_link cursors", async () => {
    const page1 = {
      data: [
        { id: "w_1", name: "Jane" },
        { id: "w_2", name: "Bob" },
      ],
      next_link: "https://api.rippling.com/v2/workers?cursor=page2&order_by=id",
    };
    const page2 = {
      data: [{ id: "w_3", name: "Alice" }],
      next_link: null,
    };

    mockGet
      .mockResolvedValueOnce({ data: page1 })
      .mockResolvedValueOnce({ data: page2 });

    const result = await paginateV2Results(mockClient, endpoint, true);

    expect(mockGet).toHaveBeenCalledTimes(2);
    
    expect(mockGet).toHaveBeenLastCalledWith(endpoint, {
      params: { cursor: "page2" },
    });
    expect(result).toEqual({
      data: {
        data: [
          { id: "w_1", name: "Jane" },
          { id: "w_2", name: "Bob" },
          { id: "w_3", name: "Alice" },
        ],
        next_link: null,
      },
    });
  });

  it("stops when next_link is null", async () => {
    const page = {
      data: [{ id: "w_1", name: "Jane" }],
      next_link: null,
    };
    mockGet.mockResolvedValueOnce({ data: page });

    const result = await paginateV2Results(mockClient, endpoint, true);

    expect(mockGet).toHaveBeenCalledTimes(1);
    expect(result).toEqual({
      data: { data: [{ id: "w_1", name: "Jane" }], next_link: null },
    });
  });

  it("stops when next_link URL has no cursor param", async () => {
    const page = {
      data: [{ id: "w_1", name: "Jane" }],
      next_link: "https://api.rippling.com/v2/workers?order_by=id",
    };
    mockGet.mockResolvedValueOnce({ data: page });

    const result = await paginateV2Results(mockClient, endpoint, true);

    expect(mockGet).toHaveBeenCalledTimes(1);
    expect(result).toEqual({
      data: { data: [{ id: "w_1", name: "Jane" }], next_link: null },
    });
  });

  it("strips user-supplied cursor when fetchAll is true", async () => {
    const page = {
      data: [{ id: "w_1", name: "Jane" }],
      next_link: null,
    };
    mockGet.mockResolvedValueOnce({ data: page });

    await paginateV2Results(mockClient, endpoint, true, {
      cursor: "should_be_stripped",
      order_by: "name",
    });

    expect(mockGet).toHaveBeenCalledWith(endpoint, {
      params: { order_by: "name" },
    });
  });

  it("returns wrapped shape { data: { data: [...], next_link: null } }", async () => {
    const page = {
      data: [{ id: "w_1", name: "Jane" }],
      next_link: null,
    };
    mockGet.mockResolvedValueOnce({ data: page });

    const result = await paginateV2Results(mockClient, endpoint, true);

    expect(result).toEqual({
      data: { data: [{ id: "w_1", name: "Jane" }], next_link: null },
    });
  });

  it("stops after MAX_PAGES (100) to prevent infinite loops", async () => {
    const fullPage = {
      data: [{ id: "w_1", name: "Jane" }],
      next_link: "https://api.rippling.com/v2/workers?cursor=next",
    };
    mockGet.mockResolvedValue({ data: fullPage });

    const result = await paginateV2Results(mockClient, endpoint, true);

    expect(mockGet).toHaveBeenCalledTimes(100);
    expect(((result.data as any).data as unknown[]).length).toBe(100);
  });
});




describe("paginateV1CompanyActivity", () => {
  const endpoint = "/platform/api/company_activity";

  it("returns a single page when fetchAll is false", async () => {
    const responseBody = {
      results: [
        { action: "created", entity: "employee", timestamp: "2024-01-15" },
      ],
      next: "cursor_abc",
    };
    mockGet.mockResolvedValueOnce({ data: responseBody });

    const result = await paginateV1CompanyActivity(
      mockClient,
      endpoint,
      false,
      { limit: "50" },
    );

    expect(mockGet).toHaveBeenCalledTimes(1);
    expect(mockGet).toHaveBeenCalledWith(endpoint, {
      params: { limit: "50" },
    });
    expect(result).toEqual({ data: responseBody });
  });

  it("aggregates two pages following next cursors", async () => {
    const page1 = {
      results: [
        { action: "created", entity: "employee", timestamp: "2024-01-15" },
        { action: "updated", entity: "department", timestamp: "2024-01-16" },
      ],
      next: "cursor_page2",
    };
    const page2 = {
      results: [
        { action: "deleted", entity: "role", timestamp: "2024-01-17" },
      ],
      next: undefined,
    };

    mockGet
      .mockResolvedValueOnce({ data: page1 })
      .mockResolvedValueOnce({ data: page2 });

    const result = await paginateV1CompanyActivity(
      mockClient,
      endpoint,
      true,
    );

    expect(mockGet).toHaveBeenCalledTimes(2);
    expect(mockGet).toHaveBeenLastCalledWith(endpoint, {
      params: { next: "cursor_page2" },
    });
    expect(result).toEqual({
      data: {
        results: [
          { action: "created", entity: "employee", timestamp: "2024-01-15" },
          { action: "updated", entity: "department", timestamp: "2024-01-16" },
          { action: "deleted", entity: "role", timestamp: "2024-01-17" },
        ],
        next: null,
      },
    });
  });

  it("stops when next is absent", async () => {
    const page = {
      results: [
        { action: "created", entity: "employee", timestamp: "2024-01-15" },
      ],
    };
    mockGet.mockResolvedValueOnce({ data: page });

    const result = await paginateV1CompanyActivity(
      mockClient,
      endpoint,
      true,
    );

    expect(mockGet).toHaveBeenCalledTimes(1);
    expect(result).toEqual({
      data: {
        results: [
          { action: "created", entity: "employee", timestamp: "2024-01-15" },
        ],
        next: null,
      },
    });
  });

  it("strips user-supplied next when fetchAll is true", async () => {
    const page = {
      results: [
        { action: "created", entity: "employee", timestamp: "2024-01-15" },
      ],
    };
    mockGet.mockResolvedValueOnce({ data: page });

    await paginateV1CompanyActivity(mockClient, endpoint, true, {
      next: "should_be_stripped",
      limit: "25",
    });

    
    expect(mockGet).toHaveBeenCalledWith(endpoint, {
      params: { limit: "25" },
    });
  });

  it("returns wrapped shape { results: [...], next: null }", async () => {
    const page = {
      results: [
        { action: "created", entity: "employee", timestamp: "2024-01-15" },
      ],
    };
    mockGet.mockResolvedValueOnce({ data: page });

    const result = await paginateV1CompanyActivity(
      mockClient,
      endpoint,
      true,
    );

    expect(result).toEqual({
      data: {
        results: [
          { action: "created", entity: "employee", timestamp: "2024-01-15" },
        ],
        next: null,
      },
    });
  });

  it("stops after MAX_PAGES (100) to prevent infinite loops", async () => {
    const fullPage = {
      results: [
        { action: "created", entity: "employee", timestamp: "2024-01-15" },
      ],
      next: "always_more",
    };
    mockGet.mockResolvedValue({ data: fullPage });

    const result = await paginateV1CompanyActivity(
      mockClient,
      endpoint,
      true,
    );

    expect(mockGet).toHaveBeenCalledTimes(100);
    expect(((result.data as any).results as unknown[]).length).toBe(100);
  });
});
