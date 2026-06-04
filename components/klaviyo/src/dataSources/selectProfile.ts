import { dataSource, type Element } from "@prismatic-io/spectral";
import { connection } from "../inputs/shared";
import { fetchProfile } from "../utils";
import { getApi } from "../api";
import { KlaviyoApi } from "../enums/KlaviyoApi";

export const selectProfile = dataSource({
  display: {
    label: "Select Profile",
    description: "Select a profile to use.",
  },
  inputs: { connection },
  dataSourceType: "picklist",
  perform: async (context, { connection }) => {
    const profilesApi = getApi(connection, KlaviyoApi.Profiles);

    const data = await fetchProfile(
      profilesApi,
      ["email"],
      undefined,
      [],
      undefined,
    );
    const objects = data.data.map<Element>((response) => ({
      key: response.id!,
      label: response.attributes.email!,
    }));

    return { result: objects };
  },
});
