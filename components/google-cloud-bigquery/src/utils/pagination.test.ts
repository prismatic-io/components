import { paginateResults } from "./pagination";

const makeDataset = (id: string) => ({
  datasetReference: { datasetId: id, projectId: "my-project" },
});

const makeTable = (id: string) => ({
  tableReference: { tableId: id, datasetId: "ds1", projectId: "my-project" },
});

const makeJob = (id: string) => ({
  jobReference: { jobId: id, projectId: "my-project" },
  status: { state: "DONE" },
});

describe("paginateResults", () => {
  describe("fetchAll=false", () => {
    it("makes a single call, passes params through, and returns the full response", async () => {
      const responseData = {
        datasets: [makeDataset("ds1"), makeDataset("ds2")],
        nextPageToken: "token-abc",
      };
      const listFn = jest.fn().mockResolvedValue({ data: responseData });

      const params = { projectId: "my-project", maxResults: 10, pageToken: "user-token" };
      const result = await paginateResults(listFn, params, false, "datasets");

      expect(listFn).toHaveBeenCalledTimes(1);
      expect(listFn).toHaveBeenCalledWith(params);
      expect(result).toEqual({ data: responseData });
    });
  });

  describe("fetchAll=true", () => {
    it("returns items from a single page when no nextPageToken is present", async () => {
      const listFn = jest.fn().mockResolvedValue({
        data: { datasets: [makeDataset("ds1"), makeDataset("ds2")] },
      });

      const result = await paginateResults(listFn, { projectId: "my-project" }, true, "datasets");

      expect(listFn).toHaveBeenCalledTimes(1);
      expect(result).toEqual({
        data: { datasets: [makeDataset("ds1"), makeDataset("ds2")] },
      });
    });

    it("aggregates results across 2 pages using nextPageToken", async () => {
      const listFn = jest
        .fn()
        .mockResolvedValueOnce({
          data: { datasets: [makeDataset("ds1")], nextPageToken: "page2" },
        })
        .mockResolvedValueOnce({
          data: { datasets: [makeDataset("ds2")] },
        });

      const result = await paginateResults(listFn, { projectId: "my-project" }, true, "datasets");

      expect(listFn).toHaveBeenCalledTimes(2);
      expect(result).toEqual({
        data: { datasets: [makeDataset("ds1"), makeDataset("ds2")] },
      });
    });

    it("aggregates results across 3 pages when last page has empty array", async () => {
      const listFn = jest
        .fn()
        .mockResolvedValueOnce({
          data: { datasets: [makeDataset("ds1")], nextPageToken: "page2" },
        })
        .mockResolvedValueOnce({
          data: { datasets: [makeDataset("ds2")], nextPageToken: "page3" },
        })
        .mockResolvedValueOnce({
          data: { datasets: [] },
        });

      const result = await paginateResults(listFn, { projectId: "my-project" }, true, "datasets");

      expect(listFn).toHaveBeenCalledTimes(3);
      expect(result).toEqual({
        data: { datasets: [makeDataset("ds1"), makeDataset("ds2")] },
      });
    });

    it("returns empty array when first page has no dataField key", async () => {
      const listFn = jest.fn().mockResolvedValue({ data: {} });

      const result = await paginateResults(listFn, { projectId: "my-project" }, true, "datasets");

      expect(listFn).toHaveBeenCalledTimes(1);
      expect(result).toEqual({ data: { datasets: [] } });
    });

    it("passes nextPageToken as pageToken param in subsequent requests", async () => {
      const listFn = jest
        .fn()
        .mockResolvedValueOnce({
          data: { datasets: [makeDataset("ds1")], nextPageToken: "token-abc" },
        })
        .mockResolvedValueOnce({
          data: { datasets: [makeDataset("ds2")] },
        });

      await paginateResults(listFn, { projectId: "my-project", maxResults: 5 }, true, "datasets");

      expect(listFn).toHaveBeenNthCalledWith(1, { projectId: "my-project", maxResults: 5 });
      expect(listFn).toHaveBeenNthCalledWith(2, {
        projectId: "my-project",
        maxResults: 5,
        pageToken: "token-abc",
      });
    });

    it("uses pageToken from response as fallback when nextPageToken is absent", async () => {
      const listFn = jest
        .fn()
        .mockResolvedValueOnce({
          data: { datasets: [makeDataset("ds1")], pageToken: "fallback-token" },
        })
        .mockResolvedValueOnce({
          data: { datasets: [makeDataset("ds2")] },
        });

      const result = await paginateResults(listFn, { projectId: "my-project" }, true, "datasets");

      expect(listFn).toHaveBeenCalledTimes(2);
      expect(listFn).toHaveBeenNthCalledWith(2, {
        projectId: "my-project",
        pageToken: "fallback-token",
      });
      expect(result).toEqual({
        data: { datasets: [makeDataset("ds1"), makeDataset("ds2")] },
      });
    });

    it("returns empty array when response is missing the dataField key entirely", async () => {
      const listFn = jest.fn().mockResolvedValue({ data: { totalItems: 0 } });

      const result = await paginateResults(listFn, { projectId: "my-project" }, true, "tables");

      expect(result).toEqual({ data: { tables: [] } });
    });

    it("strips user-supplied pageToken when fetchAll=true", async () => {
      const listFn = jest.fn().mockResolvedValue({
        data: { datasets: [makeDataset("ds1")] },
      });

      await paginateResults(
        listFn,
        { projectId: "my-project", pageToken: "user-supplied-token" },
        true,
        "datasets",
      );

      expect(listFn).toHaveBeenCalledTimes(1);
      expect(listFn).toHaveBeenCalledWith({ projectId: "my-project" });
    });

    it.each([
      { dataField: "datasets", maker: makeDataset, id: "ds1" },
      { dataField: "tables", maker: makeTable, id: "tbl1" },
      { dataField: "jobs", maker: makeJob, id: "job1" },
    ])("works with dataField=$dataField", async ({ dataField, maker, id }) => {
      const listFn = jest.fn().mockResolvedValue({
        data: { [dataField]: [maker(id)] },
      });

      const result = await paginateResults(listFn, { projectId: "my-project" }, true, dataField);

      expect(result).toEqual({ data: { [dataField]: [maker(id)] } });
    });

    it("preserves other params like projectId and maxResults across pages", async () => {
      const listFn = jest
        .fn()
        .mockResolvedValueOnce({
          data: { datasets: [makeDataset("ds1")], nextPageToken: "p2" },
        })
        .mockResolvedValueOnce({
          data: { datasets: [makeDataset("ds2")] },
        });

      await paginateResults(
        listFn,
        { projectId: "my-project", maxResults: 50, filter: "labels.env:prod" },
        true,
        "datasets",
      );

      const expectedBase = { projectId: "my-project", maxResults: 50, filter: "labels.env:prod" };
      expect(listFn).toHaveBeenNthCalledWith(1, expectedBase);
      expect(listFn).toHaveBeenNthCalledWith(2, { ...expectedBase, pageToken: "p2" });
    });

    it("stops after MAX_PAGES (100) calls to prevent infinite loops", async () => {
      const listFn = jest.fn().mockImplementation(() =>
        Promise.resolve({
          data: { datasets: [makeDataset("ds-x")], nextPageToken: "always-more" },
        }),
      );

      const result = await paginateResults(listFn, { projectId: "my-project" }, true, "datasets");

      expect(listFn).toHaveBeenCalledTimes(100);
      expect((result.data as any).datasets).toHaveLength(100);
    });
  });
});
