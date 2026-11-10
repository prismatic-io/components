import type { Element } from "@prismatic-io/spectral";

export type ElementWithLabel = Omit<Element, "label"> & { label: string };
