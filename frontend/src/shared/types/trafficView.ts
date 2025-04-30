export interface TTrafficListItem {
  id: string;
  time: string;
  pageType: string;
  pagePath: string;
  deviceResolution: string;
  product?: {
    category: { name: string };
    name: string;
  };
}