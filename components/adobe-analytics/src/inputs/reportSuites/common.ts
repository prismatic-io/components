import { input, util } from "@prismatic-io/spectral";

export const dimensionInput = input({
  label: "Dimension",
  type: "string",
  required: true,
  comments:
    "The analytics dimension to break down the report by. Use the format variables/dimensionname.",
  placeholder: "Enter dimension",
  example: "variables/daterangeday",
  clean: util.types.toString,
});

export const reportRequestBodyInput = input({
  label: "Report Request Body",
  type: "code",
  required: true,
  comments:
    "The JSON request body for the report. Specify all fields besides dimension and report suite ID here, including filters, metrics, and settings.",
  placeholder: "Enter report request body",
  language: "json",
  clean: util.types.toObject,
  default: JSON.stringify(
    {
      globalFilters: [
        {
          type: "dateRange",
          dateRange: "YYYY-12-31T00:00:00.000/YYYY-01-31T23:59:59.999",
        },
      ],
      metricContainer: {
        metrics: [
          {
            columnId: "0",
            id: "metrics/pageviews",
            filters: ["0"],
          },
        ],
        metricFilters: [
          {
            id: "0",
            type: "dateRange",
            dateRange: "YYYY-12-31T00:00:00.000/YYYY-01-31T23:59:59.999",
          },
        ],
      },
      settings: {
        dimensionSort: "asc",
        limit: "10",
        page: "2",
      },
    },
    null,
    2,
  ),
});
