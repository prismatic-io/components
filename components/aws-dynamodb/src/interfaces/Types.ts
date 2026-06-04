interface DynamoDBString {
  S: string;
}
interface DynamoDBNumber {
  N: string;
}
interface DynamoDBBoolean {
  BOOL: boolean;
}
interface DynamoDBList {
  L: DynamoDBValue[];
}
interface DynamoDBObject {
  M: Record<string, DynamoDBValue>;
}
export type DynamoDBValue =
  | DynamoDBString
  | DynamoDBNumber
  | DynamoDBBoolean
  | DynamoDBList
  | DynamoDBObject;
