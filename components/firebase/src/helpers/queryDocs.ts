import type {
  DocumentData,
  Query,
  QueryDocumentSnapshot,
  WhereFilterOp,
} from "@google-cloud/firestore";
import type { QueryCondition } from "../actions/types/QueryCondition";
import type { app } from "firebase-admin";

export const queryDocs = async ({
  client,
  collection,
  queryOperatorCode,
  orderBy,
}: {
  client: app.App;
  collection: string;
  queryOperatorCode: string;
  orderBy: string;
}) => {
  let query: Query = client.firestore().collection(collection);

  if (queryOperatorCode) {
    try {
      const jsonArrayQuery = JSON.parse(queryOperatorCode);
      jsonArrayQuery.forEach((condition: QueryCondition) => {
        query = query.where(
          condition.field.trim(),
          condition.operator as WhereFilterOp,
          condition.value,
        );
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to parse query operators: ${error.message}`);
      }
      throw error;
    }
  }

  if (orderBy) {
    query = query.orderBy(orderBy.trim());
  }

  let result: Array<QueryDocumentSnapshot<DocumentData>>;
  try {
    const queryResult = await query.get();
    result = queryResult.docs;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to list documents: ${error.message}`);
    }
    throw error;
  }

  return result;
};
