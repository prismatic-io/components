import { dataSource, type Element } from "@prismatic-io/spectral";
import { selectSegmentInputs } from "../inputs";
import { selectSegmentExamplePayload } from "../examplePayloads";
import { getApi } from "../api";
import { fetchSegments } from "../util";
import { KlaviyoApi } from "../constants";
export const selectSegment = dataSource({
  display: {
    label: "Select Segment",
    description: "Select a segment from a Klaviyo account.",
  },
  inputs: selectSegmentInputs,
  dataSourceType: "picklist",
  perform: async (_context, { connection }) => {
    const segmentsApi = getApi(connection, KlaviyoApi.Segments);
    const data = await fetchSegments(segmentsApi, ["name"], [], undefined);
    const result = data.data
      .map<Element>((response) => ({
        key: response.id,
        label: response.attributes.name ?? response.id,
      }))
      .sort((a, b) => ((a.label ?? "") < (b.label ?? "") ? -1 : 1));
    return { result };
  },
  examplePayload: selectSegmentExamplePayload,
});
