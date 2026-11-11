import component from "./index";

describe("Component", () => {
  it("should be a valid component", () => {
    expect(component).toBeDefined();
    expect(component.key).toBe("frontify");
    expect(component.public).toBe(true);
    expect(component.display.label).toBe("Frontify");
    expect(component.display.description).toContain("Frontify");
    expect(component.display.iconPath).toBe("icon.png");
  });
});
