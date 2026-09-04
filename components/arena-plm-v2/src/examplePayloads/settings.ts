const sampleUser = {
  guid: "9ZY87XW65VU43TS21RQ09PO8",
  fullName: "Jordan Rivera",
  email: "jordan.rivera@example.com",
};
export const listApiUsagesExamplePayload = {
  data: {
    results: [
      {
        guid: "1AU22AU33AU44AU55AU66AU7",
        user: sampleUser,
        endpoint: "/items",
        httpMethod: "GET",
        statusCode: 200,
        requestCount: 148,
        dateTime: "2026-07-21T14:32:10Z",
      },
      {
        guid: "2AU33AU44AU55AU66AU77AU8",
        user: sampleUser,
        endpoint: "/changes",
        httpMethod: "POST",
        statusCode: 201,
        requestCount: 12,
        dateTime: "2026-07-21T15:07:44Z",
      },
    ],
    count: 2,
  },
};
export const listRecentActivityExportsExamplePayload = {
  data: {
    results: [
      {
        guid: "3EX44EX55EX66EX77EX88EX9",
        user: sampleUser,
        exportType: "BOM_EXPORT",
        objectNumber: "PRT-001045",
        format: "CSV",
        status: "COMPLETED",
        dateTime: "2026-07-20T11:15:00Z",
      },
    ],
    count: 1,
  },
};
export const listRecentActivityFileAccessesExamplePayload = {
  data: {
    results: [
      {
        guid: "4FA55FA66FA77FA88FA99FA0",
        user: sampleUser,
        fileGuid: "7GG88HH99II00JJ11KK22LL3",
        fileName: "assembly-drawing.pdf",
        accessType: "DOWNLOAD",
        dateTime: "2026-07-19T09:42:30Z",
      },
    ],
    count: 1,
  },
};
export const listRecentActivityReportRunsExamplePayload = {
  data: {
    results: [
      {
        guid: "5RR66RR77RR88RR99RR00RR1",
        user: sampleUser,
        reportName: "Open Changes by Category",
        reportGuid: "6RG77RG88RG99RG00RG11RG2",
        status: "COMPLETED",
        rowCount: 87,
        dateTime: "2026-07-18T16:20:05Z",
      },
    ],
    count: 1,
  },
};
export const listRecentActivityUserAccessesExamplePayload = {
  data: {
    results: [
      {
        guid: "7UA88UA99UA00UA11UA22UA3",
        user: sampleUser,
        accessType: "LOGIN",
        ipAddress: "203.0.113.42",
        userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
        dateTime: "2026-07-22T08:01:12Z",
      },
    ],
    count: 1,
  },
};
