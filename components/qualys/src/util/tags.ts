import { util } from "@prismatic-io/spectral";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { DEFAULT_QPS_PAGE_SIZE, TEXT_XML_HEADERS } from "../constants";
import type {
  FilterCriteria,
  ParsedTagPage,
  QpsServiceResponse,
  QualysTag,
} from "../types";
import { ensureArray } from "./xml";
const buildSearchTagsBody = (
  limit: number,
  criteria: FilterCriteria[],
  lastId?: number,
): string => `<?xml version="1.0" encoding="UTF-8"?>
<ServiceRequest>
  <preferences>
    <limitResults>${limit}</limitResults>
    ${lastId ? `<startFromId>${lastId}</startFromId>` : ""}
  </preferences>
  ${
    criteria.length > 0
      ? `<filters>${criteria.map((c) => `<Criteria field="${c.field}" operator="${c.operator}">${c.value}</Criteria>`).join("")}</filters>`
      : ""
  }
</ServiceRequest>`;
const parseTagResponse = async (xml: string): Promise<ParsedTagPage> => {
  const { parseXml } = await import("./xml");
  const parsed = await parseXml<QpsServiceResponse<QualysTag>>(xml);
  const rawData = parsed.ServiceResponse.data as
    | Record<string, QualysTag | QualysTag[]>
    | undefined;
  return {
    tags: ensureArray(rawData?.Tag as QualysTag | QualysTag[] | undefined),
    hasMore: util.types.toBool(parsed.ServiceResponse.hasMoreRecords),
    lastId: parsed.ServiceResponse.lastId
      ? util.types.toNumber(parsed.ServiceResponse.lastId)
      : undefined,
  };
};
export const fetchTags = async (
  client: HttpClient,
  options: {
    fetchAll?: boolean;
    pageSize?: number;
    criteria?: FilterCriteria[];
  } = {},
): Promise<QualysTag[]> => {
  const { fetchAll = false, pageSize, criteria = [] } = options;
  const limit = pageSize || DEFAULT_QPS_PAGE_SIZE;
  const allTags: QualysTag[] = [];
  let lastId: number | undefined;
  let hasMore = true;
  while (hasMore) {
    const response = await client.post<string>(
      "/qps/rest/2.0/search/am/tag",
      buildSearchTagsBody(limit, criteria, lastId),
      { headers: TEXT_XML_HEADERS },
    );
    const page = await parseTagResponse(response.data);
    allTags.push(...page.tags);
    if (!fetchAll || !page.hasMore) {
      hasMore = false;
    } else {
      lastId = page.lastId;
    }
  }
  return allTags;
};
