import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import booksCreateRecord from "./actions/booksCreateRecord";
import booksGetRecord from "./actions/booksGetRecord";
import booksGetRecords from "./actions/booksGetRecords";
import booksRemoveRecord from "./actions/booksRemoveRecord";
import booksUpdateRecord from "./actions/booksUpdateRecord";
import crmAddAttachment from "./actions/crmAddAttachment";
import crmCreateRecord from "./actions/crmCreateRecord";
import crmGetRecord from "./actions/crmGetRecord";
import crmGetRecords from "./actions/crmGetRecords";
import crmRemoveRecord from "./actions/crmRemoveRecord";
import crmRunQuery from "./actions/crmRunQuery";
import crmUpdateRecord from "./actions/crmUpdateRecord";
import notificationActions from "./actions/notifications";
import rawRequests from "./actions/rawRequest";
import connections from "./connections";
import dataSources from "./dataSources";
import triggers from "./triggers";

export default component({
  key: "zoho",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/zoho/",
  display: {
    category: "Application Connectors",
    label: "Zoho",
    description: "Manage records, contacts, and transactions in Zoho CRM and Books",
    iconPath: "icon.png",
  },
  actions: {
    ...rawRequests,
    crmGetRecord,
    crmGetRecords,
    crmRemoveRecord,
    crmCreateRecord,
    crmUpdateRecord,
    crmRunQuery,
    crmAddAttachment,
    ...notificationActions,
    booksGetRecord,
    booksGetRecords,
    booksRemoveRecord,
    booksCreateRecord,
    booksUpdateRecord,
  },
  connections,
  dataSources,
  hooks: { error: handleErrors },
  triggers,
});
