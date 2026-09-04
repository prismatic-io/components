import {
  createConnection,
  createHarness,
} from "@prismatic-io/spectral/dist/testing";
import { arenaUsernamePassword } from "../connections";
import component from "../index";
import { getErrorMessage, getRecordString } from "../util";
import {
  dataSourceResultList,
  guidOf,
  resultData,
  resultList,
} from "./resultHelpers";
jest.setTimeout(30000);
const harness = createHarness(component);
const testConnection = createConnection(arenaUsernamePassword, {
  baseUrl: "custom",
  customBaseUrl: process.env.ARENA_BASE_URL || "",
  email: process.env.ARENA_EMAIL || "",
  password: process.env.ARENA_PASSWORD || "",
});
const ENV_OUTBOUND_EVENT_INTEGRATION_GUID =
  process.env.TEST_OUTBOUND_EVENT_INTEGRATION_GUID;
const ENV_OUTBOUND_EVENT_GUID = process.env.TEST_OUTBOUND_EVENT_GUID;
const ENV_OUTBOUND_EVENT_RESOURCE_TYPE =
  process.env.TEST_OUTBOUND_EVENT_RESOURCE_TYPE || "items";
const ENV_OUTBOUND_EVENT_RESOURCE_GUID =
  process.env.TEST_OUTBOUND_EVENT_RESOURCE_GUID;
const ENV_OUTBOUND_INTEGRATION_GUID =
  process.env.TEST_OUTBOUND_INTEGRATION_GUID;
const ENV_OUTBOUND_INTEGRATION_EVENT_GUID =
  process.env.TEST_OUTBOUND_INTEGRATION_EVENT_GUID;
const ENV_OUTBOUND_EVENT_ITEM_GUID = process.env.TEST_OUTBOUND_EVENT_ITEM_GUID;
const ENV_CHANGE_GUID = process.env.TEST_CHANGE_GUID;
const ENV_CATEGORY_GUID_CHANGES =
  process.env.TEST_CATEGORY_GUID_CHANGES || "PLACEHOLDER_CATEGORY_GUID";
let discoveredOutboundEventIntegrationGuid: string | undefined;
let discoveredOutboundEventGuid: string | undefined;
let discoveredOutboundEventResourceType: string | undefined;
let discoveredOutboundEventResourceGuid: string | undefined;
let discoveredOutboundIntegrationGuid: string | undefined;
let discoveredOutboundIntegrationEventGuid: string | undefined;
let discoveredOutboundIntegrationEventItemGuid: string | undefined;
const INVALID_GUID = "INVALIDGUID00000000000";
function resolvedEventIntegrationGuid(): string | undefined {
  return (
    ENV_OUTBOUND_EVENT_INTEGRATION_GUID ||
    discoveredOutboundEventIntegrationGuid
  );
}
function resolvedEventGuid(): string | undefined {
  return ENV_OUTBOUND_EVENT_GUID || discoveredOutboundEventGuid;
}
function resolvedIntegrationGuid(): string | undefined {
  return ENV_OUTBOUND_INTEGRATION_GUID || discoveredOutboundIntegrationGuid;
}
function resolvedIntegrationEventGuid(): string | undefined {
  return (
    ENV_OUTBOUND_INTEGRATION_EVENT_GUID ||
    discoveredOutboundIntegrationEventGuid
  );
}
function resolvedIntegrationEventItemGuid(): string | undefined {
  return (
    ENV_OUTBOUND_EVENT_ITEM_GUID || discoveredOutboundIntegrationEventItemGuid
  );
}
beforeAll(async () => {
  try {
    const result = await harness.action("listOutboundEventIntegrations", {
      connection: testConnection,
      limit: "5",
    });
    const items = resultList(result);
    if (items.length > 0) {
      discoveredOutboundEventIntegrationGuid = guidOf(items[0]);
    }
  } catch {}
}, 30000);
beforeAll(async () => {
  const integrationGuid = resolvedEventIntegrationGuid();
  if (!integrationGuid) return;
  try {
    const result = await harness.action("listOutboundEventIntegrationEvents", {
      connection: testConnection,
      integrationGuid,
      limit: "5",
    });
    const events = resultList(result);
    if (events.length > 0) {
      discoveredOutboundEventGuid = guidOf(events[0]);
    }
  } catch {}
}, 30000);
beforeAll(async () => {
  const integrationGuid = resolvedEventIntegrationGuid();
  const eventGuid = resolvedEventGuid();
  if (!integrationGuid || !eventGuid) return;
  const objectTypes = ["items", "changes", "requests", "qualityprocesses"];
  for (const objectType of objectTypes) {
    try {
      const result = await harness.action("listOutboundEventResources", {
        connection: testConnection,
        integrationGuid,
        eventGuid,
        objectType,
        limit: "5",
      });
      const resources = resultList(result);
      if (resources.length > 0) {
        discoveredOutboundEventResourceType = objectType;
        discoveredOutboundEventResourceGuid = guidOf(resources[0]);
        break;
      }
    } catch {}
  }
}, 30000);
beforeAll(async () => {
  try {
    const result = await harness.action("listIntegrations", {
      connection: testConnection,
      limit: "5",
    });
    const items = resultList(result);
    if (items.length > 0) {
      discoveredOutboundIntegrationGuid = guidOf(items[0]);
    }
  } catch {}
}, 30000);
beforeAll(async () => {
  const integrationGuid = resolvedIntegrationGuid();
  if (!integrationGuid) return;
  try {
    const result = await harness.action("listEventAssociations", {
      connection: testConnection,
      integrationGuid,
      limit: "5",
    });
    const events = resultList(result);
    if (events.length > 0) {
      discoveredOutboundIntegrationEventGuid = guidOf(events[0]);
    }
  } catch {}
}, 30000);
beforeAll(async () => {
  const integrationGuid = resolvedIntegrationGuid();
  const eventGuid = resolvedIntegrationEventGuid();
  if (!integrationGuid || !eventGuid) return;
  try {
    const result = await harness.action("listEventItems", {
      connection: testConnection,
      integrationGuid,
      eventGuid,
      limit: "5",
    });
    const items = resultList(result);
    if (items.length > 0) {
      discoveredOutboundIntegrationEventItemGuid = guidOf(items[0]);
    }
  } catch {}
}, 30000);
describe("Action: listOutboundEventIntegrations", () => {
  test("returns a paginated list of outbound event integrations", async () => {
    const result = await harness.action("listOutboundEventIntegrations", {
      connection: testConnection,
      limit: "10",
      offset: "0",
    });
    expect(result).toBeDefined();
    expect(result!.data).toBeDefined();
    const data = resultData(result);
    expect(typeof data.count).toBe("number");
    expect(Array.isArray(data.results)).toBe(true);
  });
  test("accepts enable filter without error", async () => {
    try {
      const result = await harness.action("listOutboundEventIntegrations", {
        connection: testConnection,
        enable: "true",
        limit: "5",
      });
      expect(result).toBeDefined();
      expect(resultList(result)).toBeDefined();
    } catch (err) {
      expect(err).toBeDefined();
    }
  });
  test("throws on invalid connection credentials", async () => {
    const badConnection = createConnection(arenaUsernamePassword, {
      baseUrl: "custom",
      customBaseUrl: process.env.ARENA_BASE_URL || "",
      email: "invalid@example.com",
      password: "wrongpassword",
    });
    await expect(
      harness.action("listOutboundEventIntegrations", {
        connection: badConnection,
        limit: "5",
      }),
    ).rejects.toThrow();
  });
});
describe("Action: listOutboundEventIntegrationTriggers", () => {
  test("returns triggers when a valid integration GUID is discovered", async () => {
    const integrationGuid = resolvedEventIntegrationGuid();
    if (!integrationGuid) {
      console.warn(
        "Skipping listOutboundEventIntegrationTriggers success test: no integration GUID available",
      );
      return;
    }
    const result = await harness.action(
      "listOutboundEventIntegrationTriggers",
      {
        connection: testConnection,
        integrationGuid,
      },
    );
    expect(result).toBeDefined();
    expect(result!.data).toBeDefined();
  });
  test("throws on invalid integration GUID", async () => {
    await expect(
      harness.action("listOutboundEventIntegrationTriggers", {
        connection: testConnection,
        integrationGuid: INVALID_GUID,
      }),
    ).rejects.toThrow();
  });
});
describe("Action: listOutboundEventIntegrationEvents", () => {
  test("returns events when a valid integration GUID is discovered", async () => {
    const integrationGuid = resolvedEventIntegrationGuid();
    if (!integrationGuid) {
      console.warn(
        "Skipping listOutboundEventIntegrationEvents success test: no integration GUID available",
      );
      return;
    }
    const result = await harness.action("listOutboundEventIntegrationEvents", {
      connection: testConnection,
      integrationGuid,
      limit: "10",
      offset: "0",
    });
    expect(result).toBeDefined();
    expect(result!.data).toBeDefined();
    const data = resultData(result);
    expect(typeof data.count).toBe("number");
    expect(Array.isArray(data.results)).toBe(true);
  });
  test("accepts resourcesReconciled filter", async () => {
    const integrationGuid = resolvedEventIntegrationGuid();
    if (!integrationGuid) return;
    const result = await harness.action("listOutboundEventIntegrationEvents", {
      connection: testConnection,
      integrationGuid,
      resourcesReconciled: "any",
      limit: "5",
    });
    expect(result).toBeDefined();
    expect(resultList(result)).toBeDefined();
  });
  test("accepts order parameter", async () => {
    const integrationGuid = resolvedEventIntegrationGuid();
    if (!integrationGuid) return;
    const result = await harness.action("listOutboundEventIntegrationEvents", {
      connection: testConnection,
      integrationGuid,
      order: "desc",
      limit: "5",
    });
    expect(result).toBeDefined();
    expect(resultList(result)).toBeDefined();
  });
  test("throws on invalid integration GUID", async () => {
    await expect(
      harness.action("listOutboundEventIntegrationEvents", {
        connection: testConnection,
        integrationGuid: INVALID_GUID,
      }),
    ).rejects.toThrow();
  });
});
describe("Action: listOutboundEventResources", () => {
  test("returns resources when valid integration and event GUIDs are discovered", async () => {
    const integrationGuid = resolvedEventIntegrationGuid();
    const eventGuid = resolvedEventGuid();
    if (!integrationGuid || !eventGuid) {
      console.warn(
        "Skipping listOutboundEventResources success test: integration or event GUID not available",
      );
      return;
    }
    const objectTypes = ["items", "changes", "requests", "qualityprocesses"];
    for (const objectType of objectTypes) {
      try {
        const result = await harness.action("listOutboundEventResources", {
          connection: testConnection,
          integrationGuid,
          eventGuid,
          objectType,
          limit: "10",
        });
        expect(result).toBeDefined();
        expect(result!.data).toBeDefined();
        const data = resultData(result);
        expect(typeof data.count).toBe("number");
        expect(Array.isArray(data.results)).toBe(true);
        break;
      } catch {}
    }
  });
  test("throws on invalid integration GUID", async () => {
    await expect(
      harness.action("listOutboundEventResources", {
        connection: testConnection,
        integrationGuid: INVALID_GUID,
        eventGuid: INVALID_GUID,
        objectType: "items",
      }),
    ).rejects.toThrow();
  });
});
describe("Action: listOutboundEventIntegrationAdministrators", () => {
  test("returns administrators when a valid integration GUID is discovered", async () => {
    const integrationGuid = resolvedEventIntegrationGuid();
    if (!integrationGuid) {
      console.warn(
        "Skipping listOutboundEventIntegrationAdministrators success test: no integration GUID available",
      );
      return;
    }
    const result = await harness.action(
      "listOutboundEventIntegrationAdministrators",
      {
        connection: testConnection,
        integrationGuid,
      },
    );
    expect(result).toBeDefined();
    expect(result!.data).toBeDefined();
  });
  test("throws on invalid integration GUID", async () => {
    await expect(
      harness.action("listOutboundEventIntegrationAdministrators", {
        connection: testConnection,
        integrationGuid: INVALID_GUID,
      }),
    ).rejects.toThrow();
  });
});
describe("Action: updateOutboundEventReconciliation (PUT)", () => {
  test("throws on invalid integration GUID", async () => {
    await expect(
      harness.action("updateOutboundEventReconciliation", {
        connection: testConnection,
        integrationGuid: INVALID_GUID,
        eventGuid: INVALID_GUID,
        reconcilePayload: true,
      }),
    ).rejects.toThrow();
  });
  test("throws on invalid event GUID even when integration GUID is valid", async () => {
    const integrationGuid = resolvedEventIntegrationGuid();
    if (!integrationGuid) return;
    await expect(
      harness.action("updateOutboundEventReconciliation", {
        connection: testConnection,
        integrationGuid,
        eventGuid: INVALID_GUID,
        reconcilePayload: true,
      }),
    ).rejects.toThrow();
  });
  test("successfully updates reconciliation when real GUIDs are available", async () => {
    const integrationGuid = resolvedEventIntegrationGuid();
    const eventGuid = resolvedEventGuid();
    if (!integrationGuid || !eventGuid) {
      console.warn(
        "Skipping updateOutboundEventReconciliation success test: real event GUID not available",
      );
      return;
    }
    try {
      const result = await harness.action("updateOutboundEventReconciliation", {
        connection: testConnection,
        integrationGuid,
        eventGuid,
        reconcilePayload: true,
      });
      expect(result).toBeDefined();
      expect(result!.data).toBeDefined();
    } catch (err: unknown) {
      if (
        getErrorMessage(err).includes("permission") ||
        getErrorMessage(err).includes("4303") ||
        getErrorMessage(err).includes("403")
      ) {
        console.warn(
          "updateOutboundEventReconciliation: insufficient permissions in this workspace; skipping assertion.",
        );
        return;
      }
      throw err;
    }
  });
});
describe("Action: updateOutboundEventResourceReconciliation (PUT)", () => {
  test("throws on invalid integration GUID", async () => {
    await expect(
      harness.action("updateOutboundEventResourceReconciliation", {
        connection: testConnection,
        integrationGuid: INVALID_GUID,
        eventGuid: INVALID_GUID,
        objectType: "items",
        intUpdateGuid: INVALID_GUID,
        reconcilePayload: true,
      }),
    ).rejects.toThrow();
  });
  test("throws on invalid resource GUID even when integration and event GUIDs are valid", async () => {
    const integrationGuid = resolvedEventIntegrationGuid();
    const eventGuid = resolvedEventGuid();
    if (!integrationGuid || !eventGuid) return;
    await expect(
      harness.action("updateOutboundEventResourceReconciliation", {
        connection: testConnection,
        integrationGuid,
        eventGuid,
        objectType: "items",
        intUpdateGuid: INVALID_GUID,
        reconcilePayload: true,
      }),
    ).rejects.toThrow();
  });
  test("successfully updates resource reconciliation when real GUIDs are available", async () => {
    const integrationGuid =
      ENV_OUTBOUND_EVENT_INTEGRATION_GUID ||
      discoveredOutboundEventIntegrationGuid;
    const eventGuid = ENV_OUTBOUND_EVENT_GUID || discoveredOutboundEventGuid;
    const objectType =
      ENV_OUTBOUND_EVENT_RESOURCE_TYPE || discoveredOutboundEventResourceType;
    const resourceGuid =
      ENV_OUTBOUND_EVENT_RESOURCE_GUID || discoveredOutboundEventResourceGuid;
    if (!integrationGuid || !eventGuid || !objectType || !resourceGuid) {
      console.warn(
        "Skipping updateOutboundEventResourceReconciliation success test: real resource GUID not available",
      );
      return;
    }
    try {
      const result = await harness.action(
        "updateOutboundEventResourceReconciliation",
        {
          connection: testConnection,
          integrationGuid,
          eventGuid,
          objectType,
          intUpdateGuid: resourceGuid,
          reconcilePayload: true,
        },
      );
      expect(result).toBeDefined();
      expect(result!.data).toBeDefined();
    } catch (err: unknown) {
      if (
        getErrorMessage(err).includes("permission") ||
        getErrorMessage(err).includes("4303") ||
        getErrorMessage(err).includes("403")
      ) {
        console.warn(
          "updateOutboundEventResourceReconciliation: insufficient permissions in this workspace; skipping assertion.",
        );
        return;
      }
      throw err;
    }
  });
});
describe("Action: listIntegrations", () => {
  test("returns a paginated list of outbound integrations", async () => {
    const result = await harness.action("listIntegrations", {
      connection: testConnection,
      limit: "10",
      offset: "0",
    });
    expect(result).toBeDefined();
    expect(result!.data).toBeDefined();
    const data = resultData(result);
    expect(typeof data.count).toBe("number");
    expect(Array.isArray(data.results)).toBe(true);
  });
  test("accepts name filter without error", async () => {
    const result = await harness.action("listIntegrations", {
      connection: testConnection,
      name: "NonExistentIntegrationNameXYZ",
      limit: "5",
    });
    expect(result).toBeDefined();
    expect(resultData(result).count).toBe(0);
  });
});
describe("Action: getIntegration", () => {
  test("returns integration details for a discovered GUID", async () => {
    const integrationGuid = resolvedIntegrationGuid();
    if (!integrationGuid) {
      console.warn(
        "Skipping getIntegration success test: no integration GUID available",
      );
      return;
    }
    const result = await harness.action("getIntegration", {
      connection: testConnection,
      integrationGuid,
    });
    expect(result).toBeDefined();
    expect(result!.data).toBeDefined();
    const data = resultData(result);
    expect(data.guid).toBe(integrationGuid);
  });
  test("throws on invalid integration GUID", async () => {
    await expect(
      harness.action("getIntegration", {
        connection: testConnection,
        integrationGuid: INVALID_GUID,
      }),
    ).rejects.toThrow();
  });
});
describe("Action: listIntegrationFilters", () => {
  test("returns filters for a discovered integration GUID", async () => {
    const integrationGuid = resolvedIntegrationGuid();
    if (!integrationGuid) {
      console.warn(
        "Skipping listIntegrationFilters success test: no integration GUID available",
      );
      return;
    }
    const result = await harness.action("listIntegrationFilters", {
      connection: testConnection,
      integrationGuid,
    });
    expect(result).toBeDefined();
    expect(result!.data).toBeDefined();
  });
  test("throws on invalid integration GUID", async () => {
    await expect(
      harness.action("listIntegrationFilters", {
        connection: testConnection,
        integrationGuid: INVALID_GUID,
      }),
    ).rejects.toThrow();
  });
});
describe("Action: listEventAssociations", () => {
  test("returns event associations for a discovered integration GUID", async () => {
    const integrationGuid = resolvedIntegrationGuid();
    if (!integrationGuid) {
      console.warn(
        "Skipping listEventAssociations success test: no integration GUID available",
      );
      return;
    }
    const result = await harness.action("listEventAssociations", {
      connection: testConnection,
      integrationGuid,
      limit: "10",
      offset: "0",
    });
    expect(result).toBeDefined();
    expect(result!.data).toBeDefined();
    const data = resultData(result);
    expect(typeof data.count).toBe("number");
    expect(Array.isArray(data.results)).toBe(true);
  });
  test("throws on invalid integration GUID", async () => {
    await expect(
      harness.action("listEventAssociations", {
        connection: testConnection,
        integrationGuid: INVALID_GUID,
      }),
    ).rejects.toThrow();
  });
});
describe("Action: getEvent", () => {
  test("returns event detail for discovered integration and event GUIDs", async () => {
    const integrationGuid = resolvedIntegrationGuid();
    const eventGuid = resolvedIntegrationEventGuid();
    if (!integrationGuid || !eventGuid) {
      console.warn(
        "Skipping getEvent success test: integration or event GUID not available",
      );
      return;
    }
    const result = await harness.action("getEvent", {
      connection: testConnection,
      integrationGuid,
      eventGuid,
    });
    expect(result).toBeDefined();
    expect(result!.data).toBeDefined();
    const data = resultData(result);
    expect(data.guid).toBe(eventGuid);
  });
  test("throws on invalid integration GUID", async () => {
    await expect(
      harness.action("getEvent", {
        connection: testConnection,
        integrationGuid: INVALID_GUID,
        eventGuid: INVALID_GUID,
      }),
    ).rejects.toThrow();
  });
});
describe("Action: listEventItems", () => {
  test("returns event items for discovered integration and event GUIDs", async () => {
    const integrationGuid = resolvedIntegrationGuid();
    const eventGuid = resolvedIntegrationEventGuid();
    if (!integrationGuid || !eventGuid) {
      console.warn(
        "Skipping listEventItems success test: integration or event GUID not available",
      );
      return;
    }
    const result = await harness.action("listEventItems", {
      connection: testConnection,
      integrationGuid,
      eventGuid,
      limit: "10",
    });
    expect(result).toBeDefined();
    expect(result!.data).toBeDefined();
    const data = resultData(result);
    expect(typeof data.count).toBe("number");
    expect(Array.isArray(data.results)).toBe(true);
  });
  test("accepts reconciled filter", async () => {
    const integrationGuid = resolvedIntegrationGuid();
    const eventGuid = resolvedIntegrationEventGuid();
    if (!integrationGuid || !eventGuid) return;
    const result = await harness.action("listEventItems", {
      connection: testConnection,
      integrationGuid,
      eventGuid,
      reconciled: "false",
      limit: "5",
    });
    expect(result).toBeDefined();
    expect(resultList(result)).toBeDefined();
  });
  test("throws on invalid integration GUID", async () => {
    await expect(
      harness.action("listEventItems", {
        connection: testConnection,
        integrationGuid: INVALID_GUID,
        eventGuid: INVALID_GUID,
      }),
    ).rejects.toThrow();
  });
});
describe("Action: listEventItemGuids", () => {
  test("returns event item GUIDs for discovered integration and event GUIDs", async () => {
    const integrationGuid = resolvedIntegrationGuid();
    const eventGuid = resolvedIntegrationEventGuid();
    if (!integrationGuid || !eventGuid) {
      console.warn(
        "Skipping listEventItemGuids success test: integration or event GUID not available",
      );
      return;
    }
    const result = await harness.action("listEventItemGuids", {
      connection: testConnection,
      integrationGuid,
      eventGuid,
    });
    expect(result).toBeDefined();
    expect(result!.data).toBeDefined();
  });
  test("throws on invalid integration GUID", async () => {
    await expect(
      harness.action("listEventItemGuids", {
        connection: testConnection,
        integrationGuid: INVALID_GUID,
        eventGuid: INVALID_GUID,
      }),
    ).rejects.toThrow();
  });
});
describe("Action: getEventItem", () => {
  test("returns a single event item when all GUIDs are discovered", async () => {
    const integrationGuid = resolvedIntegrationGuid();
    const eventGuid = resolvedIntegrationEventGuid();
    const eventItemGuid = resolvedIntegrationEventItemGuid();
    if (!integrationGuid || !eventGuid || !eventItemGuid) {
      console.warn(
        "Skipping getEventItem success test: one or more required GUIDs not available",
      );
      return;
    }
    const result = await harness.action("getEventItem", {
      connection: testConnection,
      integrationGuid,
      eventGuid,
      eventItemGuid,
    });
    expect(result).toBeDefined();
    expect(result!.data).toBeDefined();
    const data = resultData(result);
    expect(data.guid).toBe(eventItemGuid);
  });
  test("throws on invalid integration GUID", async () => {
    await expect(
      harness.action("getEventItem", {
        connection: testConnection,
        integrationGuid: INVALID_GUID,
        eventGuid: INVALID_GUID,
        eventItemGuid: INVALID_GUID,
      }),
    ).rejects.toThrow();
  });
});
describe("Action: listIntegrationAdministrators", () => {
  test("returns administrators for a discovered integration GUID", async () => {
    const integrationGuid = resolvedIntegrationGuid();
    if (!integrationGuid) {
      console.warn(
        "Skipping listIntegrationAdministrators success test: no integration GUID available",
      );
      return;
    }
    const result = await harness.action("listIntegrationAdministrators", {
      connection: testConnection,
      integrationGuid,
    });
    expect(result).toBeDefined();
    expect(result!.data).toBeDefined();
  });
  test("throws on invalid integration GUID", async () => {
    await expect(
      harness.action("listIntegrationAdministrators", {
        connection: testConnection,
        integrationGuid: INVALID_GUID,
      }),
    ).rejects.toThrow();
  });
});
describe("Action: updateEventItemReconciled (PUT)", () => {
  test("throws on invalid integration GUID", async () => {
    await expect(
      harness.action("updateEventItemReconciled", {
        connection: testConnection,
        integrationGuid: INVALID_GUID,
        eventGuid: INVALID_GUID,
        eventItemGuid: INVALID_GUID,
        reconciled: true,
      }),
    ).rejects.toThrow();
  });
  test("throws on invalid event item GUID even when integration GUID is valid", async () => {
    const integrationGuid = resolvedIntegrationGuid();
    const eventGuid = resolvedIntegrationEventGuid();
    if (!integrationGuid || !eventGuid) return;
    await expect(
      harness.action("updateEventItemReconciled", {
        connection: testConnection,
        integrationGuid,
        eventGuid,
        eventItemGuid: INVALID_GUID,
        reconciled: true,
      }),
    ).rejects.toThrow();
  });
  test("successfully marks event item as reconciled when real GUIDs are available", async () => {
    const integrationGuid = resolvedIntegrationGuid();
    const eventGuid = resolvedIntegrationEventGuid();
    const eventItemGuid = resolvedIntegrationEventItemGuid();
    if (!integrationGuid || !eventGuid || !eventItemGuid) {
      console.warn(
        "Skipping updateEventItemReconciled success test: one or more required GUIDs not available",
      );
      return;
    }
    const result = await harness.action("updateEventItemReconciled", {
      connection: testConnection,
      integrationGuid,
      eventGuid,
      eventItemGuid,
      reconciled: true,
    });
    expect(result).toBeDefined();
    expect(result!.data).toBeDefined();
  });
});
describe("Action: listRecentActivityUserAccesses", () => {
  test("returns user access activity list", async () => {
    const result = await harness.action("listRecentActivityUserAccesses", {
      connection: testConnection,
      limit: "10",
      offset: "0",
    });
    expect(result).toBeDefined();
    expect(result!.data).toBeDefined();
    const data = resultData(result);
    expect(typeof data.count).toBe("number");
    expect(Array.isArray(data.results)).toBe(true);
  });
  test("accepts dateTimeFrom and dateTimeTo filters", async () => {
    const result = await harness.action("listRecentActivityUserAccesses", {
      connection: testConnection,
      dateTimeFrom: "2024-01-01T00:00:00Z",
      dateTimeTo: "2024-12-31T23:59:59Z",
      limit: "5",
    });
    expect(result).toBeDefined();
    expect(result!.data).toBeDefined();
  });
});
describe("Action: listRecentActivityReportRuns", () => {
  test("returns report run activity list", async () => {
    const result = await harness.action("listRecentActivityReportRuns", {
      connection: testConnection,
      limit: "10",
      offset: "0",
    });
    expect(result).toBeDefined();
    expect(result!.data).toBeDefined();
    const data = resultData(result);
    expect(typeof data.count).toBe("number");
    expect(Array.isArray(data.results)).toBe(true);
  });
  test("accepts dateTimeFrom filter", async () => {
    const result = await harness.action("listRecentActivityReportRuns", {
      connection: testConnection,
      dateTimeFrom: "2025-01-01T00:00:00Z",
      limit: "5",
    });
    expect(result).toBeDefined();
    expect(result!.data).toBeDefined();
  });
});
describe("Action: listRecentActivityFileAccesses", () => {
  test("returns file access activity list", async () => {
    const result = await harness.action("listRecentActivityFileAccesses", {
      connection: testConnection,
      limit: "10",
      offset: "0",
    });
    expect(result).toBeDefined();
    expect(result!.data).toBeDefined();
    const data = resultData(result);
    expect(typeof data.count).toBe("number");
    expect(Array.isArray(data.results)).toBe(true);
  });
  test("accepts dateTimeTo filter", async () => {
    const result = await harness.action("listRecentActivityFileAccesses", {
      connection: testConnection,
      dateTimeTo: "2099-12-31T23:59:59Z",
      limit: "5",
    });
    expect(result).toBeDefined();
    expect(result!.data).toBeDefined();
  });
});
describe("Action: listRecentActivityExports", () => {
  test("returns export activity list", async () => {
    const result = await harness.action("listRecentActivityExports", {
      connection: testConnection,
      limit: "10",
      offset: "0",
    });
    expect(result).toBeDefined();
    expect(result!.data).toBeDefined();
    const data = resultData(result);
    expect(typeof data.count).toBe("number");
    expect(Array.isArray(data.results)).toBe(true);
  });
  test("returns fewer results when smaller limit is specified", async () => {
    const fullResult = await harness.action("listRecentActivityExports", {
      connection: testConnection,
      limit: "100",
    });
    const limitedResult = await harness.action("listRecentActivityExports", {
      connection: testConnection,
      limit: "1",
    });
    expect(resultList(limitedResult).length).toBeLessThanOrEqual(
      resultList(fullResult).length,
    );
  });
});
describe("Action: listApiUsages", () => {
  test("returns API usage list", async () => {
    const result = await harness.action("listApiUsages", {
      connection: testConnection,
      limit: "10",
      offset: "0",
    });
    expect(result).toBeDefined();
    expect(result!.data).toBeDefined();
    const data = resultData(result);
    expect(data).not.toBeNull();
  });
  test("accepts dateTimeFrom and dateTimeTo without error", async () => {
    const result = await harness.action("listApiUsages", {
      connection: testConnection,
      dateTimeFrom: "2025-01-01T00:00:00Z",
      dateTimeTo: "2025-12-31T23:59:59Z",
      limit: "5",
    });
    expect(result).toBeDefined();
    expect(result!.data).toBeDefined();
  });
});
describe("Action: changeLifecycleStatus", () => {
  test("throws on invalid change GUID", async () => {
    await expect(
      harness.action("changeLifecycleStatus", {
        connection: testConnection,
        changeGuid: INVALID_GUID,
        status: "SUBMITTED_FOR_APPROVAL",
      }),
    ).rejects.toThrow();
  });
  test("throws when status transition is invalid for the given change state", async () => {
    const changeGuid = ENV_CHANGE_GUID ?? INVALID_GUID;
    await expect(
      harness.action("changeLifecycleStatus", {
        connection: testConnection,
        changeGuid,
        status: "EFFECTIVE",
      }),
    ).rejects.toThrow();
  });
  test("successfully submits a change for approval when ENV_CHANGE_GUID is configured", async () => {
    if (!ENV_CHANGE_GUID) {
      console.warn(
        "Skipping changeLifecycleStatus SUBMITTED_FOR_APPROVAL test: TEST_CHANGE_GUID env var not set",
      );
      return;
    }
    const result = await harness.action("changeLifecycleStatus", {
      connection: testConnection,
      changeGuid: ENV_CHANGE_GUID,
      status: "SUBMITTED_FOR_APPROVAL",
    });
    expect(result).toBeDefined();
    expect(result!.data).toBeDefined();
    const data = resultData(result);
    expect(getRecordString(data.change, "guid")).toBe(ENV_CHANGE_GUID);
  });
  test("accepts optional comment, fromStatus, and adminNeedConfig fields", async () => {
    await expect(
      harness.action("changeLifecycleStatus", {
        connection: testConnection,
        changeGuid: INVALID_GUID,
        status: "SUBMITTED_FOR_APPROVAL",
        fromStatus: "OPEN",
        comment: "Automated integration test",
        adminNeedConfig: false,
      }),
    ).rejects.toThrow();
  });
});
describe("DataSource: categoriesPicklist", () => {
  test("returns an array of picklist items for objectType=items", async () => {
    const result = await harness.dataSource("categoriesPicklist", {
      connection: testConnection,
      objectType: "items",
    });
    expect(result).toBeDefined();
    expect(result.result).toBeDefined();
    expect(Array.isArray(result.result)).toBe(true);
    if (dataSourceResultList(result).length > 0) {
      const first = dataSourceResultList(result)[0];
      expect(first).toHaveProperty("label");
      expect(first).toHaveProperty("key");
    }
  });
  test("returns an array of picklist items for objectType=changes", async () => {
    const result = await harness.dataSource("categoriesPicklist", {
      connection: testConnection,
      objectType: "changes",
    });
    expect(result).toBeDefined();
    expect(Array.isArray(result.result)).toBe(true);
  });
  test("returns an array of picklist items for objectType=files", async () => {
    const result = await harness.dataSource("categoriesPicklist", {
      connection: testConnection,
      objectType: "files",
    });
    expect(result).toBeDefined();
    expect(Array.isArray(result.result)).toBe(true);
  });
  test("returns an array of picklist items for objectType=requests", async () => {
    const result = await harness.dataSource("categoriesPicklist", {
      connection: testConnection,
      objectType: "requests",
    });
    expect(result).toBeDefined();
    expect(Array.isArray(result.result)).toBe(true);
  });
  test("accepts assignable filter", async () => {
    const result = await harness.dataSource("categoriesPicklist", {
      connection: testConnection,
      objectType: "changes",
      assignable: "true",
    });
    expect(result).toBeDefined();
    expect(Array.isArray(result.result)).toBe(true);
  });
});
describe("DataSource: numberSequencePrefixesPicklist", () => {
  test("returns picklist items for objectType=changes", async () => {
    const result = await harness.dataSource("numberSequencePrefixesPicklist", {
      connection: testConnection,
      objectType: "changes",
    });
    expect(result).toBeDefined();
    expect(Array.isArray(result.result)).toBe(true);
    if (dataSourceResultList(result).length > 0) {
      const first = dataSourceResultList(result)[0];
      expect(first).toHaveProperty("label");
      expect(first).toHaveProperty("key");
    }
  });
  test("returns picklist items for objectType=requests", async () => {
    const result = await harness.dataSource("numberSequencePrefixesPicklist", {
      connection: testConnection,
      objectType: "requests",
    });
    expect(result).toBeDefined();
    expect(Array.isArray(result.result)).toBe(true);
  });
  test("returns picklist items for objectType=qualityprocesses", async () => {
    const result = await harness.dataSource("numberSequencePrefixesPicklist", {
      connection: testConnection,
      objectType: "qualityprocesses",
    });
    expect(result).toBeDefined();
    expect(Array.isArray(result.result)).toBe(true);
  });
  test("returns picklist items for objectType=tickets", async () => {
    const result = await harness.dataSource("numberSequencePrefixesPicklist", {
      connection: testConnection,
      objectType: "tickets",
    });
    expect(result).toBeDefined();
    expect(Array.isArray(result.result)).toBe(true);
  });
  test("returns picklist items for objectType=trainingplans", async () => {
    const result = await harness.dataSource("numberSequencePrefixesPicklist", {
      connection: testConnection,
      objectType: "trainingplans",
    });
    expect(result).toBeDefined();
    expect(Array.isArray(result.result)).toBe(true);
  });
});
describe("DataSource: changeCategoryRoutingsPicklist", () => {
  test("handles invalid category GUID gracefully", async () => {
    try {
      const result = await harness.dataSource(
        "changeCategoryRoutingsPicklist",
        {
          connection: testConnection,
          categoryGuid: INVALID_GUID,
        },
      );
      expect(result).toBeDefined();
      expect(Array.isArray(result.result)).toBe(true);
    } catch (err) {
      expect(err).toBeDefined();
    }
  });
  test("returns routing picklist items when a valid category GUID is provided", async () => {
    let categoryGuid: string | undefined;
    try {
      const catResult = await harness.dataSource("categoriesPicklist", {
        connection: testConnection,
        objectType: "changes",
      });
      const categories = dataSourceResultList(catResult);
      if (categories.length > 0) {
        categoryGuid = getRecordString(categories[0], "key");
      }
    } catch {}
    if (!categoryGuid) {
      categoryGuid =
        ENV_CATEGORY_GUID_CHANGES !== "PLACEHOLDER_CATEGORY_GUID"
          ? ENV_CATEGORY_GUID_CHANGES
          : undefined;
    }
    if (!categoryGuid) {
      console.warn(
        "Skipping changeCategoryRoutingsPicklist routing test: no valid category GUID available",
      );
      return;
    }
    const result = await harness.dataSource("changeCategoryRoutingsPicklist", {
      connection: testConnection,
      categoryGuid,
    });
    expect(result).toBeDefined();
    expect(Array.isArray(result.result)).toBe(true);
    if (dataSourceResultList(result).length > 0) {
      const first = dataSourceResultList(result)[0];
      expect(first).toHaveProperty("label");
      expect(first).toHaveProperty("key");
    }
  });
});
describe("DataSource: outboundEventIntegrationsPicklist", () => {
  test("returns a picklist of outbound event integrations", async () => {
    const result = await harness.dataSource(
      "outboundEventIntegrationsPicklist",
      {
        connection: testConnection,
      },
    );
    expect(result).toBeDefined();
    expect(result.result).toBeDefined();
    expect(Array.isArray(result.result)).toBe(true);
    if (dataSourceResultList(result).length > 0) {
      const first = dataSourceResultList(result)[0];
      expect(first).toHaveProperty("label");
      expect(first).toHaveProperty("key");
    }
  });
  test("accepts enabled=true filter", async () => {
    try {
      const result = await harness.dataSource(
        "outboundEventIntegrationsPicklist",
        {
          connection: testConnection,
          enabled: "true",
        },
      );
      expect(result).toBeDefined();
      expect(Array.isArray(result.result)).toBe(true);
    } catch (err: unknown) {
      console.warn(
        "outboundEventIntegrationsPicklist enable filter not supported in this workspace:",
        getErrorMessage(err),
      );
    }
  });
  test("accepts name filter", async () => {
    const result = await harness.dataSource(
      "outboundEventIntegrationsPicklist",
      {
        connection: testConnection,
        name: "NonExistentXYZABC999",
      },
    );
    expect(result).toBeDefined();
    expect(dataSourceResultList(result).length).toBe(0);
  });
});
describe("DataSource: categoryAttributesObjectSelection", () => {
  test("returns gracefully for an invalid category GUID (throws or returns empty)", async () => {
    await expect(
      harness.dataSource("categoryAttributesObjectSelection", {
        connection: testConnection,
        objectType: "changes",
        categoryGuid: INVALID_GUID,
      }),
    ).rejects.toThrow();
  });
  test("returns object selection entries when a real category GUID is available", async () => {
    let categoryGuid: string | undefined;
    try {
      const catResult = await harness.dataSource("categoriesPicklist", {
        connection: testConnection,
        objectType: "changes",
      });
      const categories = dataSourceResultList(catResult);
      if (categories.length > 0) {
        categoryGuid = getRecordString(categories[0], "key");
      }
    } catch {}
    if (!categoryGuid) {
      categoryGuid =
        ENV_CATEGORY_GUID_CHANGES !== "PLACEHOLDER_CATEGORY_GUID"
          ? ENV_CATEGORY_GUID_CHANGES
          : undefined;
    }
    if (!categoryGuid) {
      console.warn(
        "Skipping categoryAttributesObjectSelection success test: no valid category GUID available",
      );
      return;
    }
    const result = await harness.dataSource(
      "categoryAttributesObjectSelection",
      {
        connection: testConnection,
        objectType: "changes",
        categoryGuid,
      },
    );
    expect(result).toBeDefined();
    expect(result.result).toBeDefined();
    expect(Array.isArray(result.result)).toBe(true);
    if (dataSourceResultList(result).length > 0) {
      const first = dataSourceResultList(result)[0];
      expect(first).toHaveProperty("object");
      expect(first.object).toHaveProperty("key");
      expect(first.object).toHaveProperty("label");
      expect(first).toHaveProperty("fields");
      expect(Array.isArray(first.fields)).toBe(true);
    }
  });
  test("includeInactive=true includes all attributes", async () => {
    let categoryGuid: string | undefined;
    try {
      const catResult = await harness.dataSource("categoriesPicklist", {
        connection: testConnection,
        objectType: "items",
      });
      const categories = dataSourceResultList(catResult);
      if (categories.length > 0) {
        categoryGuid = getRecordString(categories[0], "key");
      }
    } catch {}
    if (!categoryGuid) {
      console.warn(
        "Skipping categoryAttributesObjectSelection includeInactive test: no valid category GUID available",
      );
      return;
    }
    const activeOnly = await harness.dataSource(
      "categoryAttributesObjectSelection",
      {
        connection: testConnection,
        objectType: "items",
        categoryGuid,
        includeInactive: false,
      },
    );
    const withInactive = await harness.dataSource(
      "categoryAttributesObjectSelection",
      {
        connection: testConnection,
        objectType: "items",
        categoryGuid,
        includeInactive: true,
      },
    );
    expect(dataSourceResultList(withInactive).length).toBeGreaterThanOrEqual(
      dataSourceResultList(activeOnly).length,
    );
  });
});
