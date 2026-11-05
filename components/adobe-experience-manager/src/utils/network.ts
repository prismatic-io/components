import { lookup as dnsLookup, type LookupAddress, type LookupOptions } from "node:dns";
import { Agent as HttpsAgent } from "node:https";
import { BlockList, isIP, type LookupFunction } from "node:net";
import { util } from "@prismatic-io/spectral";

const blockedRanges = new BlockList();
for (const [network, prefix] of [
  ["0.0.0.0", 8],
  ["10.0.0.0", 8],
  ["100.64.0.0", 10],
  ["127.0.0.0", 8],
  ["169.254.0.0", 16],
  ["172.16.0.0", 12],
  ["192.0.0.0", 24],
  ["192.168.0.0", 16],
  ["198.18.0.0", 15],
  ["224.0.0.0", 4],
  ["240.0.0.0", 4],
] as const) {
  blockedRanges.addSubnet(network, prefix, "ipv4");
}
for (const [network, prefix] of [
  ["::", 128],
  ["::1", 128],
  ["fc00::", 7],
  ["fe80::", 10],
  ["ff00::", 8],
] as const) {
  blockedRanges.addSubnet(network, prefix, "ipv6");
}

export const assertPublicUrl = (url: string): void => {
  const parsed = new URL(url);
  if (parsed.protocol !== "https:") {
    throw new Error(`Only https:// URLs may be fetched. Received: ${url}`);
  }
  const host = parsed.hostname.replace(/^\[|\]$/g, "");
  if (isBlockedAddress(host)) {
    throw new Error(`Refusing to fetch a non-public address: ${parsed.hostname}`);
  }
};

const guardedLookup: LookupFunction = (
  hostname: string,
  options: LookupOptions,
  callback: Parameters<LookupFunction>[2],
): void => {
  dnsLookup(hostname, { ...options, all: true }, (error, addresses) => {
    if (error) return callback(error, "", 0);
    const resolved = addresses as LookupAddress[];
    const blocked = resolved.find((entry) => isBlockedAddress(entry.address));
    if (blocked || !resolved.length) {
      return callback(
        new Error(`Refusing to fetch ${hostname}: it resolves to a non-public address.`),
        "",
        0,
      );
    }
    if (options.all) {
      return (callback as unknown as (err: null, list: LookupAddress[]) => void)(null, resolved);
    }
    return callback(null, resolved[0].address, resolved[0].family);
  });
};

export const publicHttpsAgent = new HttpsAgent({ lookup: guardedLookup });

const toIpv6Groups = (address: string): number[] => {
  let text = address.toLowerCase();
  const dotted = text.match(/(\d+)\.(\d+)\.(\d+)\.(\d+)$/);
  const ipv4Groups: number[] = [];
  if (dotted) {
    const [a, b, c, d] = dotted.slice(1).map((part) => util.types.toInt(part));
    ipv4Groups.push((a << 8) | b, (c << 8) | d);
    text = `${text.slice(0, dotted.index)}0:0`;
  }
  const [head, tail] = text.includes("::") ? text.split("::") : [text, undefined];
  const headGroups = head ? head.split(":") : [];
  const tailGroups = tail ? tail.split(":") : [];
  const fill = tail === undefined ? [] : Array(8 - headGroups.length - tailGroups.length).fill("0");
  const groups = [...headGroups, ...fill, ...tailGroups].map((group) =>
    util.types.toNumber(`0x${group}`),
  );
  return ipv4Groups.length ? [...groups.slice(0, 6), ...ipv4Groups] : groups;
};

const embeddedIpv4 = (groups: number[]): string | undefined => {
  const toIpv4 = (high: number, low: number) =>
    [high >> 8, high & 0xff, low >> 8, low & 0xff].join(".");
  const zeros = (from: number, to: number) => groups.slice(from, to).every((group) => group === 0);
  if (groups[0] === 0x2002) return toIpv4(groups[1], groups[2]);
  if (groups[0] === 0x64 && groups[1] === 0xff9b && zeros(2, 6)) {
    return toIpv4(groups[6], groups[7]);
  }
  if (zeros(0, 5) && (groups[5] === 0 || groups[5] === 0xffff)) {
    return toIpv4(groups[6], groups[7]);
  }
  return undefined;
};

export function isBlockedAddress(address: string): boolean {
  const family = isIP(address);
  if (family === 4) return blockedRanges.check(address, "ipv4");
  if (family !== 6) return false;
  if (blockedRanges.check(address, "ipv6")) return true;
  const ipv4 = embeddedIpv4(toIpv6Groups(address));
  return ipv4 !== undefined && blockedRanges.check(ipv4, "ipv4");
}
