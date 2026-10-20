import component from ".";
describe("pagerduty", () => {
  it("should be a valid component", () => {
    expect(component).toBeDefined();
    expect(component.key).toBe("pagerduty");
    expect(component.public).toBe(true);
    expect(component.display.label).toBe("PagerDuty");
    expect(component.display.description).toContain("PagerDuty REST API V2");
  });
});
