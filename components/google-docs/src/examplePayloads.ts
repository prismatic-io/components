





import { docs_v1 } from "@googleapis/docs";






export const createDocumentExamplePayload: { data: docs_v1.Schema$Document } = {
  data: {
    documentId: "1BxiMVs0XRA5nFMdKvBdBZjgmUii3a4kWcLm7pQ2yXGw",
    title: "Quarterly Report Q1 2026",
    body: {
      content: [
        {
          endIndex: 1,
          sectionBreak: {
            sectionStyle: {
              columnSeparatorStyle: "NONE",
              contentDirection: "LEFT_TO_RIGHT",
              sectionType: "CONTINUOUS",
            },
          },
        },
        {
          startIndex: 1,
          endIndex: 2,
          paragraph: {
            elements: [
              {
                startIndex: 1,
                endIndex: 2,
                textRun: {
                  content: "\n",
                  textStyle: {},
                },
              },
            ],
            paragraphStyle: {
              namedStyleType: "NORMAL_TEXT",
              direction: "LEFT_TO_RIGHT",
            },
          },
        },
      ],
    },
    headers: {},
    footers: {},
    footnotes: {},
    documentStyle: {
      background: {
        color: {},
      },
      pageNumberStart: 1,
      marginTop: {
        magnitude: 72,
        unit: "PT",
      },
      marginBottom: {
        magnitude: 72,
        unit: "PT",
      },
      marginRight: {
        magnitude: 72,
        unit: "PT",
      },
      marginLeft: {
        magnitude: 72,
        unit: "PT",
      },
      pageSize: {
        height: {
          magnitude: 792,
          unit: "PT",
        },
        width: {
          magnitude: 612,
          unit: "PT",
        },
      },
      defaultHeaderId: "",
      defaultFooterId: "",
      useFirstPageHeaderFooter: false,
      useEvenPageHeaderFooter: false,
    },
    namedStyles: {
      styles: [
        {
          namedStyleType: "NORMAL_TEXT",
          textStyle: {
            bold: false,
            italic: false,
            underline: false,
            strikethrough: false,
            fontSize: {
              magnitude: 11,
              unit: "PT",
            },
            foregroundColor: {
              color: {
                rgbColor: {},
              },
            },
            weightedFontFamily: {
              fontFamily: "Arial",
              weight: 400,
            },
            baselineOffset: "NONE",
            smallCaps: false,
          },
          paragraphStyle: {
            namedStyleType: "NORMAL_TEXT",
            lineSpacing: 115,
            direction: "LEFT_TO_RIGHT",
            spacingMode: "COLLAPSE_LISTS",
            avoidWidowAndOrphan: true,
          },
        },
        {
          namedStyleType: "HEADING_1",
          textStyle: {
            fontSize: {
              magnitude: 20,
              unit: "PT",
            },
          },
          paragraphStyle: {
            namedStyleType: "HEADING_1",
            direction: "LEFT_TO_RIGHT",
            spaceAbove: {
              magnitude: 20,
              unit: "PT",
            },
            spaceBelow: {
              magnitude: 6,
              unit: "PT",
            },
            keepLinesTogether: true,
            keepWithNext: true,
          },
        },
      ],
    },
    lists: {},
    namedRanges: {},
    revisionId: "ALm37BVPkZ-xGz7_rJidhKNVc9s4DqWGj-M",
    suggestionsViewMode: "DEFAULT_FOR_CURRENT_ACCESS",
    inlineObjects: {},
    positionedObjects: {},
  },
};






export const getDocumentExamplePayload: { data: docs_v1.Schema$Document } = {
  data: {
    documentId: "1BxiMVs0XRA5nFMdKvBdBZjgmUii3a4kWcLm7pQ2yXGw",
    title: "Quarterly Report Q1 2026",
    body: {
      content: [
        {
          endIndex: 1,
          sectionBreak: {
            sectionStyle: {
              columnSeparatorStyle: "NONE",
              contentDirection: "LEFT_TO_RIGHT",
              sectionType: "CONTINUOUS",
            },
          },
        },
        {
          startIndex: 1,
          endIndex: 27,
          paragraph: {
            elements: [
              {
                startIndex: 1,
                endIndex: 27,
                textRun: {
                  content: "Executive Summary Section\n",
                  textStyle: {
                    bold: true,
                    fontSize: {
                      magnitude: 20,
                      unit: "PT",
                    },
                  },
                },
              },
            ],
            paragraphStyle: {
              namedStyleType: "HEADING_1",
              direction: "LEFT_TO_RIGHT",
            },
          },
        },
        {
          startIndex: 27,
          endIndex: 112,
          paragraph: {
            elements: [
              {
                startIndex: 27,
                endIndex: 112,
                textRun: {
                  content:
                    "This document provides an overview of the quarterly results and key metrics.\n",
                  textStyle: {},
                },
              },
            ],
            paragraphStyle: {
              namedStyleType: "NORMAL_TEXT",
              direction: "LEFT_TO_RIGHT",
            },
          },
        },
      ],
    },
    headers: {},
    footers: {},
    footnotes: {},
    documentStyle: {
      background: {
        color: {},
      },
      pageNumberStart: 1,
      marginTop: {
        magnitude: 72,
        unit: "PT",
      },
      marginBottom: {
        magnitude: 72,
        unit: "PT",
      },
      marginRight: {
        magnitude: 72,
        unit: "PT",
      },
      marginLeft: {
        magnitude: 72,
        unit: "PT",
      },
      pageSize: {
        height: {
          magnitude: 792,
          unit: "PT",
        },
        width: {
          magnitude: 612,
          unit: "PT",
        },
      },
      defaultHeaderId: "",
      defaultFooterId: "",
      useFirstPageHeaderFooter: false,
      useEvenPageHeaderFooter: false,
    },
    namedStyles: {
      styles: [
        {
          namedStyleType: "NORMAL_TEXT",
          textStyle: {
            bold: false,
            italic: false,
            underline: false,
            strikethrough: false,
            fontSize: {
              magnitude: 11,
              unit: "PT",
            },
            foregroundColor: {
              color: {
                rgbColor: {},
              },
            },
            weightedFontFamily: {
              fontFamily: "Arial",
              weight: 400,
            },
            baselineOffset: "NONE",
            smallCaps: false,
          },
          paragraphStyle: {
            namedStyleType: "NORMAL_TEXT",
            lineSpacing: 115,
            direction: "LEFT_TO_RIGHT",
            spacingMode: "COLLAPSE_LISTS",
            avoidWidowAndOrphan: true,
          },
        },
      ],
    },
    lists: {},
    namedRanges: {},
    revisionId: "ALm37BVPkZ-xGz7_rJidhKNVc9s4DqWGj-M",
    suggestionsViewMode: "DEFAULT_FOR_CURRENT_ACCESS",
    inlineObjects: {},
    positionedObjects: {},
  },
};






export const batchUpdateDocumentsExamplePayload: {
  data: docs_v1.Schema$BatchUpdateDocumentResponse;
} = {
  data: {
    documentId: "1BxiMVs0XRA5nFMdKvBdBZjgmUii3a4kWcLm7pQ2yXGw",
    replies: [{}],
    writeControl: {
      requiredRevisionId: "ALm37BVPkZ-xGz7_rJidhKNVc9s4DqWGj-M",
    },
  },
};
