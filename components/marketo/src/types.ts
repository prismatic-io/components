import type { Element } from "@prismatic-io/spectral/dist/types";

export type ElementWithLabel = Omit<Element, "label"> & { label: string };
