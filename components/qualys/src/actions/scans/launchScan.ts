import { action, outputSchema } from "@prismatic-io/spectral";
import { createClassicClient } from "../../client";
import { Messages } from "../../constants";
import { launchScanExamplePayload } from "../../examplePayloads";
import { launchScanInputs } from "../../inputs";
import { launchScanOutputSchema } from "../../outputSchemas";
import type { ClassicScanLaunchResponse } from "../../types";
import { ensureArray, parseXml } from "../../util";
export const launchScan = action({
  display: {
    label: "Launch VM Scan",
    description:
      "Launch a vulnerability management scan against asset groups or tags. Asynchronous — returns a scan reference immediately, not results. Use List Scans to track status. Requires an existing scan option profile and at least one online scanner appliance or Cloud Agent scoped to the targets.",
  },
  inputs: launchScanInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: launchScanOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      scanTitle,
      optionProfileId,
      scannerApplianceId,
      targetTagIds,
      assetGroupIds,
    },
  ) => {
    const client = createClassicClient(connection, context.debug.enabled);
    if (targetTagIds.length === 0 && assetGroupIds.length === 0) {
      throw new Error(
        "At least one Target Tag ID or Asset Group ID is required to scope the scan.",
      );
    }
    const params = new URLSearchParams({ action: "launch" });
    params.set("scan_title", scanTitle);
    params.set("option_id", optionProfileId);
    if (scannerApplianceId) {
      params.set("iscanner_name", scannerApplianceId);
    }
    if (targetTagIds.length > 0) {
      params.set("target_from", "tags");
      params.set("tag_set_by", "id");
      params.set("tag_set_include", targetTagIds.join(","));
      params.set("use_ip_nt_range_tags", "1");
    }
    if (assetGroupIds.length > 0) {
      params.set("asset_group_ids", assetGroupIds.join(","));
    }
    const response = await client.post<string>("/api/2.0/fo/scan/", params);
    const parsed = await parseXml<ClassicScanLaunchResponse>(response.data);
    const items = ensureArray(parsed.SIMPLE_RETURN?.RESPONSE?.ITEM_LIST?.ITEM);
    const scanRef = items.find((i) => i.KEY === "REFERENCE")?.VALUE;
    return {
      data: {
        scanRef: scanRef || null,
        status: Messages.SCAN_SUBMITTED,
        message: parsed.SIMPLE_RETURN?.RESPONSE?.TEXT || Messages.SCAN_LAUNCHED,
      },
    };
  },
  examplePayload: launchScanExamplePayload,
});
