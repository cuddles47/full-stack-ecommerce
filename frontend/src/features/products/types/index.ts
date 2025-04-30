export type TProductPath = {
  name: string;
  url: string;
};

export type TProductSpec = {
  name: string;
  value: string;
};

export type TProductSpecGroup = {
  groupName: string;
  specs: TProductSpec[];
};

export type TProductPageInfo = {
  id: string;
  name: string;
  price: number;
  salePrice: number | null;
  isAvailable: boolean;
  desc: string | null;
  path: TProductPath[];
  images: string[];
  specifications: TProductSpecGroup[];
  specialFeatures: string[];
};

export type TAddProductFormValues = {
  name: string;
  brandID: string;
  specialFeatures: string[];
  isAvailable: boolean;
  desc: string;
  price: string;
  salePrice: string;
  images: string[];
  categoryID: string;
  specifications: TProductSpecGroup[];
};

export type TProductListItem = {
  id: string;
  name: string;
  price: number;
  salePrice: number | null;
  isAvailable: boolean;
  specialFeatures: string[];
  images: string[];
};

export type TProductCard = {
  name: string;
  isAvailable?: boolean;
  specs: string[];
  price: number;
  dealPrice?: number;
  imgUrl: [string, string];
  url: string;
  staticWidth?: boolean;
};