import { ShopSearchResult } from "./shop-search-result.interface";

export interface ShopSearch {
  search: (term: string, page: number) => Promise<ShopSearchResult[]>;
}
