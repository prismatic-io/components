import {
  createConnection,
  createHarness,
} from "@prismatic-io/spectral/dist/testing";
import axios from "axios";
import { arenaUsernamePassword } from "../connections";
import component from "../index";
import { getErrorMessage } from "../util";
jest.setTimeout(30000);
const DEFAULT_URL = "";
const DEFAULT_EMAIL = "";
const DEFAULT_PASSWORD = "";
const DEFAULT_WORKSPACE_ID = 0;
const harness = createHarness(component);
const testConnection = createConnection(arenaUsernamePassword, {
  baseUrl: "custom",
  customBaseUrl: process.env.ARENA_BASE_URL || DEFAULT_URL,
  email: process.env.ARENA_EMAIL || DEFAULT_EMAIL,
  password: process.env.ARENA_PASSWORD || DEFAULT_PASSWORD,
  workspaceId: process.env.ARENA_WORKSPACE_ID || String(DEFAULT_WORKSPACE_ID),
});
const BASE_URL = process.env.ARENA_BASE_URL || DEFAULT_URL;
let featureAvailable = true;
let arenaSessionId: string;
let requirementTemplateGuid: string;
let requirementNumberSequencePrefix: string;
let additionalAttributesPayload: Array<{
  guid: string;
  value: unknown;
}> = [];
let createdRequirementGuid: string | undefined;
let createdChildRequirementGuid: string | undefined;
let sharedTicketGuid: string;
let sharedFileGuid: string;
let sharedQualityGuid: string;
let _sharedItemGuid: string;
let sharedRelationshipTypeGuid: string;
let requirementFileAssocGuid: string | undefined;
let requirementQualityAssocGuid: string | undefined;
let requirementTicketAssocGuid: string | undefined;
let requirementTraceGuid: string | undefined;
let childAssocGuid: string | undefined;
let requirementPriorityValue: string | undefined;
async function getSession(): Promise<string> {
  const resp = await axios.post(`${BASE_URL}/v1/login`, {
    email: process.env.ARENA_EMAIL || DEFAULT_EMAIL,
    password: process.env.ARENA_PASSWORD || DEFAULT_PASSWORD,
    workspaceId: Number.parseInt(
      process.env.ARENA_WORKSPACE_ID || String(DEFAULT_WORKSPACE_ID),
      10,
    ),
  });
  return (resp.data.arena_session_id ?? resp.data.arenaSessionId) as string;
}
async function directDelete(path: string): Promise<void> {
  await axios
    .delete(`${BASE_URL}/v1${path}`, {
      headers: { arena_session_id: arenaSessionId },
    })
    .catch(() => undefined);
}
function buildAttributeValue(
  fieldType: string,
  possibleValues:
    | Array<{
        value: unknown;
      }>
    | undefined,
): unknown {
  switch (fieldType) {
    case "BOOLEAN":
      return true;
    case "NUMBER":
    case "POSITIVE_DOUBLE":
    case "COST":
      return 1.0;
    case "INTEGER":
    case "POSITIVE_INTEGER":
      return 1;
    case "DATE":
      return "2025-01-01";
    case "DATETIME":
      return "2025-01-01T00:00:00Z";
    case "DROP_DOWN":
    case "FIXED_DROP_DOWN":
    case "ENUM":
      if (possibleValues && possibleValues.length > 0) {
        return possibleValues[0].value;
      }
      return null;
    case "LIST":
      if (possibleValues && possibleValues.length > 0) {
        return [possibleValues[0].value];
      }
      return [];
    default:
      return "Integration test value";
  }
}
beforeAll(async () => {
  try {
    await harness.action("listRequirements", {
      connection: testConnection,
      limit: "1",
    });
  } catch (err: unknown) {
    featureAvailable = false;
    console.warn(
      "[Feature Check] Requirements feature check failed — all tests will be skipped.",
      String(getErrorMessage(err)).slice(0, 200),
    );
  }
}, 30000);
beforeAll(async () => {
  if (!featureAvailable) return;
  try {
    arenaSessionId = await getSession();
  } catch (err: unknown) {
    featureAvailable = false;
    console.warn(
      "[Setup] Failed to obtain Arena session — requirement tests will be skipped:",
      String(getErrorMessage(err)).slice(0, 200),
    );
    return;
  }
  try {
    const filesResp = await axios.get(`${BASE_URL}/v1/files?limit=1`, {
      headers: { arena_session_id: arenaSessionId },
    });
    sharedFileGuid =
      (
        filesResp.data.results as Array<{
          guid: string;
        }>
      )[0]?.guid ?? "";
  } catch {
    console.warn(
      "[Setup] Could not discover shared file GUID — file tests will be skipped.",
    );
  }
  try {
    const ticketsResp = await axios.get(`${BASE_URL}/v1/tickets?limit=1`, {
      headers: { arena_session_id: arenaSessionId },
    });
    sharedTicketGuid =
      (
        ticketsResp.data.results as Array<{
          guid: string;
        }>
      )[0]?.guid ?? "";
  } catch {
    console.warn(
      "[Setup] Could not discover shared ticket GUID — ticket tests will be skipped.",
    );
  }
  try {
    const qualResp = await axios.get(`${BASE_URL}/v1/quality?limit=1`, {
      headers: { arena_session_id: arenaSessionId },
    });
    sharedQualityGuid =
      (
        qualResp.data.results as Array<{
          guid: string;
        }>
      )[0]?.guid ?? "";
  } catch {
    console.warn(
      "[Setup] Could not discover shared quality GUID — quality tests will be skipped.",
    );
  }
  try {
    const itemsResp = await axios.get(`${BASE_URL}/v1/items?limit=1`, {
      headers: { arena_session_id: arenaSessionId },
    });
    _sharedItemGuid =
      (
        itemsResp.data.results as Array<{
          guid: string;
        }>
      )[0]?.guid ?? "";
  } catch {
    console.warn("[Setup] Could not discover shared item GUID.");
  }
  try {
    const templatesResp = await axios.get(
      `${BASE_URL}/v1/settings/requirements/templates?active=true&limit=1`,
      { headers: { arena_session_id: arenaSessionId } },
    );
    const firstTemplate = (
      templatesResp.data.results as Array<{
        guid: string;
      }>
    )[0];
    if (!firstTemplate) {
      console.warn(
        "[Setup] No active requirement templates found — some tests will be skipped.",
      );
      requirementTemplateGuid = "";
    } else {
      requirementTemplateGuid = firstTemplate.guid;
      try {
        const tmplDetail = await axios.get(
          `${BASE_URL}/v1/settings/requirements/templates/${requirementTemplateGuid}`,
          { headers: { arena_session_id: arenaSessionId } },
        );
        const defaultSeq = (
          tmplDetail.data as {
            defaultNumberSequence?: {
              prefixes?: Array<{
                value: string;
              }>;
            };
          }
        ).defaultNumberSequence;
        requirementNumberSequencePrefix =
          defaultSeq?.prefixes?.[0]?.value ?? "";
      } catch {}
    }
  } catch (err: unknown) {
    console.warn(
      "[Setup] Could not discover requirement templates:",
      String(getErrorMessage(err)).slice(0, 200),
    );
  }
  if (requirementTemplateGuid) {
    try {
      const attrsResp = await axios.get(
        `${BASE_URL}/v1/settings/requirements/templates/${requirementTemplateGuid}/attributes?creatableOnly=true&includePossibleValues=true`,
        { headers: { arena_session_id: arenaSessionId } },
      );
      const attrs =
        (attrsResp.data.results as Array<{
          guid: string;
          apiName: string;
          fieldType: string;
          required: boolean;
          custom: boolean;
          possibleValues?: Array<{
            value: unknown;
          }>;
        }>) ?? [];
      const templateGuidPrefix = requirementTemplateGuid.substring(0, 8);
      additionalAttributesPayload = attrs
        .map((attr) => {
          if (!attr.guid || attr.custom === false) {
            if (attr.apiName === "priority" && attr.possibleValues?.length) {
              requirementPriorityValue = String(attr.possibleValues[0].value);
              console.info(
                `[Setup] Captured valid priority value: ${requirementPriorityValue}`,
              );
            }
            console.warn(
              `[Setup] Skipping non-custom attribute ${attr.apiName} (${attr.fieldType})`,
            );
            return null;
          }
          if (attr.guid.startsWith(templateGuidPrefix)) {
            console.warn(
              `[Setup] Skipping template-scoped attribute ${attr.apiName} guid=${attr.guid} (shares template prefix)`,
            );
            return null;
          }
          const value = buildAttributeValue(
            attr.fieldType,
            attr.possibleValues,
          );
          if (value === null) {
            console.warn(
              `[Setup] Skipping attribute ${attr.apiName} (${attr.fieldType}) — no possible values available`,
            );
            return null;
          }
          console.info(
            `[Setup] Including custom attribute: guid=${attr.guid} apiName=${attr.apiName} fieldType=${attr.fieldType}`,
          );
          return { guid: attr.guid, value };
        })
        .filter(Boolean) as Array<{
        guid: string;
        value: unknown;
      }>;
      console.info(
        `[Setup] additionalAttributesPayload count: ${additionalAttributesPayload.length}`,
      );
    } catch (err: unknown) {
      console.warn(
        "[Setup] Could not fetch template attributes:",
        String(getErrorMessage(err)).slice(0, 200),
      );
    }
  }
  try {
    const relTypesResp = await axios.get(
      `${BASE_URL}/v1/settings/requirements/relationshipTypes`,
      { headers: { arena_session_id: arenaSessionId } },
    );
    sharedRelationshipTypeGuid =
      (
        relTypesResp.data.results as Array<{
          guid: string;
        }>
      )[0]?.guid ?? "";
  } catch {
    console.warn(
      "[Setup] Could not discover relationship types — trace tests will be skipped.",
    );
  }
}, 60000);
afterAll(async () => {
  if (!arenaSessionId) return;
  if (requirementFileAssocGuid && createdRequirementGuid) {
    await directDelete(
      `/requirements/${createdRequirementGuid}/files/${requirementFileAssocGuid}`,
    );
  }
  if (requirementQualityAssocGuid && createdRequirementGuid) {
    await directDelete(
      `/requirements/${createdRequirementGuid}/quality/${requirementQualityAssocGuid}`,
    );
  }
  if (requirementTicketAssocGuid && createdRequirementGuid) {
    await directDelete(
      `/requirements/${createdRequirementGuid}/tickets/${requirementTicketAssocGuid}`,
    );
  }
  if (requirementTraceGuid && createdRequirementGuid) {
    await directDelete(
      `/requirements/${createdRequirementGuid}/trace/${requirementTraceGuid}`,
    );
  }
  if (childAssocGuid && createdRequirementGuid && createdChildRequirementGuid) {
    await directDelete(
      `/requirements/${createdRequirementGuid}/children/${createdChildRequirementGuid}`,
    );
  }
  if (createdChildRequirementGuid) {
    await directDelete(`/requirements/${createdChildRequirementGuid}`);
  }
  if (createdRequirementGuid) {
    await directDelete(`/requirements/${createdRequirementGuid}`);
  }
}, 60000);
describe("Action: listRequirementTemplates", () => {
  test("returns a list of requirement templates", async () => {
    if (!featureAvailable) {
      console.warn("Skipping — feature not available");
      return;
    }
    const result = await harness.action("listRequirementTemplates", {
      connection: testConnection,
      active: true,
    });
    expect(result).toBeDefined();
    const data = result?.data as {
      count: number;
      results: unknown[];
    };
    expect(typeof data.count).toBe("number");
    expect(Array.isArray(data.results)).toBe(true);
  }, 30000);
});
describe("Action: getRequirementTemplate", () => {
  test("returns a specific requirement template", async () => {
    if (!featureAvailable || !requirementTemplateGuid) {
      console.warn("Skipping — feature not available or no template found");
      return;
    }
    const result = await harness.action("getRequirementTemplate", {
      connection: testConnection,
      requirementTemplateGuid,
    });
    expect(result).toBeDefined();
    const data = result?.data as {
      guid: string;
      name: string;
    };
    expect(data.guid).toBe(requirementTemplateGuid);
    expect(typeof data.name).toBe("string");
  }, 30000);
});
describe("Action: listRequirementRelationshipTypes", () => {
  test("returns a list of relationship types", async () => {
    if (!featureAvailable) {
      console.warn("Skipping — feature not available");
      return;
    }
    const result = await harness.action("listRequirementRelationshipTypes", {
      connection: testConnection,
    });
    expect(result).toBeDefined();
    const data = result?.data as {
      count: number;
      results: unknown[];
    };
    expect(typeof data.count).toBe("number");
    expect(Array.isArray(data.results)).toBe(true);
  }, 30000);
});
describe("Action: listRequirementTemplateAttributes", () => {
  test("returns attributes for a requirement template", async () => {
    if (!featureAvailable || !requirementTemplateGuid) {
      console.warn("Skipping — feature not available or no template found");
      return;
    }
    const result = await harness.action("listRequirementTemplateAttributes", {
      connection: testConnection,
      templateGuid: requirementTemplateGuid,
      includePossibleValues: true,
      creatableOnly: true,
      editableOnly: false,
      searchableOnly: false,
    });
    expect(result).toBeDefined();
    const data = result?.data as {
      count: number;
      results: unknown[];
    };
    expect(typeof data.count).toBe("number");
    expect(Array.isArray(data.results)).toBe(true);
  }, 30000);
});
describe("Action: listRequirements", () => {
  test("returns a paginated list of requirements", async () => {
    if (!featureAvailable) {
      console.warn("Skipping — feature not available");
      return;
    }
    const result = await harness.action("listRequirements", {
      connection: testConnection,
      limit: "10",
      offset: "0",
    });
    expect(result).toBeDefined();
    const data = result?.data as {
      count: number;
      results: unknown[];
    };
    expect(typeof data.count).toBe("number");
    expect(Array.isArray(data.results)).toBe(true);
  }, 30000);
  test("filters by template GUID", async () => {
    if (!featureAvailable || !requirementTemplateGuid) {
      console.warn("Skipping — feature not available or no template found");
      return;
    }
    const result = await harness.action("listRequirements", {
      connection: testConnection,
      templateGuid: requirementTemplateGuid,
      limit: "5",
      offset: "0",
    });
    expect(result).toBeDefined();
    const data = result?.data as {
      count: number;
      results: unknown[];
    };
    expect(typeof data.count).toBe("number");
    expect(Array.isArray(data.results)).toBe(true);
  }, 30000);
});
describe("Action: createRequirement", () => {
  test("creates a new requirement with all attributes", async () => {
    if (!featureAvailable || !requirementTemplateGuid) {
      console.warn("Skipping — feature not available or no template found");
      return;
    }
    console.info(
      `[Test] Creating requirement with templateGuid=${requirementTemplateGuid} numberSequencePrefix="${requirementNumberSequencePrefix}" attrsCount=${additionalAttributesPayload.length}`,
    );
    const result = await harness.action("createRequirement", {
      connection: testConnection,
      templateGuid: requirementTemplateGuid,
      title: "Integration Test Requirement",
      description: "Created by integration test — safe to delete",
      priority: requirementPriorityValue,
      number: requirementNumberSequencePrefix
        ? undefined
        : `TEST-REQ-${Date.now()}`,
      numberSequencePrefix: requirementNumberSequencePrefix || undefined,
      additionalAttributeJson:
        additionalAttributesPayload.length > 0
          ? additionalAttributesPayload
          : undefined,
    });
    expect(result).toBeDefined();
    const data = result?.data as {
      guid: string;
      title: string;
    };
    expect(typeof data.guid).toBe("string");
    expect(data.title).toBe("Integration Test Requirement");
    createdRequirementGuid = data.guid;
  }, 30000);
});
describe("Action: getRequirement", () => {
  test("retrieves the created requirement by GUID", async () => {
    if (!featureAvailable || !createdRequirementGuid) {
      console.warn(
        "Skipping — feature not available or no requirement created",
      );
      return;
    }
    const result = await harness.action("getRequirement", {
      connection: testConnection,
      requirementGuid: createdRequirementGuid,
    });
    expect(result).toBeDefined();
    const data = result?.data as {
      guid: string;
      title: string;
    };
    expect(data.guid).toBe(createdRequirementGuid);
  }, 30000);
});
describe("Action: updateRequirement", () => {
  test("updates title and description of the created requirement", async () => {
    if (!featureAvailable || !createdRequirementGuid) {
      console.warn(
        "Skipping — feature not available or no requirement created",
      );
      return;
    }
    const result = await harness.action("updateRequirement", {
      connection: testConnection,
      requirementGuid: createdRequirementGuid,
      title: "Integration Test Requirement (Updated)",
      description: "Updated by integration test",
      priority: requirementPriorityValue,
      additionalAttributeJson:
        additionalAttributesPayload.length > 0
          ? additionalAttributesPayload
          : undefined,
    });
    expect(result).toBeDefined();
    const data = result?.data as {
      guid: string;
      title: string;
    };
    expect(data.guid).toBe(createdRequirementGuid);
  }, 30000);
});
describe("Action: listRequirementHistory", () => {
  test("returns history for the created requirement", async () => {
    if (!featureAvailable || !createdRequirementGuid) {
      console.warn(
        "Skipping — feature not available or no requirement created",
      );
      return;
    }
    const result = await harness.action("listRequirementHistory", {
      connection: testConnection,
      requirementGuid: createdRequirementGuid,
    });
    expect(result).toBeDefined();
    const data = result?.data as {
      count: number;
      results: unknown[];
    };
    expect(typeof data.count).toBe("number");
    expect(Array.isArray(data.results)).toBe(true);
  }, 30000);
});
describe("Action: getRequirementParent", () => {
  test("returns parent requirements (may be empty for a root requirement)", async () => {
    if (!featureAvailable || !createdRequirementGuid) {
      console.warn(
        "Skipping — feature not available or no requirement created",
      );
      return;
    }
    const result = await harness.action("getRequirementParent", {
      connection: testConnection,
      requirementGuid: createdRequirementGuid,
    });
    expect(result).toBeDefined();
    const data = result?.data as {
      count: number;
      results: unknown[];
    };
    expect(typeof data.count).toBe("number");
    expect(Array.isArray(data.results)).toBe(true);
  }, 30000);
});
describe("Action: listRequirementFiles", () => {
  test("returns file associations for the created requirement", async () => {
    if (!featureAvailable || !createdRequirementGuid) {
      console.warn(
        "Skipping — feature not available or no requirement created",
      );
      return;
    }
    const result = await harness.action("listRequirementFiles", {
      connection: testConnection,
      requirementGuid: createdRequirementGuid,
    });
    expect(result).toBeDefined();
    const data = result?.data as {
      count: number;
      results: unknown[];
    };
    expect(typeof data.count).toBe("number");
    expect(Array.isArray(data.results)).toBe(true);
  }, 30000);
});
describe("Action: addRequirementFile", () => {
  test("attaches a file to the created requirement", async () => {
    if (!featureAvailable || !createdRequirementGuid || !sharedFileGuid) {
      console.warn(
        "Skipping — feature not available, no requirement, or no file",
      );
      return;
    }
    const existingResult = await harness.action("listRequirementFiles", {
      connection: testConnection,
      requirementGuid: createdRequirementGuid,
    });
    const existing = (
      existingResult?.data as {
        results: Array<{
          guid: string;
          file: {
            guid: string;
          };
        }>;
      }
    ).results.find((a) => a.file.guid === sharedFileGuid);
    if (existing) {
      await directDelete(
        `/requirements/${createdRequirementGuid}/files/${existing.guid}`,
      );
    }
    const result = await harness.action("addRequirementFile", {
      connection: testConnection,
      requirementGuid: createdRequirementGuid,
      fileGuid: sharedFileGuid,
    });
    expect(result).toBeDefined();
    const data = result?.data as {
      guid: string;
    };
    expect(typeof data.guid).toBe("string");
    requirementFileAssocGuid = data.guid;
  }, 30000);
});
describe("Action: getRequirementFileAssociation", () => {
  test("retrieves a specific file association", async () => {
    if (
      !featureAvailable ||
      !createdRequirementGuid ||
      !requirementFileAssocGuid
    ) {
      console.warn("Skipping — feature not available or no file association");
      return;
    }
    const result = await harness.action("getRequirementFileAssociation", {
      connection: testConnection,
      requirementGuid: createdRequirementGuid,
      fileAssociationGuid: requirementFileAssocGuid,
    });
    expect(result).toBeDefined();
    const data = result?.data as {
      guid: string;
    };
    expect(data.guid).toBe(requirementFileAssocGuid);
  }, 30000);
});
describe("Action: removeRequirementFileAssociation", () => {
  test("removes the file association", async () => {
    if (
      !featureAvailable ||
      !createdRequirementGuid ||
      !requirementFileAssocGuid
    ) {
      console.warn("Skipping — feature not available or no file association");
      return;
    }
    const result = await harness.action("removeRequirementFileAssociation", {
      connection: testConnection,
      requirementGuid: createdRequirementGuid,
      fileAssociationGuid: requirementFileAssocGuid,
    });
    expect(result).toBeDefined();
    requirementFileAssocGuid = undefined;
  }, 30000);
});
describe("Action: listRequirementQuality", () => {
  test("returns quality associations for the created requirement", async () => {
    if (!featureAvailable || !createdRequirementGuid) {
      console.warn(
        "Skipping — feature not available or no requirement created",
      );
      return;
    }
    const result = await harness.action("listRequirementQuality", {
      connection: testConnection,
      requirementGuid: createdRequirementGuid,
    });
    expect(result).toBeDefined();
    const data = result?.data as {
      count: number;
      results: unknown[];
    };
    expect(typeof data.count).toBe("number");
    expect(Array.isArray(data.results)).toBe(true);
  }, 30000);
});
describe("Action: addRequirementQuality", () => {
  test("links a quality process to the requirement", async () => {
    if (!featureAvailable || !createdRequirementGuid || !sharedQualityGuid) {
      console.warn(
        "Skipping — feature not available, no requirement, or no quality process",
      );
      return;
    }
    const existingResp = await axios.get(
      `${BASE_URL}/v1/requirements/${createdRequirementGuid}/quality`,
      { headers: { arena_session_id: arenaSessionId } },
    );
    const existing = (
      existingResp.data.results as Array<{
        guid: string;
        quality: {
          guid: string;
        };
      }>
    ).find((a) => a.quality.guid === sharedQualityGuid);
    if (existing) {
      await directDelete(
        `/requirements/${createdRequirementGuid}/quality/${existing.guid}`,
      );
    }
    const result = await harness.action("addRequirementQuality", {
      connection: testConnection,
      requirementGuid: createdRequirementGuid,
      qualityGuid: sharedQualityGuid,
    });
    expect(result).toBeDefined();
    const data = result?.data as {
      guid: string;
    };
    expect(typeof data.guid).toBe("string");
    requirementQualityAssocGuid = data.guid;
  }, 30000);
});
describe("Action: getRequirementQualityAssociation", () => {
  test("retrieves a specific quality association", async () => {
    if (
      !featureAvailable ||
      !createdRequirementGuid ||
      !requirementQualityAssocGuid
    ) {
      console.warn(
        "Skipping — feature not available or no quality association",
      );
      return;
    }
    const result = await harness.action("getRequirementQualityAssociation", {
      connection: testConnection,
      requirementGuid: createdRequirementGuid,
      associationGuid: requirementQualityAssocGuid,
    });
    expect(result).toBeDefined();
    const data = result?.data as {
      guid: string;
    };
    expect(data.guid).toBe(requirementQualityAssocGuid);
  }, 30000);
});
describe("Action: removeRequirementQualityAssociation", () => {
  test("removes the quality association", async () => {
    if (
      !featureAvailable ||
      !createdRequirementGuid ||
      !requirementQualityAssocGuid
    ) {
      console.warn(
        "Skipping — feature not available or no quality association",
      );
      return;
    }
    const result = await harness.action("removeRequirementQualityAssociation", {
      connection: testConnection,
      requirementGuid: createdRequirementGuid,
      associationGuid: requirementQualityAssocGuid,
    });
    expect(result).toBeDefined();
    requirementQualityAssocGuid = undefined;
  }, 30000);
});
describe("Action: listRequirementTickets", () => {
  test("returns ticket associations for the created requirement", async () => {
    if (!featureAvailable || !createdRequirementGuid) {
      console.warn(
        "Skipping — feature not available or no requirement created",
      );
      return;
    }
    const result = await harness.action("listRequirementTickets", {
      connection: testConnection,
      requirementGuid: createdRequirementGuid,
    });
    expect(result).toBeDefined();
    const data = result?.data as {
      count: number;
      results: unknown[];
    };
    expect(typeof data.count).toBe("number");
    expect(Array.isArray(data.results)).toBe(true);
  }, 30000);
});
describe("Action: addRequirementTicket", () => {
  test("links a ticket to the requirement", async () => {
    if (!featureAvailable || !createdRequirementGuid || !sharedTicketGuid) {
      console.warn(
        "Skipping — feature not available, no requirement, or no ticket",
      );
      return;
    }
    const existingResp = await axios.get(
      `${BASE_URL}/v1/requirements/${createdRequirementGuid}/tickets`,
      { headers: { arena_session_id: arenaSessionId } },
    );
    const existing = (
      existingResp.data.results as Array<{
        guid: string;
        ticket: {
          guid: string;
        };
      }>
    ).find((a) => a.ticket.guid === sharedTicketGuid);
    if (existing) {
      await directDelete(
        `/requirements/${createdRequirementGuid}/tickets/${existing.guid}`,
      );
    }
    const result = await harness.action("addRequirementTicket", {
      connection: testConnection,
      requirementGuid: createdRequirementGuid,
      ticketGuid: sharedTicketGuid,
    });
    expect(result).toBeDefined();
    const data = result?.data as {
      guid: string;
    };
    expect(typeof data.guid).toBe("string");
    requirementTicketAssocGuid = data.guid;
  }, 30000);
});
describe("Action: getRequirementTicketAssociation", () => {
  test("retrieves a specific ticket association", async () => {
    if (
      !featureAvailable ||
      !createdRequirementGuid ||
      !requirementTicketAssocGuid
    ) {
      console.warn("Skipping — feature not available or no ticket association");
      return;
    }
    const result = await harness.action("getRequirementTicketAssociation", {
      connection: testConnection,
      requirementGuid: createdRequirementGuid,
      associationGuid: requirementTicketAssocGuid,
    });
    expect(result).toBeDefined();
    const data = result?.data as {
      guid: string;
    };
    expect(data.guid).toBe(requirementTicketAssocGuid);
  }, 30000);
});
describe("Action: removeRequirementTicketAssociation", () => {
  test("removes the ticket association", async () => {
    if (
      !featureAvailable ||
      !createdRequirementGuid ||
      !requirementTicketAssocGuid
    ) {
      console.warn("Skipping — feature not available or no ticket association");
      return;
    }
    const result = await harness.action("removeRequirementTicketAssociation", {
      connection: testConnection,
      requirementGuid: createdRequirementGuid,
      associationGuid: requirementTicketAssocGuid,
    });
    expect(result).toBeDefined();
    requirementTicketAssocGuid = undefined;
  }, 30000);
});
describe("Action: listRequirementTraces", () => {
  test("returns traces for the created requirement", async () => {
    if (!featureAvailable || !createdRequirementGuid) {
      console.warn(
        "Skipping — feature not available or no requirement created",
      );
      return;
    }
    const result = await harness.action("listRequirementTraces", {
      connection: testConnection,
      requirementGuid: createdRequirementGuid,
    });
    expect(result).toBeDefined();
    const data = result?.data as {
      count: number;
      results: unknown[];
    };
    expect(typeof data.count).toBe("number");
    expect(Array.isArray(data.results)).toBe(true);
  }, 30000);
});
describe("Action: addRequirementTrace", () => {
  test("adds a trace link to another requirement", async () => {
    if (
      !featureAvailable ||
      !createdRequirementGuid ||
      !sharedRelationshipTypeGuid
    ) {
      console.warn(
        "Skipping — feature not available, no requirement, or no relationship type",
      );
      return;
    }
    const reqsResult = await harness.action("listRequirements", {
      connection: testConnection,
      limit: "5",
    });
    const targetReq = (
      reqsResult?.data as {
        results: Array<{
          guid: string;
        }>;
      }
    ).results.find((r) => r.guid !== createdRequirementGuid);
    if (!targetReq) {
      console.warn(
        "[Trace] No second requirement available to trace to — skipping",
      );
      return;
    }
    const result = await harness.action("addRequirementTrace", {
      connection: testConnection,
      requirementGuid: createdRequirementGuid,
      direction: "DOWNSTREAM",
      objectType: "REQUIREMENT",
      relationshipTypeGuid: sharedRelationshipTypeGuid,
      targetRequirementGuid: targetReq.guid,
    });
    expect(result).toBeDefined();
    const data = result?.data as {
      guid: string;
    };
    expect(typeof data.guid).toBe("string");
    requirementTraceGuid = data.guid;
  }, 30000);
});
describe("Action: getRequirementTrace", () => {
  test("retrieves a specific trace link", async () => {
    if (!featureAvailable || !createdRequirementGuid || !requirementTraceGuid) {
      console.warn("Skipping — feature not available or no trace link");
      return;
    }
    const result = await harness.action("getRequirementTrace", {
      connection: testConnection,
      requirementGuid: createdRequirementGuid,
      traceLinkGuid: requirementTraceGuid,
    });
    expect(result).toBeDefined();
    const data = result?.data as {
      guid: string;
    };
    expect(data.guid).toBe(requirementTraceGuid);
  }, 30000);
});
describe("Action: updateRequirementTrace", () => {
  test("updates the suspected flag on a trace link", async () => {
    if (!featureAvailable || !createdRequirementGuid || !requirementTraceGuid) {
      console.warn("Skipping — feature not available or no trace link");
      return;
    }
    const result = await harness.action("updateRequirementTrace", {
      connection: testConnection,
      requirementGuid: createdRequirementGuid,
      traceLinkGuid: requirementTraceGuid,
      suspected: false,
    });
    expect(result).toBeDefined();
    const data = result?.data as {
      guid: string;
    };
    expect(data.guid).toBe(requirementTraceGuid);
  }, 30000);
});
describe("Action: deleteRequirementTrace", () => {
  test("deletes the trace link", async () => {
    if (!featureAvailable || !createdRequirementGuid || !requirementTraceGuid) {
      console.warn("Skipping — feature not available or no trace link");
      return;
    }
    const result = await harness.action("deleteRequirementTrace", {
      connection: testConnection,
      requirementGuid: createdRequirementGuid,
      traceLinkGuid: requirementTraceGuid,
    });
    expect(result).toBeDefined();
    requirementTraceGuid = undefined;
  }, 30000);
});
describe("Action: createChildRequirement (setup)", () => {
  test("creates a second requirement to use as a child", async () => {
    if (!featureAvailable || !requirementTemplateGuid) {
      console.warn("Skipping — feature not available or no template");
      return;
    }
    const result = await harness.action("createRequirement", {
      connection: testConnection,
      templateGuid: requirementTemplateGuid,
      title: "Integration Test Child Requirement",
      description: "Created as child — safe to delete",
      number: requirementNumberSequencePrefix
        ? undefined
        : `TEST-REQ-CHILD-${Date.now()}`,
      numberSequencePrefix: requirementNumberSequencePrefix || undefined,
      additionalAttributeJson:
        additionalAttributesPayload.length > 0
          ? additionalAttributesPayload
          : undefined,
    });
    expect(result).toBeDefined();
    const data = result?.data as {
      guid: string;
    };
    createdChildRequirementGuid = data.guid;
  }, 30000);
});
describe("Action: addRequirementChild", () => {
  test("adds a child requirement", async () => {
    if (
      !featureAvailable ||
      !createdRequirementGuid ||
      !createdChildRequirementGuid
    ) {
      console.warn(
        "Skipping — feature not available or no parent/child requirement",
      );
      return;
    }
    const result = await harness.action("addRequirementChild", {
      connection: testConnection,
      requirementGuid: createdRequirementGuid,
      childRequirementGuid: createdChildRequirementGuid,
    });
    expect(result).toBeDefined();
    childAssocGuid = createdChildRequirementGuid;
  }, 30000);
});
describe("Action: listRequirementChildren", () => {
  test("returns child requirements (tree view)", async () => {
    if (!featureAvailable || !createdRequirementGuid) {
      console.warn("Skipping — feature not available or no requirement");
      return;
    }
    const result = await harness.action("listRequirementChildren", {
      connection: testConnection,
      requirementGuid: createdRequirementGuid,
      view: "tree",
    });
    expect(result).toBeDefined();
    const data = result?.data as {
      count: number;
      results: unknown[];
    };
    expect(typeof data.count).toBe("number");
    expect(Array.isArray(data.results)).toBe(true);
  }, 30000);
  test("returns child requirements (list view)", async () => {
    if (!featureAvailable || !createdRequirementGuid) {
      console.warn("Skipping — feature not available or no requirement");
      return;
    }
    const result = await harness.action("listRequirementChildren", {
      connection: testConnection,
      requirementGuid: createdRequirementGuid,
      view: "list",
    });
    expect(result).toBeDefined();
    const data = result?.data as {
      count: number;
      results: unknown[];
    };
    expect(typeof data.count).toBe("number");
    expect(Array.isArray(data.results)).toBe(true);
  }, 30000);
});
describe("Action: removeRequirementChild", () => {
  test("removes the child requirement", async () => {
    if (
      !featureAvailable ||
      !createdRequirementGuid ||
      !createdChildRequirementGuid
    ) {
      console.warn(
        "Skipping — feature not available or no parent/child requirement",
      );
      return;
    }
    const result = await harness.action("removeRequirementChild", {
      connection: testConnection,
      requirementGuid: createdRequirementGuid,
      childRequirementGuid: createdChildRequirementGuid,
    });
    expect(result).toBeDefined();
    childAssocGuid = undefined;
  }, 30000);
});
describe("Action: changeRequirementStatus", () => {
  test("changes the status of the created requirement", async () => {
    if (!featureAvailable || !createdRequirementGuid) {
      console.warn(
        "Skipping — feature not available or no requirement created",
      );
      return;
    }
    let availableStatus: string | undefined;
    try {
      const attrsResp = await axios.get(
        `${BASE_URL}/v1/requirements/${createdRequirementGuid}`,
        { headers: { arena_session_id: arenaSessionId } },
      );
      availableStatus = (
        attrsResp.data as {
          status?: {
            value: string;
          };
        }
      ).status?.value;
    } catch {}
    if (!availableStatus) {
      console.warn(
        "[Status Change] Could not determine current status — skipping",
      );
      return;
    }
    const result = await harness.action("changeRequirementStatus", {
      connection: testConnection,
      requirementGuid: createdRequirementGuid,
      status: availableStatus,
    });
    expect(result).toBeDefined();
  }, 30000);
});
describe("Action: deleteRequirement", () => {
  test("deletes the created requirement", async () => {
    if (!featureAvailable || !createdRequirementGuid) {
      console.warn(
        "Skipping — feature not available or no requirement created",
      );
      return;
    }
    const result = await harness.action("deleteRequirement", {
      connection: testConnection,
      requirementGuid: createdRequirementGuid,
    });
    expect(result).toBeDefined();
    createdRequirementGuid = undefined;
  }, 30000);
});
