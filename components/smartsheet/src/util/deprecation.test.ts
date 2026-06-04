import type { ActionContext } from "@prismatic-io/spectral";
import { warnDeprecatedInputs } from "./deprecation";

const makeContext = (): { context: ActionContext; warnSpy: jest.Mock } => {
  const warnSpy = jest.fn();
  const context = {
    logger: {
      warn: warnSpy,
      info: jest.fn(),
      error: jest.fn(),
      debug: jest.fn(),
    },
  } as unknown as ActionContext;
  return { context, warnSpy };
};

describe("warnDeprecatedInputs", () => {
  it("emits logger.warn exactly once when includeAll is true", () => {
    const { context, warnSpy } = makeContext();
    warnDeprecatedInputs(context, "listWorkspaces", true);
    expect(warnSpy).toHaveBeenCalledTimes(1);
    expect(warnSpy.mock.calls[0][0]).toContain("listWorkspaces");
    expect(warnSpy.mock.calls[0][0]).toContain("DEPRECATED");
    expect(warnSpy.mock.calls[0][0]).toContain("2026-06-03");
  });

  it("does not emit logger.warn when includeAll is false", () => {
    const { context, warnSpy } = makeContext();
    warnDeprecatedInputs(context, "listWorkspaces", false);
    expect(warnSpy).not.toHaveBeenCalled();
  });

  it("does not emit logger.warn when includeAll is undefined", () => {
    const { context, warnSpy } = makeContext();
    warnDeprecatedInputs(context, "listWorkspaces", undefined);
    expect(warnSpy).not.toHaveBeenCalled();
  });

  it("emits warn with the correct action name in the message", () => {
    const { context, warnSpy } = makeContext();
    warnDeprecatedInputs(context, "templatesList", true);
    expect(warnSpy.mock.calls[0][0]).toContain("templatesList");
  });
});
