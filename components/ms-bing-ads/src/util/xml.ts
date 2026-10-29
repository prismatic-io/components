import type { Arg, Args } from "../types";

const isArgs = (arg: Arg) => typeof arg === "object";

export const objectToXML = (args: Args): string =>
  Object.entries(args).reduce((acc, [key, value]) => {
    return (
      acc +
      `<${key}>${
        Array.isArray(value)
          ? value.reduce(
              (acc, curr) =>
                isArgs(curr as Arg) ? acc + objectToXML(curr as Args) : acc,
              "",
            )
          : isArgs(value)
            ? objectToXML(value as Args)
            : value
      }</${key.split(" ")[0]}>`
    );
  }, "");
