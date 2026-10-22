import { buildSchema, parse, validate } from "graphql";
import { POLL_ORDERS_QUERY } from "./constants";
const fluentOrdersSchema = buildSchema(`
  scalar DateTime
  input DateRange { from: DateTime to: DateTime }
  type Order { id: ID ref: String type: String status: String createdOn: DateTime updatedOn: DateTime }
  type OrderEdge { node: Order }
  type PageInfo { hasNextPage: Boolean endCursor: String }
  type OrderConnection { edges: [OrderEdge] pageInfo: PageInfo }
  type Query {
    orders(updatedOn: DateRange, first: Int, after: String, retailerId: [Int!]): OrderConnection
  }
`);
describe("POLL_ORDERS_QUERY", () => {
  it("declares variables whose types match the documented arguments", () => {
    const errors = validate(fluentOrdersSchema, parse(POLL_ORDERS_QUERY));
    expect(errors.map((error) => error.message)).toEqual([]);
  });
});
