import {
  createConnection,
  createHarness,
} from "@prismatic-io/spectral/dist/testing";
import axios from "axios";
import { arenaUsernamePassword } from "../connections";
import component from "../index";
import { getErrorMessage } from "../util";
jest.setTimeout(30000);
const harness = createHarness(component);
const testConnection = createConnection(arenaUsernamePassword, {
  baseUrl: "custom",
  customBaseUrl: process.env.ARENA_BASE_URL || "",
  email: process.env.ARENA_EMAIL || "",
  password: process.env.ARENA_PASSWORD || "",
});
const BASE_URL = process.env.ARENA_BASE_URL || "";
let featureAvailable = true;
let arenaSessionId: string;
let ticketGuid: string;
let ticketTemplateGuid: string;
let ticketNumberSequencePrefix: string;
let createdTicketGuid: string | undefined;
let createdTicketGuid2: string | undefined;
let ticketFileAssocGuid: string | undefined;
let ticketReferenceAssocGuid: string | undefined;
let ticketQualityAssocGuid: string | undefined;
let ticketItemAssocGuid: string | undefined;
let ticketChangeAssocGuid: string | undefined;
let requestGuid: string;
let createdRequestGuid: string | undefined;
let requestFileAssocGuid: string | undefined;
let requestItemAssocGuid: string | undefined;
let requestEvaluationIssueGuid: string | undefined;
let sharedItemGuid: string;
let sharedChangeGuid: string;
let sharedQualityGuid: string;
let sharedFileGuid: string;
async function getSession(): Promise<string> {
  const resp = await axios.post(`${BASE_URL}/v1/login`, {
    email: process.env.ARENA_EMAIL || "",
    password: process.env.ARENA_PASSWORD || "",
  });
  return resp.data.arenaSessionId as string;
}
async function directDelete(path: string): Promise<void> {
  await axios
    .delete(`${BASE_URL}/v1${path}`, {
      headers: { arena_session_id: arenaSessionId },
    })
    .catch(() => undefined);
}
beforeAll(async () => {
  try {
    await harness.action("listTickets", {
      connection: testConnection,
      limit: "1",
    });
  } catch (err: unknown) {
    featureAvailable = false;
    console.warn(
      "[Feature Check] Tickets/Requests feature check failed — all tests will be skipped.",
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
      "[Setup] Failed to obtain Arena session — ticket/request tests will be skipped:",
      String(getErrorMessage(err)).slice(0, 200),
    );
    return;
  }
  try {
    if (process.env.TEST_ITEM_GUID) {
      sharedItemGuid = process.env.TEST_ITEM_GUID;
    } else {
      const itemsResp = await axios.get(`${BASE_URL}/v1/items?limit=1`, {
        headers: { arena_session_id: arenaSessionId },
      });
      const firstItem = (
        itemsResp.data.results as Array<{
          guid: string;
        }>
      )[0];
      sharedItemGuid = firstItem?.guid ?? "PLACEHOLDER_ITEM_GUID";
    }
    if (process.env.TEST_CHANGE_GUID) {
      sharedChangeGuid = process.env.TEST_CHANGE_GUID;
    } else {
      const changesResp = await axios.get(`${BASE_URL}/v1/changes?limit=1`, {
        headers: { arena_session_id: arenaSessionId },
      });
      const firstChange = (
        changesResp.data.results as Array<{
          guid: string;
        }>
      )[0];
      sharedChangeGuid = firstChange?.guid ?? "PLACEHOLDER_CHANGE_GUID";
    }
    if (process.env.TEST_QUALITY_GUID) {
      sharedQualityGuid = process.env.TEST_QUALITY_GUID;
    } else {
      const qualResp = await axios.get(`${BASE_URL}/v1/quality?limit=1`, {
        headers: { arena_session_id: arenaSessionId },
      });
      const firstQual = (
        qualResp.data.results as Array<{
          guid: string;
        }>
      )[0];
      sharedQualityGuid = firstQual?.guid ?? "PLACEHOLDER_QUALITY_GUID";
    }
    if (process.env.TEST_FILE_GUID) {
      sharedFileGuid = process.env.TEST_FILE_GUID;
    } else {
      const filesResp = await axios.get(`${BASE_URL}/v1/files?limit=1`, {
        headers: { arena_session_id: arenaSessionId },
      });
      const firstFile = (
        filesResp.data.results as Array<{
          guid: string;
        }>
      )[0];
      sharedFileGuid = firstFile?.guid ?? "PLACEHOLDER_FILE_GUID";
    }
    if (process.env.TEST_TICKET_GUID) {
      ticketGuid = process.env.TEST_TICKET_GUID;
    } else {
      const ticketsResp = await axios.get(`${BASE_URL}/v1/tickets?limit=1`, {
        headers: { arena_session_id: arenaSessionId },
      });
      const firstTicket = (
        ticketsResp.data.results as Array<{
          guid: string;
        }>
      )[0];
      ticketGuid = firstTicket?.guid ?? "PLACEHOLDER_TICKET_GUID";
    }
    const templatesResp = await axios.get(
      `${BASE_URL}/v1/settings/tickets/templates?active=true&limit=1`,
      { headers: { arena_session_id: arenaSessionId } },
    );
    const firstTemplate = (
      templatesResp.data.results as Array<{
        guid: string;
      }>
    )[0];
    ticketTemplateGuid = firstTemplate?.guid ?? "PLACEHOLDER_TEMPLATE_GUID";
    const ticketSeqResp = await axios.get(
      `${BASE_URL}/v1/settings/tickets/numbersequences?limit=1`,
      { headers: { arena_session_id: arenaSessionId } },
    );
    const firstTicketSeq = (
      ticketSeqResp.data.results as Array<{
        prefixes: Array<{
          value: string;
        }>;
      }>
    )[0];
    ticketNumberSequencePrefix = firstTicketSeq?.prefixes?.[0]?.value ?? "TKT-";
    if (process.env.TEST_REQUEST_GUID) {
      requestGuid = process.env.TEST_REQUEST_GUID;
    } else {
      const requestsResp = await axios.get(`${BASE_URL}/v1/requests?limit=1`, {
        headers: { arena_session_id: arenaSessionId },
      });
      const firstRequest = (
        requestsResp.data.results as Array<{
          guid: string;
        }>
      )[0];
      requestGuid = firstRequest?.guid ?? "PLACEHOLDER_REQUEST_GUID";
    }
  } catch (err: unknown) {
    featureAvailable = false;
    console.warn(
      "[Setup] Resource discovery failed — ticket/request tests will be skipped:",
      String(getErrorMessage(err)).slice(0, 200),
    );
  }
}, 60000);
afterAll(async () => {
  if (!arenaSessionId) return;
  if (ticketFileAssocGuid && createdTicketGuid) {
    await directDelete(
      `/tickets/${createdTicketGuid}/files/${ticketFileAssocGuid}`,
    );
  }
  if (ticketReferenceAssocGuid && createdTicketGuid) {
    await directDelete(
      `/tickets/${createdTicketGuid}/tickets/${ticketReferenceAssocGuid}`,
    );
  }
  if (ticketQualityAssocGuid && createdTicketGuid) {
    await directDelete(
      `/tickets/${createdTicketGuid}/quality/${ticketQualityAssocGuid}`,
    );
  }
  if (ticketItemAssocGuid && createdTicketGuid) {
    await directDelete(
      `/tickets/${createdTicketGuid}/items/${ticketItemAssocGuid}`,
    );
  }
  if (ticketChangeAssocGuid && createdTicketGuid) {
    await directDelete(
      `/tickets/${createdTicketGuid}/changes/${ticketChangeAssocGuid}`,
    );
  }
  if (createdTicketGuid2) {
    await directDelete(`/tickets/${createdTicketGuid2}`);
  }
  if (createdTicketGuid) {
    await directDelete(`/tickets/${createdTicketGuid}`);
  }
  if (requestFileAssocGuid && createdRequestGuid) {
    await directDelete(
      `/requests/${createdRequestGuid}/files/${requestFileAssocGuid}`,
    );
  }
  if (requestItemAssocGuid && createdRequestGuid) {
    await directDelete(
      `/requests/${createdRequestGuid}/items/${requestItemAssocGuid}`,
    );
  }
  if (createdRequestGuid) {
    await directDelete(`/requests/${createdRequestGuid}`);
  }
}, 60000);
describe("Action: listTicketTemplates", () => {
  test("returns a list of ticket templates", async () => {
    if (!featureAvailable) {
      console.warn(
        "Tickets/Requests feature not available in this workspace — skipping",
      );
      return;
    }
    const result = await harness.action("listTicketTemplates", {
      connection: testConnection,
    });
    expect(result).toBeDefined();
    expect(result!.data).toBeDefined();
    const data = result!.data as {
      count: number;
      results: unknown[];
    };
    expect(typeof data.count).toBe("number");
    expect(Array.isArray(data.results)).toBe(true);
  }, 30000);
  test("filters templates by active=true", async () => {
    if (!featureAvailable) {
      console.warn(
        "Tickets/Requests feature not available in this workspace — skipping",
      );
      return;
    }
    const result = await harness.action("listTicketTemplates", {
      connection: testConnection,
      active: true,
    });
    expect(result).toBeDefined();
    expect(result!.data).toBeDefined();
  }, 30000);
});
describe("Action: listTicketTemplateAttributes", () => {
  test("returns attributes for the first available template", async () => {
    if (!featureAvailable) {
      console.warn(
        "Tickets/Requests feature not available in this workspace — skipping",
      );
      return;
    }
    if (ticketTemplateGuid === "PLACEHOLDER_TEMPLATE_GUID") {
      return;
    }
    const result = await harness.action("listTicketTemplateAttributes", {
      connection: testConnection,
      templateGuid: ticketTemplateGuid,
    });
    expect(result).toBeDefined();
    expect(result!.data).toBeDefined();
  }, 30000);
  test("throws on invalid template GUID", async () => {
    if (!featureAvailable) {
      console.warn(
        "Tickets/Requests feature not available in this workspace — skipping",
      );
      return;
    }
    await expect(
      harness.action("listTicketTemplateAttributes", {
        connection: testConnection,
        templateGuid: "INVALIDTEMPLATEGUIDE00",
      }),
    ).rejects.toThrow();
  }, 30000);
  test("returns only creatable attributes when creatableOnly=true", async () => {
    if (!featureAvailable) {
      console.warn(
        "Tickets/Requests feature not available in this workspace — skipping",
      );
      return;
    }
    if (ticketTemplateGuid === "PLACEHOLDER_TEMPLATE_GUID") {
      return;
    }
    const result = await harness.action("listTicketTemplateAttributes", {
      connection: testConnection,
      templateGuid: ticketTemplateGuid,
      creatableOnly: true,
      includePossibleValues: false,
    });
    expect(result).toBeDefined();
    expect(result!.data).toBeDefined();
  }, 30000);
});
describe("Action: listTickets", () => {
  test("returns a paginated list of tickets", async () => {
    if (!featureAvailable) {
      console.warn(
        "Tickets/Requests feature not available in this workspace — skipping",
      );
      return;
    }
    const result = await harness.action("listTickets", {
      connection: testConnection,
      limit: 5,
      offset: 0,
    });
    expect(result).toBeDefined();
    expect(result!.data).toBeDefined();
    const data = result!.data as {
      count: number;
      results: unknown[];
    };
    expect(typeof data.count).toBe("number");
    expect(Array.isArray(data.results)).toBe(true);
  }, 30000);
  test("filters tickets by status NOT_STARTED", async () => {
    if (!featureAvailable) {
      console.warn(
        "Tickets/Requests feature not available in this workspace — skipping",
      );
      return;
    }
    const result = await harness.action("listTickets", {
      connection: testConnection,
      status: "NOT_STARTED",
      limit: 5,
    });
    expect(result).toBeDefined();
    expect(result!.data).toBeDefined();
  }, 30000);
});
describe("Action: getTicketByGuid", () => {
  test("returns ticket details for a valid GUID", async () => {
    if (!featureAvailable) {
      console.warn(
        "Tickets/Requests feature not available in this workspace — skipping",
      );
      return;
    }
    if (ticketGuid === "PLACEHOLDER_TICKET_GUID") {
      return;
    }
    const result = await harness.action("getTicketByGuid", {
      connection: testConnection,
      ticketGuid,
    });
    expect(result).toBeDefined();
    const data = result!.data as {
      guid: string;
    };
    expect(data.guid).toBe(ticketGuid);
  }, 30000);
  test("throws on an invalid ticket GUID", async () => {
    if (!featureAvailable) {
      console.warn(
        "Tickets/Requests feature not available in this workspace — skipping",
      );
      return;
    }
    await expect(
      harness.action("getTicketByGuid", {
        connection: testConnection,
        ticketGuid: "INVALIDGUID00000000000",
      }),
    ).rejects.toThrow();
  }, 30000);
});
describe("Action: createTicket", () => {
  test("creates a new ticket using templateGuid and numberSequencePrefix", async () => {
    if (!featureAvailable) {
      console.warn(
        "Tickets/Requests feature not available in this workspace — skipping",
      );
      return;
    }
    if (ticketTemplateGuid === "PLACEHOLDER_TEMPLATE_GUID") {
      return;
    }
    const result = await harness.action("createTicket", {
      connection: testConnection,
      templateGuid: ticketTemplateGuid,
      title: "Integration Test Ticket — createTicket",
      numberSequencePrefix: ticketNumberSequencePrefix,
    });
    expect(result).toBeDefined();
    expect(result!.data).toBeDefined();
    const data = result!.data as {
      guid: string;
      title: string;
    };
    expect(typeof data.guid).toBe("string");
    expect(data.guid.length).toBeGreaterThan(0);
    createdTicketGuid = data.guid;
  }, 30000);
  test("throws on invalid template GUID", async () => {
    if (!featureAvailable) {
      console.warn(
        "Tickets/Requests feature not available in this workspace — skipping",
      );
      return;
    }
    await expect(
      harness.action("createTicket", {
        connection: testConnection,
        templateGuid: "INVALIDTEMPLATEGUIDE00",
        title: "Should Fail",
      }),
    ).rejects.toThrow();
  }, 30000);
});
describe("Action: createTicket (second ticket for reference link tests)", () => {
  test("creates a second ticket to use as a reference target", async () => {
    if (!featureAvailable) {
      console.warn(
        "Tickets/Requests feature not available in this workspace — skipping",
      );
      return;
    }
    if (ticketTemplateGuid === "PLACEHOLDER_TEMPLATE_GUID") {
      return;
    }
    const result = await harness.action("createTicket", {
      connection: testConnection,
      templateGuid: ticketTemplateGuid,
      title: "Integration Test Ticket — reference target",
      numberSequencePrefix: ticketNumberSequencePrefix,
    });
    expect(result).toBeDefined();
    const data = result!.data as {
      guid: string;
    };
    createdTicketGuid2 = data.guid;
  }, 30000);
});
describe("Action: updateTicket", () => {
  test("updates the title of a created ticket", async () => {
    if (!featureAvailable) {
      console.warn(
        "Tickets/Requests feature not available in this workspace — skipping",
      );
      return;
    }
    if (!createdTicketGuid) {
      return;
    }
    const result = await harness.action("updateTicket", {
      connection: testConnection,
      ticketGuid: createdTicketGuid,
      title: "Integration Test Ticket — updated title",
    });
    expect(result).toBeDefined();
    expect(result!.data).toBeDefined();
    const data = result!.data as {
      guid: string;
      title: string;
    };
    expect(data.guid).toBe(createdTicketGuid);
    expect(data.title).toBe("Integration Test Ticket — updated title");
  }, 30000);
  test("throws on invalid ticket GUID", async () => {
    if (!featureAvailable) {
      console.warn(
        "Tickets/Requests feature not available in this workspace — skipping",
      );
      return;
    }
    await expect(
      harness.action("updateTicket", {
        connection: testConnection,
        ticketGuid: "INVALIDGUID00000000000",
        title: "Should fail",
      }),
    ).rejects.toThrow();
  }, 30000);
});
describe("Action: changeTicketStatus", () => {
  test("changes ticket status to IN_PROGRESS", async () => {
    if (!featureAvailable) {
      console.warn(
        "Tickets/Requests feature not available in this workspace — skipping",
      );
      return;
    }
    if (!createdTicketGuid) {
      return;
    }
    const result = await harness.action("changeTicketStatus", {
      connection: testConnection,
      ticketGuid: createdTicketGuid,
      status: "IN_PROGRESS",
    });
    expect(result).toBeDefined();
    expect(result!.data).toBeDefined();
  }, 30000);
  test("changes ticket status to COMPLETED", async () => {
    if (!featureAvailable) {
      console.warn(
        "Tickets/Requests feature not available in this workspace — skipping",
      );
      return;
    }
    if (!createdTicketGuid) {
      return;
    }
    const result = await harness.action("changeTicketStatus", {
      connection: testConnection,
      ticketGuid: createdTicketGuid,
      status: "COMPLETED",
    });
    expect(result).toBeDefined();
    expect(result!.data).toBeDefined();
  }, 30000);
  test("throws on invalid ticket GUID with COMPLETED status", async () => {
    if (!featureAvailable) {
      console.warn(
        "Tickets/Requests feature not available in this workspace — skipping",
      );
      return;
    }
    await expect(
      harness.action("changeTicketStatus", {
        connection: testConnection,
        ticketGuid: "INVALIDGUID00000000000",
        status: "COMPLETED",
      }),
    ).rejects.toThrow();
  }, 30000);
  test("throws on invalid ticket GUID with IN_PROGRESS status and notes", async () => {
    if (!featureAvailable) {
      console.warn(
        "Tickets/Requests feature not available in this workspace — skipping",
      );
      return;
    }
    await expect(
      harness.action("changeTicketStatus", {
        connection: testConnection,
        ticketGuid: "INVALIDGUID00000000000",
        status: "IN_PROGRESS",
        notes: "these notes should not appear in request body",
      }),
    ).rejects.toThrow();
  }, 30000);
});
describe("Action: listTicketFiles", () => {
  test("returns files for a valid ticket", async () => {
    if (!featureAvailable) {
      console.warn(
        "Tickets/Requests feature not available in this workspace — skipping",
      );
      return;
    }
    if (!createdTicketGuid) {
      return;
    }
    const result = await harness.action("listTicketFiles", {
      connection: testConnection,
      ticketGuid: createdTicketGuid,
    });
    expect(result).toBeDefined();
    expect(result!.data).toBeDefined();
    const data = result!.data as {
      count: number;
      results: unknown[];
    };
    expect(typeof data.count).toBe("number");
    expect(Array.isArray(data.results)).toBe(true);
  }, 30000);
  test("throws on invalid ticket GUID", async () => {
    if (!featureAvailable) {
      console.warn(
        "Tickets/Requests feature not available in this workspace — skipping",
      );
      return;
    }
    await expect(
      harness.action("listTicketFiles", {
        connection: testConnection,
        ticketGuid: "INVALIDGUID00000000000",
      }),
    ).rejects.toThrow();
  }, 30000);
});
describe("Action: addTicketFile", () => {
  test("links a file to a ticket and returns association with guid", async () => {
    if (!featureAvailable) {
      console.warn(
        "Tickets/Requests feature not available in this workspace — skipping",
      );
      return;
    }
    if (!createdTicketGuid || sharedFileGuid === "PLACEHOLDER_FILE_GUID") {
      return;
    }
    const result = await harness.action("addTicketFile", {
      connection: testConnection,
      ticketGuid: createdTicketGuid,
      fileGuid: sharedFileGuid,
    });
    expect(result).toBeDefined();
    expect(result!.data).toBeDefined();
    const data = result!.data as {
      guid: string;
    };
    expect(typeof data.guid).toBe("string");
    ticketFileAssocGuid = data.guid;
  }, 30000);
  test("throws on invalid ticket GUID", async () => {
    if (!featureAvailable) {
      console.warn(
        "Tickets/Requests feature not available in this workspace — skipping",
      );
      return;
    }
    await expect(
      harness.action("addTicketFile", {
        connection: testConnection,
        ticketGuid: "INVALIDGUID00000000000",
        fileGuid: sharedFileGuid || "PLACEHOLDER",
      }),
    ).rejects.toThrow();
  }, 30000);
});
describe("Action: removeTicketFile", () => {
  test("removes a ticket file association", async () => {
    if (!featureAvailable) {
      console.warn(
        "Tickets/Requests feature not available in this workspace — skipping",
      );
      return;
    }
    if (!createdTicketGuid || !ticketFileAssocGuid) {
      return;
    }
    const result = await harness.action("removeTicketFile", {
      connection: testConnection,
      ticketGuid: createdTicketGuid,
      associationGuid: ticketFileAssocGuid,
    });
    expect(result).toBeDefined();
    ticketFileAssocGuid = undefined;
  }, 30000);
  test("throws on invalid association GUID", async () => {
    if (!featureAvailable) {
      console.warn(
        "Tickets/Requests feature not available in this workspace — skipping",
      );
      return;
    }
    if (!createdTicketGuid) {
      return;
    }
    await expect(
      harness.action("removeTicketFile", {
        connection: testConnection,
        ticketGuid: createdTicketGuid,
        associationGuid: "INVALIDGUID00000000000",
      }),
    ).rejects.toThrow();
  }, 30000);
});
describe("Action: listTicketReferences", () => {
  test("returns ticket references for a valid ticket", async () => {
    if (!featureAvailable) {
      console.warn(
        "Tickets/Requests feature not available in this workspace — skipping",
      );
      return;
    }
    if (!createdTicketGuid) {
      return;
    }
    const result = await harness.action("listTicketReferences", {
      connection: testConnection,
      ticketGuid: createdTicketGuid,
    });
    expect(result).toBeDefined();
    expect(result!.data).toBeDefined();
    const data = result!.data as {
      count: number;
      results: unknown[];
    };
    expect(typeof data.count).toBe("number");
    expect(Array.isArray(data.results)).toBe(true);
  }, 30000);
});
describe("Action: addTicketReference", () => {
  test("links another ticket as a reference and returns association", async () => {
    if (!featureAvailable) {
      console.warn(
        "Tickets/Requests feature not available in this workspace — skipping",
      );
      return;
    }
    if (
      !createdTicketGuid ||
      !createdTicketGuid2 ||
      createdTicketGuid2 === createdTicketGuid
    ) {
      return;
    }
    const result = await harness.action("addTicketReference", {
      connection: testConnection,
      ticketGuid: createdTicketGuid,
      referencedTicketGuid: createdTicketGuid2,
    });
    expect(result).toBeDefined();
    expect(result!.data).toBeDefined();
    const data = result!.data as {
      guid: string;
    };
    expect(typeof data.guid).toBe("string");
    ticketReferenceAssocGuid = data.guid;
  }, 30000);
  test("throws on invalid ticket GUID", async () => {
    if (!featureAvailable) {
      console.warn(
        "Tickets/Requests feature not available in this workspace — skipping",
      );
      return;
    }
    await expect(
      harness.action("addTicketReference", {
        connection: testConnection,
        ticketGuid: "INVALIDGUID00000000000",
        referencedTicketGuid: "ANOTHERGUIDE0000000000",
      }),
    ).rejects.toThrow();
  }, 30000);
});
describe("Action: removeTicketReference", () => {
  test("removes a ticket-to-ticket reference association", async () => {
    if (!featureAvailable) {
      console.warn(
        "Tickets/Requests feature not available in this workspace — skipping",
      );
      return;
    }
    if (!createdTicketGuid || !ticketReferenceAssocGuid) {
      return;
    }
    const result = await harness.action("removeTicketReference", {
      connection: testConnection,
      ticketGuid: createdTicketGuid,
      associationGuid: ticketReferenceAssocGuid,
    });
    expect(result).toBeDefined();
    ticketReferenceAssocGuid = undefined;
  }, 30000);
  test("throws on invalid association GUID", async () => {
    if (!featureAvailable) {
      console.warn(
        "Tickets/Requests feature not available in this workspace — skipping",
      );
      return;
    }
    if (!createdTicketGuid) {
      return;
    }
    await expect(
      harness.action("removeTicketReference", {
        connection: testConnection,
        ticketGuid: createdTicketGuid,
        associationGuid: "INVALIDGUID00000000000",
      }),
    ).rejects.toThrow();
  }, 30000);
});
describe("Action: listTicketQualityProcesses", () => {
  test("returns quality processes for a valid ticket", async () => {
    if (!featureAvailable) {
      console.warn(
        "Tickets/Requests feature not available in this workspace — skipping",
      );
      return;
    }
    if (!createdTicketGuid) {
      return;
    }
    const result = await harness.action("listTicketQualityProcesses", {
      connection: testConnection,
      ticketGuid: createdTicketGuid,
    });
    expect(result).toBeDefined();
    expect(result!.data).toBeDefined();
    const data = result!.data as {
      count: number;
      results: unknown[];
    };
    expect(typeof data.count).toBe("number");
    expect(Array.isArray(data.results)).toBe(true);
  }, 30000);
});
describe("Action: addTicketQualityProcess", () => {
  test("links a quality process to a ticket without a step (root-level body)", async () => {
    if (!featureAvailable) {
      console.warn(
        "Tickets/Requests feature not available in this workspace — skipping",
      );
      return;
    }
    if (
      !createdTicketGuid ||
      sharedQualityGuid === "PLACEHOLDER_QUALITY_GUID"
    ) {
      return;
    }
    const existing = await axios
      .get(`${BASE_URL}/v1/tickets/${createdTicketGuid}/quality`, {
        headers: { arena_session_id: arenaSessionId },
      })
      .then((r) =>
        (
          r.data.results as Array<{
            guid: string;
            quality: {
              guid: string;
            };
          }>
        ).find((e) => e.quality.guid === sharedQualityGuid),
      )
      .catch(() => undefined);
    if (existing) {
      await directDelete(
        `/tickets/${createdTicketGuid}/quality/${existing.guid}`,
      );
    }
    const result = await harness.action("addTicketQualityProcess", {
      connection: testConnection,
      ticketGuid: createdTicketGuid,
      qualityProcessGuid: sharedQualityGuid,
    });
    expect(result).toBeDefined();
    expect(result!.data).toBeDefined();
    const data = result!.data as {
      guid: string;
      quality: {
        guid: string;
      };
    };
    expect(data.quality.guid).toBe(sharedQualityGuid);
    ticketQualityAssocGuid = data.guid;
  }, 30000);
  test("throws on invalid ticket GUID", async () => {
    if (!featureAvailable) {
      console.warn(
        "Tickets/Requests feature not available in this workspace — skipping",
      );
      return;
    }
    await expect(
      harness.action("addTicketQualityProcess", {
        connection: testConnection,
        ticketGuid: "INVALIDGUID00000000000",
        qualityProcessGuid: sharedQualityGuid || "PLACEHOLDER",
      }),
    ).rejects.toThrow();
  }, 30000);
});
describe("Action: removeTicketQualityProcess", () => {
  test("removes a ticket quality process association", async () => {
    if (!featureAvailable) {
      console.warn(
        "Tickets/Requests feature not available in this workspace — skipping",
      );
      return;
    }
    if (!createdTicketGuid || !ticketQualityAssocGuid) {
      return;
    }
    const result = await harness.action("removeTicketQualityProcess", {
      connection: testConnection,
      ticketGuid: createdTicketGuid,
      associationGuid: ticketQualityAssocGuid,
    });
    expect(result).toBeDefined();
    ticketQualityAssocGuid = undefined;
  }, 30000);
  test("throws on invalid association GUID", async () => {
    if (!featureAvailable) {
      console.warn(
        "Tickets/Requests feature not available in this workspace — skipping",
      );
      return;
    }
    if (!createdTicketGuid) {
      return;
    }
    await expect(
      harness.action("removeTicketQualityProcess", {
        connection: testConnection,
        ticketGuid: createdTicketGuid,
        associationGuid: "INVALIDGUID00000000000",
      }),
    ).rejects.toThrow();
  }, 30000);
});
describe("Action: listTicketItems", () => {
  test("returns items for a valid ticket", async () => {
    if (!featureAvailable) {
      console.warn(
        "Tickets/Requests feature not available in this workspace — skipping",
      );
      return;
    }
    if (!createdTicketGuid) {
      return;
    }
    const result = await harness.action("listTicketItems", {
      connection: testConnection,
      ticketGuid: createdTicketGuid,
    });
    expect(result).toBeDefined();
    expect(result!.data).toBeDefined();
    const data = result!.data as {
      count: number;
      results: unknown[];
    };
    expect(typeof data.count).toBe("number");
    expect(Array.isArray(data.results)).toBe(true);
  }, 30000);
});
describe("Action: addTicketItem", () => {
  test("links an item to a ticket and returns an association guid", async () => {
    if (!featureAvailable) {
      console.warn(
        "Tickets/Requests feature not available in this workspace — skipping",
      );
      return;
    }
    if (!createdTicketGuid || sharedItemGuid === "PLACEHOLDER_ITEM_GUID") {
      return;
    }
    const existing = await axios
      .get(`${BASE_URL}/v1/tickets/${createdTicketGuid}/items`, {
        headers: { arena_session_id: arenaSessionId },
      })
      .then((r) =>
        (
          r.data.results as Array<{
            guid: string;
            item: {
              guid: string;
            };
          }>
        ).find((e) => e.item.guid === sharedItemGuid),
      )
      .catch(() => undefined);
    if (existing) {
      await directDelete(
        `/tickets/${createdTicketGuid}/items/${existing.guid}`,
      );
    }
    const result = await harness.action("addTicketItem", {
      connection: testConnection,
      ticketGuid: createdTicketGuid,
      itemGuid: sharedItemGuid,
      latestRevisionAssociation: true,
    });
    expect(result).toBeDefined();
    expect(result!.data).toBeDefined();
    const data = result!.data as {
      guid: string;
      item: {
        guid: string;
      };
    };
    expect(typeof data.guid).toBe("string");
    ticketItemAssocGuid = data.guid;
  }, 30000);
  test("throws on invalid ticket GUID", async () => {
    if (!featureAvailable) {
      console.warn(
        "Tickets/Requests feature not available in this workspace — skipping",
      );
      return;
    }
    await expect(
      harness.action("addTicketItem", {
        connection: testConnection,
        ticketGuid: "INVALIDGUID00000000000",
        itemGuid: sharedItemGuid || "PLACEHOLDER",
      }),
    ).rejects.toThrow();
  }, 30000);
});
describe("Action: removeTicketItem", () => {
  test("removes a ticket item association", async () => {
    if (!featureAvailable) {
      console.warn(
        "Tickets/Requests feature not available in this workspace — skipping",
      );
      return;
    }
    if (!createdTicketGuid || !ticketItemAssocGuid) {
      return;
    }
    const result = await harness.action("removeTicketItem", {
      connection: testConnection,
      ticketGuid: createdTicketGuid,
      associationGuid: ticketItemAssocGuid,
    });
    expect(result).toBeDefined();
    ticketItemAssocGuid = undefined;
  }, 30000);
  test("throws on invalid association GUID", async () => {
    if (!featureAvailable) {
      console.warn(
        "Tickets/Requests feature not available in this workspace — skipping",
      );
      return;
    }
    if (!createdTicketGuid) {
      return;
    }
    await expect(
      harness.action("removeTicketItem", {
        connection: testConnection,
        ticketGuid: createdTicketGuid,
        associationGuid: "INVALIDGUID00000000000",
      }),
    ).rejects.toThrow();
  }, 30000);
});
describe("Action: listTicketChanges", () => {
  test("returns changes for a valid ticket", async () => {
    if (!featureAvailable) {
      console.warn(
        "Tickets/Requests feature not available in this workspace — skipping",
      );
      return;
    }
    if (!createdTicketGuid) {
      return;
    }
    const result = await harness.action("listTicketChanges", {
      connection: testConnection,
      ticketGuid: createdTicketGuid,
    });
    expect(result).toBeDefined();
    expect(result!.data).toBeDefined();
    const data = result!.data as {
      count: number;
      results: unknown[];
    };
    expect(typeof data.count).toBe("number");
    expect(Array.isArray(data.results)).toBe(true);
  }, 30000);
});
describe("Action: addTicketChange", () => {
  test("links a change to a ticket and returns an association guid", async () => {
    if (!featureAvailable) {
      console.warn(
        "Tickets/Requests feature not available in this workspace — skipping",
      );
      return;
    }
    if (!createdTicketGuid || sharedChangeGuid === "PLACEHOLDER_CHANGE_GUID") {
      return;
    }
    const existing = await axios
      .get(`${BASE_URL}/v1/tickets/${createdTicketGuid}/changes`, {
        headers: { arena_session_id: arenaSessionId },
      })
      .then((r) =>
        (
          r.data.results as Array<{
            guid: string;
            change: {
              guid: string;
            };
          }>
        ).find((e) => e.change.guid === sharedChangeGuid),
      )
      .catch(() => undefined);
    if (existing) {
      await directDelete(
        `/tickets/${createdTicketGuid}/changes/${existing.guid}`,
      );
    }
    const result = await harness.action("addTicketChange", {
      connection: testConnection,
      ticketGuid: createdTicketGuid,
      changeGuid: sharedChangeGuid,
    });
    expect(result).toBeDefined();
    expect(result!.data).toBeDefined();
    const data = result!.data as {
      guid: string;
    };
    expect(typeof data.guid).toBe("string");
    ticketChangeAssocGuid = data.guid;
  }, 30000);
  test("throws on invalid ticket GUID", async () => {
    if (!featureAvailable) {
      console.warn(
        "Tickets/Requests feature not available in this workspace — skipping",
      );
      return;
    }
    await expect(
      harness.action("addTicketChange", {
        connection: testConnection,
        ticketGuid: "INVALIDGUID00000000000",
        changeGuid: sharedChangeGuid || "PLACEHOLDER",
      }),
    ).rejects.toThrow();
  }, 30000);
});
describe("Action: removeTicketChange", () => {
  test("removes a ticket change association", async () => {
    if (!featureAvailable) {
      console.warn(
        "Tickets/Requests feature not available in this workspace — skipping",
      );
      return;
    }
    if (!createdTicketGuid || !ticketChangeAssocGuid) {
      return;
    }
    const result = await harness.action("removeTicketChange", {
      connection: testConnection,
      ticketGuid: createdTicketGuid,
      associationGuid: ticketChangeAssocGuid,
    });
    expect(result).toBeDefined();
    ticketChangeAssocGuid = undefined;
  }, 30000);
  test("throws on invalid association GUID", async () => {
    if (!featureAvailable) {
      console.warn(
        "Tickets/Requests feature not available in this workspace — skipping",
      );
      return;
    }
    if (!createdTicketGuid) {
      return;
    }
    await expect(
      harness.action("removeTicketChange", {
        connection: testConnection,
        ticketGuid: createdTicketGuid,
        associationGuid: "INVALIDGUID00000000000",
      }),
    ).rejects.toThrow();
  }, 30000);
});
describe("Action: deleteTicket", () => {
  test("deletes the second (reference target) ticket", async () => {
    if (!featureAvailable) {
      console.warn(
        "Tickets/Requests feature not available in this workspace — skipping",
      );
      return;
    }
    if (!createdTicketGuid2) {
      return;
    }
    const result = await harness.action("deleteTicket", {
      connection: testConnection,
      ticketGuid: createdTicketGuid2,
    });
    expect(result).toBeDefined();
    createdTicketGuid2 = undefined;
  }, 30000);
  test("throws on invalid ticket GUID", async () => {
    if (!featureAvailable) {
      console.warn(
        "Tickets/Requests feature not available in this workspace — skipping",
      );
      return;
    }
    await expect(
      harness.action("deleteTicket", {
        connection: testConnection,
        ticketGuid: "INVALIDGUID00000000000",
      }),
    ).rejects.toThrow();
  }, 30000);
});
describe("Action: listRequestNumberSequences", () => {
  test("returns request number sequences with objectType=requests", async () => {
    if (!featureAvailable) {
      console.warn(
        "Tickets/Requests feature not available in this workspace — skipping",
      );
      return;
    }
    const result = await harness.action("listRequestNumberSequences", {
      connection: testConnection,
      objectType: "requests",
    });
    expect(result).toBeDefined();
    expect(result!.data).toBeDefined();
    const data = result!.data as {
      count: number;
      results: unknown[];
    };
    expect(typeof data.count).toBe("number");
    expect(Array.isArray(data.results)).toBe(true);
  }, 30000);
  test("returns ticket number sequences with objectType=tickets", async () => {
    if (!featureAvailable) {
      console.warn(
        "Tickets/Requests feature not available in this workspace — skipping",
      );
      return;
    }
    const result = await harness.action("listRequestNumberSequences", {
      connection: testConnection,
      objectType: "tickets",
    });
    expect(result).toBeDefined();
    expect(result!.data).toBeDefined();
  }, 30000);
});
describe("Action: listRequestStatusChangeAttributes", () => {
  test("returns request status change attributes", async () => {
    if (!featureAvailable) {
      console.warn(
        "Tickets/Requests feature not available in this workspace — skipping",
      );
      return;
    }
    const result = await harness.action("listRequestStatusChangeAttributes", {
      connection: testConnection,
    });
    expect(result).toBeDefined();
    expect(result!.data).toBeDefined();
  }, 30000);
});
describe("Action: listRequestEvaluatorGroups", () => {
  test("returns evaluator groups", async () => {
    if (!featureAvailable) {
      console.warn(
        "Tickets/Requests feature not available in this workspace — skipping",
      );
      return;
    }
    const result = await harness.action("listRequestEvaluatorGroups", {
      connection: testConnection,
    });
    expect(result).toBeDefined();
    expect(result!.data).toBeDefined();
    const data = result!.data as {
      count: number;
      results: unknown[];
    };
    expect(typeof data.count).toBe("number");
    expect(Array.isArray(data.results)).toBe(true);
  }, 30000);
});
describe("Action: listRequestItemAttributes", () => {
  test("returns request item attributes without filters", async () => {
    if (!featureAvailable) {
      console.warn(
        "Tickets/Requests feature not available in this workspace — skipping",
      );
      return;
    }
    const result = await harness.action("listRequestItemAttributes", {
      connection: testConnection,
    });
    expect(result).toBeDefined();
    expect(result!.data).toBeDefined();
  }, 30000);
  test("returns creatable-only request item attributes", async () => {
    if (!featureAvailable) {
      console.warn(
        "Tickets/Requests feature not available in this workspace — skipping",
      );
      return;
    }
    const result = await harness.action("listRequestItemAttributes", {
      connection: testConnection,
      creatableOnly: "true",
    });
    expect(result).toBeDefined();
    expect(result!.data).toBeDefined();
  }, 30000);
});
describe("Action: listRequests", () => {
  test("returns a paginated list of requests", async () => {
    if (!featureAvailable) {
      console.warn(
        "Tickets/Requests feature not available in this workspace — skipping",
      );
      return;
    }
    const result = await harness.action("listRequests", {
      connection: testConnection,
      limit: 5,
      offset: 0,
    });
    expect(result).toBeDefined();
    expect(result!.data).toBeDefined();
    const data = result!.data as {
      count: number;
      results: unknown[];
    };
    expect(typeof data.count).toBe("number");
    expect(Array.isArray(data.results)).toBe(true);
  }, 30000);
  test("filters requests by lifecycleStatus UNSUBMITTED", async () => {
    if (!featureAvailable) {
      console.warn(
        "Tickets/Requests feature not available in this workspace — skipping",
      );
      return;
    }
    const result = await harness.action("listRequests", {
      connection: testConnection,
      lifecycleStatus: "UNSUBMITTED",
      limit: 5,
    });
    expect(result).toBeDefined();
    expect(result!.data).toBeDefined();
  }, 30000);
});
describe("Action: getRequestByGuid", () => {
  test("returns request detail for a valid GUID", async () => {
    if (!featureAvailable) {
      console.warn(
        "Tickets/Requests feature not available in this workspace — skipping",
      );
      return;
    }
    if (requestGuid === "PLACEHOLDER_REQUEST_GUID") {
      return;
    }
    const result = await harness.action("getRequestByGuid", {
      connection: testConnection,
      requestGuid,
    });
    expect(result).toBeDefined();
    const data = result!.data as {
      guid: string;
    };
    expect(data.guid).toBe(requestGuid);
  }, 30000);
  test("returns request with empty additional attributes included", async () => {
    if (!featureAvailable) {
      console.warn(
        "Tickets/Requests feature not available in this workspace — skipping",
      );
      return;
    }
    if (requestGuid === "PLACEHOLDER_REQUEST_GUID") {
      return;
    }
    const result = await harness.action("getRequestByGuid", {
      connection: testConnection,
      requestGuid,
      includeEmptyAdditionalAttributes: true,
    });
    expect(result).toBeDefined();
    expect(result!.data).toBeDefined();
  }, 30000);
  test("throws on invalid request GUID", async () => {
    if (!featureAvailable) {
      console.warn(
        "Tickets/Requests feature not available in this workspace — skipping",
      );
      return;
    }
    await expect(
      harness.action("getRequestByGuid", {
        connection: testConnection,
        requestGuid: "INVALIDGUID00000000000",
      }),
    ).rejects.toThrow();
  }, 30000);
});
describe("Action: createRequest", () => {
  test("creates a new UNSUBMITTED request", async () => {
    if (!featureAvailable) {
      console.warn(
        "Tickets/Requests feature not available in this workspace — skipping",
      );
      return;
    }
    const result = await harness.action("createRequest", {
      connection: testConnection,
      title: "Integration Test Request — createRequest",
      problem: "Automated integration test problem description.",
      requestedAction: "Automated integration test requested action.",
    });
    expect(result).toBeDefined();
    expect(result!.data).toBeDefined();
    const data = result!.data as {
      guid: string;
      title: string;
    };
    expect(typeof data.guid).toBe("string");
    expect(data.guid.length).toBeGreaterThan(0);
    createdRequestGuid = data.guid;
  }, 30000);
});
describe("Action: updateRequest", () => {
  test("updates the title of a created request", async () => {
    if (!featureAvailable) {
      console.warn(
        "Tickets/Requests feature not available in this workspace — skipping",
      );
      return;
    }
    if (!createdRequestGuid) {
      return;
    }
    const result = await harness.action("updateRequest", {
      connection: testConnection,
      requestGuid: createdRequestGuid,
      title: "Integration Test Request — updated title",
      problem: "Updated problem description.",
    });
    expect(result).toBeDefined();
    expect(result!.data).toBeDefined();
    const data = result!.data as {
      guid: string;
      title: string;
    };
    expect(data.guid).toBe(createdRequestGuid);
    expect(data.title).toBe("Integration Test Request — updated title");
  }, 30000);
  test("throws on invalid request GUID", async () => {
    if (!featureAvailable) {
      console.warn(
        "Tickets/Requests feature not available in this workspace — skipping",
      );
      return;
    }
    await expect(
      harness.action("updateRequest", {
        connection: testConnection,
        requestGuid: "INVALIDGUID00000000000",
        title: "Should fail",
      }),
    ).rejects.toThrow();
  }, 30000);
});
describe("Action: changeRequestStatus", () => {
  test("submits the created request (UNSUBMITTED -> SUBMITTED)", async () => {
    if (!featureAvailable) {
      console.warn(
        "Tickets/Requests feature not available in this workspace — skipping",
      );
      return;
    }
    if (!createdRequestGuid) {
      return;
    }
    const result = await harness.action("changeRequestStatus", {
      connection: testConnection,
      requestGuid: createdRequestGuid,
      status: "SUBMITTED",
      comment: "Automated integration test submission.",
    });
    expect(result).toBeDefined();
    expect(result!.data).toBeDefined();
  }, 30000);
  test("throws on invalid request GUID", async () => {
    if (!featureAvailable) {
      console.warn(
        "Tickets/Requests feature not available in this workspace — skipping",
      );
      return;
    }
    await expect(
      harness.action("changeRequestStatus", {
        connection: testConnection,
        requestGuid: "INVALIDGUID00000000000",
        status: "SUBMITTED",
      }),
    ).rejects.toThrow();
  }, 30000);
});
describe("Action: listRequestMarkupFiles", () => {
  test("returns markup files for a valid request", async () => {
    if (!featureAvailable) {
      console.warn(
        "Tickets/Requests feature not available in this workspace — skipping",
      );
      return;
    }
    if (!createdRequestGuid) {
      return;
    }
    const result = await harness.action("listRequestMarkupFiles", {
      connection: testConnection,
      requestGuid: createdRequestGuid,
    });
    expect(result).toBeDefined();
    expect(result!.data).toBeDefined();
    const data = result!.data as {
      count: number;
      results: unknown[];
    };
    expect(typeof data.count).toBe("number");
    expect(Array.isArray(data.results)).toBe(true);
  }, 30000);
  test("throws on invalid request GUID", async () => {
    if (!featureAvailable) {
      console.warn(
        "Tickets/Requests feature not available in this workspace — skipping",
      );
      return;
    }
    await expect(
      harness.action("listRequestMarkupFiles", {
        connection: testConnection,
        requestGuid: "INVALIDGUID00000000000",
      }),
    ).rejects.toThrow();
  }, 30000);
});
describe("Action: createRequestMarkupFile", () => {
  test("throws on invalid request GUID", async () => {
    if (!featureAvailable) {
      console.warn(
        "Tickets/Requests feature not available in this workspace — skipping",
      );
      return;
    }
    await expect(
      harness.action("createRequestMarkupFile", {
        connection: testConnection,
        requestGuid: "INVALIDGUID00000000000",
        markupGuid: "INVALIDMARKUPGUID00000",
      }),
    ).rejects.toThrow();
  }, 30000);
});
describe("Action: deleteRequestMarkupFile", () => {
  test("throws on invalid request GUID", async () => {
    if (!featureAvailable) {
      console.warn(
        "Tickets/Requests feature not available in this workspace — skipping",
      );
      return;
    }
    await expect(
      harness.action("deleteRequestMarkupFile", {
        connection: testConnection,
        requestGuid: "INVALIDGUID00000000000",
        requestFileAssociationGuid: "INVALIDASSOCGUID00000",
      }),
    ).rejects.toThrow();
  }, 30000);
});
describe("Action: listRequestFiles", () => {
  test("returns files for a valid request", async () => {
    if (!featureAvailable) {
      console.warn(
        "Tickets/Requests feature not available in this workspace — skipping",
      );
      return;
    }
    if (!createdRequestGuid) {
      return;
    }
    const result = await harness.action("listRequestFiles", {
      connection: testConnection,
      requestGuid: createdRequestGuid,
    });
    expect(result).toBeDefined();
    expect(result!.data).toBeDefined();
    const data = result!.data as {
      count: number;
      results: unknown[];
    };
    expect(typeof data.count).toBe("number");
    expect(Array.isArray(data.results)).toBe(true);
  }, 30000);
  test("throws on invalid request GUID", async () => {
    if (!featureAvailable) {
      console.warn(
        "Tickets/Requests feature not available in this workspace — skipping",
      );
      return;
    }
    await expect(
      harness.action("listRequestFiles", {
        connection: testConnection,
        requestGuid: "INVALIDGUID00000000000",
      }),
    ).rejects.toThrow();
  }, 30000);
});
describe("Action: attachFileToRequest", () => {
  test("attaches a file to a request and returns an association guid", async () => {
    if (!featureAvailable) {
      console.warn(
        "Tickets/Requests feature not available in this workspace — skipping",
      );
      return;
    }
    if (!createdRequestGuid || sharedFileGuid === "PLACEHOLDER_FILE_GUID") {
      return;
    }
    const result = await harness.action("attachFileToRequest", {
      connection: testConnection,
      requestGuid: createdRequestGuid,
      fileGuid: sharedFileGuid,
    });
    expect(result).toBeDefined();
    expect(result!.data).toBeDefined();
    const data = result!.data as {
      guid: string;
    };
    expect(typeof data.guid).toBe("string");
    requestFileAssocGuid = data.guid;
  }, 30000);
  test("throws on invalid request GUID", async () => {
    if (!featureAvailable) {
      console.warn(
        "Tickets/Requests feature not available in this workspace — skipping",
      );
      return;
    }
    await expect(
      harness.action("attachFileToRequest", {
        connection: testConnection,
        requestGuid: "INVALIDGUID00000000000",
        fileGuid: sharedFileGuid || "PLACEHOLDER",
      }),
    ).rejects.toThrow();
  }, 30000);
});
describe("Action: removeFileFromRequest", () => {
  test("removes a file association from a request", async () => {
    if (!featureAvailable) {
      console.warn(
        "Tickets/Requests feature not available in this workspace — skipping",
      );
      return;
    }
    if (!createdRequestGuid || !requestFileAssocGuid) {
      return;
    }
    const result = await harness.action("removeFileFromRequest", {
      connection: testConnection,
      requestGuid: createdRequestGuid,
      requestFileAssociationGuid: requestFileAssocGuid,
    });
    expect(result).toBeDefined();
    const data = result!.data as {
      success: boolean;
    };
    expect(data.success).toBe(true);
    requestFileAssocGuid = undefined;
  }, 30000);
  test("throws on invalid request GUID", async () => {
    if (!featureAvailable) {
      console.warn(
        "Tickets/Requests feature not available in this workspace — skipping",
      );
      return;
    }
    await expect(
      harness.action("removeFileFromRequest", {
        connection: testConnection,
        requestGuid: "INVALIDGUID00000000000",
        requestFileAssociationGuid: "INVALIDASSOCGUID00000",
      }),
    ).rejects.toThrow();
  }, 30000);
});
describe("Action: listRequestItems", () => {
  test("returns items for a valid request", async () => {
    if (!featureAvailable) {
      console.warn(
        "Tickets/Requests feature not available in this workspace — skipping",
      );
      return;
    }
    if (!createdRequestGuid) {
      return;
    }
    const result = await harness.action("listRequestItems", {
      connection: testConnection,
      requestGuid: createdRequestGuid,
    });
    expect(result).toBeDefined();
    expect(result!.data).toBeDefined();
    const data = result!.data as {
      count: number;
      results: unknown[];
    };
    expect(typeof data.count).toBe("number");
    expect(Array.isArray(data.results)).toBe(true);
  }, 30000);
});
describe("Action: addItemToRequest", () => {
  test("adds an item to a request and returns an association guid", async () => {
    if (!featureAvailable) {
      console.warn(
        "Tickets/Requests feature not available in this workspace — skipping",
      );
      return;
    }
    if (!createdRequestGuid || sharedItemGuid === "PLACEHOLDER_ITEM_GUID") {
      return;
    }
    const result = await harness.action("addItemToRequest", {
      connection: testConnection,
      requestGuid: createdRequestGuid,
      itemGuid: sharedItemGuid,
      notes: "Added by integration test",
    });
    expect(result).toBeDefined();
    expect(result!.data).toBeDefined();
    const data = result!.data as {
      guid: string;
    };
    expect(typeof data.guid).toBe("string");
    requestItemAssocGuid = data.guid;
  }, 30000);
  test("throws on invalid request GUID", async () => {
    if (!featureAvailable) {
      console.warn(
        "Tickets/Requests feature not available in this workspace — skipping",
      );
      return;
    }
    await expect(
      harness.action("addItemToRequest", {
        connection: testConnection,
        requestGuid: "INVALIDGUID00000000000",
        itemGuid: sharedItemGuid || "PLACEHOLDER",
      }),
    ).rejects.toThrow();
  }, 30000);
});
describe("Action: listRequestQualityProcesses", () => {
  test("returns quality processes for a valid request", async () => {
    if (!featureAvailable) {
      console.warn(
        "Tickets/Requests feature not available in this workspace — skipping",
      );
      return;
    }
    if (!createdRequestGuid) {
      return;
    }
    const result = await harness.action("listRequestQualityProcesses", {
      connection: testConnection,
      requestGuid: createdRequestGuid,
    });
    expect(result).toBeDefined();
    expect(result!.data).toBeDefined();
    const data = result!.data as {
      count: number;
      results: unknown[];
    };
    expect(typeof data.count).toBe("number");
    expect(Array.isArray(data.results)).toBe(true);
  }, 30000);
  test("throws on invalid request GUID", async () => {
    if (!featureAvailable) {
      console.warn(
        "Tickets/Requests feature not available in this workspace — skipping",
      );
      return;
    }
    await expect(
      harness.action("listRequestQualityProcesses", {
        connection: testConnection,
        requestGuid: "INVALIDGUID00000000000",
      }),
    ).rejects.toThrow();
  }, 30000);
});
describe("Action: listRequestChanges", () => {
  test("returns changes for a valid request", async () => {
    if (!featureAvailable) {
      console.warn(
        "Tickets/Requests feature not available in this workspace — skipping",
      );
      return;
    }
    if (!createdRequestGuid) {
      return;
    }
    const result = await harness.action("listRequestChanges", {
      connection: testConnection,
      requestGuid: createdRequestGuid,
    });
    expect(result).toBeDefined();
    expect(result!.data).toBeDefined();
    const data = result!.data as {
      count: number;
      results: unknown[];
    };
    expect(typeof data.count).toBe("number");
    expect(Array.isArray(data.results)).toBe(true);
  }, 30000);
  test("throws on invalid request GUID", async () => {
    if (!featureAvailable) {
      console.warn(
        "Tickets/Requests feature not available in this workspace — skipping",
      );
      return;
    }
    await expect(
      harness.action("listRequestChanges", {
        connection: testConnection,
        requestGuid: "INVALIDGUID00000000000",
      }),
    ).rejects.toThrow();
  }, 30000);
});
describe("Action: listRequestEvaluationIssues", () => {
  test("returns evaluation issues for a valid request", async () => {
    if (!featureAvailable) {
      console.warn(
        "Tickets/Requests feature not available in this workspace — skipping",
      );
      return;
    }
    if (!createdRequestGuid) {
      return;
    }
    const result = await harness.action("listRequestEvaluationIssues", {
      connection: testConnection,
      requestGuid: createdRequestGuid,
    });
    expect(result).toBeDefined();
    expect(result!.data).toBeDefined();
    const data = result!.data as {
      count: number;
      results: unknown[];
    };
    expect(typeof data.count).toBe("number");
    expect(Array.isArray(data.results)).toBe(true);
  }, 30000);
  test("throws on invalid request GUID", async () => {
    if (!featureAvailable) {
      console.warn(
        "Tickets/Requests feature not available in this workspace — skipping",
      );
      return;
    }
    await expect(
      harness.action("listRequestEvaluationIssues", {
        connection: testConnection,
        requestGuid: "INVALIDGUID00000000000",
      }),
    ).rejects.toThrow();
  }, 30000);
});
describe("Action: createRequestEvaluationIssue", () => {
  test("creates an evaluation issue for the request", async () => {
    if (!featureAvailable) {
      console.warn(
        "Tickets/Requests feature not available in this workspace — skipping",
      );
      return;
    }
    if (!createdRequestGuid) {
      return;
    }
    const result = await harness.action("createRequestEvaluationIssue", {
      connection: testConnection,
      requestGuid: createdRequestGuid,
      issue: "Integration test evaluation issue description.",
      supplierVisibility: false,
    });
    expect(result).toBeDefined();
    expect(result!.data).toBeDefined();
    const data = result!.data as {
      guid: string;
      issue: string;
    };
    expect(typeof data.guid).toBe("string");
    requestEvaluationIssueGuid = data.guid;
  }, 30000);
  test("throws on invalid request GUID", async () => {
    if (!featureAvailable) {
      console.warn(
        "Tickets/Requests feature not available in this workspace — skipping",
      );
      return;
    }
    await expect(
      harness.action("createRequestEvaluationIssue", {
        connection: testConnection,
        requestGuid: "INVALIDGUID00000000000",
        issue: "Should fail",
      }),
    ).rejects.toThrow();
  }, 30000);
});
describe("Action: addEvaluationIssueResponse", () => {
  test("adds a response to the evaluation issue", async () => {
    if (!featureAvailable) {
      console.warn(
        "Tickets/Requests feature not available in this workspace — skipping",
      );
      return;
    }
    if (!createdRequestGuid || !requestEvaluationIssueGuid) {
      return;
    }
    const result = await harness.action("addEvaluationIssueResponse", {
      connection: testConnection,
      requestGuid: createdRequestGuid,
      issueGuid: requestEvaluationIssueGuid,
      response: "Automated integration test response.",
    });
    expect(result).toBeDefined();
    expect(result!.data).toBeDefined();
    const data = result!.data as {
      guid: string;
    };
    expect(typeof data.guid).toBe("string");
  }, 30000);
  test("throws on invalid issue GUID", async () => {
    if (!featureAvailable) {
      console.warn(
        "Tickets/Requests feature not available in this workspace — skipping",
      );
      return;
    }
    if (!createdRequestGuid) {
      return;
    }
    await expect(
      harness.action("addEvaluationIssueResponse", {
        connection: testConnection,
        requestGuid: createdRequestGuid,
        issueGuid: "INVALIDGUID00000000000",
        response: "Should fail",
      }),
    ).rejects.toThrow();
  }, 30000);
});
describe("Action: listEvaluationIssueResponses", () => {
  test("returns responses for the evaluation issue", async () => {
    if (!featureAvailable) {
      console.warn(
        "Tickets/Requests feature not available in this workspace — skipping",
      );
      return;
    }
    if (!createdRequestGuid || !requestEvaluationIssueGuid) {
      return;
    }
    const result = await harness.action("listEvaluationIssueResponses", {
      connection: testConnection,
      requestGuid: createdRequestGuid,
      issueGuid: requestEvaluationIssueGuid,
    });
    expect(result).toBeDefined();
    expect(result!.data).toBeDefined();
    const data = result!.data as {
      count: number;
      results: unknown[];
    };
    expect(typeof data.count).toBe("number");
    expect(Array.isArray(data.results)).toBe(true);
    expect(data.count).toBeGreaterThanOrEqual(1);
  }, 30000);
  test("throws on invalid issue GUID", async () => {
    if (!featureAvailable) {
      console.warn(
        "Tickets/Requests feature not available in this workspace — skipping",
      );
      return;
    }
    if (!createdRequestGuid) {
      return;
    }
    await expect(
      harness.action("listEvaluationIssueResponses", {
        connection: testConnection,
        requestGuid: createdRequestGuid,
        issueGuid: "INVALIDGUID00000000000",
      }),
    ).rejects.toThrow();
  }, 30000);
});
describe("Action: changeEvaluationIssueStatus", () => {
  test("closes the evaluation issue", async () => {
    if (!featureAvailable) {
      console.warn(
        "Tickets/Requests feature not available in this workspace — skipping",
      );
      return;
    }
    if (!createdRequestGuid || !requestEvaluationIssueGuid) {
      return;
    }
    const result = await harness.action("changeEvaluationIssueStatus", {
      connection: testConnection,
      requestGuid: createdRequestGuid,
      issueGuid: requestEvaluationIssueGuid,
      status: "CLOSED",
      response: "Closing via integration test.",
    });
    expect(result).toBeDefined();
    expect(result!.data).toBeDefined();
  }, 30000);
  test("re-opens the evaluation issue", async () => {
    if (!featureAvailable) {
      console.warn(
        "Tickets/Requests feature not available in this workspace — skipping",
      );
      return;
    }
    if (!createdRequestGuid || !requestEvaluationIssueGuid) {
      return;
    }
    const result = await harness.action("changeEvaluationIssueStatus", {
      connection: testConnection,
      requestGuid: createdRequestGuid,
      issueGuid: requestEvaluationIssueGuid,
      status: "OPEN",
    });
    expect(result).toBeDefined();
    expect(result!.data).toBeDefined();
  }, 30000);
  test("throws on invalid issue GUID", async () => {
    if (!featureAvailable) {
      console.warn(
        "Tickets/Requests feature not available in this workspace — skipping",
      );
      return;
    }
    if (!createdRequestGuid) {
      return;
    }
    await expect(
      harness.action("changeEvaluationIssueStatus", {
        connection: testConnection,
        requestGuid: createdRequestGuid,
        issueGuid: "INVALIDGUID00000000000",
        status: "CLOSED",
      }),
    ).rejects.toThrow();
  }, 30000);
});
describe("Action: deleteRequest", () => {
  test("deletes the created request", async () => {
    if (!featureAvailable) {
      console.warn(
        "Tickets/Requests feature not available in this workspace — skipping",
      );
      return;
    }
    if (!createdRequestGuid) {
      return;
    }
    const result = await harness.action("deleteRequest", {
      connection: testConnection,
      requestGuid: createdRequestGuid,
    });
    expect(result).toBeDefined();
    const data = result!.data as {
      success: boolean;
      message: string;
    };
    expect(data.success).toBe(true);
    createdRequestGuid = undefined;
  }, 30000);
  test("throws on invalid request GUID", async () => {
    if (!featureAvailable) {
      console.warn(
        "Tickets/Requests feature not available in this workspace — skipping",
      );
      return;
    }
    await expect(
      harness.action("deleteRequest", {
        connection: testConnection,
        requestGuid: "INVALIDGUID00000000000",
      }),
    ).rejects.toThrow();
  }, 30000);
});
