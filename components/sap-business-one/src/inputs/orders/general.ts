import { input, util } from "@prismatic-io/spectral";
import { cleanCode } from "../../util";
import { documentLinesExample } from "../../exampleInputs/orders";

export const docEntry = input({
  label: "Doc Entry",
  type: "string",
  comments:
    "The document entry number (DocEntry) that uniquely identifies the order. This is an integer value.",
  example: "123",
  placeholder: "Enter document entry number",
  required: true,
  clean: util.types.toString,
});

export const cardCode = input({
  label: "Card Code",
  type: "string",
  comments: "The business partner code associated with this order.",
  example: "C20000",
  placeholder: "Enter business partner code",
  required: true,
  clean: util.types.toString,
});

export const docDueDate = input({
  label: "Doc Due Date",
  type: "string",
  comments: "The due date of the order in YYYY-MM-DD format.",
  example: "2026-12-31",
  placeholder: "Enter due date (YYYY-MM-DD)",
  required: true,
  clean: util.types.toString,
});

export const docLines = input({
  label: "Doc Lines",
  type: "code",
  language: "json",
  comments:
    "The document lines containing item details for the order. Each line should include ItemCode, Quantity, and optionally UnitPrice and TaxCode.",
  required: true,
  example: JSON.stringify(documentLinesExample, null, 2),
  clean: cleanCode,
});
