export const requireAnyUpdate = <T extends Record<string, unknown>>(
  body: T,
  resource: string,
): T => {
  if (Object.values(body).every((value) => value === undefined)) {
    throw new Error(
      `Provide at least one field to update on the ${resource}. Every update input is empty.`,
    );
  }
  return body;
};

export const requireRelativePath = (url: string): string => {
  const trimmed = url.trim();
  if (/^[a-z][a-z0-9+.-]*:/i.test(trimmed) || /^[/\\]{2}/.test(trimmed)) {
    throw new Error(
      `URL must be a path relative to the GitLab API, such as /projects/278964/issues. Full URLs are not accepted because the connection's GitLab URL is always used. Received: ${trimmed}`,
    );
  }
  return url;
};
