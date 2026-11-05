import { action, input, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getSapClient } from "../client";
import { connectionInput, filter, inlinecount } from "../inputs";

const orderByOptions = [
  "ProjectID",
  "ProjectID desc",
  "ProjectName",
  "ProjectName desc",
  "ProjectStage",
  "ProjectStage desc",
  "OrgID",
  "OrgID desc",
  "ProjectCategory",
  "ProjectCategory desc",
  "Currency",
  "Currency desc",
  "StartDate",
  "StartDate desc",
  "EndDate",
  "EndDate desc",
  "ProjManagerExtId",
  "ProjManagerExtId desc",
  "ProjManagerCompCode",
  "ProjManagerCompCode desc",
  "Customer",
  "Customer desc",
  "CostCenter",
  "CostCenter desc",
  "ProfitCenter",
  "ProfitCenter desc",
  "ProjAccountantExtId",
  "ProjAccountantExtId desc",
  "ProjAccountantCompCode",
  "ProjAccountantCompCode desc",
  "ProjControllerExtId",
  "ProjControllerExtId desc",
  "ProjControllerCompCode",
  "ProjControllerCompCode desc",
  "ProjPartnerExtId",
  "ProjPartnerExtId desc",
  "ProjPartnerCompCode",
  "ProjPartnerCompCode desc",
  "Confidential",
  "Confidential desc",
  "CreatedOn",
  "CreatedOn desc",
  "ChangedOn",
  "ChangedOn desc",
].map((option) => ({ label: option, value: option }));

const selectOptions = [
  "ProjectID",
  "ProjectName",
  "ProjectStage",
  "OrgID",
  "ProjectCategory",
  "Currency",
  "StartDate",
  "EndDate",
  "ProjManagerExtId",
  "ProjManagerCompCode",
  "Customer",
  "CostCenter",
  "ProfitCenter",
  "ProjAccountantExtId",
  "ProjAccountantCompCode",
  "ProjControllerExtId",
  "ProjControllerCompCode",
  "ProjPartnerExtId",
  "ProjPartnerCompCode",
  "ProjectDesc",
  "Confidential",
  "UseProjectBilling",
  "RestrictTimePosting",
  "CreatedOn",
  "ChangedOn",
  "ProjectRoleSet",
  "WorkPackageSet",
].map((option) => ({ label: option, value: option }));

const expandOptions = ["ProjectRoleSet", "WorkPackageSet"].map((option) => ({
  label: option,
  value: option,
}));

export const listProjectsOrderBy = input({
  label: "Order By",
  placeholder: "Order By",
  type: "string",
  required: false,
  comments: "Order by property",
  collection: "valuelist",
  model: orderByOptions,
  clean: util.types.toString,
});

export const listProjectsSelect = input({
  label: "Select",
  placeholder: "Select",
  type: "string",
  required: false,
  comments: "Select property to be returned",
  collection: "valuelist",
  model: selectOptions,
  clean: util.types.toString,
});

export const listProjectsExpand = input({
  label: "Expand",
  placeholder: "Expand",
  type: "string",
  required: false,
  comments: "Expand property to be returned",
  collection: "valuelist",
  model: expandOptions,
  clean: util.types.toString,
});

export const listProjects = action({
  display: {
    label: "List Projects",
    description: "Returns details about all customer and internal projects in the system.",
  },
  perform: async (_context, { connectionInput, filter, inlinecount, orderBy, select, expand }) => {
    const headers = {
      Accept: "application/json",
    };
    const client = getSapClient(connectionInput, headers);
    try {
      const { data } = await client.get(
        `/sap/opu/odata/CPD/SC_PROJ_ENGMT_CREATE_UPD_SRV/ProjectSet?${
          filter.length ? `$filter=${filter}&` : ""
        }${inlinecount.length ? `$inlinecount=${inlinecount}&` : ""}${
          orderBy.length ? `$orderby=${orderBy}&` : ""
        }${select.length ? `$select=${select}&` : ""}${expand.length ? `$expand=${expand}&` : ""}`,
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
    filter,
    inlinecount,
    orderBy: listProjectsOrderBy,
    select: listProjectsSelect,
    expand: listProjectsExpand,
  },
});
