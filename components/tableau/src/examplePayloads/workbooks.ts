const workbookObject = {
  id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  name: "Sales Dashboard",
  description: "Quarterly sales performance metrics",
  contentUrl: "SalesDashboard",
  webpageUrl: "https://tableau.example.com/#/workbooks/12345",
  showTabs: "false",
  size: "2",
  createdAt: "2024-01-20T08:15:42Z",
  updatedAt: "2024-07-12T16:30:55Z",
  encryptExtracts: "false",
  defaultViewId: "f1e2d3c4-b5a6-9870-fedc-ba0987654321",
  project: {
    id: "1f2f3e4e-5d6d-7c8c-9b0b-1a2a3f4f5e6e",
    name: "Marketing Analytics",
  },
  owner: {
    id: "abc12e4e-5d6d-7c8c-9b0b-1a2a3f4f5e90",
    name: "jane.smith@example.com",
  },
  tags: {
    tag: [],
  },
};

export const listWorkbooksExamplePayload = {
  data: {
    pagination: {
      pageNumber: "1",
      pageSize: "100",
      totalAvailable: "5",
    },
    workbooks: {
      workbook: [workbookObject],
    },
  },
};

export const searchWorkbooksExamplePayload = listWorkbooksExamplePayload;

export const getWorkbookExamplePayload = {
  data: {
    workbook: workbookObject,
  },
};

export const publishWorkbookExamplePayload = {
  data: {
    workbook: workbookObject,
  },
};

export const updateWorkbookExamplePayload = {
  data: {
    workbook: workbookObject,
  },
};

export const deleteWorkbookExamplePayload = {
  data: null,
};
