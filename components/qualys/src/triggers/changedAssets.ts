import { pollingTrigger } from "@prismatic-io/spectral";
import { changedAssetsExamplePayload } from "../examplePayloads";
import { changedAssetsInputs } from "../inputs";
import type {
  ChangedAssetItem,
  ChangedAssetsChangesObject,
  PollingState,
} from "../types";
import {
  fetchGatewayAssets,
  resolveChangedAssetItems,
  splitAssetsByChangeType,
  toQualysAssetTimestamp,
} from "../util";
export const changedAssets = pollingTrigger({
  display: {
    label: "Changed Assets",
    description:
      "Checks for assets that have changed since the last execution on a configured schedule. Uses the Gateway asset search with a last-modified filter and persists the watermark via polling state. Note: echo suppression is NOT built into this trigger. If the flow pushes assets back to Qualys, those writes will re-appear as changes on the next poll. Implement echo suppression at the flow level using outbound push timestamps.",
  },
  inputs: changedAssetsInputs,
  examplePayload: changedAssetsExamplePayload,
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: 50 },
  triggerResolver: {
    resolveItems: (_context, { payload }): ChangedAssetItem[] =>
      resolveChangedAssetItems(
        payload.body.data as ChangedAssetsChangesObject | undefined,
      ),
  },
  perform: async (context, payload, params) => {
    const state = context.polling.getState() as PollingState | undefined;
    const now = new Date().toISOString();
    const lastPolledAt = state?.lastPolledAt || now;
    const assetLastUpdated = toQualysAssetTimestamp(lastPolledAt);
    const { assets } = await fetchGatewayAssets({
      connection: params.connection,
      debug: context.debug.enabled,
      fetchAll: true,
      extraParams: { assetLastUpdated },
    });
    const { createdRecords, updatedRecords } = splitAssetsByChangeType(
      assets,
      assetLastUpdated,
      {
        showNewRecords: params.showNewRecords,
        showUpdatedRecords: params.showUpdatedRecords,
      },
    );
    context.polling.setState({ lastPolledAt: now });
    return {
      payload: {
        ...payload,
        body: { data: { createdRecords, updatedRecords } },
      },
      polledNoChanges: createdRecords.length + updatedRecords.length === 0,
    };
  },
});
