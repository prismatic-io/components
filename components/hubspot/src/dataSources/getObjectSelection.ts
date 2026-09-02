import { dataSource } from "@prismatic-io/spectral";
import { getHubspotClient } from "../client";
import { getObjectSelectionInputs } from "../inputs";
export const getObjectSelection = dataSource({
  display: {
    label: "Select Object",
    description:
      "Select a HubSpot object type from the list of available objects.",
  },
  inputs: getObjectSelectionInputs,
  perform: async (
    _context,
    { connection, objectsToSelect, includeCustomObjects },
  ) => {
    let customObjects = [];
    const client = getHubspotClient({ hubspotConnection: connection });
    if (includeCustomObjects) {
      const {
        data: { results },
      } = await client.get("/crm/v3/schemas");
      customObjects = results.map((hsObject) => {
        return {
          object: {
            key: hsObject.labels.plural.toLowerCase(),
            label: hsObject.labels.plural,
          },
          fields: hsObject.properties.map((field) => ({
            key: field.name,
            label: field.label,
          })),
        };
      });
    }
    const mappedObjects = objectsToSelect.map(async (hsObject) => {
      const apiKey = hsObject.replace(" ", "_").trim().toLowerCase();
      const {
        data: { results },
      } = await client.get(`/crm/v3/properties/${apiKey}`);
      return {
        object: { key: apiKey, label: hsObject },
        fields: results?.map((field) => ({
          key: field.name,
          label: field.label,
        })),
      };
    }, []);
    return {
      result: [...customObjects, ...(await Promise.all(mappedObjects))],
    };
  },
  dataSourceType: "objectSelection",
});
