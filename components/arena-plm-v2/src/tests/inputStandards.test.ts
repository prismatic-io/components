import * as fs from "node:fs";
import * as path from "node:path";
const INPUTS_DIR = path.join(__dirname, "..", "inputs");
interface InputDefinition {
  file: string;
  name: string;
  line: number;
  type: string;
  hasClean: boolean;
  hasComments: boolean;
  hasPlaceholder: boolean;
  hasModel: boolean;
  body: string;
}
const parseInputs = (): InputDefinition[] => {
  const definitions: InputDefinition[] = [];
  for (const file of fs.readdirSync(INPUTS_DIR)) {
    if (!file.endsWith(".ts") || file === "index.ts") continue;
    const src = fs.readFileSync(path.join(INPUTS_DIR, file), "utf8");
    const re = /(?:export\s+)?const\s+(\w+)\s*=\s*input\(\{([\s\S]*?)\n\}\);/g;
    let match: RegExpExecArray | null = re.exec(src);
    while (match !== null) {
      const [, name, body] = match;
      definitions.push({
        file,
        name,
        line: src.slice(0, match.index).split("\n").length,
        type: /type:\s*"(\w+)"/.exec(body)?.[1] ?? "?",
        hasClean: /\n\s*clean:/.test(body),
        hasComments: /\n\s*comments:/.test(body),
        hasPlaceholder: /\n\s*placeholder:/.test(body),
        hasModel: /\n\s*model:\s*\[/.test(body),
        body,
      });
      match = re.exec(src);
    }
  }
  return definitions;
};
const definitions = parseInputs();
const describeInput = (d: InputDefinition) => `${d.file}:${d.line} ${d.name}`;
describe("input definitions", () => {
  it("parses the whole input surface", () => {
    expect(definitions.length).toBeGreaterThan(400);
  });
  it("every input has comments", () => {
    const offenders = definitions.filter((d) => !d.hasComments);
    expect(offenders.map(describeInput)).toEqual([]);
  });
  it("every input except connections has a clean", () => {
    const offenders = definitions.filter(
      (d) => d.type !== "connection" && !d.hasClean,
    );
    expect(offenders.map(describeInput)).toEqual([]);
  });
  it("every string, code and text input without a model has a placeholder", () => {
    const offenders = definitions.filter(
      (d) =>
        ["string", "code", "text"].includes(d.type) &&
        !d.hasModel &&
        !d.hasPlaceholder,
    );
    expect(offenders.map(describeInput)).toEqual([]);
  });
  it("every input whose format is not self-evident carries an example", () => {
    const formatBearing = definitions.filter((d) => {
      if (d.hasModel) return false;
      if (["connection", "boolean", "data"].includes(d.type)) return false;
      const label = /label:\s*"([^"]+)"/.exec(d.body)?.[1] ?? "";
      const isIdentifier = /\b(guid|id)\b/i.test(label);
      const isTimestamp = /date|time/i.test(label);
      const hasDefault = /\n\s*default:\s*"/.test(d.body);
      return isIdentifier || isTimestamp || hasDefault;
    });
    const offenders = formatBearing.filter(
      (d) => !/\n\s*example:/.test(d.body),
    );
    expect(formatBearing.length).toBeGreaterThan(100);
    expect(offenders.map(describeInput)).toEqual([]);
  });
  it("boolean comments state what being true means", () => {
    const offenders = definitions.filter(
      (d) =>
        d.type === "boolean" &&
        !/comments:\s*(?:\n\s*)?"When true,/.test(d.body),
    );
    expect(offenders.map(describeInput)).toEqual([]);
  });
  it("every GUID example uses Arena's actual GUID format", () => {
    const offenders = definitions.filter((d) => {
      const label = /label:\s*"([^"]+)"/.exec(d.body)?.[1] ?? "";
      if (!/\bguid\b/i.test(label)) return false;
      const example = /\n\s*example:\s*"([^"]*)"/.exec(d.body)?.[1];
      return example !== undefined && !/^[A-Z0-9]{24}$/.test(example);
    });
    expect(offenders.map(describeInput)).toEqual([]);
  });
  it("no input addresses the user in the second person", () => {
    const offenders = definitions.filter((d) => {
      const prose = [
        ...d.body.matchAll(
          /(?:comments|label):\s*(?:\n\s*)?"((?:[^"\\]|\\.)*)"/g,
        ),
      ].map((m) => m[1]);
      return prose.some((text) => /\b(you|your|yours)\b/i.test(text));
    });
    expect(offenders.map(describeInput)).toEqual([]);
  });
});
describe("input sets", () => {
  const sources = fs
    .readdirSync(INPUTS_DIR)
    .filter((f) => f.endsWith(".ts") && f !== "index.ts")
    .map((f) => ({
      file: f,
      src: fs.readFileSync(path.join(INPUTS_DIR, f), "utf8"),
    }));
  it("declares fetchAll above the pagination parameters it overrides", () => {
    const offenders: string[] = [];
    for (const { file, src } of sources) {
      const setRe = /export const (\w+Inputs) = \{([\s\S]*?)\n\};/g;
      let match: RegExpExecArray | null = setRe.exec(src);
      while (match !== null) {
        const [, setName, body] = match;
        const pagination = body.indexOf("\n  pagination");
        const fetchAll = body.indexOf("\n  fetchAll:");
        if (pagination !== -1 && fetchAll !== -1 && pagination < fetchAll) {
          offenders.push(`${file} ${setName}`);
        }
        match = setRe.exec(src);
      }
    }
    expect(offenders).toEqual([]);
  });
  it("restates clean on any override that promotes an input to required", () => {
    const optionalCleans = [
      "toOptionalString",
      "toOptionalNumber",
      "toOptionalObject",
      "toOptionalBoolean",
      "toKeyValueListArray",
    ];
    const baseClean = new Map(
      definitions.map((d) => [
        d.name,
        /clean:\s*([\w.]+)/.exec(d.body)?.[1] ?? "",
      ]),
    );
    const offenders: string[] = [];
    for (const { file, src } of sources) {
      const overrideRe = /(\w+):\s*\{\s*\.\.\.(\w+Input),([\s\S]*?)\n\s{2}\},/g;
      let match: RegExpExecArray | null = overrideRe.exec(src);
      while (match !== null) {
        const [, key, base, body] = match;
        const promotes = /required:\s*true/.test(body);
        const restatesClean = /clean:/.test(body);
        if (
          promotes &&
          !restatesClean &&
          optionalCleans.includes(baseClean.get(base) ?? "")
        ) {
          const line = src.slice(0, match.index).split("\n").length;
          offenders.push(`${file}:${line} ${key} (from ${base})`);
        }
        match = overrideRe.exec(src);
      }
    }
    expect(offenders).toEqual([]);
  });
});
