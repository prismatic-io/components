import { dataSource, util, type Element } from "@prismatic-io/spectral";
import { selectProfileInputs } from "../inputs";
import { selectProfileExamplePayload } from "../examplePayloads";
import { fetchProfile } from "../util";
import { getApi } from "../api";
import { KlaviyoApi } from "../constants";
export const selectProfile = dataSource({
  display: {
    label: "Select Profile",
    description: "Select a profile to use.",
  },
  inputs: selectProfileInputs,
  dataSourceType: "picklist",
  perform: async (_context, { connection }) => {
    const profilesApi = getApi(connection, KlaviyoApi.Profiles);
    const data = await fetchProfile(
      profilesApi,
      ["email"],
      undefined,
      [],
      undefined,
    );
    const objects = data.data.map<Element>((response) => ({
      key: util.types.toString(response.id),
      label: util.types.toString(response.attributes.email),
    }));
    return { result: objects };
  },
  examplePayload: selectProfileExamplePayload,
});
