import { component } from "@prismatic-io/spectral";

import createDocument from "./actions/createDocument";
import listCollections from "./actions/listCollections";
import listDocuments from "./actions/listDocuments";
import bulkCreateDocuments from "./actions/bulkDocuments";
import deleteDocument from "./actions/deleteDocument";
import getDocument from "./actions/getDocument";
import updateDocument from "./actions/updateDocument";
import removeField from "./actions/removeField";
import connections from "./connections";
import dataSources from "./dataSources";

export default component({
  key: "firebase",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/firebase/",
  display: {
    category: "Data Platforms",
    label: "Firebase",
    description:
      "Create, read, update, and delete documents in a Firebase Cloud Firestore database collection.",
    iconPath: "icon.png",
  },
  actions: {
    createDocument,
    bulkCreateDocuments,
    listCollections,
    listDocuments,
    getDocument,
    deleteDocument,
    updateDocument,
    removeField,
  },
  dataSources,
  connections,
});
