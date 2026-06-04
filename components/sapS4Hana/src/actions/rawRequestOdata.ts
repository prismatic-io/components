import { action, input, util } from "@prismatic-io/spectral";
import { connectionInput, top, skip, search, filter, inlinecount } from "../inputs";
import { getSapClient } from "../client";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";

const orderByOptions = [
  "FileSize",
  "FileSize desc",
  "FileName",
  "FileName desc",
  "MimeType",
  "MimeType desc",
  "CreatedByUser",
  "CreatedByUser desc",
  "CreationDateTime",
  "CreationDateTime desc",
  "LastChangedByUser",
  "LastChangedByUser desc",
  "ChangedDateTime",
  "ChangedDateTime desc",
].map((option) => ({ label: option, value: option }));

const selectOptions = [
  "DocumentInfoRecordDocType",
  "DocumentInfoRecordDocNumber",
  "DocumentInfoRecordDocVersion",
  "DocumentInfoRecordDocPart",
  "LogicalDocument",
  "ArchiveDocumentID",
  "LinkedSAPObjectKey",
  "BusinessObjectTypeName",
  "SemanticObject",
  "WorkstationApplication",
  "FileSize",
  "FileName",
  "DocumentURL",
  "MimeType",
  "Content",
  "CreatedByUser",
  "CreatedByUserFullName",
  "CreationDateTime",
  "BusinessObjectType",
  "LastChangedByUser",
  "LastChangedByUserFullName",
  "ChangedDateTime",
  "StorageCategory",
  "ArchiveLinkRepository",
  "SAPObjectType",
  "SAPObjectNodeType",
  "HarmonizedDocumentType",
  "AttachmentDeletionIsAllowed",
  "AttachmentRenameIsAllowed",
  "Source",
  "AttachmentContentHash",
].map((option) => ({ label: option, value: option }));

const expandOptions = ["ProjectRoleSet", "WorkPackageSet"].map((option) => ({
  label: option,
  value: option,
}));

export const rawRequestOdataOrderBy = input({
  label: "Order By",
  placeholder: "Order By",
  type: "string",
  required: false,
  comments: "Order by property",
  collection: "valuelist",
  model: orderByOptions,
  clean: util.types.toString,
});

export const rawRequestOdataSelect = input({
  label: "Select",
  placeholder: "Select",
  type: "string",
  required: false,
  comments: "Select property to be returned",
  collection: "valuelist",
  model: selectOptions,
  clean: util.types.toString,
});

export const rawRequestOdataExpand = input({
  label: "Expand",
  placeholder: "Expand",
  type: "string",
  required: false,
  comments: "Expand property to be returned",
  collection: "valuelist",
  model: expandOptions,
  clean: util.types.toString,
});

const rawRequestOdata = action({
  display: {
    label: "Raw Request - OData",
    description: "Send an OData GET request to SAP S/4HANA with query parameters",
  },
  inputs: {
    connection: connectionInput,
    url: {
      label: "URL Path",
      type: "string",
      required: true,
      comments:
        "Input the path only. The base URL from your connection is automatically prepended. Example: /sap/opu/odata/sap/API_PURCHASEREQ_PROCESS_SRV/A_PurchaseRequisitionHeader",
      example: "/sap/opu/odata/sap/API_PURCHASEREQ_PROCESS_SRV/A_PurchaseRequisitionHeader",
      clean: util.types.toString,
    },
    top,
    skip,
    search,
    filter,
    inlinecount,
    orderBy: rawRequestOdataOrderBy,
    select: rawRequestOdataSelect,
    expand: rawRequestOdataExpand,
  },
  perform: async (
    _context,
    { connection, url, top, skip, search, filter, inlinecount, orderBy, select, expand },
  ) => {
    
    const queryParams: string[] = [];
    if (top) queryParams.push(`$top=${top}`);
    if (skip) queryParams.push(`$skip=${skip}`);
    if (search) queryParams.push(`$search=${search}`);
    if (filter) queryParams.push(`$filter=${filter}`);
    if (inlinecount) queryParams.push(`$inlinecount=${inlinecount}`);
    if (orderBy) queryParams.push(`$orderby=${orderBy}`);
    if (select) queryParams.push(`$select=${select}`);
    if (expand) queryParams.push(`$expand=${expand}`);

    const queryString = queryParams.length > 0 ? `?${queryParams.join("&")}` : "";
    const finalUrl = `${url}${queryString}`;

    const headers: Record<string, string> = {
      Accept: "application/json",
    };

    const client = getSapClient(connection, headers);

    try {
      const { data } = await client.get(finalUrl);
      return { data };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },
});

export default rawRequestOdata;
