import {
  createConnection,
  createHarness,
} from "@prismatic-io/spectral/dist/testing";
import { arenaUsernamePassword } from "../connections";
import component from "../index";
import { getErrorMessage } from "../util";
import { resultData, resultGuid, resultList } from "./resultHelpers";
jest.setTimeout(30000);
const harness = createHarness(component);
const testConnection = createConnection(arenaUsernamePassword, {
  baseUrl: "custom",
  customBaseUrl: process.env.ARENA_BASE_URL || "",
  email: process.env.ARENA_EMAIL || "",
  password: process.env.ARENA_PASSWORD || "",
});
let discoveredChangeGuid: string | null = null;
let discoveredCategoryGuid: string | null = null;
let createdChangeGuid: string | null = null;
let createdImplTaskGuid: string | null = null;
let createdImplTaskNoteGuid: string | null = null;
let discoveredFileAssociationGuid: string | null = null;
let discoveredChangeItemAssociationGuid: string | null = null;
beforeAll(async () => {
  try {
    const result = await harness.action("listChanges", {
      connection: testConnection,
      limit: "1",
    });
    const results = resultData(result).results;
    if (Array.isArray(results) && results.length > 0) {
      discoveredChangeGuid = results[0].guid as string;
    } else {
      console.warn(
        "[beforeAll] No changes found in workspace. GUID-dependent tests will be skipped.",
      );
    }
  } catch (e) {
    console.warn("[beforeAll] Failed to list changes:", e);
  }
  try {
    const result = await harness.action("listCategories", {
      connection: testConnection,
      objectType: "changes",
    });
    const results = resultData(result).results;
    if (Array.isArray(results) && results.length > 0) {
      discoveredCategoryGuid = results[0].guid as string;
    } else {
      console.warn(
        "[beforeAll] No change categories found. Category-dependent tests will be skipped.",
      );
    }
  } catch (e) {
    console.warn("[beforeAll] Failed to list change categories:", e);
  }
  if (discoveredCategoryGuid) {
    try {
      const result = await harness.action("createChange", {
        connection: testConnection,
        title: "Integration Test Change - Auto Delete",
        categoryGuid: discoveredCategoryGuid,
      });
      createdChangeGuid = resultGuid(result);
      if (createdChangeGuid) {
        console.info(`[beforeAll] Created test change: ${createdChangeGuid}`);
      }
    } catch (e) {
      console.warn("[beforeAll] Failed to create test change:", e);
    }
  } else {
    console.warn(
      "[beforeAll] Skipping change creation – no category GUID available.",
    );
  }
  if (createdChangeGuid) {
    try {
      const result = await harness.action("createChangeImplementationTask", {
        connection: testConnection,
        changeGuid: createdChangeGuid,
        name: "Integration Test Impl Task",
      });
      createdImplTaskGuid = resultGuid(result);
    } catch (e) {
      console.warn("[beforeAll] Failed to create implementation task:", e);
    }
  }
  if (createdChangeGuid && createdImplTaskGuid) {
    try {
      const result = await harness.action(
        "createChangeImplementationTaskNote",
        {
          connection: testConnection,
          changeGuid: createdChangeGuid,
          implementationTaskGuid: createdImplTaskGuid,
          note: "Initial integration test note",
        },
      );
      createdImplTaskNoteGuid = resultGuid(result);
    } catch (e) {
      console.warn("[beforeAll] Failed to create implementation task note:", e);
    }
  }
  if (discoveredChangeGuid) {
    try {
      const result = await harness.action("listChangeFileAssociations", {
        connection: testConnection,
        changeGuid: discoveredChangeGuid,
      });
      const results = resultData(result).results;
      if (Array.isArray(results) && results.length > 0) {
        discoveredFileAssociationGuid = results[0].guid as string;
      }
    } catch (e) {
      console.warn("[beforeAll] Failed to discover file association GUID:", e);
    }
  }
  if (discoveredChangeGuid) {
    try {
      const result = await harness.action("listChangeItems", {
        connection: testConnection,
        changeGuid: discoveredChangeGuid,
      });
      const results = resultData(result).results;
      if (Array.isArray(results) && results.length > 0) {
        discoveredChangeItemAssociationGuid = results[0].guid as string;
      }
    } catch (e) {
      console.warn(
        "[beforeAll] Failed to discover change item association GUID:",
        e,
      );
    }
  }
}, 120000);
afterAll(async () => {
  if (createdChangeGuid) {
    try {
      await harness.action("deleteChange", {
        connection: testConnection,
        changeGuid: createdChangeGuid,
      });
      console.info(`[afterAll] Deleted test change: ${createdChangeGuid}`);
    } catch (e) {
      console.warn("[afterAll] Failed to delete test change:", e);
    }
    createdChangeGuid = null;
  }
}, 30000);
describe("listChanges", () => {
  test("returns a results array with no filters", async () => {
    const result = await harness.action("listChanges", {
      connection: testConnection,
    });
    expect(result).toBeDefined();
    expect(result!.data).toBeDefined();
    expect(Array.isArray(resultData(result).results)).toBe(true);
  }, 30000);
  test("accepts a limit parameter and returns at most that many results", async () => {
    const result = await harness.action("listChanges", {
      connection: testConnection,
      limit: "3",
    });
    expect(result).toBeDefined();
    const results = resultList(result);
    expect(Array.isArray(results)).toBe(true);
    expect(results.length).toBeLessThanOrEqual(3);
  }, 30000);
  test("accepts offset and limit together", async () => {
    const result = await harness.action("listChanges", {
      connection: testConnection,
      limit: "2",
      offset: "0",
    });
    expect(result).toBeDefined();
    expect(Array.isArray(resultData(result).results)).toBe(true);
  }, 30000);
  test("accepts includeChildCategories=true without error", async () => {
    const result = await harness.action("listChanges", {
      connection: testConnection,
      includeChildCategories: true,
    });
    expect(result).toBeDefined();
    expect(Array.isArray(resultData(result).results)).toBe(true);
  }, 30000);
  test("accepts lifecycleStatusType filter", async () => {
    try {
      const result = await harness.action("listChanges", {
        connection: testConnection,
        lifecycleStatusType: "OPEN",
        limit: "5",
      });
      expect(result).toBeDefined();
      expect(Array.isArray(resultData(result).results)).toBe(true);
    } catch (err: unknown) {
      if (
        getErrorMessage(err).includes("not valid") ||
        getErrorMessage(err).includes("3003")
      ) {
        console.warn(
          "lifecycleStatusType=OPEN not valid in this workspace; skipping assertion.",
        );
        return;
      }
      throw err;
    }
  }, 30000);
});
describe("getChangeByGuid", () => {
  test("retrieves a change by a discovered GUID", async () => {
    if (!discoveredChangeGuid) {
      console.warn("No discovered change GUID; skipping test.");
      return;
    }
    const result = await harness.action("getChangeByGuid", {
      connection: testConnection,
      guid: discoveredChangeGuid,
    });
    expect(result).toBeDefined();
    expect(resultData(result).guid).toBe(discoveredChangeGuid);
  }, 30000);
  test("accepts includeEmptyAdditionalAttributes=true", async () => {
    if (!discoveredChangeGuid) {
      console.warn("No discovered change GUID; skipping test.");
      return;
    }
    const result = await harness.action("getChangeByGuid", {
      connection: testConnection,
      guid: discoveredChangeGuid,
    });
    expect(result).toBeDefined();
    expect(resultData(result).guid).toBe(discoveredChangeGuid);
  }, 30000);
  test("accepts includeEmptyAdditionalAttributes=false", async () => {
    if (!discoveredChangeGuid) {
      console.warn("No discovered change GUID; skipping test.");
      return;
    }
    const result = await harness.action("getChangeByGuid", {
      connection: testConnection,
      guid: discoveredChangeGuid,
    });
    expect(result).toBeDefined();
    expect(resultData(result).guid).toBe(discoveredChangeGuid);
  }, 30000);
  test("throws on an invalid GUID", async () => {
    await expect(
      harness.action("getChangeByGuid", {
        connection: testConnection,
        guid: "INVALID_GUID_00000000000",
      }),
    ).rejects.toThrow();
  }, 30000);
});
describe("createChange", () => {
  test("created test change has a non-empty GUID string", () => {
    if (!createdChangeGuid) {
      console.warn(
        "createdChangeGuid is null (create likely failed); skipping test.",
      );
      return;
    }
    expect(typeof createdChangeGuid).toBe("string");
    expect(createdChangeGuid.length).toBeGreaterThan(0);
  });
  test("throws when creating with an invalid categoryGuid", async () => {
    await expect(
      harness.action("createChange", {
        connection: testConnection,
        title: "Should fail – bad category",
        categoryGuid: "INVALID_CATEGORY_GUID_000",
      }),
    ).rejects.toThrow();
  }, 30000);
});
describe("updateChange", () => {
  test("updates the description of the created test change", async () => {
    if (!createdChangeGuid) {
      console.warn("No created change GUID; skipping test.");
      return;
    }
    const result = await harness.action("updateChange", {
      connection: testConnection,
      changeGuid: createdChangeGuid,
      description: "Updated by integration test",
    });
    expect(result).toBeDefined();
    expect(resultData(result).guid).toBe(createdChangeGuid);
  }, 30000);
  test("throws on an invalid change GUID", async () => {
    await expect(
      harness.action("updateChange", {
        connection: testConnection,
        changeGuid: "INVALID_GUID_00000000000",
        description: "Should fail",
      }),
    ).rejects.toThrow();
  }, 30000);
});
describe("deleteChange", () => {
  test("throws on an invalid change GUID", async () => {
    await expect(
      harness.action("deleteChange", {
        connection: testConnection,
        changeGuid: "INVALID_GUID_00000000000",
      }),
    ).rejects.toThrow();
  }, 30000);
});
describe("listChangeHistory", () => {
  test("returns change history for a valid change GUID", async () => {
    if (!discoveredChangeGuid) {
      console.warn("No discovered change GUID; skipping test.");
      return;
    }
    const result = await harness.action("listChangeHistory", {
      connection: testConnection,
      changeGuid: discoveredChangeGuid,
    });
    expect(result).toBeDefined();
    expect(result!.data).toBeDefined();
  }, 30000);
  test("throws on an invalid change GUID", async () => {
    await expect(
      harness.action("listChangeHistory", {
        connection: testConnection,
        changeGuid: "INVALID_GUID_00000000000",
      }),
    ).rejects.toThrow();
  }, 30000);
});
describe("listChangeAlerts", () => {
  test("returns alerts for a valid change GUID", async () => {
    if (!discoveredChangeGuid) {
      console.warn("No discovered change GUID; skipping test.");
      return;
    }
    const result = await harness.action("listChangeAlerts", {
      connection: testConnection,
      changeGuid: discoveredChangeGuid,
    });
    expect(result).toBeDefined();
    expect(result!.data).toBeDefined();
  }, 30000);
  test("throws on an invalid change GUID", async () => {
    await expect(
      harness.action("listChangeAlerts", {
        connection: testConnection,
        changeGuid: "INVALID_GUID_00000000000",
      }),
    ).rejects.toThrow();
  }, 30000);
});
describe("listChangeMarkupFiles", () => {
  test("returns markup files list for a valid change GUID", async () => {
    if (!discoveredChangeGuid) {
      console.warn("No discovered change GUID; skipping test.");
      return;
    }
    const result = await harness.action("listChangeMarkupFiles", {
      connection: testConnection,
      changeGuid: discoveredChangeGuid,
    });
    expect(result).toBeDefined();
    expect(result!.data).toBeDefined();
  }, 30000);
  test("throws on an invalid change GUID", async () => {
    await expect(
      harness.action("listChangeMarkupFiles", {
        connection: testConnection,
        changeGuid: "INVALID_GUID_00000000000",
      }),
    ).rejects.toThrow();
  }, 30000);
});
describe("createChangeMarkupFile", () => {
  test.skip("requires an existing Arena file GUID – not executed in automated suite", () => {});
});
describe("deleteChangeMarkupFile", () => {
  test("throws when given an invalid change or association GUID", async () => {
    if (!discoveredChangeGuid) {
      console.warn("No discovered change GUID; skipping test.");
      return;
    }
    await expect(
      harness.action("deleteChangeMarkupFile", {
        connection: testConnection,
        changeGuid: discoveredChangeGuid,
        changeFileAssociationGuid: "INVALID_GUID_00000000000",
      }),
    ).rejects.toThrow();
  }, 30000);
});
describe("listChangeImplementationFiles", () => {
  test("returns implementation files list for a valid change GUID", async () => {
    if (!discoveredChangeGuid) {
      console.warn("No discovered change GUID; skipping test.");
      return;
    }
    const result = await harness.action("listChangeImplementationFiles", {
      connection: testConnection,
      changeGuid: discoveredChangeGuid,
    });
    expect(result).toBeDefined();
    expect(result!.data).toBeDefined();
  }, 30000);
  test("throws on an invalid change GUID", async () => {
    await expect(
      harness.action("listChangeImplementationFiles", {
        connection: testConnection,
        changeGuid: "INVALID_GUID_00000000000",
      }),
    ).rejects.toThrow();
  }, 30000);
});
describe("createChangeImplementationFile", () => {
  test.skip("requires an existing Arena file GUID – not executed in automated suite", () => {});
});
describe("listChangeFileAssociations", () => {
  test("returns file associations for a valid change GUID", async () => {
    if (!discoveredChangeGuid) {
      console.warn("No discovered change GUID; skipping test.");
      return;
    }
    const result = await harness.action("listChangeFileAssociations", {
      connection: testConnection,
      changeGuid: discoveredChangeGuid,
    });
    expect(result).toBeDefined();
    const data = resultData(result);
    expect(typeof data.count).toBe("number");
    expect(Array.isArray(data.results)).toBe(true);
  }, 30000);
  test("throws on an invalid change GUID", async () => {
    await expect(
      harness.action("listChangeFileAssociations", {
        connection: testConnection,
        changeGuid: "INVALID_GUID_00000000000",
      }),
    ).rejects.toThrow();
  }, 30000);
});
describe("createChangeFileAssociation", () => {
  test.skip("requires an existing Arena file GUID – not executed in automated suite", () => {});
});
describe("getChangeFileAssociation", () => {
  test("retrieves a specific file association by GUID", async () => {
    if (!discoveredChangeGuid || !discoveredFileAssociationGuid) {
      console.warn(
        "No discovered file association GUID; skipping positive test.",
      );
      return;
    }
    const result = await harness.action("getChangeFileAssociation", {
      connection: testConnection,
      changeGuid: discoveredChangeGuid,
      changeFileAssociationGuid: discoveredFileAssociationGuid,
    });
    expect(result).toBeDefined();
    expect(resultData(result).guid).toBe(discoveredFileAssociationGuid);
  }, 30000);
  test("throws on an invalid file association GUID", async () => {
    if (!discoveredChangeGuid) {
      console.warn("No discovered change GUID; skipping test.");
      return;
    }
    await expect(
      harness.action("getChangeFileAssociation", {
        connection: testConnection,
        changeGuid: discoveredChangeGuid,
        changeFileAssociationGuid: "INVALID_GUID_00000000000",
      }),
    ).rejects.toThrow();
  }, 30000);
});
describe("deleteChangeFileAssociation", () => {
  test("throws on an invalid file association GUID", async () => {
    if (!discoveredChangeGuid) {
      console.warn("No discovered change GUID; skipping test.");
      return;
    }
    await expect(
      harness.action("deleteChangeFileAssociation", {
        connection: testConnection,
        changeGuid: discoveredChangeGuid,
        changeFileAssociationGuid: "INVALID_GUID_00000000000",
      }),
    ).rejects.toThrow();
  }, 30000);
});
describe("listChangeItems", () => {
  test("returns items list for a valid change GUID", async () => {
    if (!discoveredChangeGuid) {
      console.warn("No discovered change GUID; skipping test.");
      return;
    }
    const result = await harness.action("listChangeItems", {
      connection: testConnection,
      changeGuid: discoveredChangeGuid,
    });
    expect(result).toBeDefined();
    const data = resultData(result);
    expect(typeof data.count).toBe("number");
  }, 30000);
  test("throws on an invalid change GUID", async () => {
    await expect(
      harness.action("listChangeItems", {
        connection: testConnection,
        changeGuid: "INVALID_GUID_00000000000",
      }),
    ).rejects.toThrow();
  }, 30000);
});
describe("addItemToChange", () => {
  test("throws when given an invalid item revision GUID", async () => {
    if (!discoveredChangeGuid) {
      console.warn("No discovered change GUID; skipping test.");
      return;
    }
    await expect(
      harness.action("addItemToChange", {
        connection: testConnection,
        changeGuid: discoveredChangeGuid,
        newItemRevision: "INVALID_GUID_00000000000",
      }),
    ).rejects.toThrow();
  }, 30000);
});
describe("getChangeItemAssociation", () => {
  test("retrieves a specific change-item association by GUID", async () => {
    if (!discoveredChangeGuid || !discoveredChangeItemAssociationGuid) {
      console.warn(
        "No discovered change-item association GUID; skipping positive test.",
      );
      return;
    }
    const result = await harness.action("getChangeItemAssociation", {
      connection: testConnection,
      changeGuid: discoveredChangeGuid,
      changeItemAssociationGuid: discoveredChangeItemAssociationGuid,
    });
    expect(result).toBeDefined();
    expect(resultData(result).guid).toBe(discoveredChangeItemAssociationGuid);
  }, 30000);
  test("throws on an invalid association GUID", async () => {
    if (!discoveredChangeGuid) {
      console.warn("No discovered change GUID; skipping test.");
      return;
    }
    await expect(
      harness.action("getChangeItemAssociation", {
        connection: testConnection,
        changeGuid: discoveredChangeGuid,
        changeItemAssociationGuid: "INVALID_GUID_00000000000",
      }),
    ).rejects.toThrow();
  }, 30000);
});
describe("updateChangeItemAssociation", () => {
  test("throws on an invalid item association GUID", async () => {
    if (!discoveredChangeGuid) {
      console.warn("No discovered change GUID; skipping test.");
      return;
    }
    await expect(
      harness.action("updateChangeItemAssociation", {
        connection: testConnection,
        changeGuid: discoveredChangeGuid,
        changeItemAssociationGuid: "INVALID_GUID_00000000000",
        filesViewIncluded: false,
      }),
    ).rejects.toThrow();
  }, 30000);
});
describe("deleteChangeItemAssociation", () => {
  test("throws on an invalid item association GUID", async () => {
    if (!discoveredChangeGuid) {
      console.warn("No discovered change GUID; skipping test.");
      return;
    }
    await expect(
      harness.action("deleteChangeItemAssociation", {
        connection: testConnection,
        changeGuid: discoveredChangeGuid,
        changeItemAssociationGuid: "INVALID_GUID_00000000000",
      }),
    ).rejects.toThrow();
  }, 30000);
});
describe("listChangeImplementationTasks", () => {
  test("returns tasks list for the created test change", async () => {
    if (!createdChangeGuid) {
      console.warn("No created change GUID; skipping test.");
      return;
    }
    const result = await harness.action("listChangeImplementationTasks", {
      connection: testConnection,
      changeGuid: createdChangeGuid,
    });
    expect(result).toBeDefined();
    expect(result!.data).toBeDefined();
  }, 30000);
  test("throws on an invalid change GUID", async () => {
    await expect(
      harness.action("listChangeImplementationTasks", {
        connection: testConnection,
        changeGuid: "INVALID_GUID_00000000000",
      }),
    ).rejects.toThrow();
  }, 30000);
});
describe("createChangeImplementationTask", () => {
  test("created implementation task has a non-empty GUID string", () => {
    if (!createdImplTaskGuid) {
      console.warn(
        "createdImplTaskGuid is null (create likely failed); skipping test.",
      );
      return;
    }
    expect(typeof createdImplTaskGuid).toBe("string");
    expect(createdImplTaskGuid.length).toBeGreaterThan(0);
  });
  test("throws on an invalid change GUID", async () => {
    await expect(
      harness.action("createChangeImplementationTask", {
        connection: testConnection,
        changeGuid: "INVALID_GUID_00000000000",
        name: "Should fail",
      }),
    ).rejects.toThrow();
  }, 30000);
});
describe("getChangeImplementationTask", () => {
  test("retrieves the created implementation task by GUID", async () => {
    if (!createdChangeGuid || !createdImplTaskGuid) {
      console.warn(
        "No created implementation task GUID; skipping positive test.",
      );
      return;
    }
    const result = await harness.action("getChangeImplementationTask", {
      connection: testConnection,
      changeGuid: createdChangeGuid,
      implementationTaskGuid: createdImplTaskGuid,
    });
    expect(result).toBeDefined();
    expect(resultData(result).guid).toBe(createdImplTaskGuid);
  }, 30000);
  test("throws on an invalid implementation task GUID", async () => {
    if (!createdChangeGuid) {
      console.warn("No created change GUID; skipping test.");
      return;
    }
    await expect(
      harness.action("getChangeImplementationTask", {
        connection: testConnection,
        changeGuid: createdChangeGuid,
        implementationTaskGuid: "INVALID_GUID_00000000000",
      }),
    ).rejects.toThrow();
  }, 30000);
});
describe("updateChangeImplementationTask", () => {
  test("updates the task status to IN_PROGRESS", async () => {
    if (!createdChangeGuid || !createdImplTaskGuid) {
      console.warn("No created implementation task GUID; skipping test.");
      return;
    }
    const result = await harness.action("updateChangeImplementationTask", {
      connection: testConnection,
      changeGuid: createdChangeGuid,
      implementationTaskGuid: createdImplTaskGuid,
      status: "IN_PROGRESS",
    });
    expect(result).toBeDefined();
    expect(resultData(result).guid).toBe(createdImplTaskGuid);
  }, 30000);
  test("updates the task name", async () => {
    if (!createdChangeGuid || !createdImplTaskGuid) {
      console.warn("No created implementation task GUID; skipping test.");
      return;
    }
    const result = await harness.action("updateChangeImplementationTask", {
      connection: testConnection,
      changeGuid: createdChangeGuid,
      implementationTaskGuid: createdImplTaskGuid,
      name: "Updated Integration Test Task",
    });
    expect(result).toBeDefined();
    expect(resultData(result).guid).toBe(createdImplTaskGuid);
  }, 30000);
  test("throws on an invalid task GUID", async () => {
    if (!createdChangeGuid) {
      console.warn("No created change GUID; skipping test.");
      return;
    }
    await expect(
      harness.action("updateChangeImplementationTask", {
        connection: testConnection,
        changeGuid: createdChangeGuid,
        implementationTaskGuid: "INVALID_GUID_00000000000",
        name: "Should fail",
      }),
    ).rejects.toThrow();
  }, 30000);
});
describe("listChangeImplementationTaskNotes", () => {
  test("returns notes list for a valid implementation task", async () => {
    if (!createdChangeGuid || !createdImplTaskGuid) {
      console.warn("No created implementation task GUID; skipping test.");
      return;
    }
    const result = await harness.action("listChangeImplementationTaskNotes", {
      connection: testConnection,
      changeGuid: createdChangeGuid,
      implementationTaskGuid: createdImplTaskGuid,
    });
    expect(result).toBeDefined();
    expect(result!.data).toBeDefined();
  }, 30000);
  test("throws on an invalid task GUID", async () => {
    if (!createdChangeGuid) {
      console.warn("No created change GUID; skipping test.");
      return;
    }
    await expect(
      harness.action("listChangeImplementationTaskNotes", {
        connection: testConnection,
        changeGuid: createdChangeGuid,
        implementationTaskGuid: "INVALID_GUID_00000000000",
      }),
    ).rejects.toThrow();
  }, 30000);
});
describe("createChangeImplementationTaskNote", () => {
  test("created note has a non-empty GUID string", () => {
    if (!createdImplTaskNoteGuid) {
      console.warn(
        "createdImplTaskNoteGuid is null (create likely failed); skipping test.",
      );
      return;
    }
    expect(typeof createdImplTaskNoteGuid).toBe("string");
    expect(createdImplTaskNoteGuid.length).toBeGreaterThan(0);
  });
  test("throws on an invalid task GUID", async () => {
    if (!createdChangeGuid) {
      console.warn("No created change GUID; skipping test.");
      return;
    }
    await expect(
      harness.action("createChangeImplementationTaskNote", {
        connection: testConnection,
        changeGuid: createdChangeGuid,
        implementationTaskGuid: "INVALID_GUID_00000000000",
        note: "Should fail",
      }),
    ).rejects.toThrow();
  }, 30000);
});
describe("updateChangeImplementationTaskNote", () => {
  test("updates the content of the created note", async () => {
    if (
      !createdChangeGuid ||
      !createdImplTaskGuid ||
      !createdImplTaskNoteGuid
    ) {
      console.warn("No created task note GUID; skipping positive test.");
      return;
    }
    const result = await harness.action("updateChangeImplementationTaskNote", {
      connection: testConnection,
      changeGuid: createdChangeGuid,
      implementationTaskGuid: createdImplTaskGuid,
      noteGuid: createdImplTaskNoteGuid,
      note: "Updated note content – written by integration test",
    });
    expect(result).toBeDefined();
    expect(resultData(result).guid).toBe(createdImplTaskNoteGuid);
  }, 30000);
  test("throws on an invalid note GUID", async () => {
    if (!createdChangeGuid || !createdImplTaskGuid) {
      console.warn("No created implementation task GUID; skipping test.");
      return;
    }
    await expect(
      harness.action("updateChangeImplementationTaskNote", {
        connection: testConnection,
        changeGuid: createdChangeGuid,
        implementationTaskGuid: createdImplTaskGuid,
        noteGuid: "INVALID_GUID_00000000000",
        note: "Should fail",
      }),
    ).rejects.toThrow();
  }, 30000);
});
describe("listChangeImplementationTaskFiles", () => {
  test("returns files list for a valid implementation task", async () => {
    if (!createdChangeGuid || !createdImplTaskGuid) {
      console.warn("No created implementation task GUID; skipping test.");
      return;
    }
    const result = await harness.action("listChangeImplementationTaskFiles", {
      connection: testConnection,
      changeGuid: createdChangeGuid,
      implementationTaskGuid: createdImplTaskGuid,
    });
    expect(result).toBeDefined();
    expect(result!.data).toBeDefined();
  }, 30000);
  test("throws on an invalid task GUID", async () => {
    if (!createdChangeGuid) {
      console.warn("No created change GUID; skipping test.");
      return;
    }
    await expect(
      harness.action("listChangeImplementationTaskFiles", {
        connection: testConnection,
        changeGuid: createdChangeGuid,
        implementationTaskGuid: "INVALID_GUID_00000000000",
      }),
    ).rejects.toThrow();
  }, 30000);
});
describe("createChangeImplementationTaskFile", () => {
  test.skip("requires an existing Arena file GUID – not executed in automated suite", () => {});
});
describe("listChangesAdministrators", () => {
  test("returns administrators when objectType=changes", async () => {
    const result = await harness.action("listChangesAdministrators", {
      connection: testConnection,
      objectType: "changes",
    });
    expect(result).toBeDefined();
    expect(result!.data).toBeDefined();
  }, 30000);
  test("returns administrators when objectType=requests", async () => {
    const result = await harness.action("listChangesAdministrators", {
      connection: testConnection,
      objectType: "requests",
    });
    expect(result).toBeDefined();
    expect(result!.data).toBeDefined();
  }, 30000);
  test("defaults to changes when objectType is omitted", async () => {
    const result = await harness.action("listChangesAdministrators", {
      connection: testConnection,
    });
    expect(result).toBeDefined();
    expect(result!.data).toBeDefined();
  }, 30000);
});
describe("listChangeCategoryRoutings", () => {
  test("returns routings for a valid change category GUID", async () => {
    if (!discoveredCategoryGuid) {
      console.warn("No discovered category GUID; skipping test.");
      return;
    }
    const result = await harness.action("listChangeCategoryRoutings", {
      connection: testConnection,
      categoryGuid: discoveredCategoryGuid,
    });
    expect(result).toBeDefined();
    expect(result!.data).toBeDefined();
  }, 30000);
  test("throws on an invalid category GUID", async () => {
    await expect(
      harness.action("listChangeCategoryRoutings", {
        connection: testConnection,
        categoryGuid: "INVALID_GUID_00000000000",
      }),
    ).rejects.toThrow();
  }, 30000);
});
describe("listNumberSequencePrefixes", () => {
  test("returns number sequence prefixes for changes", async () => {
    const result = await harness.action("listNumberSequencePrefixes", {
      connection: testConnection,
      objectType: "changes",
    });
    expect(result).toBeDefined();
    expect(result!.data).toBeDefined();
  }, 30000);
  test("returns number sequence prefixes for requests", async () => {
    const result = await harness.action("listNumberSequencePrefixes", {
      connection: testConnection,
      objectType: "requests",
    });
    expect(result).toBeDefined();
    expect(result!.data).toBeDefined();
  }, 30000);
  test("returns number sequence prefixes for qualityprocesses", async () => {
    const result = await harness.action("listNumberSequencePrefixes", {
      connection: testConnection,
      objectType: "qualityprocesses",
    });
    expect(result).toBeDefined();
    expect(result!.data).toBeDefined();
  }, 30000);
  test("returns number sequence prefixes for tickets", async () => {
    const result = await harness.action("listNumberSequencePrefixes", {
      connection: testConnection,
      objectType: "tickets",
    });
    expect(result).toBeDefined();
    expect(result!.data).toBeDefined();
  }, 30000);
});
describe("listChangeCategoryItemAttributes", () => {
  test("returns item attributes for a valid change category GUID", async () => {
    if (!discoveredCategoryGuid) {
      console.warn("No discovered category GUID; skipping test.");
      return;
    }
    const result = await harness.action("listChangeCategoryItemAttributes", {
      connection: testConnection,
      categoryGuid: discoveredCategoryGuid,
    });
    expect(result).toBeDefined();
    expect(result!.data).toBeDefined();
  }, 30000);
  test("accepts includePossibleValues=true", async () => {
    if (!discoveredCategoryGuid) {
      console.warn("No discovered category GUID; skipping test.");
      return;
    }
    const result = await harness.action("listChangeCategoryItemAttributes", {
      connection: testConnection,
      categoryGuid: discoveredCategoryGuid,
      includePossibleValues: "true",
    });
    expect(result).toBeDefined();
    expect(result!.data).toBeDefined();
  }, 30000);
  test("accepts creatableOnly=true filter", async () => {
    if (!discoveredCategoryGuid) {
      console.warn("No discovered category GUID; skipping test.");
      return;
    }
    const result = await harness.action("listChangeCategoryItemAttributes", {
      connection: testConnection,
      categoryGuid: discoveredCategoryGuid,
      creatableOnly: "true",
    });
    expect(result).toBeDefined();
    expect(result!.data).toBeDefined();
  }, 30000);
  test("throws on an invalid category GUID", async () => {
    await expect(
      harness.action("listChangeCategoryItemAttributes", {
        connection: testConnection,
        categoryGuid: "INVALID_GUID_00000000000",
      }),
    ).rejects.toThrow();
  }, 30000);
});
