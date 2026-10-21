import type {
  DocumentData,
  Query,
  QueryDocumentSnapshot,
} from "firebase-admin/firestore";
import type { QueryCondition, QueryDocsParams } from "../types";
export const queryDocs = async ({
  db,
  collection,
  queryOperatorCode,
  orderBy,
}: QueryDocsParams): Promise<QueryDocumentSnapshot<DocumentData>[]> => {
  let query: Query = db.collection(collection);
  if (queryOperatorCode) {
    try {
      const jsonArrayQuery = JSON.parse(queryOperatorCode);
      jsonArrayQuery.forEach((condition: QueryCondition) => {
        if (
          condition.value === null &&
          !["==", "=", "!="].includes(condition.operator)
        )
          throw new Error(
            "Invalid query. You can only perform '==' and '!=' comparisons on Null.",
          );
        query = query.where(
          condition.field.trim(),
          condition.operator,
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
