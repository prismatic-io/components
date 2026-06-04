import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { archiveBatchEngagement } from "./actions/archiveBatchEngagement";
import {
  ArchiveAssociations,
  createAssociations,
  listAssociationTypes,
  readAssociations,
} from "./actions/associations";
import CustomObjects from "./actions/CustomObjects";
import {
  createCompany,
  deleteCompany,
  getCompany,
  listCompanies,
  updateCompany,
} from "./actions/companies";
import {
  archiveBatchContacts,
  CreateContact,
  createBatchContacts,
  deleteContact,
  getBatchContacts,
  getContact,
  listContacts,
  updateBatchContacts,
  updateContact,
} from "./actions/contacts";
import { createBatchEngagement } from "./actions/createBatchEngagement";
import { createEngagement } from "./actions/createEngagement";
import {
  cancelImport,
  exportCRMData,
  getAnImport,
  importCRMData,
  listActiveImports,
} from "./actions/crmData";
import {
  createDeal,
  deleteDeal,
  getDealById,
  listDeals,
  searchDeals,
  updateDeal,
} from "./actions/deals";
import { deleteEngagement } from "./actions/deleteEngagement";
import { getCurrentUser } from "./actions/getCurrentUser";
import { getEngagement } from "./actions/getEngagement";
import {
  createLineItem,
  deleteLineItem,
  getLineItem,
  listLineItems,
  updateLineItem,
} from "./actions/lineItems";
import { listEngagements } from "./actions/listEngagements";
import { listProperties } from "./actions/listProperties";
import {
  createProduct,
  deleteProduct,
  getProduct,
  listProducts,
  updateProduct,
} from "./actions/products";
import { rawRequest } from "./actions/misc/rawRequest";
import { search } from "./actions/search";
import { updateBatchEngagement } from "./actions/updateBatchEngagement";
import { updateEngagement } from "./actions/updateEngagement";
import { validateConnection } from "./actions/validateConnection";
import { createWebhook, deleteAllWebhooks, deleteWebhook, listWebhooks } from "./actions/webhook";
import connections from "./connections";
import dataSources from "./dataSources";
import triggers from "./triggers";

export default component({
  key: "hubspot",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/hubspot/",
  display: {
    label: "HubSpot",
    description: "Manage records and associations in the HubSpot CRM platform",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  actions: {
    listDeals,
    createDeal,
    getDealById,
    updateDeal,
    deleteDeal,
    searchDeals,
    createProduct,
    updateProduct,
    listProducts,
    getProduct,
    deleteProduct,
    listContacts,
    CreateContact,
    deleteContact,
    getContact,
    updateContact,
    listCompanies,
    createCompany,
    deleteCompany,
    updateCompany,
    getCompany,
    listLineItems,
    getLineItem,
    createLineItem,
    deleteLineItem,
    updateLineItem,
    listAssociationTypes,
    createAssociations,
    ArchiveAssociations,
    readAssociations,
    listWebhooks,
    createWebhook,
    deleteWebhook,
    deleteAllWebhooks,
    listProperties,
    rawRequest,
    getCurrentUser,
    validateConnection,
    ...CustomObjects,
    importCRMData,
    listActiveImports,
    cancelImport,
    getAnImport,
    exportCRMData,
    search,
    listEngagements,
    getEngagement,
    createEngagement,
    updateEngagement,
    deleteEngagement,
    createBatchEngagement,
    updateBatchEngagement,
    archiveBatchEngagement,
    archiveBatchContacts,
    createBatchContacts,
    getBatchContacts,
    updateBatchContacts,
  },
  triggers,
  connections,
  dataSources,
  hooks: { error: handleErrors },
});
