import {
  createVersionInputs as i,
  getVersionInputs,
  updateVersionInputs,
} from "./versions";

type Row = [string, { clean?: unknown }, unknown, unknown, unknown?];

const run = (rows: Row[]) =>
  test.each(rows)("%s", (_name, input, value, expected, ...empty) => {
    const clean = input.clean as (raw: unknown) => unknown;
    expect(clean(value)).toEqual(expected);
    if (empty.length > 0) expect(clean("")).toEqual(empty[0]);
  });

const { archived, released, startDate, releaseDate } = i.releaseDetails.inputs;

describe("version input cleans", () => {
  run([
    ["versionName", i.versionName, "v1.0", "v1.0", ""],
    ["archived", archived, "true", true, undefined],
    ["released", released, "true", true, undefined],
    ["startDate", startDate, "2026-01-01", "2026-01-01"],
    ["releaseDate", releaseDate, "2026-02-01", "2026-02-01"],
    ["versionId", getVersionInputs.versionId, 10000, "10000", ""],
  ]);

  test("an unset release flag is omitted rather than sent as false", () => {
    const clean = archived.clean as (raw: unknown) => unknown;
    expect(clean("false")).toBeUndefined();
    expect(clean(false)).toBeUndefined();
    expect(clean(undefined)).toBeUndefined();
  });

  test("the optional Version Name override on Update Version drops an empty value", () => {
    const clean = updateVersionInputs.versionName.clean as (
      raw: unknown,
    ) => unknown;
    expect(clean("")).toBeUndefined();
    expect(clean("v1.1")).toBe("v1.1");
  });
});
