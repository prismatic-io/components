import { action, outputSchema } from "@prismatic-io/spectral";
import { createClassicClient } from "../../client";
import { listScansExamplePayload } from "../../examplePayloads";
import { listScansInputs } from "../../inputs";
import { listScansOutputSchema } from "../../outputSchemas";
import type { ClassicScanResponse } from "../../types";
import { ensureArray, normalizeScan, parseXml } from "../../util";
export const listScans = action({
  display: {
    label: "List Scans",
    description:
      "List VM scans from the Classic API. This is the only way to check a launched scan's status — there is no dedicated status endpoint.",
  },
  inputs: listScansInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listScansOutputSchema,
  }),
  performSafety: "safe",
  perform: async (
    context,
    { connection, scanRef, scanState, launchedAfter },
  ) => {
    const client = createClassicClient(connection, context.debug.enabled);
    const response = await client.get<string>("/api/2.0/fo/scan/", {
      params: {
        action: "list",
        scan_ref: scanRef,
        state: scanState,
        launched_after_datetime: launchedAfter,
      },
    });
    const parsed = await parseXml<ClassicScanResponse>(response.data);
    const scans = ensureArray(
      parsed.SCAN_LIST_OUTPUT?.RESPONSE?.SCAN_LIST?.SCAN,
    );
    return { data: scans.map(normalizeScan) };
  },
  examplePayload: listScansExamplePayload,
});
