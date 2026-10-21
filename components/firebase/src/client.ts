import { randomUUID } from "node:crypto";
import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import {
  type Credential,
  cert,
  deleteApp,
  initializeApp,
} from "firebase-admin/app";
import { type Firestore, getFirestore } from "firebase-admin/firestore";
import { firebaseConnection as firebaseConnectionDefinition } from "./connections";
export const withFirestore = async <T>(
  {
    firebaseConnection,
  }: {
    firebaseConnection: Connection;
  },
  fn: (db: Firestore) => Promise<T>,
): Promise<T> => {
  if (firebaseConnection.key !== firebaseConnectionDefinition.key)
    throw new ConnectionError(
      firebaseConnection,
      `Unsupported connection specified: ${firebaseConnection.key}`,
    );
  const privateKey = util.types.toString(firebaseConnection.fields.privateKey);
  let credential: Credential;
  try {
    credential = cert({
      projectId: util.types.toString(firebaseConnection.fields.projectId),
      privateKey: privateKey.replace(/\\n/g, "\n"),
      clientEmail: util.types.toString(firebaseConnection.fields.clientEmail),
    });
  } catch (error) {
    if (error instanceof Error && error.cause instanceof Error)
      throw new Error(`${error.message} ${error.cause.message}`, {
        cause: error,
      });
    throw error;
  }
  const app = initializeApp({ credential }, `firebase-${randomUUID()}`);
  try {
    return await fn(getFirestore(app));
  } finally {
    await deleteApp(app);
  }
};
