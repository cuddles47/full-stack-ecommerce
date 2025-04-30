import { TDropDown } from "@/shared/types/ui";
import { TProductListItem } from "@/features/products/types";

export type TFilterBrands = {
  id: string;
  name: string;
  isSelected: boolean;
};

export type TFilters = {
  brands: TFilterBrands[];
  priceMinMax: [number, number];
  hasDiscount: boolean;
  inStock: boolean;
};

export type TListItem = TProductListItem;

export type TPageStatus = "pageLoading" | "filterLoading" | "filledProductList" | "filterHasNoProduct" | "categoryHasNoProduct";

export interface IStoreState {
  filters: TFilters;
  sortOption: number;
  productList: TListItem[];
  subCategories: any[];
  isLoading: boolean;
  error: string | null;
}