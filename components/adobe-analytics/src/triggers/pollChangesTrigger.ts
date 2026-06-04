import { pollingTrigger } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { pollChangesTriggerInputs } from "../inputs";
import { PollResource } from "../constants";
import type { DiscoveryResponse, ReportSuite, ReportSuiteListResponse } from "../types";
import type { AdobeRecord, PollingState } from "../types/triggers";

const getRecordId = (record: AdobeRecord, resourceType: string): string => {
  if (resourceType === PollResource.REPORT_SUITES) return record.rsid ?? record.id ?? "";
  return record.globalCompanyId ?? record.id ?? "";
};

export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New Records",
    description:
      "Checks for new report suites or companies in Adobe Analytics on a configured schedule.",
  },
  inputs: pollChangesTriggerInputs,
  perform: async (
    context,
    payload,
    { connection, globalCompanyId, resourceType, showNewRecords },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const lastState = context.polling.getState() as PollingState;

    let records: AdobeRecord[];

    if (resourceType === PollResource.REPORT_SUITES) {
      if (!globalCompanyId) {
        throw new Error("Global Company ID is required when polling report suites.");
      }
      let reportSuites: ReportSuite[] = [];
      let nextPage = false;
      let page = 0;
      do {
        const { data } = await client.get<ReportSuiteListResponse>(
          `/api/${globalCompanyId}/reportsuites/collections/suites`,
          { params: { limit: 1000, page } },
        );
        reportSuites = [...reportSuites, ...data.content];
        nextPage = data.nextPage;
        page += 1;
      } while (nextPage);
      records = reportSuites as unknown as AdobeRecord[];
    } else {
      const { data } = await client.get<DiscoveryResponse>("/discovery/me");
      records = data.imsOrgs.flatMap((org) => org.companies) as unknown as AdobeRecord[];
    }

    const currentIds = records.map((r) => getRecordId(r, resourceType));
    const isFirstPoll = lastState?.knownIds === undefined;

    if (isFirstPoll) {
      context.polling.setState({
        knownIds: currentIds,
      } as unknown as Record<string, unknown>);
      return {
        payload: {
          ...payload,
          body: { data: { created: [], updated: [] } },
        },
        polledNoChanges: true,
      };
    }

    const knownSet = new Set(lastState.knownIds);
    const created = records.filter(
      (r) => !knownSet.has(getRecordId(r, resourceType)),
    );

    context.polling.setState({
      knownIds: currentIds,
    } as unknown as Record<string, unknown>);

    const filteredCreated = showNewRecords ? created : [];

    if (context.debug.enabled) {
      context.logger.debug(
        `Polled ${resourceType}: ${records.length} total, ${filteredCreated.length} new`,
      );
    }

    return {
      payload: {
        ...payload,
        body: { data: { created: filteredCreated, updated: [] } },
      },
      polledNoChanges: filteredCreated.length === 0,
    };
  },
});
