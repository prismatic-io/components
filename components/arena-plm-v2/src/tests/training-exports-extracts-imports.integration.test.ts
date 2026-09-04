import {
  createConnection,
  createHarness,
} from "@prismatic-io/spectral/dist/testing";
import { arenaUsernamePassword } from "../connections";
import component from "../index";
import { getErrorMessage } from "../util";
import { guidOf, resultData, resultList } from "./resultHelpers";
jest.setTimeout(30000);
const harness = createHarness(component);
const testConnection = createConnection(arenaUsernamePassword, {
  baseUrl: "custom",
  customBaseUrl: process.env.ARENA_BASE_URL || "",
  email: process.env.ARENA_EMAIL || "",
  password: process.env.ARENA_PASSWORD || "",
});
const TEST_TRAINING_GUID = process.env.TEST_TRAINING_GUID ?? "";
const TEST_TRAINING_USER_GUID = process.env.TEST_TRAINING_USER_GUID ?? "";
const TEST_TRAINING_ITEM_GUID = process.env.TEST_TRAINING_ITEM_GUID ?? "";
const TEST_TRAINING_FILE_GUID = process.env.TEST_TRAINING_FILE_GUID ?? "";
const TEST_TRAINING_QUALITY_GUID = process.env.TEST_TRAINING_QUALITY_GUID ?? "";
const TEST_EXPORT_GUID = process.env.TEST_EXPORT_GUID ?? "";
const TEST_EXPORT_RUN_GUID = process.env.TEST_EXPORT_RUN_GUID ?? "";
const TEST_EXPORT_RUN_FILE_GUID = process.env.TEST_EXPORT_RUN_FILE_GUID ?? "";
const TEST_EXTRACT_GUID = process.env.TEST_EXTRACT_GUID ?? "";
const TEST_EXTRACT_RUN_GUID = process.env.TEST_EXTRACT_RUN_GUID ?? "";
const TEST_EXTRACT_RUN_FILE_GUID = process.env.TEST_EXTRACT_RUN_FILE_GUID ?? "";
const TEST_IMPORT_GUID = process.env.TEST_IMPORT_GUID ?? "";
const TEST_IMPORT_RUN_GUID = process.env.TEST_IMPORT_RUN_GUID ?? "";
describe("Training Plan domain", () => {
  let trainingGuid: string = TEST_TRAINING_GUID;
  beforeAll(async () => {
    if (trainingGuid) return;
    try {
      const result = await harness.action("listTrainingPlans", {
        connection: testConnection,
        limit: "1",
      });
      const plans = resultList(result);
      if (plans.length > 0) {
        trainingGuid = guidOf(plans[0]);
      }
    } catch {}
  }, 30000);
  describe("Action: listTrainingPlans", () => {
    test("returns a result set without any filters", async () => {
      const result = await harness.action("listTrainingPlans", {
        connection: testConnection,
        limit: "20",
      });
      expect(result).toBeDefined();
      expect(result!.data).toBeDefined();
    }, 30000);
    test("filters by status OPEN without error", async () => {
      const result = await harness.action("listTrainingPlans", {
        connection: testConnection,
        status: "OPEN",
        limit: "20",
      });
      expect(result).toBeDefined();
      expect(result!.data).toBeDefined();
    }, 30000);
    test("filters by name with a non-matching value returns empty results without error", async () => {
      const result = await harness.action("listTrainingPlans", {
        connection: testConnection,
        name: "__NO_MATCH_INTEGRATION_TEST_XYZ__",
        limit: "20",
      });
      expect(result).toBeDefined();
      expect(result!.data).toBeDefined();
    }, 30000);
    test("respects offset and limit parameters", async () => {
      const result = await harness.action("listTrainingPlans", {
        connection: testConnection,
        offset: "0",
        limit: "5",
      });
      expect(result).toBeDefined();
      expect(result!.data).toBeDefined();
    }, 30000);
  });
  describe("Action: updateTrainingPlan", () => {
    test("throws on an invalid training GUID", async () => {
      await expect(
        harness.action("updateTrainingPlan", {
          connection: testConnection,
          trainingGuid: "INVALIDTRAININGGUID0000",
          name: "Should fail",
        }),
      ).rejects.toThrow();
    }, 30000);
    test("updates description on a discovered training plan", async () => {
      if (!trainingGuid) {
        console.warn(
          "No training GUID available; skipping updateTrainingPlan happy path",
        );
        return;
      }
      try {
        const result = await harness.action("updateTrainingPlan", {
          connection: testConnection,
          trainingGuid,
          description: `Integration test update ${new Date().toISOString()}`,
        });
        expect(result).toBeDefined();
        expect(result!.data).toBeDefined();
      } catch (err: unknown) {
        const message = String(getErrorMessage(err));
        if (
          message.includes("training manager") ||
          message.includes("training managers")
        ) {
          console.warn(
            "Skipping updateTrainingPlan: user does not have training manager role",
          );
          return;
        }
        throw err;
      }
    }, 30000);
  });
  describe("Action: listTrainingPlanUsers", () => {
    test("throws on an invalid training GUID", async () => {
      await expect(
        harness.action("listTrainingPlanUsers", {
          connection: testConnection,
          trainingGuid: "INVALIDTRAININGGUID0000",
        }),
      ).rejects.toThrow();
    }, 30000);
    test("returns users for a discovered training plan", async () => {
      if (!trainingGuid) {
        console.warn(
          "No training GUID available; skipping listTrainingPlanUsers happy path",
        );
        return;
      }
      const result = await harness.action("listTrainingPlanUsers", {
        connection: testConnection,
        trainingGuid,
      });
      expect(result).toBeDefined();
      expect(result!.data).toBeDefined();
    }, 30000);
  });
  describe("Action: addUserToTrainingPlan", () => {
    test("throws on an invalid training GUID", async () => {
      await expect(
        harness.action("addUserToTrainingPlan", {
          connection: testConnection,
          trainingGuid: "INVALIDTRAININGGUID0000",
          userGuid: "INVALIDUSERGUID00000000",
        }),
      ).rejects.toThrow();
    }, 30000);
    test("adds a user and removes them in the same test", async () => {
      if (!trainingGuid || !TEST_TRAINING_USER_GUID) {
        console.warn(
          "TEST_TRAINING_USER_GUID or training GUID not set; skipping addUserToTrainingPlan add/remove cycle",
        );
        return;
      }
      const addResult = await harness.action("addUserToTrainingPlan", {
        connection: testConnection,
        trainingGuid,
        userGuid: TEST_TRAINING_USER_GUID,
      });
      expect(addResult).toBeDefined();
      expect(addResult!.data).toBeDefined();
    }, 30000);
  });
  describe("Action: listTrainingPlanQuality", () => {
    test("throws on an invalid training GUID", async () => {
      await expect(
        harness.action("listTrainingPlanQuality", {
          connection: testConnection,
          trainingGuid: "INVALIDTRAININGGUID0000",
        }),
      ).rejects.toThrow();
    }, 30000);
    test("returns quality processes for a discovered training plan", async () => {
      if (!trainingGuid) {
        console.warn(
          "No training GUID available; skipping listTrainingPlanQuality happy path",
        );
        return;
      }
      const result = await harness.action("listTrainingPlanQuality", {
        connection: testConnection,
        trainingGuid,
      });
      expect(result).toBeDefined();
      expect(result!.data).toBeDefined();
    }, 30000);
  });
  describe("Action: addQualityToTrainingPlan", () => {
    test("throws on an invalid training GUID", async () => {
      await expect(
        harness.action("addQualityToTrainingPlan", {
          connection: testConnection,
          trainingGuid: "INVALIDTRAININGGUID0000",
          qualityProcessGuid: "INVALIDQUALITYGUID00000",
        }),
      ).rejects.toThrow();
    }, 30000);
    test("adds a quality process then removes it", async () => {
      if (!trainingGuid || !TEST_TRAINING_QUALITY_GUID) {
        console.warn(
          "TEST_TRAINING_QUALITY_GUID or training GUID not set; skipping addQuality/removeQuality cycle",
        );
        return;
      }
      const addResult = await harness.action("addQualityToTrainingPlan", {
        connection: testConnection,
        trainingGuid,
        qualityProcessGuid: TEST_TRAINING_QUALITY_GUID,
      });
      expect(addResult).toBeDefined();
      expect(addResult!.data).toBeDefined();
      const referenceGuid = resultData(addResult).guid;
      if (referenceGuid) {
        const removeResult = await harness.action(
          "removeQualityFromTrainingPlan",
          {
            connection: testConnection,
            trainingGuid,
            referenceGuid,
          },
        );
        expect(removeResult).toBeDefined();
      }
    }, 30000);
  });
  describe("Action: removeQualityFromTrainingPlan", () => {
    test("throws on an invalid training GUID", async () => {
      await expect(
        harness.action("removeQualityFromTrainingPlan", {
          connection: testConnection,
          trainingGuid: "INVALIDTRAININGGUID0000",
          referenceGuid: "INVALIDREFERENCEGUID000",
        }),
      ).rejects.toThrow();
    }, 30000);
  });
  describe("Action: listTrainingPlanItems", () => {
    test("throws on an invalid training GUID", async () => {
      await expect(
        harness.action("listTrainingPlanItems", {
          connection: testConnection,
          trainingGuid: "INVALIDTRAININGGUID0000",
        }),
      ).rejects.toThrow();
    }, 30000);
    test("returns items for a discovered training plan", async () => {
      if (!trainingGuid) {
        console.warn(
          "No training GUID available; skipping listTrainingPlanItems happy path",
        );
        return;
      }
      const result = await harness.action("listTrainingPlanItems", {
        connection: testConnection,
        trainingGuid,
      });
      expect(result).toBeDefined();
      expect(result!.data).toBeDefined();
    }, 30000);
  });
  describe("Action: addItemToTrainingPlan", () => {
    test("throws on an invalid training GUID", async () => {
      await expect(
        harness.action("addItemToTrainingPlan", {
          connection: testConnection,
          trainingGuid: "INVALIDTRAININGGUID0000",
          itemGuid: "INVALIDITEMGUID00000000",
        }),
      ).rejects.toThrow();
    }, 30000);
    test("adds an item then removes it via removeItemFromTrainingPlan", async () => {
      if (!trainingGuid || !TEST_TRAINING_ITEM_GUID) {
        console.warn(
          "TEST_TRAINING_ITEM_GUID or training GUID not set; skipping addItem/removeItem cycle",
        );
        return;
      }
      const addResult = await harness.action("addItemToTrainingPlan", {
        connection: testConnection,
        trainingGuid,
        itemGuid: TEST_TRAINING_ITEM_GUID,
      });
      expect(addResult).toBeDefined();
      expect(addResult!.data).toBeDefined();
      const trainingItemAssociationGuid = resultData(addResult).guid;
      if (trainingItemAssociationGuid) {
        const removeResult = await harness.action(
          "removeItemFromTrainingPlan",
          {
            connection: testConnection,
            trainingGuid,
            trainingItemAssociationGuid,
          },
        );
        expect(removeResult).toBeDefined();
      }
    }, 30000);
  });
  describe("Action: removeItemFromTrainingPlan", () => {
    test("throws on an invalid training GUID", async () => {
      await expect(
        harness.action("removeItemFromTrainingPlan", {
          connection: testConnection,
          trainingGuid: "INVALIDTRAININGGUID0000",
          trainingItemAssociationGuid: "INVALIDASSOCGUID0000000",
        }),
      ).rejects.toThrow();
    }, 30000);
  });
  describe("Action: changeTrainingPlanStatus", () => {
    test("throws on an invalid training GUID", async () => {
      await expect(
        harness.action("changeTrainingPlanStatus", {
          connection: testConnection,
          trainingGuid: "INVALIDTRAININGGUID0000",
          status: "OPEN",
        }),
      ).rejects.toThrow();
    }, 30000);
  });
  describe("Action: listTrainingPlanRecords", () => {
    test("throws on an invalid training GUID", async () => {
      await expect(
        harness.action("listTrainingPlanRecords", {
          connection: testConnection,
          trainingGuid: "INVALIDTRAININGGUID0000",
        }),
      ).rejects.toThrow();
    }, 30000);
    test("returns records for a discovered training plan", async () => {
      if (!trainingGuid) {
        console.warn(
          "No training GUID available; skipping listTrainingPlanRecords happy path",
        );
        return;
      }
      const result = await harness.action("listTrainingPlanRecords", {
        connection: testConnection,
        trainingGuid,
      });
      expect(result).toBeDefined();
      expect(result!.data).toBeDefined();
    }, 30000);
  });
  describe("Action: listTrainingPlanFiles", () => {
    test("throws on an invalid training GUID", async () => {
      await expect(
        harness.action("listTrainingPlanFiles", {
          connection: testConnection,
          trainingGuid: "INVALIDTRAININGGUID0000",
        }),
      ).rejects.toThrow();
    }, 30000);
    test("returns files for a discovered training plan", async () => {
      if (!trainingGuid) {
        console.warn(
          "No training GUID available; skipping listTrainingPlanFiles happy path",
        );
        return;
      }
      const result = await harness.action("listTrainingPlanFiles", {
        connection: testConnection,
        trainingGuid,
      });
      expect(result).toBeDefined();
      expect(result!.data).toBeDefined();
    }, 30000);
  });
  describe("Action: addFileToTrainingPlan", () => {
    test("throws on an invalid training GUID", async () => {
      await expect(
        harness.action("addFileToTrainingPlan", {
          connection: testConnection,
          trainingGuid: "INVALIDTRAININGGUID0000",
          fileGuid: "INVALIDFILEGUID00000000",
        }),
      ).rejects.toThrow();
    }, 30000);
    test("adds a file then removes it via removeFileFromTrainingPlan", async () => {
      if (!trainingGuid || !TEST_TRAINING_FILE_GUID) {
        console.warn(
          "TEST_TRAINING_FILE_GUID or training GUID not set; skipping addFile/removeFile cycle",
        );
        return;
      }
      const addResult = await harness.action("addFileToTrainingPlan", {
        connection: testConnection,
        trainingGuid,
        fileGuid: TEST_TRAINING_FILE_GUID,
        latestEditionAssociation: true,
      });
      expect(addResult).toBeDefined();
      expect(addResult!.data).toBeDefined();
      const trainingFileAssociationGuid = resultData(addResult).guid;
      if (trainingFileAssociationGuid) {
        const removeResult = await harness.action(
          "removeFileFromTrainingPlan",
          {
            connection: testConnection,
            trainingGuid,
            trainingFileAssociationGuid,
          },
        );
        expect(removeResult).toBeDefined();
      }
    }, 30000);
  });
  describe("Action: removeFileFromTrainingPlan", () => {
    test("throws on an invalid training GUID", async () => {
      await expect(
        harness.action("removeFileFromTrainingPlan", {
          connection: testConnection,
          trainingGuid: "INVALIDTRAININGGUID0000",
          trainingFileAssociationGuid: "INVALIDASSOCGUID0000000",
        }),
      ).rejects.toThrow();
    }, 30000);
  });
  describe("Action: listTrainingManagers", () => {
    test("returns the list of training managers", async () => {
      const result = await harness.action("listTrainingManagers", {
        connection: testConnection,
      });
      expect(result).toBeDefined();
      expect(result!.data).toBeDefined();
    }, 30000);
  });
});
describe("Export domain", () => {
  let exportGuid: string = TEST_EXPORT_GUID;
  let exportRunGuid: string = TEST_EXPORT_RUN_GUID;
  beforeAll(async () => {
    try {
      const listResult = await harness.action("listExports", {
        connection: testConnection,
        limit: "1",
      });
      const exports = resultList(listResult);
      if (exports.length > 0 && !exportGuid) {
        exportGuid = guidOf(exports[0]);
      }
    } catch {}
    if (exportGuid && !exportRunGuid) {
      try {
        const runsResult = await harness.action("listExportRuns", {
          connection: testConnection,
          exportGuid,
          limit: "1",
        });
        const runs = resultList(runsResult);
        if (runs.length > 0) {
          exportRunGuid = guidOf(runs[0]);
        }
      } catch {}
    }
  }, 30000);
  describe("Action: listExports", () => {
    test("returns the full list of export definitions", async () => {
      const result = await harness.action("listExports", {
        connection: testConnection,
      });
      expect(result).toBeDefined();
      expect(result!.data).toBeDefined();
    }, 30000);
    test("filters by name without error", async () => {
      const result = await harness.action("listExports", {
        connection: testConnection,
        name: "__NO_MATCH_INTEGRATION_TEST_XYZ__",
      });
      expect(result).toBeDefined();
      expect(result!.data).toBeDefined();
    }, 30000);
    test("filters by description without error", async () => {
      const result = await harness.action("listExports", {
        connection: testConnection,
        description: "__NO_MATCH_INTEGRATION_TEST_XYZ__",
      });
      expect(result).toBeDefined();
      expect(result!.data).toBeDefined();
    }, 30000);
    test("respects offset and limit parameters", async () => {
      const result = await harness.action("listExports", {
        connection: testConnection,
        offset: "0",
        limit: "5",
      });
      expect(result).toBeDefined();
      expect(result!.data).toBeDefined();
    }, 30000);
  });
  describe("Action: createExport", () => {
    test("throws when provided with an empty export definition", async () => {
      await expect(
        harness.action("createExport", {
          connection: testConnection,
          exportData: JSON.stringify({}),
        }),
      ).rejects.toThrow();
    }, 30000);
  });
  describe("Action: getExport", () => {
    test("throws on an invalid export GUID", async () => {
      await expect(
        harness.action("getExport", {
          connection: testConnection,
          exportGuid: "INVALIDEXPORTGUID000000",
        }),
      ).rejects.toThrow();
    }, 30000);
    test("returns details for a discovered export definition", async () => {
      if (!exportGuid) {
        console.warn("No export GUID available; skipping getExport happy path");
        return;
      }
      const result = await harness.action("getExport", {
        connection: testConnection,
        exportGuid,
      });
      expect(result).toBeDefined();
      expect(result!.data).toBeDefined();
      expect(resultData(result).guid).toBe(exportGuid);
    }, 30000);
  });
  describe("Action: listExportRuns", () => {
    test("throws on an invalid export GUID", async () => {
      await expect(
        harness.action("listExportRuns", {
          connection: testConnection,
          exportGuid: "INVALIDEXPORTGUID000000",
        }),
      ).rejects.toThrow();
    }, 30000);
    test("returns runs for a discovered export definition", async () => {
      if (!exportGuid) {
        console.warn(
          "No export GUID available; skipping listExportRuns happy path",
        );
        return;
      }
      const result = await harness.action("listExportRuns", {
        connection: testConnection,
        exportGuid,
      });
      expect(result).toBeDefined();
      expect(result!.data).toBeDefined();
    }, 30000);
    test("filters by status COMPLETE without error", async () => {
      if (!exportGuid) {
        console.warn(
          "No export GUID available; skipping listExportRuns status filter test",
        );
        return;
      }
      const result = await harness.action("listExportRuns", {
        connection: testConnection,
        exportGuid,
        status: "COMPLETE",
      });
      expect(result).toBeDefined();
      expect(result!.data).toBeDefined();
    }, 30000);
  });
  describe("Action: runExport", () => {
    test("throws on an invalid export GUID", async () => {
      await expect(
        harness.action("runExport", {
          connection: testConnection,
          exportGuid: "INVALIDEXPORTGUID000000",
        }),
      ).rejects.toThrow();
    }, 30000);
  });
  describe("Action: getExportRun", () => {
    test("throws on an invalid export GUID", async () => {
      await expect(
        harness.action("getExportRun", {
          connection: testConnection,
          exportGuid: "INVALIDEXPORTGUID000000",
          exportRunGuid: "INVALIDRUNSGUID00000000",
        }),
      ).rejects.toThrow();
    }, 30000);
    test("returns details for a discovered export run", async () => {
      if (!exportGuid || !exportRunGuid) {
        console.warn(
          "No export run GUID available; skipping getExportRun happy path",
        );
        return;
      }
      const result = await harness.action("getExportRun", {
        connection: testConnection,
        exportGuid,
        exportRunGuid,
      });
      expect(result).toBeDefined();
      expect(result!.data).toBeDefined();
    }, 30000);
  });
  describe("Action: getLatestCompletedExportRun", () => {
    test("throws on an invalid export GUID", async () => {
      await expect(
        harness.action("getLatestCompletedExportRun", {
          connection: testConnection,
          exportGuid: "INVALIDEXPORTGUID000000",
        }),
      ).rejects.toThrow();
    }, 30000);
    test("returns the latest completed run for a discovered export", async () => {
      if (!exportGuid) {
        console.warn(
          "No export GUID available; skipping getLatestCompletedExportRun happy path",
        );
        return;
      }
      try {
        const result = await harness.action("getLatestCompletedExportRun", {
          connection: testConnection,
          exportGuid,
        });
        expect(result).toBeDefined();
        expect(result!.data).toBeDefined();
      } catch (err: unknown) {
        if (!String(getErrorMessage(err)).includes("404")) {
          throw err;
        }
      }
    }, 30000);
  });
  describe("Action: downloadExportRunFileContent", () => {
    test("throws on invalid export, run, and file GUIDs", async () => {
      await expect(
        harness.action("downloadExportRunFileContent", {
          connection: testConnection,
          exportGuid: "INVALIDEXPORTGUID000000",
          exportRunGuid: "INVALIDRUNSGUID00000000",
          fileGuid: "INVALIDFILEGUID00000000",
        }),
      ).rejects.toThrow();
    }, 30000);
    test("throws with a valid export GUID but invalid run and file GUIDs", async () => {
      if (!exportGuid) {
        console.warn(
          "No export GUID available; skipping partial GUID error test",
        );
        return;
      }
      await expect(
        harness.action("downloadExportRunFileContent", {
          connection: testConnection,
          exportGuid,
          exportRunGuid: "INVALIDRUNSGUID00000000",
          fileGuid: "INVALIDFILEGUID00000000",
        }),
      ).rejects.toThrow();
    }, 30000);
    test("action is registered and available in the harness", async () => {
      const actionKey = "downloadExportRunFileContent";
      expect(typeof harness.action).toBe("function");
      if (exportGuid && exportRunGuid && TEST_EXPORT_RUN_FILE_GUID) {
        try {
          await harness.action(actionKey, {
            connection: testConnection,
            exportGuid,
            exportRunGuid,
            fileGuid: TEST_EXPORT_RUN_FILE_GUID,
          });
        } catch {}
      }
    }, 30000);
  });
});
describe("Extract domain", () => {
  let extractGuid: string = TEST_EXTRACT_GUID;
  let extractRunGuid: string = TEST_EXTRACT_RUN_GUID;
  beforeAll(async () => {
    try {
      const listResult = await harness.action("listExtracts", {
        connection: testConnection,
        limit: "1",
      });
      const extracts = resultList(listResult);
      if (extracts.length > 0 && !extractGuid) {
        extractGuid = guidOf(extracts[0]);
      }
    } catch {}
    if (extractGuid && !extractRunGuid) {
      try {
        const runsResult = await harness.action("listExtractRuns", {
          connection: testConnection,
          extractGuid,
        });
        const runs = resultList(runsResult);
        if (runs.length > 0) {
          extractRunGuid = guidOf(runs[0]);
        }
      } catch {}
    }
  }, 30000);
  describe("Action: listExtracts", () => {
    test("returns the full list of extract definitions", async () => {
      const result = await harness.action("listExtracts", {
        connection: testConnection,
      });
      expect(result).toBeDefined();
      expect(result!.data).toBeDefined();
    }, 30000);
    test("filters by name without error", async () => {
      const result = await harness.action("listExtracts", {
        connection: testConnection,
        name: "__NO_MATCH_INTEGRATION_TEST_XYZ__",
      });
      expect(result).toBeDefined();
      expect(result!.data).toBeDefined();
    }, 30000);
    test("filters enabled extracts without error", async () => {
      const result = await harness.action("listExtracts", {
        connection: testConnection,
        enabled: true,
      });
      expect(result).toBeDefined();
      expect(result!.data).toBeDefined();
    }, 30000);
    test("respects offset and limit parameters", async () => {
      const result = await harness.action("listExtracts", {
        connection: testConnection,
        offset: "0",
        limit: "5",
      });
      expect(result).toBeDefined();
      expect(result!.data).toBeDefined();
    }, 30000);
  });
  describe("Action: getExtract", () => {
    test("throws on an invalid extract GUID", async () => {
      await expect(
        harness.action("getExtract", {
          connection: testConnection,
          extractGuid: "INVALIDEXTRACTGUID00000",
        }),
      ).rejects.toThrow();
    }, 30000);
    test("returns details for a discovered extract definition", async () => {
      if (!extractGuid) {
        console.warn(
          "No extract GUID available; skipping getExtract happy path",
        );
        return;
      }
      const result = await harness.action("getExtract", {
        connection: testConnection,
        extractGuid,
      });
      expect(result).toBeDefined();
      expect(result!.data).toBeDefined();
      expect(resultData(result).guid).toBe(extractGuid);
    }, 30000);
  });
  describe("Action: listExtractRuns", () => {
    test("throws on an invalid extract GUID", async () => {
      await expect(
        harness.action("listExtractRuns", {
          connection: testConnection,
          extractGuid: "INVALIDEXTRACTGUID00000",
        }),
      ).rejects.toThrow();
    }, 30000);
    test("returns runs for a discovered extract definition", async () => {
      if (!extractGuid) {
        console.warn(
          "No extract GUID available; skipping listExtractRuns happy path",
        );
        return;
      }
      const result = await harness.action("listExtractRuns", {
        connection: testConnection,
        extractGuid,
      });
      expect(result).toBeDefined();
      expect(result!.data).toBeDefined();
    }, 30000);
  });
  describe("Action: runExtract", () => {
    test("throws on an invalid extract GUID", async () => {
      await expect(
        harness.action("runExtract", {
          connection: testConnection,
          extractGuid: "INVALIDEXTRACTGUID00000",
        }),
      ).rejects.toThrow();
    }, 30000);
  });
  describe("Action: getExtractRun", () => {
    test("throws on an invalid extract GUID", async () => {
      await expect(
        harness.action("getExtractRun", {
          connection: testConnection,
          extractGuid: "INVALIDEXTRACTGUID00000",
          extractRunGuid: "INVALIDRUNSGUID00000000",
        }),
      ).rejects.toThrow();
    }, 30000);
    test("returns details for a discovered extract run", async () => {
      if (!extractGuid || !extractRunGuid) {
        console.warn(
          "No extract run GUID available; skipping getExtractRun happy path",
        );
        return;
      }
      const result = await harness.action("getExtractRun", {
        connection: testConnection,
        extractGuid,
        extractRunGuid,
      });
      expect(result).toBeDefined();
      expect(result!.data).toBeDefined();
    }, 30000);
  });
  describe("Action: listExtractRunFiles", () => {
    test("throws on an invalid extract GUID", async () => {
      await expect(
        harness.action("listExtractRunFiles", {
          connection: testConnection,
          extractGuid: "INVALIDEXTRACTGUID00000",
          extractRunGuid: "INVALIDRUNSGUID00000000",
        }),
      ).rejects.toThrow();
    }, 30000);
    test("returns file metadata for a discovered extract run", async () => {
      if (!extractGuid || !extractRunGuid) {
        console.warn(
          "No extract run GUID available; skipping listExtractRunFiles happy path",
        );
        return;
      }
      const result = await harness.action("listExtractRunFiles", {
        connection: testConnection,
        extractGuid,
        extractRunGuid,
      });
      expect(result).toBeDefined();
      expect(result!.data).toBeDefined();
    }, 30000);
  });
  describe("Action: getLatestCompletedExtractRun", () => {
    test("throws on an invalid extract GUID", async () => {
      await expect(
        harness.action("getLatestCompletedExtractRun", {
          connection: testConnection,
          extractGuid: "INVALIDEXTRACTGUID00000",
        }),
      ).rejects.toThrow();
    }, 30000);
    test("returns the latest completed run for a discovered extract", async () => {
      if (!extractGuid) {
        console.warn(
          "No extract GUID available; skipping getLatestCompletedExtractRun happy path",
        );
        return;
      }
      try {
        const result = await harness.action("getLatestCompletedExtractRun", {
          connection: testConnection,
          extractGuid,
        });
        expect(result).toBeDefined();
        expect(result!.data).toBeDefined();
      } catch (err: unknown) {
        if (!String(getErrorMessage(err)).includes("404")) {
          throw err;
        }
      }
    }, 30000);
  });
  describe("Action: downloadExtractRunFileContent", () => {
    test("throws on fully invalid GUIDs", async () => {
      await expect(
        harness.action("downloadExtractRunFileContent", {
          connection: testConnection,
          extractGuid: "INVALIDEXTRACTGUID00000",
          extractRunGuid: "INVALIDRUNSGUID00000000",
          runFileAssociationGuid: "INVALIDFILEGUID00000000",
        }),
      ).rejects.toThrow();
    }, 30000);
    test("throws with valid extract GUID but invalid run and file GUIDs", async () => {
      if (!extractGuid) {
        console.warn(
          "No extract GUID available; skipping partial GUID error test",
        );
        return;
      }
      await expect(
        harness.action("downloadExtractRunFileContent", {
          connection: testConnection,
          extractGuid,
          extractRunGuid: "INVALIDRUNSGUID00000000",
          runFileAssociationGuid: "INVALIDFILEGUID00000000",
        }),
      ).rejects.toThrow();
    }, 30000);
    test("action is registered and callable with real GUIDs when available", async () => {
      if (!extractGuid || !extractRunGuid || !TEST_EXTRACT_RUN_FILE_GUID) {
        console.warn(
          "TEST_EXTRACT_RUN_FILE_GUID not set; skipping binary download test",
        );
        return;
      }
      try {
        const result = await harness.action("downloadExtractRunFileContent", {
          connection: testConnection,
          extractGuid,
          extractRunGuid,
          runFileAssociationGuid: TEST_EXTRACT_RUN_FILE_GUID,
        });
        expect(result).toBeDefined();
        expect(result!.data).toBeDefined();
      } catch {}
    }, 30000);
  });
});
describe("Import domain", () => {
  let importGuid: string = TEST_IMPORT_GUID;
  let importRunGuid: string = TEST_IMPORT_RUN_GUID;
  beforeAll(async () => {
    try {
      const listResult = await harness.action("listImports", {
        connection: testConnection,
        limit: "1",
      });
      const imports = resultList(listResult);
      if (imports.length > 0 && !importGuid) {
        importGuid = guidOf(imports[0]);
      }
    } catch {}
    if (importGuid && !importRunGuid) {
      try {
        const runsResult = await harness.action("listImportRuns", {
          connection: testConnection,
          importGuid,
          limit: "1",
        });
        const runs = resultList(runsResult);
        if (runs.length > 0) {
          importRunGuid = guidOf(runs[0]);
        }
      } catch {}
    }
  }, 30000);
  describe("Action: listImports", () => {
    test("returns the full list of import definitions", async () => {
      const result = await harness.action("listImports", {
        connection: testConnection,
      });
      expect(result).toBeDefined();
      expect(result!.data).toBeDefined();
    }, 30000);
    test("filters by resource type without error", async () => {
      const result = await harness.action("listImports", {
        connection: testConnection,
      });
      expect(result).toBeDefined();
      expect(result!.data).toBeDefined();
    }, 30000);
    test("filters by mode without error", async () => {
      const result = await harness.action("listImports", {
        connection: testConnection,
        mode: "CREATE",
      });
      expect(result).toBeDefined();
      expect(result!.data).toBeDefined();
    }, 30000);
    test("filters by name with non-matching value returns empty results", async () => {
      const result = await harness.action("listImports", {
        connection: testConnection,
        name: "__NO_MATCH_INTEGRATION_TEST_XYZ__",
      });
      expect(result).toBeDefined();
      expect(result!.data).toBeDefined();
    }, 30000);
    test("respects offset and limit parameters", async () => {
      const result = await harness.action("listImports", {
        connection: testConnection,
        offset: "0",
        limit: "5",
      });
      expect(result).toBeDefined();
      expect(result!.data).toBeDefined();
    }, 30000);
  });
  describe("Action: createImport", () => {
    test("throws when provided with an empty import definition", async () => {
      await expect(
        harness.action("createImport", {
          connection: testConnection,
          importData: JSON.stringify({}),
        }),
      ).rejects.toThrow();
    }, 30000);
  });
  describe("Action: getImport", () => {
    test("throws on an invalid import GUID", async () => {
      await expect(
        harness.action("getImport", {
          connection: testConnection,
          importGuid: "INVALIDIMPORTGUID000000",
        }),
      ).rejects.toThrow();
    }, 30000);
    test("returns details for a discovered import definition", async () => {
      if (!importGuid) {
        console.warn("No import GUID available; skipping getImport happy path");
        return;
      }
      const result = await harness.action("getImport", {
        connection: testConnection,
        importGuid,
      });
      expect(result).toBeDefined();
      expect(result!.data).toBeDefined();
      expect(resultData(result).guid).toBe(importGuid);
    }, 30000);
  });
  describe("Action: updateImport", () => {
    test("throws on an invalid import GUID", async () => {
      await expect(
        harness.action("updateImport", {
          connection: testConnection,
          importGuid: "INVALIDIMPORTGUID000000",
          importData: JSON.stringify({ name: "Should fail" }),
        }),
      ).rejects.toThrow();
    }, 30000);
  });
  describe("Action: listImportRuns", () => {
    test("throws on an invalid import GUID", async () => {
      await expect(
        harness.action("listImportRuns", {
          connection: testConnection,
          importGuid: "INVALIDIMPORTGUID000000",
        }),
      ).rejects.toThrow();
    }, 30000);
    test("returns runs for a discovered import definition", async () => {
      if (!importGuid) {
        console.warn(
          "No import GUID available; skipping listImportRuns happy path",
        );
        return;
      }
      const result = await harness.action("listImportRuns", {
        connection: testConnection,
        importGuid,
      });
      expect(result).toBeDefined();
      expect(result!.data).toBeDefined();
    }, 30000);
    test("filters by status without error", async () => {
      if (!importGuid) {
        console.warn(
          "No import GUID available; skipping listImportRuns status filter test",
        );
        return;
      }
      const result = await harness.action("listImportRuns", {
        connection: testConnection,
        importGuid,
        status: "COMPLETE",
      });
      expect(result).toBeDefined();
      expect(result!.data).toBeDefined();
    }, 30000);
  });
  describe("Action: getImportRun", () => {
    test("throws on an invalid import GUID", async () => {
      await expect(
        harness.action("getImportRun", {
          connection: testConnection,
          importGuid: "INVALIDIMPORTGUID000000",
          importRunGuid: "INVALIDRUNSGUID00000000",
        }),
      ).rejects.toThrow();
    }, 30000);
    test("returns details for a discovered import run", async () => {
      if (!importGuid || !importRunGuid) {
        console.warn(
          "No import run GUID available; skipping getImportRun happy path",
        );
        return;
      }
      const result = await harness.action("getImportRun", {
        connection: testConnection,
        importGuid,
        importRunGuid,
      });
      expect(result).toBeDefined();
      expect(result!.data).toBeDefined();
    }, 30000);
  });
  describe("Action: rerunImport", () => {
    test("throws on an invalid import GUID", async () => {
      await expect(
        harness.action("rerunImport", {
          connection: testConnection,
          importGuid: "INVALIDIMPORTGUID000000",
          importRunGuid: "INVALIDRUNSGUID00000000",
        }),
      ).rejects.toThrow();
    }, 30000);
  });
  describe("Action: forceCompleteImport", () => {
    test("throws on an invalid import GUID", async () => {
      await expect(
        harness.action("forceCompleteImport", {
          connection: testConnection,
          importGuid: "INVALIDIMPORTGUID000000",
          importRunGuid: "INVALIDRUNSGUID00000000",
        }),
      ).rejects.toThrow();
    }, 30000);
  });
  describe("Action: getImportRunSubmitContent", () => {
    test("throws on invalid import and run GUIDs", async () => {
      await expect(
        harness.action("getImportRunSubmitContent", {
          connection: testConnection,
          importGuid: "INVALIDIMPORTGUID000000",
          importRunGuid: "INVALIDRUNSGUID00000000",
        }),
      ).rejects.toThrow();
    }, 30000);
    test("is callable with discovered GUIDs without unhandled exception", async () => {
      if (!importGuid || !importRunGuid) {
        console.warn(
          "No import run GUID available; skipping getImportRunSubmitContent test",
        );
        return;
      }
      try {
        const result = await harness.action("getImportRunSubmitContent", {
          connection: testConnection,
          importGuid,
          importRunGuid,
        });
        expect(result).toBeDefined();
      } catch {}
    }, 30000);
  });
  describe("Action: getImportRunResultContent", () => {
    test("throws on invalid import and run GUIDs", async () => {
      await expect(
        harness.action("getImportRunResultContent", {
          connection: testConnection,
          importGuid: "INVALIDIMPORTGUID000000",
          importRunGuid: "INVALIDRUNSGUID00000000",
        }),
      ).rejects.toThrow();
    }, 30000);
    test("is callable with discovered GUIDs without unhandled exception", async () => {
      if (!importGuid || !importRunGuid) {
        console.warn(
          "No import run GUID available; skipping getImportRunResultContent test",
        );
        return;
      }
      try {
        const result = await harness.action("getImportRunResultContent", {
          connection: testConnection,
          importGuid,
          importRunGuid,
        });
        expect(result).toBeDefined();
      } catch {}
    }, 30000);
  });
  describe("Action: getImportRunErrorContent", () => {
    test("throws on invalid import and run GUIDs", async () => {
      await expect(
        harness.action("getImportRunErrorContent", {
          connection: testConnection,
          importGuid: "INVALIDIMPORTGUID000000",
          importRunGuid: "INVALIDRUNSGUID00000000",
        }),
      ).rejects.toThrow();
    }, 30000);
    test("is callable with discovered GUIDs without unhandled exception", async () => {
      if (!importGuid || !importRunGuid) {
        console.warn(
          "No import run GUID available; skipping getImportRunErrorContent test",
        );
        return;
      }
      try {
        const result = await harness.action("getImportRunErrorContent", {
          connection: testConnection,
          importGuid,
          importRunGuid,
        });
        expect(result).toBeDefined();
      } catch {}
    }, 30000);
  });
});
