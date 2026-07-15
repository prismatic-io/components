export function getBase64FromUrl(url: string): string {
  const lastPathSegmentMatch = url.match(/\/([^/]+)$/);
  return lastPathSegmentMatch ? lastPathSegmentMatch[1] : "";
}
