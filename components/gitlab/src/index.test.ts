import component from "./index";
describe("gitlab component", () => {
  test("is public with the gitlab key", () => {
    expect(component.key).toBe("gitlab");
    expect(component.public).toBe(true);
  });
});
