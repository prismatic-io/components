import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getSapClient } from "../client";
import { connectionInput, projectId, projectSelect, projectExpand } from "../inputs";

export const getProject = action({
  display: {
    label: "Get Project",
    description: "Returns details about a customer or internal project.",
  },
  perform: async (_context, { connectionInput, projectId, projectSelect, projectExpand }) => {
    const headers = {
      Accept: "application/json",
    };
    const client = getSapClient(connectionInput, headers);
    try {
      const { data } = await client.get(
        `/sap/opu/odata/CPD/SC_PROJ_ENGMT_CREATE_UPD_SRV/ProjectSet('${projectId}')?${
          projectSelect.length ? `$select=${projectSelect.join(",")}&` : ""
        }${projectExpand.length ? `$expand=${projectExpand.join(",")}&` : ""}`,
      );
      return { data };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },
  inputs: {
    connectionInput,
    projectId,
    projectSelect,
    projectExpand,
  },
});
