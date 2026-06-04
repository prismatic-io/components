import component from "./index";

describe("Component", () => {
  it("should be a valid component", () => {
    expect(component).toBeDefined();
    expect(component.key).toBe("gorgias");
    expect(component.public).toBe(true);
    expect(component.display.label).toBe("Gorgias");
    expect(component.display.description).toContain(
      "Gorgias is a customer support platform designed to help e-commerce businesses manage customer inquiries and support tickets efficiently.",
    );
    expect(component.display.iconPath).toBe("icon.png");
  });
});
