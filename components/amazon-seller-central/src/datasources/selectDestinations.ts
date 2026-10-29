import type { Element } from "@prismatic-io/spectral";
import { dataSource, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { destinationsDataSourceExamplePayload } from "../examplePayloads/datasources";
import { connectionInput } from "../inputs";
import type { Destination, DestinationsResponse } from "../interfaces";

export const selectDestinations = dataSource({
  display: {
    label: "Select Destinations",
    description: "Select a destination from your Amazon Seller Central account",
  },
  inputs: {
    connection: connectionInput,
  },
  perform: async (_context, { connection }) => {
    const client = createClient(connection);
    const { data } = await client.get<DestinationsResponse>(
      "/notifications/v1/destinations",
    );

    const result: Element[] = data.destinations.map(
      (destination: Destination) => ({
        label: destination.name,
        key: util.types.toString(destination.destinationId),
      }),
    );

    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: destinationsDataSourceExamplePayload,
});
