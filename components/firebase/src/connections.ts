import { connection } from "@prismatic-io/spectral";

export const firebaseConnection = connection({
  key: "firebaseConnection",
  display: {
    label: "Firebase Private Key Connection",
    description:
      "Authenticate requests to firebase using values obtained from the Google Cloud Platform.",
  },
  inputs: {
    projectId: {
      label: "Project Id",
      placeholder: "Project Id",
      type: "string",
      required: true,
      shown: true,
      comments:
        "Provide the unique identifier of the project from the Google Cloud Platform.",
    },
    privateKey: {
      label: "Private Key",
      placeholder: "Private Key",
      type: "text",
      required: true,
      shown: true,
      comments: "Provide the private key from the Google Cloud Platform.",
      example:
        "example-\nMIIEvdegIBADANBgkqhkiG9w0BAVtkOIcMjQXRzx+2VLoPkAs\nl1vRkI4wWtbNn6taw01eserX1/vkyxHcByEtkAlaDFrqSlSclRmgRd/ddGWD6xGss9fGIjjJcez4jh\n8z6EUeZBAgMBAAECggEAE8vqqRrYdZFNSTOzZN+R/eDzW2nZMiBTqHTl/KvPmp0m\nfiXX94pJxcRKMEm44n7MFUSdMG3MJoMUeAIs+thYibqkFpXWBCzzq8EzfTuTjR8+ycF+GXWN",
    },
    clientEmail: {
      label: "Email",
      placeholder: "Email",
      type: "string",
      required: true,
      shown: true,
      comments: "Provide the client email for the GCP account.",
      example: "someone@example.com",
    },
  },
});

export default [firebaseConnection];
