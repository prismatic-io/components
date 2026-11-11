import component from "./index";

describe("Component", () => {
  it("should be a valid component", () => {
    expect(component).toBeDefined();
    expect(component.key).toBe("gorgias");
    expect(component.public).toBe(true);
    expect(component.display.label).toBe("Gorgias");
    expect(component.display.description).toContain("Gorgias");
    expect(component.display.iconPath).toBe("icon.png");
  });
});
