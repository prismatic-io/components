export const debugLogger = (params: Record<string, unknown>) => {
  if (params.debug) {
    const { ...rest } = params;
    console.log("Payload", {
      ...rest,
    });
  }
};
