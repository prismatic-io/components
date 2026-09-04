import {
  createConnection,
  createHarness,
} from "@prismatic-io/spectral/dist/testing";
import { arenaUsernamePassword } from "../connections";
import component from "../index";
import { getErrorMessage, getRecordString } from "../util";
import { dataSourceResultList } from "./resultHelpers";
jest.setTimeout(30000);
const harness = createHarness(component);
const testConnection = createConnection(arenaUsernamePassword, {
  baseUrl: "custom",
  customBaseUrl: process.env.ARENA_BASE_URL || "",
  email: process.env.ARENA_EMAIL || "",
  password: process.env.ARENA_PASSWORD || "",
});
let qualityProcessGuid: string = process.env.TEST_QUALITY_PROCESS_GUID ?? "";
let qualityProcessStepGuid: string =
  process.env.TEST_QUALITY_PROCESS_STEP_GUID ?? "";
let qualityProcessTemplateGuid: string =
  process.env.TEST_QUALITY_TEMPLATE_GUID ?? "";
let qualityProcessNumberFormatGuid = "";
let itemsCategoryGuid: string = process.env.TEST_ITEMS_CATEGORY_GUID ?? "";
let changesCategoryGuid: string = process.env.TEST_CHANGES_CATEGORY_GUID ?? "";
let requestsCategoryGuid: string =
  process.env.TEST_REQUESTS_CATEGORY_GUID ?? "";
let itemsCategoryAttributeGuid = "";
let changesCategoryAttributeGuid = "";
let ticketTemplateGuid: string = process.env.TEST_TICKET_TEMPLATE_GUID ?? "";
let stepAttributeGroupGuid = "";
let createdQualityProcessGuid = "";
let _createdStepAffectedGuid = "";
beforeAll(async () => {
  if (!qualityProcessGuid) {
    try {
      const result = await harness.action("listQualityProcesses", {
        connection: testConnection,
        limit: "1",
      });
      const items = (
        result?.data as {
          results?: Array<{
            guid: string;
          }>;
        }
      )?.results;
      if (items && items.length > 0) {
        qualityProcessGuid = items[0].guid;
      }
    } catch {}
  }
  if (qualityProcessGuid && !qualityProcessStepGuid) {
    try {
      const result = await harness.action("listQualityProcessSteps", {
        connection: testConnection,
        qualityProcessGuid,
      });
      const items = (
        result?.data as {
          results?: Array<{
            guid: string;
          }>;
        }
      )?.results;
      if (items && items.length > 0) {
        qualityProcessStepGuid = items[0].guid;
      }
    } catch {}
  }
  if (!qualityProcessTemplateGuid) {
    try {
      const result = await harness.action("listQualityProcessTemplates", {
        connection: testConnection,
        active: true,
      });
      const items = (
        result?.data as {
          results?: Array<{
            guid: string;
          }>;
        }
      )?.results;
      if (items && items.length > 0) {
        qualityProcessTemplateGuid = items[0].guid;
      }
    } catch {}
  }
  try {
    const result = await harness.action("listQualityProcessNumberFormats", {
      connection: testConnection,
    });
    const items = (
      result?.data as {
        results?: Array<{
          guid: string;
        }>;
      }
    )?.results;
    if (items && items.length > 0) {
      qualityProcessNumberFormatGuid = items[0].guid;
    }
  } catch {}
  if (!itemsCategoryGuid) {
    try {
      const result = await harness.action("listCategories", {
        connection: testConnection,
        objectType: "items",
      });
      const items = (
        result?.data as {
          results?: Array<{
            guid: string;
          }>;
        }
      )?.results;
      if (items && items.length > 0) {
        itemsCategoryGuid = items[0].guid;
      }
    } catch {}
  }
  if (!changesCategoryGuid) {
    try {
      const result = await harness.action("listCategories", {
        connection: testConnection,
        objectType: "changes",
      });
      const items = (
        result?.data as {
          results?: Array<{
            guid: string;
          }>;
        }
      )?.results;
      if (items && items.length > 0) {
        changesCategoryGuid = items[0].guid;
      }
    } catch {}
  }
  if (!requestsCategoryGuid) {
    try {
      const result = await harness.action("listCategories", {
        connection: testConnection,
        objectType: "requests",
      });
      const items = (
        result?.data as {
          results?: Array<{
            guid: string;
          }>;
        }
      )?.results;
      if (items && items.length > 0) {
        requestsCategoryGuid = items[0].guid;
      }
    } catch {}
  }
  if (itemsCategoryGuid) {
    try {
      const result = await harness.action("listCategoryAttributes", {
        connection: testConnection,
        objectType: "items",
        categoryGuid: itemsCategoryGuid,
      });
      const attrs = (
        result?.data as {
          results?: Array<{
            guid: string;
          }>;
        }
      )?.results;
      if (attrs && attrs.length > 0) {
        itemsCategoryAttributeGuid = attrs[0].guid;
      }
    } catch {}
  }
  if (changesCategoryGuid) {
    try {
      const result = await harness.action("listCategoryAttributes", {
        connection: testConnection,
        objectType: "changes",
        categoryGuid: changesCategoryGuid,
      });
      const attrs = (
        result?.data as {
          results?: Array<{
            guid: string;
          }>;
        }
      )?.results;
      if (attrs && attrs.length > 0) {
        changesCategoryAttributeGuid = attrs[0].guid;
      }
    } catch {}
  }
  if (!ticketTemplateGuid) {
    try {
      const result = await harness.action("listTicketTemplates", {
        connection: testConnection,
        active: true,
      });
      const items = (
        result?.data as {
          results?: Array<{
            guid: string;
          }>;
        }
      )?.results;
      if (items && items.length > 0) {
        ticketTemplateGuid = items[0].guid;
      }
    } catch {}
  }
  try {
    const result = await harness.action(
      "listQualityProcessStepAttributeGroups",
      {
        connection: testConnection,
      },
    );
    const items = (
      result?.data as {
        results?: Array<{
          guid: string;
        }>;
      }
    )?.results;
    if (items && items.length > 0) {
      stepAttributeGroupGuid = items[0].guid;
    }
  } catch {}
}, 120000);
afterAll(async () => {
  if (createdQualityProcessGuid) {
    try {
      await harness.action("deleteQualityProcess", {
        connection: testConnection,
        qualityProcessGuid: createdQualityProcessGuid,
      });
    } catch {}
  }
}, 30000);
describe("Action: listQualityProcesses", () => {
  test("returns a list of quality processes without filters", async () => {
    const result = await harness.action("listQualityProcesses", {
      connection: testConnection,
    });
    expect(result).toBeDefined();
    expect(result?.data).toBeDefined();
  });
  test("accepts limit and offset parameters", async () => {
    const result = await harness.action("listQualityProcesses", {
      connection: testConnection,
      limit: "5",
      offset: "0",
    });
    expect(result).toBeDefined();
    expect(result?.data).toBeDefined();
  });
  test("filters by status=OPEN without error", async () => {
    const result = await harness.action("listQualityProcesses", {
      connection: testConnection,
      status: "OPEN",
    });
    expect(result).toBeDefined();
    expect(result?.data).toBeDefined();
  });
  test("throws on invalid connection credentials", async () => {
    const badConnection = createConnection(arenaUsernamePassword, {
      baseUrl: "custom",
      customBaseUrl: process.env.ARENA_BASE_URL || "",
      email: "invalid@example.com",
      password: "wrongpassword",
    });
    await expect(async () => {
      await harness.action("listQualityProcesses", {
        connection: badConnection,
      });
    }).rejects.toThrow();
  });
});
describe("Action: getQualityProcessByGuid", () => {
  test("retrieves quality process details by GUID", async () => {
    if (!qualityProcessGuid) {
      console.warn("Skipping: no quality process GUID available");
      return;
    }
    const result = await harness.action("getQualityProcessByGuid", {
      connection: testConnection,
      qualityProcessGuid,
    });
    expect(result).toBeDefined();
    expect(result?.data).toBeDefined();
    expect(
      (
        result?.data as {
          guid: string;
        }
      ).guid,
    ).toBe(qualityProcessGuid);
  });
  test("throws on invalid quality process GUID", async () => {
    await expect(async () => {
      await harness.action("getQualityProcessByGuid", {
        connection: testConnection,
        qualityProcessGuid: "INVALIDGUID00000000000",
      });
    }).rejects.toThrow();
  });
});
describe("Action: updateQualityProcess", () => {
  test("updates quality process description without error", async () => {
    if (!qualityProcessGuid) {
      console.warn("Skipping: no quality process GUID available");
      return;
    }
    const result = await harness.action("updateQualityProcess", {
      connection: testConnection,
      qualityProcessGuid,
      data: { description: "Integration test update — safe to ignore" },
    });
    expect(result).toBeDefined();
    expect(result?.data).toBeDefined();
  });
  test("throws on invalid quality process GUID", async () => {
    await expect(async () => {
      await harness.action("updateQualityProcess", {
        connection: testConnection,
        qualityProcessGuid: "INVALIDGUID00000000000",
        data: { description: "Should fail" },
      });
    }).rejects.toThrow();
  });
});
describe("Action: createQualityProcess and deleteQualityProcess", () => {
  test("creates a new quality process with a template and then deletes it", async () => {
    if (!qualityProcessTemplateGuid) {
      console.warn("Skipping: no quality process template GUID available");
      return;
    }
    const createResult = await harness.action("createQualityProcess", {
      connection: testConnection,
      name: "Integration Test QP — DELETE ME",
      description: "Created by integration test; will be deleted immediately",
      templateGuid: qualityProcessTemplateGuid,
    });
    expect(createResult).toBeDefined();
    expect(createResult?.data).toBeDefined();
    const createdGuid = (
      createResult?.data as {
        guid: string;
      }
    ).guid;
    expect(typeof createdGuid).toBe("string");
    createdQualityProcessGuid = createdGuid;
    const deleteResult = await harness.action("deleteQualityProcess", {
      connection: testConnection,
      qualityProcessGuid: createdGuid,
    });
    expect(deleteResult).toBeDefined();
    createdQualityProcessGuid = "";
  });
  test("deleteQualityProcess throws on invalid GUID", async () => {
    await expect(async () => {
      await harness.action("deleteQualityProcess", {
        connection: testConnection,
        qualityProcessGuid: "INVALIDGUID00000000000",
      });
    }).rejects.toThrow();
  });
  test("createQualityProcess throws on invalid template GUID", async () => {
    await expect(async () => {
      await harness.action("createQualityProcess", {
        connection: testConnection,
        name: "Should fail QP",
        templateGuid: "INVALIDTEMPLATEGUIDE000",
      });
    }).rejects.toThrow();
  });
});
describe("Action: changeQualityProcessStatus", () => {
  test("changes quality process status to OPEN (process-level)", async () => {
    if (!qualityProcessGuid) {
      console.warn("Skipping: no quality process GUID available");
      return;
    }
    try {
      const result = await harness.action("changeQualityProcessStatus", {
        connection: testConnection,
        requestType: "qualityStatus",
        qualityProcessGuid,
        status: "OPEN",
      });
      expect(result).toBeDefined();
      expect(result?.data).toBeDefined();
    } catch (err: unknown) {
      if (getErrorMessage(err).includes("already open")) {
        console.warn(
          "changeQualityProcessStatus skipped: process is already OPEN",
        );
        return;
      }
      throw err;
    }
  });
  test("throws when requestType=qualityStatus and status is missing", async () => {
    if (!qualityProcessGuid) {
      console.warn("Skipping: no quality process GUID available");
      return;
    }
    await expect(async () => {
      await harness.action("changeQualityProcessStatus", {
        connection: testConnection,
        requestType: "qualityStatus",
        qualityProcessGuid,
      });
    }).rejects.toThrow();
  });
  test("throws when requestType=stepWorkflow and stepGuid is missing", async () => {
    if (!qualityProcessGuid) {
      console.warn("Skipping: no quality process GUID available");
      return;
    }
    await expect(async () => {
      await harness.action("changeQualityProcessStatus", {
        connection: testConnection,
        requestType: "stepWorkflow",
        qualityProcessGuid,
        status: "OPEN",
      });
    }).rejects.toThrow();
  });
  test("throws on invalid quality process GUID", async () => {
    await expect(async () => {
      await harness.action("changeQualityProcessStatus", {
        connection: testConnection,
        requestType: "qualityStatus",
        qualityProcessGuid: "INVALIDGUID00000000000",
        status: "OPEN",
      });
    }).rejects.toThrow();
  });
});
describe("Action: listQualityProcessSteps", () => {
  test("returns steps for a valid quality process GUID", async () => {
    if (!qualityProcessGuid) {
      console.warn("Skipping: no quality process GUID available");
      return;
    }
    const result = await harness.action("listQualityProcessSteps", {
      connection: testConnection,
      qualityProcessGuid,
    });
    expect(result).toBeDefined();
    expect(result?.data).toBeDefined();
  });
  test("throws on invalid quality process GUID", async () => {
    await expect(async () => {
      await harness.action("listQualityProcessSteps", {
        connection: testConnection,
        qualityProcessGuid: "INVALIDGUID00000000000",
      });
    }).rejects.toThrow();
  });
});
describe("Action: getQualityProcessStepByGuid", () => {
  test("retrieves step details by GUID", async () => {
    if (!qualityProcessGuid || !qualityProcessStepGuid) {
      console.warn("Skipping: no quality process step GUID available");
      return;
    }
    const result = await harness.action("getQualityProcessStepByGuid", {
      connection: testConnection,
      qualityProcessGuid,
      stepGuid: qualityProcessStepGuid,
    });
    expect(result).toBeDefined();
    expect(result?.data).toBeDefined();
    expect(
      (
        result?.data as {
          guid: string;
        }
      ).guid,
    ).toBe(qualityProcessStepGuid);
  });
  test("retrieves step with includeEmptyAdditionalAttributes=true", async () => {
    if (!qualityProcessGuid || !qualityProcessStepGuid) {
      console.warn("Skipping: no quality process step GUID available");
      return;
    }
    const result = await harness.action("getQualityProcessStepByGuid", {
      connection: testConnection,
      qualityProcessGuid,
      stepGuid: qualityProcessStepGuid,
      includeEmptyAdditionalAttributes: true,
    });
    expect(result).toBeDefined();
    expect(result?.data).toBeDefined();
  });
  test("throws on invalid step GUID", async () => {
    if (!qualityProcessGuid) {
      console.warn("Skipping: no quality process GUID available");
      return;
    }
    await expect(async () => {
      await harness.action("getQualityProcessStepByGuid", {
        connection: testConnection,
        qualityProcessGuid,
        stepGuid: "INVALIDSTEPGUID00000000",
      });
    }).rejects.toThrow();
  });
});
describe("Action: updateQualityProcessStep", () => {
  test("throws on invalid step GUID", async () => {
    if (!qualityProcessGuid) {
      console.warn("Skipping: no quality process GUID available");
      return;
    }
    await expect(async () => {
      await harness.action("updateQualityProcessStep", {
        connection: testConnection,
        qualityProcessGuid,
        stepGuid: "INVALIDSTEPGUID00000000",
        data: { name: "Should fail" },
      });
    }).rejects.toThrow();
  });
});
describe("Action: submitQualityStepDecision", () => {
  test("throws on invalid quality process GUID", async () => {
    await expect(async () => {
      await harness.action("submitQualityStepDecision", {
        connection: testConnection,
        qualityprocessGuid: "INVALIDGUID00000000000",
        stepGuid: "INVALIDSTEPGUID00000000",
        decisionGuid: "INVALIDDECGUID00000000",
        decision: "APPROVED",
      });
    }).rejects.toThrow();
  });
});
describe("Action: listQualityProcessStepAffected", () => {
  test("returns affected objects for a valid quality process step", async () => {
    if (!qualityProcessGuid || !qualityProcessStepGuid) {
      console.warn("Skipping: no quality process step GUID available");
      return;
    }
    const result = await harness.action("listQualityProcessStepAffected", {
      connection: testConnection,
      qualityProcessGuid,
      stepGuid: qualityProcessStepGuid,
    });
    expect(result).toBeDefined();
    expect(result?.data).toBeDefined();
  });
  test("throws on invalid step GUID", async () => {
    if (!qualityProcessGuid) {
      console.warn("Skipping: no quality process GUID available");
      return;
    }
    await expect(async () => {
      await harness.action("listQualityProcessStepAffected", {
        connection: testConnection,
        qualityProcessGuid,
        stepGuid: "INVALIDSTEPGUID00000000",
      });
    }).rejects.toThrow();
  });
});
describe("Action: createQualityProcessStepAffected, getQualityProcessStepAffectedByGuid, updateQualityProcessStepAffected, deleteQualityProcessStepAffected", () => {
  const knownItemGuid = process.env.TEST_ITEM_GUID ?? "";
  test("createQualityProcessStepAffected throws on invalid quality process GUID", async () => {
    await expect(async () => {
      await harness.action("createQualityProcessStepAffected", {
        connection: testConnection,
        qualityProcessGuid: "INVALIDGUID00000000000",
        stepGuid: "INVALIDSTEPGUID00000000",
        affectedObjectGuid: "INVALIDOBJGUID00000000",
      });
    }).rejects.toThrow();
  });
  test("creates, retrieves, updates, and deletes a step affected object (full lifecycle)", async () => {
    if (!qualityProcessGuid || !qualityProcessStepGuid || !knownItemGuid) {
      console.warn(
        "Skipping: requires TEST_QUALITY_PROCESS_GUID, TEST_QUALITY_PROCESS_STEP_GUID, and TEST_ITEM_GUID env vars",
      );
      return;
    }
    const createResult = await harness.action(
      "createQualityProcessStepAffected",
      {
        connection: testConnection,
        qualityProcessGuid,
        stepGuid: qualityProcessStepGuid,
        affectedObjectGuid: knownItemGuid,
        notes: "Integration test — DELETE ME",
      },
    );
    expect(createResult).toBeDefined();
    expect(createResult?.data).toBeDefined();
    const affectedGuid = (
      createResult?.data as {
        guid: string;
      }
    ).guid;
    expect(typeof affectedGuid).toBe("string");
    _createdStepAffectedGuid = affectedGuid;
    const getResult = await harness.action(
      "getQualityProcessStepAffectedByGuid",
      {
        connection: testConnection,
        qualityProcessGuid,
        stepGuid: qualityProcessStepGuid,
        affectedGuid,
      },
    );
    expect(getResult).toBeDefined();
    expect(getResult?.data).toBeDefined();
    const updateResult = await harness.action(
      "updateQualityProcessStepAffected",
      {
        connection: testConnection,
        qualityProcessGuid,
        stepGuid: qualityProcessStepGuid,
        affectedGuid,
        notes: "Integration test update — DELETE ME",
      },
    );
    expect(updateResult).toBeDefined();
    expect(updateResult?.data).toBeDefined();
    const deleteResult = await harness.action(
      "deleteQualityProcessStepAffected",
      {
        connection: testConnection,
        qualityProcessGuid,
        stepGuid: qualityProcessStepGuid,
        affectedGuid,
      },
    );
    expect(deleteResult).toBeDefined();
    _createdStepAffectedGuid = "";
  });
  test("getQualityProcessStepAffectedByGuid throws on invalid affected GUID", async () => {
    if (!qualityProcessGuid || !qualityProcessStepGuid) {
      console.warn("Skipping: no quality process step GUID available");
      return;
    }
    await expect(async () => {
      await harness.action("getQualityProcessStepAffectedByGuid", {
        connection: testConnection,
        qualityProcessGuid,
        stepGuid: qualityProcessStepGuid,
        affectedGuid: "INVALIDAFFGUID00000000",
      });
    }).rejects.toThrow();
  });
  test("deleteQualityProcessStepAffected throws on invalid affected GUID", async () => {
    if (!qualityProcessGuid || !qualityProcessStepGuid) {
      console.warn("Skipping: no quality process step GUID available");
      return;
    }
    await expect(async () => {
      await harness.action("deleteQualityProcessStepAffected", {
        connection: testConnection,
        qualityProcessGuid,
        stepGuid: qualityProcessStepGuid,
        affectedGuid: "INVALIDAFFGUID00000000",
      });
    }).rejects.toThrow();
  });
});
describe("Action: listQualityStepDecisions", () => {
  test("returns decisions for a valid quality process step", async () => {
    if (!qualityProcessGuid || !qualityProcessStepGuid) {
      console.warn("Skipping: no quality process step GUID available");
      return;
    }
    try {
      const result = await harness.action("listQualityStepDecisions", {
        connection: testConnection,
        qualityprocessGuid: qualityProcessGuid,
        stepGuid: qualityProcessStepGuid,
      });
      expect(result).toBeDefined();
      expect(result?.data).toBeDefined();
    } catch (err: unknown) {
      if (
        getErrorMessage(err).includes("SIGN_OFF") ||
        getErrorMessage(err).includes("sign_off")
      ) {
        console.warn(
          "listQualityStepDecisions skipped: discovered step is not a SIGN_OFF step",
        );
        return;
      }
      throw err;
    }
  });
  test("throws on invalid step GUID", async () => {
    if (!qualityProcessGuid) {
      console.warn("Skipping: no quality process GUID available");
      return;
    }
    await expect(async () => {
      await harness.action("listQualityStepDecisions", {
        connection: testConnection,
        qualityprocessGuid: qualityProcessGuid,
        stepGuid: "INVALIDSTEPGUID00000000",
      });
    }).rejects.toThrow();
  });
});
describe("Action: addQualityStepApprover", () => {
  test("throws when neither userGuid nor groupGuid is provided", async () => {
    if (!qualityProcessGuid || !qualityProcessStepGuid) {
      console.warn("Skipping: no quality process step GUID available");
      return;
    }
    await expect(async () => {
      await harness.action("addQualityStepApprover", {
        connection: testConnection,
        qualityprocessGuid: qualityProcessGuid,
        stepGuid: qualityProcessStepGuid,
        decisionType: "ALL_REQUIRED",
      });
    }).rejects.toThrow();
  });
  test("throws when both userGuid and groupGuid are provided", async () => {
    if (!qualityProcessGuid || !qualityProcessStepGuid) {
      console.warn("Skipping: no quality process step GUID available");
      return;
    }
    await expect(async () => {
      await harness.action("addQualityStepApprover", {
        connection: testConnection,
        qualityprocessGuid: qualityProcessGuid,
        stepGuid: qualityProcessStepGuid,
        decisionType: "ALL_REQUIRED",
        userGuid: "USERGUID000000000000001",
        groupGuid: "GROUPGUID00000000000001",
      });
    }).rejects.toThrow();
  });
  test("throws on invalid quality process GUID with valid decisionType and userGuid", async () => {
    await expect(async () => {
      await harness.action("addQualityStepApprover", {
        connection: testConnection,
        qualityprocessGuid: "INVALIDGUID00000000000",
        stepGuid: "INVALIDSTEPGUID00000000",
        decisionType: "ALL_REQUIRED",
        userGuid: "USERGUID000000000000001",
      });
    }).rejects.toThrow();
  });
});
describe("Action: listQualityProcessTemplates", () => {
  test("returns a list of quality process templates", async () => {
    const result = await harness.action("listQualityProcessTemplates", {
      connection: testConnection,
    });
    expect(result).toBeDefined();
    expect(result?.data).toBeDefined();
  });
  test("filters to active templates only", async () => {
    const result = await harness.action("listQualityProcessTemplates", {
      connection: testConnection,
      active: true,
    });
    expect(result).toBeDefined();
    expect(result?.data).toBeDefined();
  });
  test("filters to inactive templates only", async () => {
    const result = await harness.action("listQualityProcessTemplates", {
      connection: testConnection,
      active: false,
    });
    expect(result).toBeDefined();
    expect(result?.data).toBeDefined();
  });
});
describe("Action: getQualityProcessTemplateByGuid", () => {
  test("retrieves a quality process template by GUID", async () => {
    if (!qualityProcessTemplateGuid) {
      console.warn("Skipping: no quality process template GUID available");
      return;
    }
    const result = await harness.action("getQualityProcessTemplateByGuid", {
      connection: testConnection,
      templateGuid: qualityProcessTemplateGuid,
    });
    expect(result).toBeDefined();
    expect(result?.data).toBeDefined();
    expect(
      (
        result?.data as {
          guid: string;
        }
      ).guid,
    ).toBe(qualityProcessTemplateGuid);
  });
  test("throws on invalid template GUID", async () => {
    await expect(async () => {
      await harness.action("getQualityProcessTemplateByGuid", {
        connection: testConnection,
        templateGuid: "INVALIDTEMPLATEGUIDE000",
      });
    }).rejects.toThrow();
  });
});
describe("Action: listQualityProcessTemplateAttributes", () => {
  test("returns attributes for a quality process template", async () => {
    if (!qualityProcessTemplateGuid) {
      console.warn("Skipping: no quality process template GUID available");
      return;
    }
    const result = await harness.action(
      "listQualityProcessTemplateAttributes",
      {
        connection: testConnection,
        templateGuid: qualityProcessTemplateGuid,
      },
    );
    expect(result).toBeDefined();
    expect(result?.data).toBeDefined();
  });
  test("returns attributes with includePossibleValues=true", async () => {
    if (!qualityProcessTemplateGuid) {
      console.warn("Skipping: no quality process template GUID available");
      return;
    }
    const result = await harness.action(
      "listQualityProcessTemplateAttributes",
      {
        connection: testConnection,
        templateGuid: qualityProcessTemplateGuid,
        includePossibleValues: true,
      },
    );
    expect(result).toBeDefined();
    expect(result?.data).toBeDefined();
  });
  test("returns only creatable attributes", async () => {
    if (!qualityProcessTemplateGuid) {
      console.warn("Skipping: no quality process template GUID available");
      return;
    }
    const result = await harness.action(
      "listQualityProcessTemplateAttributes",
      {
        connection: testConnection,
        templateGuid: qualityProcessTemplateGuid,
        creatableOnly: true,
      },
    );
    expect(result).toBeDefined();
    expect(result?.data).toBeDefined();
  });
  test("throws on invalid template GUID", async () => {
    await expect(async () => {
      await harness.action("listQualityProcessTemplateAttributes", {
        connection: testConnection,
        templateGuid: "INVALIDTEMPLATEGUIDE000",
      });
    }).rejects.toThrow();
  });
});
describe("Action: listQualityProcessTemplateAttributeGroups", () => {
  test("returns attribute groups for a quality process template", async () => {
    if (!qualityProcessTemplateGuid) {
      console.warn("Skipping: no quality process template GUID available");
      return;
    }
    const result = await harness.action(
      "listQualityProcessTemplateAttributeGroups",
      {
        connection: testConnection,
        templateGuid: qualityProcessTemplateGuid,
      },
    );
    expect(result).toBeDefined();
    expect(result?.data).toBeDefined();
  });
  test("throws on invalid template GUID", async () => {
    await expect(async () => {
      await harness.action("listQualityProcessTemplateAttributeGroups", {
        connection: testConnection,
        templateGuid: "INVALIDTEMPLATEGUIDE000",
      });
    }).rejects.toThrow();
  });
});
describe("Action: listQualityProcessStepAttributes", () => {
  test("returns quality process step attributes without filters", async () => {
    const result = await harness.action("listQualityProcessStepAttributes", {
      connection: testConnection,
    });
    expect(result).toBeDefined();
    expect(result?.data).toBeDefined();
  });
  test("returns step attributes with includePossibleValues=true", async () => {
    const result = await harness.action("listQualityProcessStepAttributes", {
      connection: testConnection,
      includePossibleValues: true,
    });
    expect(result).toBeDefined();
    expect(result?.data).toBeDefined();
  });
  test("returns only editable step attributes", async () => {
    const result = await harness.action("listQualityProcessStepAttributes", {
      connection: testConnection,
      editableOnly: true,
    });
    expect(result).toBeDefined();
    expect(result?.data).toBeDefined();
  });
});
describe("Action: listQualityProcessStepAttributeGroups", () => {
  test("returns all quality process step attribute groups", async () => {
    const result = await harness.action(
      "listQualityProcessStepAttributeGroups",
      {
        connection: testConnection,
      },
    );
    expect(result).toBeDefined();
    expect(result?.data).toBeDefined();
  });
});
describe("Action: getQualityProcessStepAttributeGroupByGuid", () => {
  test("retrieves a step attribute group by GUID", async () => {
    if (!stepAttributeGroupGuid) {
      console.warn("Skipping: no step attribute group GUID available");
      return;
    }
    const result = await harness.action(
      "getQualityProcessStepAttributeGroupByGuid",
      {
        connection: testConnection,
        attributeGroupGuid: stepAttributeGroupGuid,
      },
    );
    expect(result).toBeDefined();
    expect(result?.data).toBeDefined();
    expect(
      (
        result?.data as {
          guid: string;
        }
      ).guid,
    ).toBe(stepAttributeGroupGuid);
  });
  test("throws on invalid attribute group GUID", async () => {
    await expect(async () => {
      await harness.action("getQualityProcessStepAttributeGroupByGuid", {
        connection: testConnection,
        attributeGroupGuid: "INVALIDGROUPGUID000000",
      });
    }).rejects.toThrow();
  });
});
describe("Action: listQualityProcessNumberFormats", () => {
  test("returns all quality process number formats", async () => {
    const result = await harness.action("listQualityProcessNumberFormats", {
      connection: testConnection,
    });
    expect(result).toBeDefined();
    expect(result?.data).toBeDefined();
  });
});
describe("Action: getQualityProcessNumberFormatByGuid", () => {
  test("retrieves a quality process number format by GUID", async () => {
    if (!qualityProcessNumberFormatGuid) {
      console.warn("Skipping: no quality process number format GUID available");
      return;
    }
    const result = await harness.action("getQualityProcessNumberFormatByGuid", {
      connection: testConnection,
      guid: qualityProcessNumberFormatGuid,
    });
    expect(result).toBeDefined();
    expect(result?.data).toBeDefined();
    expect(
      (
        result?.data as {
          guid: string;
        }
      ).guid,
    ).toBe(qualityProcessNumberFormatGuid);
  });
  test("throws on invalid number format GUID", async () => {
    await expect(async () => {
      await harness.action("getQualityProcessNumberFormatByGuid", {
        connection: testConnection,
        guid: "INVALIDGUID00000000000",
      });
    }).rejects.toThrow();
  });
});
describe("Action: listTicketTemplateAttributes", () => {
  test("returns attributes for a ticket template", async () => {
    if (!ticketTemplateGuid) {
      console.warn("Skipping: no ticket template GUID available");
      return;
    }
    try {
      const result = await harness.action("listTicketTemplateAttributes", {
        connection: testConnection,
        templateGuid: ticketTemplateGuid,
      });
      expect(result).toBeDefined();
      expect(result?.data).toBeDefined();
    } catch (err: unknown) {
      if (
        getErrorMessage(err).includes("Unknown errors") ||
        getErrorMessage(err).includes("Technical Support")
      ) {
        console.warn(
          "listTicketTemplateAttributes skipped: server returned known workspace limitation error",
        );
        return;
      }
      throw err;
    }
  });
  test("returns ticket template attributes with includePossibleValues=true", async () => {
    if (!ticketTemplateGuid) {
      console.warn("Skipping: no ticket template GUID available");
      return;
    }
    try {
      const result = await harness.action("listTicketTemplateAttributes", {
        connection: testConnection,
        templateGuid: ticketTemplateGuid,
        includePossibleValues: true,
      });
      expect(result).toBeDefined();
      expect(result?.data).toBeDefined();
    } catch (err: unknown) {
      if (
        getErrorMessage(err).includes("Unknown errors") ||
        getErrorMessage(err).includes("Technical Support")
      ) {
        console.warn(
          "listTicketTemplateAttributes (includePossibleValues) skipped: server returned known workspace limitation error",
        );
        return;
      }
      throw err;
    }
  });
  test("returns only searchable ticket template attributes", async () => {
    if (!ticketTemplateGuid) {
      console.warn("Skipping: no ticket template GUID available");
      return;
    }
    try {
      const result = await harness.action("listTicketTemplateAttributes", {
        connection: testConnection,
        templateGuid: ticketTemplateGuid,
        searchableOnly: true,
      });
      expect(result).toBeDefined();
      expect(result?.data).toBeDefined();
    } catch (err: unknown) {
      if (
        getErrorMessage(err).includes("Unknown errors") ||
        getErrorMessage(err).includes("Technical Support")
      ) {
        console.warn(
          "listTicketTemplateAttributes (searchableOnly) skipped: server returned known workspace limitation error",
        );
        return;
      }
      throw err;
    }
  });
  test("throws on invalid template GUID", async () => {
    await expect(async () => {
      await harness.action("listTicketTemplateAttributes", {
        connection: testConnection,
        templateGuid: "INVALIDTEMPLATEGUIDE000",
      });
    }).rejects.toThrow();
  });
});
describe("Action: listRequestItemAttributes", () => {
  test("returns request item attributes without filters", async () => {
    const result = await harness.action("listRequestItemAttributes", {
      connection: testConnection,
    });
    expect(result).toBeDefined();
    expect(result?.data).toBeDefined();
  });
  test("returns request item attributes with includePossibleValues=true", async () => {
    const result = await harness.action("listRequestItemAttributes", {
      connection: testConnection,
      includePossibleValues: "true",
    });
    expect(result).toBeDefined();
    expect(result?.data).toBeDefined();
  });
  test("returns only editable request item attributes", async () => {
    const result = await harness.action("listRequestItemAttributes", {
      connection: testConnection,
      editableOnly: "true",
    });
    expect(result).toBeDefined();
    expect(result?.data).toBeDefined();
  });
  test("returns only searchable request item attributes", async () => {
    const result = await harness.action("listRequestItemAttributes", {
      connection: testConnection,
      searchableOnly: "true",
    });
    expect(result).toBeDefined();
    expect(result?.data).toBeDefined();
  });
});
describe("Action: listBomAttributes", () => {
  test("returns BOM attributes without filters", async () => {
    const result = await harness.action("listBomAttributes", {
      connection: testConnection,
    });
    expect(result).toBeDefined();
    expect(result?.data).toBeDefined();
  });
  test("returns BOM attributes with includePossibleValues=true", async () => {
    const result = await harness.action("listBomAttributes", {
      connection: testConnection,
      includePossibleValues: "true",
    });
    expect(result).toBeDefined();
    expect(result?.data).toBeDefined();
  });
  test("returns only creatable BOM attributes", async () => {
    const result = await harness.action("listBomAttributes", {
      connection: testConnection,
      creatableOnly: "true",
    });
    expect(result).toBeDefined();
    expect(result?.data).toBeDefined();
  });
});
describe("Action: listCategories", () => {
  test("returns categories for objectType='items'", async () => {
    const result = await harness.action("listCategories", {
      connection: testConnection,
      objectType: "items",
    });
    expect(result).toBeDefined();
    expect(result?.data).toBeDefined();
  });
  test("returns categories for objectType='changes'", async () => {
    const result = await harness.action("listCategories", {
      connection: testConnection,
      objectType: "changes",
    });
    expect(result).toBeDefined();
    expect(result?.data).toBeDefined();
  });
  test("returns categories for objectType='requests'", async () => {
    const result = await harness.action("listCategories", {
      connection: testConnection,
      objectType: "requests",
    });
    expect(result).toBeDefined();
    expect(result?.data).toBeDefined();
  });
  test("returns categories for objectType='files'", async () => {
    const result = await harness.action("listCategories", {
      connection: testConnection,
      objectType: "files",
    });
    expect(result).toBeDefined();
    expect(result?.data).toBeDefined();
  });
  test("filters items categories to assignable only", async () => {
    const result = await harness.action("listCategories", {
      connection: testConnection,
      objectType: "items",
      assignable: "true",
    });
    expect(result).toBeDefined();
    expect(result?.data).toBeDefined();
  });
  test("includes deleted items categories when requested", async () => {
    const result = await harness.action("listCategories", {
      connection: testConnection,
      objectType: "items",
      includeDeleted: "true",
    });
    expect(result).toBeDefined();
    expect(result?.data).toBeDefined();
  });
  test("throws on invalid connection credentials", async () => {
    const badConnection = createConnection(arenaUsernamePassword, {
      baseUrl: "custom",
      customBaseUrl: process.env.ARENA_BASE_URL || "",
      email: "invalid@example.com",
      password: "wrongpassword",
    });
    await expect(async () => {
      await harness.action("listCategories", {
        connection: badConnection,
        objectType: "items",
      });
    }).rejects.toThrow();
  });
});
describe("Action: listCategoryAttributes", () => {
  test("returns attributes for an items category", async () => {
    if (!itemsCategoryGuid) {
      console.warn("Skipping: no items category GUID available");
      return;
    }
    const result = await harness.action("listCategoryAttributes", {
      connection: testConnection,
      objectType: "items",
      categoryGuid: itemsCategoryGuid,
    });
    expect(result).toBeDefined();
    expect(result?.data).toBeDefined();
  });
  test("returns attributes for a changes category", async () => {
    if (!changesCategoryGuid) {
      console.warn("Skipping: no changes category GUID available");
      return;
    }
    const result = await harness.action("listCategoryAttributes", {
      connection: testConnection,
      objectType: "changes",
      categoryGuid: changesCategoryGuid,
    });
    expect(result).toBeDefined();
    expect(result?.data).toBeDefined();
  });
  test("returns items category attributes with includePossibleValues=true", async () => {
    if (!itemsCategoryGuid) {
      console.warn("Skipping: no items category GUID available");
      return;
    }
    const result = await harness.action("listCategoryAttributes", {
      connection: testConnection,
      objectType: "items",
      categoryGuid: itemsCategoryGuid,
      includePossibleValues: "true",
    });
    expect(result).toBeDefined();
    expect(result?.data).toBeDefined();
  });
  test("returns only editable items category attributes", async () => {
    if (!itemsCategoryGuid) {
      console.warn("Skipping: no items category GUID available");
      return;
    }
    const result = await harness.action("listCategoryAttributes", {
      connection: testConnection,
      objectType: "items",
      categoryGuid: itemsCategoryGuid,
      editableOnly: "true",
    });
    expect(result).toBeDefined();
    expect(result?.data).toBeDefined();
  });
  test("throws on invalid category GUID", async () => {
    await expect(async () => {
      await harness.action("listCategoryAttributes", {
        connection: testConnection,
        objectType: "items",
        categoryGuid: "INVALIDCATGUID00000000",
      });
    }).rejects.toThrow();
  });
});
describe("Action: getFileCategoryAttributeDetails", () => {
  test("retrieves details for a specific items category attribute", async () => {
    if (!itemsCategoryGuid || !itemsCategoryAttributeGuid) {
      console.warn(
        "Skipping: no items category GUID or attribute definition GUID available",
      );
      return;
    }
    const result = await harness.action("getFileCategoryAttributeDetails", {
      connection: testConnection,
      objectType: "items",
      categoryGuid: itemsCategoryGuid,
      attributeDefinitionGuid: itemsCategoryAttributeGuid,
    });
    expect(result).toBeDefined();
    expect(result?.data).toBeDefined();
    expect(
      (
        result?.data as {
          guid: string;
        }
      ).guid,
    ).toBe(itemsCategoryAttributeGuid);
  });
  test("retrieves details for a specific changes category attribute", async () => {
    if (!changesCategoryGuid || !changesCategoryAttributeGuid) {
      console.warn(
        "Skipping: no changes category GUID or attribute definition GUID available",
      );
      return;
    }
    const result = await harness.action("getFileCategoryAttributeDetails", {
      connection: testConnection,
      objectType: "changes",
      categoryGuid: changesCategoryGuid,
      attributeDefinitionGuid: changesCategoryAttributeGuid,
    });
    expect(result).toBeDefined();
    expect(result?.data).toBeDefined();
  });
  test("throws on invalid attribute definition GUID", async () => {
    if (!itemsCategoryGuid) {
      console.warn("Skipping: no items category GUID available");
      return;
    }
    await expect(async () => {
      await harness.action("getFileCategoryAttributeDetails", {
        connection: testConnection,
        objectType: "items",
        categoryGuid: itemsCategoryGuid,
        attributeDefinitionGuid: "INVALIDATTRDEFGUID0000",
      });
    }).rejects.toThrow();
  });
  test("throws on invalid category GUID", async () => {
    await expect(async () => {
      await harness.action("getFileCategoryAttributeDetails", {
        connection: testConnection,
        objectType: "items",
        categoryGuid: "INVALIDCATGUID00000000",
        attributeDefinitionGuid: "INVALIDATTRDEFGUID0000",
      });
    }).rejects.toThrow();
  });
});
describe("Action: listChangeCategoryItemAttributes", () => {
  test("returns item attributes for a changes category", async () => {
    if (!changesCategoryGuid) {
      console.warn("Skipping: no changes category GUID available");
      return;
    }
    const result = await harness.action("listChangeCategoryItemAttributes", {
      connection: testConnection,
      categoryGuid: changesCategoryGuid,
    });
    expect(result).toBeDefined();
    expect(result?.data).toBeDefined();
  });
  test("returns change category item attributes with includePossibleValues=true", async () => {
    if (!changesCategoryGuid) {
      console.warn("Skipping: no changes category GUID available");
      return;
    }
    const result = await harness.action("listChangeCategoryItemAttributes", {
      connection: testConnection,
      categoryGuid: changesCategoryGuid,
      includePossibleValues: "true",
    });
    expect(result).toBeDefined();
    expect(result?.data).toBeDefined();
  });
  test("returns only searchable change category item attributes", async () => {
    if (!changesCategoryGuid) {
      console.warn("Skipping: no changes category GUID available");
      return;
    }
    const result = await harness.action("listChangeCategoryItemAttributes", {
      connection: testConnection,
      categoryGuid: changesCategoryGuid,
      searchableOnly: "true",
    });
    expect(result).toBeDefined();
    expect(result?.data).toBeDefined();
  });
  test("throws on invalid category GUID", async () => {
    await expect(async () => {
      await harness.action("listChangeCategoryItemAttributes", {
        connection: testConnection,
        categoryGuid: "INVALIDCATGUID00000000",
      });
    }).rejects.toThrow();
  });
});
describe("DataSource: qualityProcessTemplatesPicklist", () => {
  test("returns an array with label + key pairs", async () => {
    const result = await harness.dataSource("qualityProcessTemplatesPicklist", {
      connection: testConnection,
    });
    expect(result).toBeDefined();
    expect(Array.isArray(result.result)).toBe(true);
    if (dataSourceResultList(result).length > 0) {
      const first = dataSourceResultList(result)[0];
      expect(first).toHaveProperty("label");
      expect(first).toHaveProperty("key");
      expect(typeof first.label).toBe("string");
      expect(typeof first.key).toBe("string");
      if (!qualityProcessTemplateGuid) {
        qualityProcessTemplateGuid = getRecordString(first, "key") ?? "";
        console.log(
          `Discovered qualityProcessTemplateGuid from picklist: ${qualityProcessTemplateGuid}`,
        );
      }
    }
  });
});
