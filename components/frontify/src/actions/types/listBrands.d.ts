import type { CustomMetadataProperty } from "./shared";

export default interface ListBrandsResponse {
  brands: {
    id: string;
    name: string;
    rgbaColor: {
      red: number;
      green: number;
      blue: number;
      alpha: number;
    };
    avatar: string;
    slug: string;
    customMetadataProperties: CustomMetadataProperty[];
  }[];
}
