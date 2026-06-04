import { paginateFetchXml, paginateListEntities, paginateQueryEntities } from "./pagination";

const contact1 = { fullname: "Yvonne McKay", contactid: "49b0be2e-d01c-ed11" };
const contact2 = { fullname: "Susanna Stubberod", contactid: "4bb0be2e-d01c-ed11" };
const contact3 = { fullname: "Nancy Anderson", contactid: "4db0be2e-d01c-ed11" };
const contact4 = { fullname: "Maria Campbell", contactid: "4fb0be2e-d01c-ed11" };

describe("paginateQueryEntities", () => {
  it("returns initial result as-is when fetchAll is false", async () => {
    const response = { value: [contact1, contact2] };
    const retrieveFn = jest.fn().mockResolvedValue(response);

    const result = await paginateQueryEntities(retrieveFn, false);

    expect(result).toEqual({ data: response });
    expect(retrieveFn).toHaveBeenCalledTimes(1);
  });

  it("aggregates values across 2 pages via oDataNextLink", async () => {
    const page1 = {
      value: [contact1, contact2],
      oDataNextLink: "https://org.crm.dynamics.com/api/data/v9.2/contacts?$skiptoken=2",
    };
    const page2 = { value: [contact3, contact4] };
    const retrieveFn = jest.fn().mockResolvedValueOnce(page1).mockResolvedValueOnce(page2);

    const result = await paginateQueryEntities(retrieveFn, true);

    expect(result).toEqual({ data: { value: [contact1, contact2, contact3, contact4] } });
    expect(retrieveFn).toHaveBeenCalledTimes(2);
  });

  it("aggregates values across 2 pages via @odata.nextLink", async () => {
    const page1 = {
      value: [contact1],
      "@odata.nextLink": "https://org.crm.dynamics.com/api/data/v9.2/contacts?$skiptoken=1",
    };
    const page2 = { value: [contact2] };
    const retrieveFn = jest.fn().mockResolvedValueOnce(page1).mockResolvedValueOnce(page2);

    const result = await paginateQueryEntities(retrieveFn, true);

    expect(result).toEqual({ data: { value: [contact1, contact2] } });
    expect(retrieveFn).toHaveBeenCalledTimes(2);
  });

  it("stops when no nextLink is present", async () => {
    const page1 = { value: [contact1] };
    const retrieveFn = jest.fn().mockResolvedValue(page1);

    const result = await paginateQueryEntities(retrieveFn, true);

    expect(result).toEqual({ data: { value: [contact1] } });
    expect(retrieveFn).toHaveBeenCalledTimes(1);
  });

  it("passes nextLink URL as-is to retrieveFn", async () => {
    const nextUrl = "https://org.crm.dynamics.com/api/data/v9.2/contacts?$skiptoken=2";
    const page1 = { value: [contact1], oDataNextLink: nextUrl };
    const page2 = { value: [contact2] };
    const retrieveFn = jest.fn().mockResolvedValueOnce(page1).mockResolvedValueOnce(page2);

    await paginateQueryEntities(retrieveFn, true);

    expect(retrieveFn).toHaveBeenNthCalledWith(1, undefined);
    expect(retrieveFn).toHaveBeenNthCalledWith(2, nextUrl);
  });

  it("stops after MAX_PAGES (100) iterations", async () => {
    const makePage = () => ({
      value: [contact1],
      oDataNextLink: "https://org.crm.dynamics.com/api/data/v9.2/contacts?$skiptoken=next",
    });
    const retrieveFn = jest.fn().mockImplementation(() => Promise.resolve(makePage()));

    const result = await paginateQueryEntities(retrieveFn, true);

    
    expect(retrieveFn).toHaveBeenCalledTimes(101);
    expect((result.data as { value: unknown[] }).value).toHaveLength(100);
  });
});

describe("paginateFetchXml", () => {
  it("returns initial result as-is when fetchAll is false", async () => {
    const response = { value: [contact1] };
    const executeFn = jest.fn().mockResolvedValue(response);

    const result = await paginateFetchXml(executeFn, false);

    expect(result).toEqual({ data: response });
    expect(executeFn).toHaveBeenCalledTimes(1);
  });

  it("aggregates values across 2 pages with cookie", async () => {
    const page1 = {
      value: [contact1, contact2],
      PagingInfo: { cookie: "pagingcookie=%3Ccookie%20page%3D%221%22%3E", nextPage: true },
    };
    const page2 = {
      value: [contact3, contact4],
      PagingInfo: { cookie: undefined, nextPage: false },
    };
    const executeFn = jest.fn().mockResolvedValueOnce(page1).mockResolvedValueOnce(page2);

    const result = await paginateFetchXml(executeFn, true);

    expect(result).toEqual({ data: { value: [contact1, contact2, contact3, contact4] } });
    expect(executeFn).toHaveBeenCalledTimes(2);
  });

  it("stops when PagingInfo.nextPage is false", async () => {
    const page1 = {
      value: [contact1],
      PagingInfo: { cookie: "somecookie", nextPage: false },
    };
    const executeFn = jest.fn().mockResolvedValue(page1);

    const result = await paginateFetchXml(executeFn, true);

    expect(result).toEqual({ data: { value: [contact1] } });
    expect(executeFn).toHaveBeenCalledTimes(1);
  });

  it("stops when cookie is missing even if nextPage is true", async () => {
    const page1 = {
      value: [contact1],
      PagingInfo: { cookie: undefined, nextPage: true },
    };
    const executeFn = jest.fn().mockResolvedValue(page1);

    const result = await paginateFetchXml(executeFn, true);

    expect(result).toEqual({ data: { value: [contact1] } });
    expect(executeFn).toHaveBeenCalledTimes(1);
  });

  it("increments page number on each iteration", async () => {
    const cookie1 = "pagingcookie=%3Ccookie%20page%3D%221%22%3E";
    const cookie2 = "pagingcookie=%3Ccookie%20page%3D%222%22%3E";
    const page1 = { value: [contact1], PagingInfo: { cookie: cookie1, nextPage: true } };
    const page2 = { value: [contact2], PagingInfo: { cookie: cookie2, nextPage: true } };
    const page3 = { value: [contact3], PagingInfo: { nextPage: false } };
    const executeFn = jest
      .fn()
      .mockResolvedValueOnce(page1)
      .mockResolvedValueOnce(page2)
      .mockResolvedValueOnce(page3);

    await paginateFetchXml(executeFn, true, 1, undefined);

    expect(executeFn).toHaveBeenNthCalledWith(1, 1, undefined);
    expect(executeFn).toHaveBeenNthCalledWith(2, 2, cookie1);
    expect(executeFn).toHaveBeenNthCalledWith(3, 3, cookie2);
  });

  it("stops after MAX_PAGES (100) iterations", async () => {
    const makePage = () => ({
      value: [contact1],
      PagingInfo: { cookie: "somecookie", nextPage: true },
    });
    const executeFn = jest.fn().mockImplementation(() => Promise.resolve(makePage()));

    const result = await paginateFetchXml(executeFn, true);

    
    expect(executeFn).toHaveBeenCalledTimes(101);
    expect((result.data as { value: unknown[] }).value).toHaveLength(100);
  });
});

describe("paginateListEntities", () => {
  it("returns first page as-is when fetchAll is false", async () => {
    const pageData = { value: [contact1, contact2] };
    const fetchPage = jest.fn().mockResolvedValue({ data: pageData });

    const result = await paginateListEntities(fetchPage, false);

    expect(result).toEqual({ data: pageData });
    expect(fetchPage).toHaveBeenCalledTimes(1);
  });

  it("aggregates values across 2 pages via @odata.nextLink", async () => {
    const nextUrl = "https://org.crm.dynamics.com/api/data/v9.2/contacts?$skiptoken=2";
    const page1Data = { value: [contact1, contact2], "@odata.nextLink": nextUrl };
    const page2Data = { value: [contact3, contact4] };
    const fetchPage = jest
      .fn()
      .mockResolvedValueOnce({ data: page1Data })
      .mockResolvedValueOnce({ data: page2Data });

    const result = await paginateListEntities(fetchPage, true);

    expect(result).toEqual({ data: { value: [contact1, contact2, contact3, contact4] } });
    expect(fetchPage).toHaveBeenCalledTimes(2);
  });

  it("stops when @odata.nextLink is absent", async () => {
    const pageData = { value: [contact1] };
    const fetchPage = jest.fn().mockResolvedValue({ data: pageData });

    const result = await paginateListEntities(fetchPage, true);

    expect(result).toEqual({ data: { value: [contact1] } });
    expect(fetchPage).toHaveBeenCalledTimes(1);
  });

  it("passes nextLink URL to fetchPage", async () => {
    const nextUrl = "https://org.crm.dynamics.com/api/data/v9.2/contacts?$skiptoken=2";
    const page1Data = { value: [contact1], "@odata.nextLink": nextUrl };
    const page2Data = { value: [contact2] };
    const fetchPage = jest
      .fn()
      .mockResolvedValueOnce({ data: page1Data })
      .mockResolvedValueOnce({ data: page2Data });

    await paginateListEntities(fetchPage, true);

    expect(fetchPage).toHaveBeenNthCalledWith(1);
    expect(fetchPage).toHaveBeenNthCalledWith(2, nextUrl);
  });

  it("stops after MAX_PAGES (100) iterations", async () => {
    const makePage = () => ({
      data: {
        value: [contact1],
        "@odata.nextLink": "https://org.crm.dynamics.com/api/data/v9.2/contacts?$skiptoken=next",
      },
    });
    const fetchPage = jest.fn().mockImplementation(() => Promise.resolve(makePage()));

    const result = await paginateListEntities(fetchPage, true);

    
    expect(fetchPage).toHaveBeenCalledTimes(101);
    expect((result.data as { value: unknown[] }).value).toHaveLength(100);
  });
});
