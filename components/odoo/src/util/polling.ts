import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { MAX_POLL_PAGES, POLL_PAGE_SIZE } from "../constants";
import type { OdooRecord, PollResult } from "../types";
import { json2Path } from "./paths";
export const toOdooDate = (iso: string): string =>
  iso
    .replace("T", " ")
    .replace(/\.\d+Z$/, "")
    .replace(/Z$/, "");
export const fetchOdooRecordsSince = async (
  client: HttpClient,
  model: string,
  lastPolledAt: string,
): Promise<PollResult> => {
  const domain = [["write_date", ">=", toOdooDate(lastPolledAt)]];
  const records: OdooRecord[] = [];
  for (let page = 0; page < MAX_POLL_PAGES; page++) {
    const { data: batch } = await client.post<OdooRecord[]>(
      json2Path(model, "search_read"),
      {
        domain,
        fields: [],
        limit: POLL_PAGE_SIZE,
        offset: page * POLL_PAGE_SIZE,
        order: "write_date asc",
      },
    );
    records.push(...batch);
    if (batch.length < POLL_PAGE_SIZE) {
      return { records, truncated: false };
    }
  }
  return { records, truncated: true };
};
