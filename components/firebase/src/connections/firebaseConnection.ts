import { connection } from "@prismatic-io/spectral";

export const firebaseConnection = connection({
  key: "firebaseConnection",
  display: {
    label: "Private Key",
    description:
      "Authenticate requests to Firebase using values obtained from the Google Cloud Platform.",
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
      example: "my-project-id",
    },
    privateKey: {
      label: "Private Key",
      placeholder: "Private Key",
      type: "password",
      required: true,
      shown: true,
      comments:
        "Provide the `private_key` value from the service account JSON key file. See the [Firebase Admin SDK setup guide](https://firebase.google.com/docs/admin/setup#set-up-project-and-service-account).",
      example:
        "-----BEGIN PRIVATE KEY-----\nXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\n-----END PRIVATE KEY-----\n",
    },
    clientEmail: {
      label: "Email",
      placeholder: "Email",
      type: "string",
      required: true,
      shown: true,
      comments:
        "Provide the `client_email` value from the service account JSON key file.",
      example: "firebase-adminsdk-xxxxx@my-project-id.iam.gserviceaccount.com",
    },
  },
});
