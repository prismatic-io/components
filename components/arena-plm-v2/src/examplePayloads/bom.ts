import type {
  BomSettingVo,
  BomSubstituteVo,
  BomSubstituteVoResultRep,
  ItemBomVo,
  ItemBomVoResultRep,
} from "../types";
const sampleBomItemShort = {
  guid: "2MM33NN44OO55PP66QQ77RR8",
  name: "Ceramic Capacitor 10uF",
  number: "PRT-002045",
  revisionNumber: "A",
  revisionStatus: "WORKING",
  url: {
    api: "https://api.arenasolutions.com/v1/items/2MM33NN44OO55PP66QQ77RR8",
    app: "https://app.bom.com/items/2MM33NN44OO55PP66QQ77RR8",
  },
};
const sampleSubstituteItemShort = {
  guid: "3NN44OO55PP66QQ77RR88SS9",
  name: "Ceramic Capacitor 10uF (Alt Vendor)",
  number: "PRT-002099",
  revisionNumber: "A",
  revisionStatus: "WORKING",
  url: {
    api: "https://api.arenasolutions.com/v1/items/3NN44OO55PP66QQ77RR88SS9",
    app: "https://app.bom.com/items/3NN44OO55PP66QQ77RR88SS9",
  },
};
const sampleBomSubstitute: BomSubstituteVo = {
  guid: "4SB55SB66SB77SB88SB99SB0",
  item: sampleSubstituteItemShort,
  notes: "Approved alternate for automotive-grade builds.",
  quantity: 2,
  rank: 1,
};
const sampleBomLine: ItemBomVo = {
  guid: "1BL22BL33BL44BL55BL66BL7",
  item: sampleBomItemShort,
  lineNumber: 10,
  notes: "Decoupling capacitor for the 3.3V rail.",
  quantity: 2,
  refDes: "C14, C15",
  additionalAttributes: [
    {
      guid: "5AA66AA77AA88AA99AA00AA1",
      name: "Placement",
      value: "Top",
      apiName: "placement",
      fieldType: "FIXED_DROP_DOWN",
      multiSelect: false,
    },
  ],
};
export const createBomLineExamplePayload: {
  data: ItemBomVo;
} = {
  data: sampleBomLine,
};
export const createBomSubstituteExamplePayload: {
  data: BomSubstituteVo;
} = {
  data: sampleBomSubstitute,
};
export const deleteBomLineExamplePayload = {
  data: { success: true, message: "BOM line deleted successfully" },
};
export const deleteBomSubstituteExamplePayload = {
  data: { success: true, message: "BOM substitute deleted successfully" },
};
export const listBomExamplePayload: {
  data: ItemBomVoResultRep;
} = {
  data: {
    results: [
      {
        guid: "1BL22BL33BL44BL55BL66BL7",
        item: sampleBomItemShort,
        lineNumber: 10,
        notes: "Decoupling capacitor for the 3.3V rail.",
        quantity: 2,
        refDes: "C14, C15",
        substitutes: [sampleBomSubstitute],
        additionalAttributes: [
          {
            guid: "5AA66AA77AA88AA99AA00AA1",
            name: "Placement",
            value: "Top",
            apiName: "placement",
            fieldType: "FIXED_DROP_DOWN",
            multiSelect: false,
          },
        ],
      },
      {
        guid: "2BL33BL44BL55BL66BL77BL8",
        item: {
          guid: "6PP77QQ88RR99SS00TT11UU2",
          name: "Resistor 4.7k Ohm",
          number: "PRT-002110",
          revisionNumber: "A",
          revisionStatus: "WORKING",
          url: {
            api: "https://api.arenasolutions.com/v1/items/6PP77QQ88RR99SS00TT11UU2",
            app: "https://app.bom.com/items/6PP77QQ88RR99SS00TT11UU2",
          },
        },
        lineNumber: 20,
        notes: "Pull-up resistor for the reset line.",
        quantity: 1,
        refDes: "R22",
        substitutes: [],
        additionalAttributes: [],
      },
    ],
    count: 2,
  },
};
export const getBomLineExamplePayload: {
  data: ItemBomVo;
} = {
  data: sampleBomLine,
};
export const getBomSettingsExamplePayload: {
  data: BomSettingVo;
} = {
  data: {
    automaticallyGenerateLineNumbers: true,
    checkReferenceDesignators: false,
  },
};
export const getBomSubstituteExamplePayload: {
  data: BomSubstituteVo;
} = {
  data: sampleBomSubstitute,
};
export const listBomSubstitutesExamplePayload: {
  data: BomSubstituteVoResultRep;
} = {
  data: {
    results: [
      sampleBomSubstitute,
      {
        guid: "7SB88SB99SB00SB11SB22SB3",
        item: {
          guid: "8QQ99RR00SS11TT22UU33VV4",
          name: "Ceramic Capacitor 10uF (Second Source)",
          number: "PRT-002120",
          revisionNumber: "A",
          revisionStatus: "WORKING",
          url: {
            api: "https://api.arenasolutions.com/v1/items/8QQ99RR00SS11TT22UU33VV4",
            app: "https://app.bom.com/items/8QQ99RR00SS11TT22UU33VV4",
          },
        },
        notes: "Secondary approved alternate.",
        quantity: 2,
        rank: 2,
      },
    ],
    count: 2,
  },
};
export const updateBomLineExamplePayload: {
  data: ItemBomVo;
} = {
  data: {
    ...sampleBomLine,
    quantity: 3,
    notes: "Decoupling capacitor for the 3.3V rail (quantity revised).",
  },
};
export const updateBomSettingsExamplePayload: {
  data: BomSettingVo;
} = {
  data: {
    automaticallyGenerateLineNumbers: false,
    checkReferenceDesignators: true,
  },
};
export const updateBomSubstituteExamplePayload: {
  data: BomSubstituteVo;
} = {
  data: {
    ...sampleBomSubstitute,
    rank: 2,
    notes: "Approved alternate; rank lowered after cost review.",
  },
};
