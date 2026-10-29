import type { Element } from "@prismatic-io/spectral";
import type { JamfCreateResponse, PagedResponse, Script } from "../types";

const scriptExample: Script = {
  id: "12",
  name: "Install Chrome",
  categoryId: "3",
  categoryName: "Browsers",
  info: "Installs Google Chrome from the vendor CDN.",
  notes: "",
  priority: "AFTER",
  parameter4: "",
  parameter5: "",
  parameter6: "",
  parameter7: "",
  parameter8: "",
  parameter9: "",
  parameter10: "",
  parameter11: "",
  osRequirements: "",
  scriptContents: "#!/bin/bash\necho 'Installing Chrome'",
};

export const getScriptExamplePayload: { data: Script } = {
  data: scriptExample,
};

export const listScriptsExamplePayload: { data: PagedResponse<Script> } = {
  data: { results: [scriptExample], totalCount: 1 },
};

export const createScriptExamplePayload: { data: JamfCreateResponse } = {
  data: {
    id: "13",
    href: "https://your-instance.jamfcloud.com/api/v1/scripts/13",
  },
};

export const updateScriptExamplePayload: { data: Script } = {
  data: scriptExample,
};

export const deleteScriptExamplePayload: { data: string } = {
  data: "Successfully deleted script 12",
};

export const selectScriptExamplePayload: { result: Element[] } = {
  result: [{ key: "7", label: "Install Chrome" }],
};
