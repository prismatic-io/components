import { build } from "./actions/build";
import { parseBuffer } from "./actions/parseBuffer";
import { invoke } from "@prismatic-io/spectral/dist/testing";

const sheetData = [
  [0, "First Name", "Last Name", "Gender", "Country", "Age", "Date", "Id"],
  [1, "Dulce", "Abril", "Female", "United States", 32, "15/10/2017", 1562],
  [2, "Mara", "Hashimoto", "Female", "Great Britain", 25, "16/08/2016", 1582],
  [3, "Philip", "Gent", "Male", "France", 36, "21/05/2015", 2587],
  [4, "Kathleen", "Hanner", "Female", "United States", 25, "15/10/2017", 3549],
  [5, "Nereida", "Magwood", "Female", "United States", 58, "16/08/2016", 2468],
  [6, "Gaston", "Brumm", "Male", "United States", 24, "21/05/2015", 2554],
  [7, "Etta", "Hurn", "Female", "Great Britain", 56, "15/10/2017", 3598],
  [8, "Earlean", "Melgar", "Female", "United States", 27, "16/08/2016", 2456],
  [9, "Vincenza", "Weiland", "Female", "United States", 40, "21/05/2015", 6548],
];

describe("test build", () => {
  test("Ensure the component correctly builds excel files", async () => {
    const { result } = await invoke(build, {
      createOptions: undefined,
      fileName: "",
      sheetData: sheetData,
    });

    expect(result.data);
  });
});

describe("test parse", () => {
  test("Ensure the component correctly serializes excel files", async () => {
    const { result } = await invoke(build, {
      createOptions: undefined,
      fileName: "",
      sheetData: sheetData,
    });
    const data = Buffer.from(result.data);
    const endResult = await invoke(parseBuffer, {
      file: {
        data,
        contentType: "application/octet-stream",
      },
    });

    expect(endResult.result.data[0].data).toStrictEqual(sheetData);
  });
});
