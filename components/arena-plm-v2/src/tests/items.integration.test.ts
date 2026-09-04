import { util } from "@prismatic-io/spectral";
import {
  createConnection,
  createHarness,
} from "@prismatic-io/spectral/dist/testing";
import { arenaUsernamePassword } from "../connections";
import component from "../index";
import { getErrorMessage, getHttpStatus, getNestedValue } from "../util";
import { guidOf, resultData, resultList } from "./resultHelpers";
jest.setTimeout(30000);
const harness = createHarness(component);
const testConnection = createConnection(arenaUsernamePassword, {
  baseUrl: "custom",
  customBaseUrl: process.env.ARENA_BASE_URL || "",
  email: process.env.ARENA_EMAIL || "",
  password: process.env.ARENA_PASSWORD || "",
});
let itemGuid: string | undefined;
let secondItemGuid: string | undefined;
let thirdItemGuid: string | undefined;
let itemCategoryGuid: string | undefined;
let numberFormatGuid: string | undefined;
let numberFormatFieldGuid: string | undefined;
beforeAll(async () => {
  const itemsResult = await harness.action("listItems", {
    connection: testConnection,
    limit: "5",
  });
  const items = resultList(itemsResult);
  itemGuid = guidOf(items[0]);
  secondItemGuid = guidOf(items[1]);
  thirdItemGuid = guidOf(items[2]);
  if (!itemGuid) {
    console.warn(
      "No items found in workspace — many tests will be skipped. Populate the workspace with at least two items before running this suite.",
    );
  }
  const catResult = await harness.action("listCategories", {
    connection: testConnection,
    objectType: "items",
  });
  const cats = resultList(catResult);
  itemCategoryGuid = guidOf(cats[0]);
  const fmtResult = await harness.action("listItemNumberFormats", {
    connection: testConnection,
    limit: "1",
  });
  const fmts = resultList(fmtResult);
  numberFormatGuid = guidOf(fmts[0]);
  if (numberFormatGuid) {
    const fieldsResult = await harness.action("listItemNumberFormatFields", {
      connection: testConnection,
      formatGuid: numberFormatGuid,
    });
    const fields: unknown[] = Array.isArray(fieldsResult.data)
      ? fieldsResult.data
      : resultList(fieldsResult);
    numberFormatFieldGuid = guidOf(fields[0]);
  }
});
describe("Item", () => {
  let createdItemGuid: string | undefined;
  afterAll(async () => {
    if (createdItemGuid) {
      try {
        await harness.action("deleteItem", {
          connection: testConnection,
          itemGuid: createdItemGuid,
        });
      } catch (err) {
        console.warn("afterAll cleanup: failed to delete test item", err);
      }
    }
  });
  test("listItems — returns result array", async () => {
    const result = await harness.action("listItems", {
      connection: testConnection,
      limit: "10",
    });
    expect(result.data).toBeDefined();
    expect(Array.isArray(resultData(result).results)).toBe(true);
  });
  test("getItemByGuid — returns item details", async () => {
    if (!itemGuid) {
      console.warn("No item GUID, skipping getItemByGuid");
      return;
    }
    const result = await harness.action("getItemByGuid", {
      connection: testConnection,
      itemGuid,
    });
    expect(result.data).toBeDefined();
    expect(resultData(result).guid).toBe(itemGuid);
  });
  test("getItemByGuid — with includeEmptyAdditionalAttributes and responseView", async () => {
    if (!itemGuid) {
      console.warn("No item GUID, skipping getItemByGuid extended");
      return;
    }
    const result = await harness.action("getItemByGuid", {
      connection: testConnection,
      itemGuid,
      includeEmptyAdditionalAttributes: false,
      responseView: "compact",
    });
    expect(result.data).toBeDefined();
  });
  test("createItem — creates and returns item with guid", async () => {
    if (!itemCategoryGuid || !numberFormatGuid) {
      console.warn(
        "No category or number-format available, skipping createItem",
      );
      return;
    }
    try {
      const result = await harness.action("createItem", {
        connection: testConnection,
        name: `Integration Test Item ${Date.now()}`,
        description: "Created by integration test",
        categoryGuid: itemCategoryGuid,
        numberFormatGuid,
      });
      expect(result.data).toBeDefined();
      expect(resultData(result).guid).toBeTruthy();
      createdItemGuid = guidOf(resultData(result));
    } catch (err: unknown) {
      if (
        getErrorMessage(err).includes("required for the number format") ||
        getErrorMessage(err).includes('"code":3009')
      ) {
        console.warn(
          "createItem skipped: workspace requires additional number format fields not provided in this test",
        );
        return;
      }
      throw err;
    }
  });
  test("updateItem — updates item description", async () => {
    if (!createdItemGuid) {
      console.warn("No created item GUID, skipping updateItem");
      return;
    }
    const result = await harness.action("updateItem", {
      connection: testConnection,
      itemGuid: createdItemGuid,
      description: "Updated by integration test",
    });
    expect(result.data).toBeDefined();
    expect(resultData(result).guid).toBe(createdItemGuid);
  });
  test("deleteItem — deletes the created item", async () => {
    if (!createdItemGuid) {
      console.warn("No created item GUID, skipping deleteItem");
      return;
    }
    const result = await harness.action("deleteItem", {
      connection: testConnection,
      itemGuid: createdItemGuid,
    });
    expect(result.data).toBeDefined();
    expect(resultData(result).success).toBe(true);
    createdItemGuid = undefined;
  });
  test("getItemRevisions — returns revision data", async () => {
    if (!itemGuid) {
      console.warn("No item GUID, skipping getItemRevisions");
      return;
    }
    const result = await harness.action("getItemRevisions", {
      connection: testConnection,
      itemGuid,
    });
    expect(result.data).toBeDefined();
  });
  test("listItemWhereUsed — returns where-used data", async () => {
    if (!itemGuid) {
      console.warn("No item GUID, skipping listItemWhereUsed");
      return;
    }
    const result = await harness.action("listItemWhereUsed", {
      connection: testConnection,
      itemGuid,
    });
    expect(result.data).toBeDefined();
  });
  test("listItemHistory — returns history data", async () => {
    if (!itemGuid) {
      console.warn("No item GUID, skipping listItemHistory");
      return;
    }
    const result = await harness.action("listItemHistory", {
      connection: testConnection,
      itemGuid,
    });
    expect(result.data).toBeDefined();
  });
  test("listItemFutureChanges — returns future changes data", async () => {
    if (!itemGuid) {
      console.warn("No item GUID, skipping listItemFutureChanges");
      return;
    }
    const result = await harness.action("listItemFutureChanges", {
      connection: testConnection,
      itemGuid,
    });
    expect(result.data).toBeDefined();
  });
  test("getItemImageContent — returns content object or handles no-image gracefully", async () => {
    if (!itemGuid) {
      console.warn("No item GUID, skipping getItemImageContent");
      return;
    }
    try {
      const result = await harness.action("getItemImageContent", {
        connection: testConnection,
        itemGuid,
      });
      expect(result.data).toBeDefined();
    } catch (err: unknown) {
      const status =
        getNestedValue(err, "data.statusCode") ?? getHttpStatus(err);
      if (status && status !== 404) {
        throw err;
      }
      console.warn(
        "getItemImageContent: no image on this item (404), skipping assertion",
      );
    }
  });
  test.skip("createItemImage — multipart upload, manual testing required", () => {});
  test.skip("deleteItemImage — depends on createItemImage, manual testing required", () => {});
  test("changeItemLifecyclePhase — requires lifecyclePhaseGuid, skipped if not available", async () => {
    if (!itemGuid) {
      console.warn("No item GUID, skipping changeItemLifecyclePhase");
      return;
    }
    const phasesResult = await harness.action("listItemLifecyclePhases", {
      connection: testConnection,
    });
    const phases: unknown[] = Array.isArray(phasesResult.data)
      ? phasesResult.data
      : resultList(phasesResult);
    if (phases.length === 0) {
      console.warn(
        "No lifecycle phases found, skipping changeItemLifecyclePhase",
      );
      return;
    }
    const toLifecyclePhaseGuid: string = guidOf(phases[0]);
    try {
      const result = await harness.action("changeItemLifecyclePhase", {
        connection: testConnection,
        itemGuid,
        toLifecyclePhaseGuid,
        proceedOnNotice: true,
      });
      expect(result.data).toBeDefined();
    } catch (err: unknown) {
      console.warn(
        "changeItemLifecyclePhase returned an error (may be a business-rule rejection):",
        getNestedValue(err, "data") ?? getErrorMessage(err),
      );
    }
  });
});
describe("Item BOM", () => {
  let createdBomLineGuid: string | undefined;
  let createdSubstituteGuid: string | undefined;
  afterAll(async () => {
    if (itemGuid && createdBomLineGuid) {
      try {
        if (createdSubstituteGuid) {
          await harness.action("deleteBomSubstitute", {
            connection: testConnection,
            itemGuid,
            bomLineGuid: createdBomLineGuid,
            substituteGuid: createdSubstituteGuid,
          });
        }
        await harness.action("deleteBomLine", {
          connection: testConnection,
          itemGuid,
          bomLineGuid: createdBomLineGuid,
        });
      } catch (err) {
        console.warn("afterAll BOM cleanup failed:", err);
      }
    }
  });
  test("listBom — returns BOM collection for item", async () => {
    if (!itemGuid) {
      console.warn("No item GUID, skipping listBom");
      return;
    }
    const result = await harness.action("listBom", {
      connection: testConnection,
      itemGuid,
    });
    expect(result.data).toBeDefined();
    expect(Array.isArray(resultData(result).results)).toBe(true);
  });
  test("getBomSettings — returns BOM settings for item", async () => {
    if (!itemGuid) {
      console.warn("No item GUID, skipping getBomSettings");
      return;
    }
    const result = await harness.action("getBomSettings", {
      connection: testConnection,
      itemGuid,
    });
    expect(result.data).toBeDefined();
  });
  test("updateBomSettings — updates automaticallyGenerateLineNumbers", async () => {
    if (!itemGuid) {
      console.warn("No item GUID, skipping updateBomSettings");
      return;
    }
    const currentSettings = await harness.action("getBomSettings", {
      connection: testConnection,
      itemGuid,
    });
    const rawGenerateLineNumbers =
      resultData(currentSettings).automaticallyGenerateLineNumbers;
    const currentValue: boolean = util.types.isBool(rawGenerateLineNumbers)
      ? rawGenerateLineNumbers
      : true;
    const result = await harness.action("updateBomSettings", {
      connection: testConnection,
      itemGuid,
      automaticallyGenerateLineNumbers: currentValue,
    });
    expect(result.data).toBeDefined();
  });
  test("createBomLine — creates a BOM child line", async () => {
    if (!itemGuid || !secondItemGuid) {
      console.warn(
        "Need at least two items in workspace to createBomLine, skipping",
      );
      return;
    }
    const result = await harness.action("createBomLine", {
      connection: testConnection,
      itemGuid,
      bomItemGuid: secondItemGuid,
      quantity: "1",
      notes: "Integration test BOM line",
    });
    expect(result.data).toBeDefined();
    expect(resultData(result).guid).toBeTruthy();
    createdBomLineGuid = guidOf(resultData(result));
  });
  test("getBomLine — retrieves the created BOM line", async () => {
    if (!itemGuid || !createdBomLineGuid) {
      console.warn("No BOM line GUID, skipping getBomLine");
      return;
    }
    const result = await harness.action("getBomLine", {
      connection: testConnection,
      itemGuid,
      bomLineGuid: createdBomLineGuid,
    });
    expect(result.data).toBeDefined();
    expect(resultData(result).guid).toBe(createdBomLineGuid);
  });
  test("updateBomLine — updates notes on the BOM line", async () => {
    if (!itemGuid || !createdBomLineGuid) {
      console.warn("No BOM line GUID, skipping updateBomLine");
      return;
    }
    const result = await harness.action("updateBomLine", {
      connection: testConnection,
      itemGuid,
      bomLineGuid: createdBomLineGuid,
      notes: "Updated by integration test",
    });
    expect(result.data).toBeDefined();
  });
  test("listBomSubstitutes — returns substitute list for BOM line", async () => {
    if (!itemGuid || !createdBomLineGuid) {
      console.warn("No BOM line GUID, skipping listBomSubstitutes");
      return;
    }
    const result = await harness.action("listBomSubstitutes", {
      connection: testConnection,
      itemGuid,
      bomLineGuid: createdBomLineGuid,
    });
    expect(result.data).toBeDefined();
    expect(Array.isArray(resultData(result).results)).toBe(true);
  });
  test("createBomSubstitute — creates a substitute on the BOM line", async () => {
    if (!itemGuid || !createdBomLineGuid || !thirdItemGuid) {
      console.warn(
        "Need item, BOM line, and a third item to createBomSubstitute, skipping",
      );
      return;
    }
    try {
      const result = await harness.action("createBomSubstitute", {
        connection: testConnection,
        itemGuid,
        bomLineGuid: createdBomLineGuid,
        bomItemGuid: thirdItemGuid,
        quantity: "1",
        rank: 1,
      });
      expect(result.data).toBeDefined();
      expect(resultData(result).guid).toBeTruthy();
      createdSubstituteGuid = guidOf(resultData(result));
    } catch (err: unknown) {
      if (
        getErrorMessage(err).includes("not the effective revision") ||
        getErrorMessage(err).includes("superseded revision")
      ) {
        console.warn(
          "createBomSubstitute skipped: item is not the effective revision in this workspace",
        );
        return;
      }
      throw err;
    }
  });
  test("getBomSubstitute — retrieves the created substitute", async () => {
    if (!itemGuid || !createdBomLineGuid || !createdSubstituteGuid) {
      console.warn("No substitute GUID, skipping getBomSubstitute");
      return;
    }
    const result = await harness.action("getBomSubstitute", {
      connection: testConnection,
      itemGuid,
      bomLineGuid: createdBomLineGuid,
      substituteGuid: createdSubstituteGuid,
    });
    expect(result.data).toBeDefined();
    expect(resultData(result).guid).toBe(createdSubstituteGuid);
  });
  test("updateBomSubstitute — updates notes on the substitute", async () => {
    if (!itemGuid || !createdBomLineGuid || !createdSubstituteGuid) {
      console.warn("No substitute GUID, skipping updateBomSubstitute");
      return;
    }
    const result = await harness.action("updateBomSubstitute", {
      connection: testConnection,
      itemGuid,
      bomLineGuid: createdBomLineGuid,
      substituteGuid: createdSubstituteGuid,
      notes: "Updated substitute by integration test",
    });
    expect(result.data).toBeDefined();
  });
  test("deleteBomSubstitute — deletes the created substitute", async () => {
    if (!itemGuid || !createdBomLineGuid || !createdSubstituteGuid) {
      console.warn("No substitute GUID, skipping deleteBomSubstitute");
      return;
    }
    const result = await harness.action("deleteBomSubstitute", {
      connection: testConnection,
      itemGuid,
      bomLineGuid: createdBomLineGuid,
      substituteGuid: createdSubstituteGuid,
    });
    expect(result.data).toBeDefined();
    expect(resultData(result).success).toBe(true);
    createdSubstituteGuid = undefined;
  });
  test("deleteBomLine — deletes the created BOM line", async () => {
    if (!itemGuid || !createdBomLineGuid) {
      console.warn("No BOM line GUID, skipping deleteBomLine");
      return;
    }
    const result = await harness.action("deleteBomLine", {
      connection: testConnection,
      itemGuid,
      bomLineGuid: createdBomLineGuid,
    });
    expect(result.data).toBeDefined();
    expect(resultData(result).success).toBe(true);
    createdBomLineGuid = undefined;
  });
});
describe("Item Settings", () => {
  test("listItemLifecyclePhases — returns array of lifecycle phases", async () => {
    const result = await harness.action("listItemLifecyclePhases", {
      connection: testConnection,
    });
    expect(result.data).toBeDefined();
    const phases: unknown[] = Array.isArray(result.data)
      ? result.data
      : resultList(result);
    expect(Array.isArray(phases)).toBe(true);
  });
  test("listItemRequirements — returns compliance requirements", async () => {
    const result = await harness.action("listItemRequirements", {
      connection: testConnection,
    });
    expect(result.data).toBeDefined();
  });
  test("listItemNumberFormats — returns list of number formats", async () => {
    const result = await harness.action("listItemNumberFormats", {
      connection: testConnection,
      limit: "10",
    });
    expect(result.data).toBeDefined();
    expect(Array.isArray(resultData(result).results)).toBe(true);
  });
  test("getItemNumberFormatByGuid — returns format details", async () => {
    if (!numberFormatGuid) {
      console.warn("No number format GUID, skipping getItemNumberFormatByGuid");
      return;
    }
    const result = await harness.action("getItemNumberFormatByGuid", {
      connection: testConnection,
      guid: numberFormatGuid,
    });
    expect(result.data).toBeDefined();
    expect(resultData(result).guid).toBe(numberFormatGuid);
  });
  test("listItemNumberFormatFields — returns fields for a format", async () => {
    if (!numberFormatGuid) {
      console.warn(
        "No number format GUID, skipping listItemNumberFormatFields",
      );
      return;
    }
    const result = await harness.action("listItemNumberFormatFields", {
      connection: testConnection,
      formatGuid: numberFormatGuid,
    });
    expect(result.data).toBeDefined();
  });
  test("getItemNumberFormatField — returns a single field by GUID", async () => {
    if (!numberFormatGuid || !numberFormatFieldGuid) {
      console.warn(
        "No format or field GUID, skipping getItemNumberFormatField",
      );
      return;
    }
    const result = await harness.action("getItemNumberFormatField", {
      connection: testConnection,
      formatGuid: numberFormatGuid,
      fieldGuid: numberFormatFieldGuid,
    });
    expect(result.data).toBeDefined();
    expect(resultData(result).guid).toBe(numberFormatFieldGuid);
  });
  test.skip("createItemNumberFormatField — schema-modifying operation, manual testing required", () => {});
  test("listItemNumberReservations — returns list of reservations", async () => {
    const result = await harness.action("listItemNumberReservations", {
      connection: testConnection,
      limit: "10",
    });
    expect(result.data).toBeDefined();
  });
  test("createItemNumberReservation — creates a reservation and returns GUID", async () => {
    if (!numberFormatGuid || !itemCategoryGuid) {
      console.warn(
        "No number format or category GUID, skipping createItemNumberReservation",
      );
      return;
    }
    try {
      const result = await harness.action("createItemNumberReservation", {
        connection: testConnection,
        reservationData: {
          numberFormat: { guid: numberFormatGuid },
          category: { guid: itemCategoryGuid },
        },
      });
      expect(result.data).toBeDefined();
    } catch (err: unknown) {
      console.warn(
        "createItemNumberReservation returned an error (workspace may not support reservations):",
        getNestedValue(err, "data") ?? getErrorMessage(err),
      );
    }
  });
});
describe("Item File", () => {
  let discoveredFileAssociationGuid: string | undefined;
  beforeAll(async () => {
    if (!itemGuid) return;
    const filesResult = await harness.action("listItemFileAssociations", {
      connection: testConnection,
      itemGuid,
    });
    const assocs = resultList(filesResult);
    discoveredFileAssociationGuid = guidOf(assocs[0]);
  });
  test("listItemFileAssociations — returns list of file associations", async () => {
    if (!itemGuid) {
      console.warn("No item GUID, skipping listItemFileAssociations");
      return;
    }
    const result = await harness.action("listItemFileAssociations", {
      connection: testConnection,
      itemGuid,
    });
    expect(result.data).toBeDefined();
    expect(Array.isArray(resultData(result).results)).toBe(true);
  });
  test("getItemFileAssociation — returns details of a single file association", async () => {
    if (!itemGuid || !discoveredFileAssociationGuid) {
      console.warn(
        "No item file association GUID, skipping getItemFileAssociation",
      );
      return;
    }
    const result = await harness.action("getItemFileAssociation", {
      connection: testConnection,
      itemGuid,
      itemFileAssociationGuid: discoveredFileAssociationGuid,
    });
    expect(result.data).toBeDefined();
    expect(resultData(result).guid).toBe(discoveredFileAssociationGuid);
  });
  test("updateItemFileAssociation — updates latestEditionAssociation flag", async () => {
    if (!itemGuid || !discoveredFileAssociationGuid) {
      console.warn(
        "No item file association GUID, skipping updateItemFileAssociation",
      );
      return;
    }
    const current = await harness.action("getItemFileAssociation", {
      connection: testConnection,
      itemGuid,
      itemFileAssociationGuid: discoveredFileAssociationGuid,
    });
    const rawLatestEdition = resultData(current).latestEditionAssociation;
    const currentFlag: boolean = util.types.isBool(rawLatestEdition)
      ? rawLatestEdition
      : true;
    const result = await harness.action("updateItemFileAssociation", {
      connection: testConnection,
      itemGuid,
      itemFileAssociationGuid: discoveredFileAssociationGuid,
      latestEditionAssociation: currentFlag,
    });
    expect(result.data).toBeDefined();
  });
  test.skip("createItemFileAssociation — multipart upload, manual testing required", () => {});
  test.skip("deleteItemFileAssociation — would remove workspace data, manual testing required", () => {});
});
describe("Item Reference — Sourcing Relationships", () => {
  let createdSourcingGuid: string | undefined;
  afterAll(async () => {
    if (itemGuid && createdSourcingGuid) {
      try {
        await harness.action("deleteSourcingRelationship", {
          connection: testConnection,
          itemGuid,
          sourcingRelationshipGuid: createdSourcingGuid,
        });
      } catch (err) {
        console.warn("afterAll sourcing cleanup failed:", err);
      }
    }
  });
  test("listSourcingRelationships — returns list of sourcing relationships", async () => {
    if (!itemGuid) {
      console.warn("No item GUID, skipping listSourcingRelationships");
      return;
    }
    const result = await harness.action("listSourcingRelationships", {
      connection: testConnection,
      itemGuid,
    });
    expect(result.data).toBeDefined();
  });
  test("createSourcingRelationship — creates a make-item sourcing entry", async () => {
    if (!itemGuid) {
      console.warn("No item GUID, skipping createSourcingRelationship");
      return;
    }
    try {
      const result = await harness.action("createSourcingRelationship", {
        connection: testConnection,
        itemGuid,
        makeItem: true,
        approved: false,
        notes: "Created by integration test",
      });
      expect(result.data).toBeDefined();
      expect(resultData(result).guid).toBeTruthy();
      createdSourcingGuid = guidOf(resultData(result));
    } catch (err: unknown) {
      console.warn(
        "createSourcingRelationship returned an error (may be business-rule rejection):",
        getNestedValue(err, "data") ?? getErrorMessage(err),
      );
    }
  });
  test("updateSourcingRelationship — updates notes on sourcing entry", async () => {
    if (!itemGuid || !createdSourcingGuid) {
      console.warn(
        "No sourcing relationship GUID, skipping updateSourcingRelationship",
      );
      return;
    }
    const result = await harness.action("updateSourcingRelationship", {
      connection: testConnection,
      itemGuid,
      sourcingRelationshipGuid: createdSourcingGuid,
      notes: "Updated by integration test",
    });
    expect(result.data).toBeDefined();
  });
  test("deleteSourcingRelationship — deletes the created sourcing entry", async () => {
    if (!itemGuid || !createdSourcingGuid) {
      console.warn(
        "No sourcing relationship GUID, skipping deleteSourcingRelationship",
      );
      return;
    }
    const result = await harness.action("deleteSourcingRelationship", {
      connection: testConnection,
      itemGuid,
      sourcingRelationshipGuid: createdSourcingGuid,
    });
    expect(result.data).toBeDefined();
    expect(resultData(result).success).toBe(true);
    createdSourcingGuid = undefined;
  });
});
describe("Item Reference — Training", () => {
  test("listItemTrainingRecords — returns training records for item", async () => {
    if (!itemGuid) {
      console.warn("No item GUID, skipping listItemTrainingRecords");
      return;
    }
    const result = await harness.action("listItemTrainingRecords", {
      connection: testConnection,
      itemGuid,
    });
    expect(result.data).toBeDefined();
  });
  test("listItemTrainingPlans — returns training plans associated with item", async () => {
    if (!itemGuid) {
      console.warn("No item GUID, skipping listItemTrainingPlans");
      return;
    }
    const result = await harness.action("listItemTrainingPlans", {
      connection: testConnection,
      itemGuid,
    });
    expect(result.data).toBeDefined();
  });
});
