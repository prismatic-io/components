import { input, util } from "@prismatic-io/spectral";
import { locationId, squareConnection } from "./common";

const locationUpdate = input({
  label: "Location Update",
  type: "code",
  language: "json",
  default: JSON.stringify(
    {
      id: "LH2G9VFHJRWKR",
      name: "Downtown Store",
      address: {
        address_line_1: "1234 Main Street",
        locality: "San Francisco",
        administrative_district_level_1: "CA",
        postal_code: "94102",
      },
      timezone: "America/Los_Angeles",
      status: "ACTIVE",
      country: "US",
      language_code: "en-US",
      currency: "USD",
      type: "PHYSICAL",
      description: "Main downtown retail location",
      coordinates: {
        latitude: 37.7749,
        longitude: -122.4194,
      },
      business_hours: {
        periods: [
          {
            day_of_week: "MON",
            start_local_time: "09:00",
            end_local_time: "18:00",
          },
          {
            day_of_week: "TUE",
            start_local_time: "09:00",
            end_local_time: "18:00",
          },
        ],
      },
      business_name: "Example Business",
      mcc: "5999",
    },
    null,
    2,
  ),
  required: true,
  comments:
    "The location data to update in JSON format. See [Square Location Object](https://developer.squareup.com/reference/square/objects/Location) for field details.",
  clean: (locationUpdateInput) => {
    if (!util.types.isJSON(util.types.toString(locationUpdateInput))) {
      throw new Error("Invalid JSON provided for Location Update.");
    }
    return JSON.parse(util.types.toString(locationUpdateInput));
  },
});

export const listLocationsInputs = {
  squareConnection,
};

export const retrieveLocationInputs = {
  squareConnection,
  locationId,
};

export const updateLocationInputs = {
  squareConnection,
  locationId,
  locationUpdate,
};
