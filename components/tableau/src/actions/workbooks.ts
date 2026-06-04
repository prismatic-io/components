import { action, util } from "@prismatic-io/spectral";
import { getTableuClient } from "../auth";
import FormData from "form-data";

import {
  timeout,
  workbookId,
  userId,
  projectId,
  showTabs,
  workbookName,
  pageNumber,
  pageSize,
  connectionInput,
  searchString,
  filterOperator,
  workbookSearchField,
  uploadSessionId,
  workbookType,
  overwrite,
  asJob,
  skipConnectionCheck,
  workbookXml,
  workbookFileContents,
} from "../inputs";
import {
  listWorkbooksExamplePayload,
  searchWorkbooksExamplePayload,
  getWorkbookExamplePayload,
  deleteWorkbookExamplePayload,
  publishWorkbookExamplePayload,
  updateWorkbookExamplePayload,
} from "../examplePayloads";

export const listWorkbooks = action({
  display: {
    label: "List Workbooks",
    description: "Retrieve a list of workbooks connected to your Tableau site",
  },
  examplePayload: listWorkbooksExamplePayload,
  perform: async (context, params) => {
    const client = await getTableuClient({
      tableauConnection: params.tableauConnection,
      timeout: util.types.toInt(params.timeout),
      debug: context.debug.enabled,
    });
    const response = await client.get("/workbooks", {
      params: {
        pageSize: util.types.toNumber(params.pageSize) || undefined,
        pageNumber: util.types.toNumber(params.pageNumber) || undefined,
      },
    });

    return {
      data: response.data,
    };
  },
  inputs: {
    timeout,
    pageSize,
    pageNumber,
    tableauConnection: connectionInput,
  },
});

export const searchWorkbooks = action({
  display: {
    label: "Search Workbooks",
    description: "Search for a specific Workbook by a string of text",
  },
  examplePayload: searchWorkbooksExamplePayload,
  perform: async (context, params) => {
    const client = await getTableuClient({
      tableauConnection: params.tableauConnection,
      timeout: util.types.toInt(params.timeout),
      debug: context.debug.enabled,
    });
    const searchString = util.types.toString(params.searchString);
    const searchField = util.types.toString(params.searchField);
    const filterOperator = util.types.toString(params.filterOperator);

    const response = await client.get(
      `/workbooks?filter=${searchField}:${filterOperator}:${
        filterOperator !== "in" ? searchString : "[" + searchString + "]"
      }`,
      {
        params: {
          pageSize: util.types.toNumber(params.pageSize) || undefined,
          pageNumber: util.types.toNumber(params.pageNumber) || undefined,
        },
      },
    );
    return {
      data: response.data,
    };
  },
  inputs: {
    searchField: workbookSearchField,
    filterOperator: filterOperator,
    searchString: { ...searchString, example: "Tag 1, Tag 2, My 3rd Tag" },
    timeout,
    tableauConnection: connectionInput,
    pageNumber,
    pageSize,
  },
});

export const getWorkbook = action({
  display: {
    label: "Get Workbooks",
    description: "Get an existing workbook by Id",
  },
  examplePayload: getWorkbookExamplePayload,
  perform: async (context, params) => {
    const client = await getTableuClient({
      tableauConnection: params.tableauConnection,
      timeout: util.types.toInt(params.timeout),
      debug: context.debug.enabled,
    });
    const response = await client.get(`/workbooks/${params.workbookId}`);

    return {
      data: response.data,
    };
  },
  inputs: { workbookId, timeout, tableauConnection: connectionInput },
});

export const deleteWorkbook = action({
  display: {
    label: "Delete Workbooks",
    description: "Delete an existing workbook by Id",
  },
  examplePayload: deleteWorkbookExamplePayload,
  perform: async (context, params) => {
    const client = await getTableuClient({
      tableauConnection: params.tableauConnection,
      timeout: util.types.toInt(params.timeout),
      debug: context.debug.enabled,
    });
    const response = await client.delete(`/workbooks/${params.workbookId}`);

    return {
      data: response.data,
    };
  },
  inputs: { workbookId, timeout, tableauConnection: connectionInput },
});

export const publishWorkbook = action({
  display: {
    label: "Publish Workbook",
    description: "Publishes a workbook on the specified site.",
  },
  examplePayload: publishWorkbookExamplePayload,
  perform: async (context, params) => {
    const client = await getTableuClient({
      tableauConnection: params.tableauConnection,
      timeout: util.types.toInt(params.timeout),
      debug: context.debug.enabled,
      multipartMixed: true,
    });
    const queryParams = {
      ...(params.uploadSessionId && {
        uploadSessionId: params.uploadSessionId,
      }),
      ...(params.workbookType && { workbookType: params.workbookType }),
      overwrite: params.overwrite,
      asJob: params.asJob,
      skipConnectionCheck: params.skipConnectionCheck,
    };

    const form = new FormData();

    form.append("request_payload", params.workbookXml, {
      filename: "publish-workbook.xml",
    });

    form.append("tableau_workbook", params.workbookFileContents.data, {
      filename: "workbook.twbx",
    });

    const response = await client.post(`/workbooks`, form.getBuffer(), {
      params: queryParams,
      headers: {
        "content-type": "multipart/mixed; boundary=" + form.getBoundary(),
      },
      maxBodyLength: Infinity,
    });

    return {
      data: response.data,
    };
  },
  inputs: {
    timeout,
    tableauConnection: connectionInput,
    uploadSessionId,
    workbookType,
    overwrite,
    asJob,
    skipConnectionCheck,
    workbookXml,
    workbookFileContents,
  },
});

export const updateWorkbook = action({
  display: {
    label: "Update Workbook",
    description:
      "Update the information and metadata of an existing workbook by Id",
  },
  examplePayload: updateWorkbookExamplePayload,
  perform: async (context, params) => {
    const client = await getTableuClient({
      tableauConnection: params.tableauConnection,
      timeout: util.types.toInt(params.timeout),
      debug: context.debug.enabled,
    });

    const response = await client.put(`/workbooks/${params.workbookId}`, {
      workbook: {
        name: params.workbookName,
        showTabs: params.showTabs,
        project: {
          id: params.projectId,
        },
        owner: {
          id: params.userId,
        },
      },
    });

    return {
      data: response.data,
    };
  },
  inputs: {
    workbookId,
    workbookName,
    projectId,
    userId,
    showTabs,
    timeout,
    tableauConnection: connectionInput,
  },
});
