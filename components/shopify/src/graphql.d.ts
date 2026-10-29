declare module "*.graphql" {
  import type { DocumentNode } from "graphql";

  const value: DocumentNode;
  export default value;
}

declare module "*.gql" {
  import type { DocumentNode } from "graphql";

  const value: DocumentNode;
  export default value;
}
