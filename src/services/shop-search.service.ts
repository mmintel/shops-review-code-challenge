import { ShopSearchResultModel } from "../models/shop-search-result.model";
import { ShopSearchApi } from "../api/shop-search.api";
import { ShopSearchResult } from "../interfaces/shop-search-result.interface";
import { ShopReviews } from "../interfaces/shop-reviews.interface";

export class ShopSearchService {
  constructor(
    private shopSearchApi: ShopSearchApi,
    private shopReviews: ShopReviews
  ) {}

  search = async (
    term: string,
    page: number = 0
  ): Promise<ShopSearchResult[]> => {
    const searchTerm = encodeURI(term);
    const result = await this.shopSearchApi.search(searchTerm, page);

    return Promise.all(
      result.shops.map(async (shop) => {
        const shopReviews = await this.getShopReviews(shop.tsId);
        const relevantReviews = await shopReviews.getRelevantReviews();
        return new ShopSearchResultModel(shop, relevantReviews);
      })
    );
  };

  getShopReviews = async (shopId: string) => {
    return this.shopReviews.getByID(shopId);
  };
}
