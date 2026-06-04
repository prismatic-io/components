import { type Connection, ConnectionError } from "@prismatic-io/spectral";
import { createClient } from "@prismatic-io/spectral/dist/clients/http";
import { getAlgoliaUrl } from "./actions/util";
import { algoliaApiKey } from "./connections";

interface CreateClientProps {
  algoliaConnection?: Connection;
  isGoingToRead?: boolean;
  debug: boolean;
}

export const createAlgoliaClient = ({
  algoliaConnection,
  isGoingToRead = true,
  debug,
}: CreateClientProps) => {
  if (!algoliaConnection || algoliaConnection.key !== algoliaApiKey.key) {
    if (!algoliaConnection) {
      throw new Error("No connection provided");
    }
    throw new ConnectionError(
      algoliaConnection,
      `Unsupported authorization method ${algoliaConnection.key}.`,
    );
  }

  const applicationID = algoliaConnection.fields.applicationId;
  const apiKey = algoliaConnection.fields.apiKey;

  if (typeof applicationID !== "string" || typeof apiKey !== "string") {
    throw new Error("applicationID and apiKey must be strings");
  }

  const baseURL = getAlgoliaUrl(applicationID, isGoingToRead);

  const client = createClient({
    baseUrl: baseURL,
    headers: {
      "X-Algolia-API-Key": apiKey,
      "X-Algolia-Application-Id": applicationID,
      Accept: "application/json",
    },
    debug,
  });

  return client;
};
