import { ApiClient } from "./client";

export interface ShopSearchResponse {
  shops: ShopSearchResultData[];
  _metadata: {
    count: number;
    limit: number;
    totalCount: number;
    pageCount: number;
  };
}

export interface ShopSearchResultData {
  tsId: string;
  name: string;
  qualityIndicator: {
    reviewIndicator: {
      overallMark: string;
    };
  };
}

export interface ShopSearchApi {
  search(term: string, page: number): Promise<ShopSearchResponse>;
}

export class ShopSearchApiClient implements ShopSearchApi {
  constructor(private client: ApiClient, private baseURL: string) {}

  search = async (
    term: string,
    page: number = 0
  ): Promise<ShopSearchResponse> => {
    const response = await this.client.get<ShopSearchResponse>(
      `${this.baseURL}/shop-search/shops?searchTerm=${term}&page=${page}`
    );
    return response.data;
  };
}
