import { invokeTrigger } from "@prismatic-io/spectral/dist/testing";
import { myTrigger } from "./myTrigger";
describe("myTrigger", () => {
  test("passes the incoming payload through unchanged, with no branching or early return", async () => {
    const payload = {
      headers: { "x-test": "1" },
      rawBody: { data: Buffer.from("{}") },
      body: { data: { foo: "bar" } },
    } as any;
    const { result } = await invokeTrigger(myTrigger, {}, payload, {});
    expect(result.payload).toEqual(expect.objectContaining(payload));
  });
});
