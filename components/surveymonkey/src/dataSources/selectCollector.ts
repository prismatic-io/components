import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { paginateResults } from "../util";
import { selectCollectorInputs } from "../inputs";
import { selectCollectorExamplePayload } from "../examplePayloads";
import type { Collector } from "../types";











export const selectCollector = dataSource({
  display: {
    label: "Select Collector",
    description: "A picklist of collectors for the selected survey.",
  },
  inputs: selectCollectorInputs,
  perform: async (_context, { connection, surveyId }) => {
    const client = createClient(connection, false);

    
    const response = await paginateResults<Collector>(
      client,
      `/surveys/${surveyId}/collectors`,
      true, 
    );

    
    const result = response.data.map<Element>((collector) => ({
      label: `${collector.name} (${collector.type})`,
      key: collector.id,
    }));

    return { result };
  },
  examplePayload: selectCollectorExamplePayload,
  dataSourceType: "picklist",
});
