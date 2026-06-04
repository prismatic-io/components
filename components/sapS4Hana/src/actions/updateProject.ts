import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getSapClient } from "../client";
import { requestBodyCode, connectionInput, projectId } from "../inputs";

export const updateProject = action({
  display: {
    label: "Update Project",
    description: "Updates the basic information for a customer or internal project.",
  },
  perform: async (_context, { requestBodyCode, connectionInput, projectId }) => {
    const headers = {
      Accept: "*/*",
      "Content-Type": "application/json",
    };
    const client = getSapClient(connectionInput, headers);
    try {
      const { data } = await client.patch(
        `/sap/opu/odata/CPD/SC_PROJ_ENGMT_CREATE_UPD_SRV/ProjectSet('${projectId}')`,
        requestBodyCode,
      );
      return { data };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },
  inputs: {
    requestBodyCode: {
      ...requestBodyCode,
      required: true,
      default: `{
         "d": {
            "ProjectName": "string",
            "ProjectStage": "string",
            "Currency": "string",
            "StartDate": "/Date(1492098664000)/",
            "EndDate": "/Date(1492098664000)/",
            "ProjManagerExtId": "string",
            "ProjManagerCompCode": "string",
            "ProfitCenter": "string",
            "ProjAccountantExtId": "string",
            "ProjAccountantCompCode": "string",
            "ProjControllerExtId": "string",
            "ProjControllerCompCode": "string",
            "ProjPartnerExtId": "string",
            "ProjPartnerCompCode": "string",
            "ProjectDesc": "string",
            "Confidential": "string",
            "UseProjectBilling": "string",
            "RestrictTimePosting": "string"
         }
      }`,
    },
    connectionInput,
    projectId,
  },
});
