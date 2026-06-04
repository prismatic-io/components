import { input, util } from "@prismatic-io/spectral";
import { toOptionalString } from "../util";
import { cursor, idempotencyKey, limit, squareConnection, validateJSON } from "./common";

const changes = input({
  type: "code",
  label: "Inventory Changes",
  language: "json",
  required: true,
  default: JSON.stringify(
    [
      {
        type: "PHYSICAL_COUNT",
        physical_count: {
          catalog_object_id: "W62UWFY35CWMYGVWK6TWJDNI",
          state: "IN_STOCK",
          quantity: "10",
          location_id: "LH2G9VFHJRWKR",
          occurred_at: "2024-07-01T00:00:00Z",
          created_at: "2024-07-01T00:00:00Z",
        },
      },
      {
        type: "ADJUSTMENT",
        adjustment: {
          catalog_object_id: "W62UWFY35CWMYGVWK6TWJDNI",
          from_state: "IN_STOCK",
          to_state: "SOLD",
          quantity: "-1",
          location_id: "LH2G9VFHJRWKR",
          occurred_at: "2024-07-01T00:00:00Z",
          created_at: "2024-07-01T00:00:00Z",
          source: {
            product: "SQUARE_POS",
            application_id: "sandbox-sq0idb-example",
            name: "Point of Sale",
            type: "APPLICATION",
          },
        },
      },
    ],
    null,
    2,
  ),
  comments:
    "An array of inventory changes in JSON format. See [Square Inventory Changes](https://developer.squareup.com/reference/square/objects/InventoryChange) for change types.",
  clean: (input) => validateJSON(input),
});

const ignoreUnchangedCounts = input({
  type: "boolean",
  label: "Ignore Unchanged Counts",
  required: false,
  comments: "When true, unchanged inventory counts are ignored.",
  clean: util.types.toBool,
});

const catalogObjectIds = input({
  type: "code",
  label: "Catalog Object IDs",
  language: "json",
  required: true,
  default: JSON.stringify(["W62UWFY35CWMYGVWK6TWJDNI", "X73VXGZ46DXNZHXWL7UXKENJ"], null, 2),
  comments: "An array of catalog object IDs in JSON format used to filter inventory results.",
  clean: (input) => validateJSON(input),
});

const locationIds = input({
  label: "Location IDs",
  type: "code",
  language: "json",
  default: JSON.stringify(["LH2G9VFHJRWKR", "LK3H8WGIKSMLA"], null, 2),
  required: true,
  comments: "An array of location IDs in JSON format used to filter results to specific locations.",
  clean: (locationIdsInput) => validateJSON(locationIdsInput),
});

const updatedAfter = input({
  type: "string",
  label: "Updated After",
  required: false,
  placeholder: "Enter timestamp (RFC 3339 format)",
  example: "2024-01-01T00:00:00Z",
  comments:
    "The timestamp filter used to return results whose calculated_at value is after the given time. Format: RFC 3339.",
  clean: toOptionalString,
});

const states = input({
  type: "code",
  label: "States",
  language: "json",
  required: false,
  default: JSON.stringify(["IN_STOCK", "SOLD"], null, 2),
  comments:
    "An array of inventory states in JSON format used to filter results. Options: IN_STOCK, SOLD, RETURNED_BY_CUSTOMER.",
  clean: (input) => validateJSON(input),
});

export const batchChangeInventoryInputs = {
  squareConnection,
  idempotencyKey,
  changes,
  ignoreUnchangedCounts,
};

export const batchRetrieveInventoryCountsInputs = {
  squareConnection,
  catalogObjectIds,
  locationIds,
  cursor,
  limit,
  updatedAfter,
  states,
};
