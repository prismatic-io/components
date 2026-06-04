import component from "./index";

describe("Component", () => {
  it("should be a valid component", () => {
    expect(component).toBeDefined();
    expect(component.key).toBe("frontify");
    expect(component.public).toBe(true);
    expect(component.display.label).toBe("Frontify");
    expect(component.display.description).toContain(
      "Frontify is a comprehensive brand management platform that enables organizations to create, manage, and distribute brand assets, guidelines, and digital content across teams and channels, streamlining brand consistency and collaboration.",
    );
    expect(component.display.iconPath).toBe("icon.png");
  });
});
