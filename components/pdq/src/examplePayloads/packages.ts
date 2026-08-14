const packageExampleRecord = {
  id: "pkg_1bced782734040a581d",
  latestPackageVersionId: "pkgver_1bced782734040a581d",
  latestVersion: "12.5.1",
  name: "Firefox",
  publisher: "Mozilla",
  source: "pdq",
};
export const getPackageExamplePayload = {
  data: {
    data: packageExampleRecord,
  },
};
export const listPackagesExamplePayload = {
  data: {
    data: [packageExampleRecord],
    meta: {
      page: 1,
      pageSize: 20,
      totalPages: 5,
    },
  },
};
