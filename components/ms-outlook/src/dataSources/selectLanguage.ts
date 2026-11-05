import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connectionInput } from "../inputs";
import { computeEndpointBasedOnConnection } from "../util";

export const selectLanguage = dataSource({
  display: {
    label: "Select Language",
    description: "Select a language from the list of supported languages.",
  },
  inputs: {
    connection: connectionInput,
  },
  perform: async (context, { connection }) => {
    const client = createClient(connection, false);
    const { data } = await client.get<{
      "@odata.context": string;
      value: { locale: string; displayName: string }[];
    }>(computeEndpointBasedOnConnection(connection, "/me/outlook/supportedLanguages"));

    const result = data.value.map<Element>((language) => ({
      label: `${language.displayName} (${language.locale})`,
      key: util.types.toString(language.locale),
    }));
    return { result };
  },
  dataSourceType: "picklist",
});
