import { input, util } from "@prismatic-io/spectral";
import { toOptionalNumber, toOptionalString } from "../util/cleanInput";
import { connectionInput, entityType, fetchAll, nextPageId } from "./common";

const xmlQuery = input({
  label: "XML Query",
  placeholder: "Enter Fetch XML query",
  type: "code",
  language: "xml",
  required: true,
  comments: "An XML query string to use as a Fetch query in Microsoft Dynamics 365.",
  example: `<fetch mapping="logical">
  <entity name="account">
    <attribute name="accountid"/>
    <attribute name="name"/>
  </entity>
</fetch>`,
  clean: util.types.toString,
});

const pageNumber = input({
  label: "Page Number",
  placeholder: "Enter page number",
  type: "string",
  required: false,
  comments: "The 1-based page number to retrieve when iterating through Fetch XML query results.",
  example: "1",
  clean: toOptionalNumber,
});

const includeAnnotations = input({
  label: "Include Annotations",
  placeholder: "Enter annotation filter",
  type: "string",
  required: false,
  comments:
    "The 'Prefer: odata.include-annotations' header value, e.g., '*' to include all annotations or 'OData.Community.Display.V1.FormattedValue' for formatted values only.",
  example: "*",
  clean: toOptionalString,
});

const impersonateUserId = input({
  label: "Impersonate User ID",
  placeholder: "Enter user GUID to impersonate",
  type: "string",
  required: false,
  comments: "Specifies the GUID of a user to impersonate when executing the query.",
  example: "7d577253-3ef0-4a0a-bb7f-8335c2596e70",
  clean: toOptionalString,
});

export const fetchXmlInputs = {
  connection: connectionInput,
  entityType,
  xmlQuery,
  includeAnnotations,
  impersonateUserId,
  fetchAll,
  pageNumber,
  nextPageId,
};
