import type { Element } from "@prismatic-io/spectral";
import type { JamfCreateResponse, Package, PagedResponse } from "../types";

const packageExample: Package = {
  id: "20",
  packageName: "Google Chrome 120.0",
  fileName: "GoogleChrome-120.0.6099.199.pkg",
  categoryId: "-1",
  info: "Google Chrome browser installer.",
  notes: "",
  priority: 10,
  osRequirements: "",
  rebootRequired: false,
  fillUserTemplate: false,
  indexed: false,
  fillExistingUsers: false,
  swu: false,
  selfHealNotify: false,
  selfHealingAction: "nothing",
  osInstall: false,
  serialNumber: "",
  parentPackageId: "-1",
  basePath: "",
  suppressUpdates: false,
  cloudTransferStatus: "",
  ignoreConflicts: false,
  suppressFromDock: false,
  suppressEula: false,
  suppressRegistration: false,
  installLanguage: "en_US",
  md5: "",
  sha256: "",
  hashType: "SHA_512",
  hashValue: "",
  size: "",
  osInstallerVersion: "",
  manifest: "",
  manifestFileName: "",
  format: "",
  sha3512: "",
};

export const getPackageExamplePayload: { data: Package } = {
  data: packageExample,
};

export const listPackagesExamplePayload: { data: PagedResponse<Package> } = {
  data: { results: [packageExample], totalCount: 1 },
};

export const createPackageExamplePayload: { data: JamfCreateResponse } = {
  data: {
    id: "21",
    href: "https://your-instance.jamfcloud.com/api/v1/packages/21",
  },
};

export const updatePackageExamplePayload: { data: Package } = {
  data: packageExample,
};

export const deletePackageExamplePayload: { data: string } = {
  data: "Successfully deleted package 20",
};

export const selectPackageExamplePayload: { result: Element[] } = {
  result: [{ key: "12", label: "Google Chrome 120.0.pkg" }],
};
