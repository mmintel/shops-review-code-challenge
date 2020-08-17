import { ApiClient } from "../api/client";

export interface ShopReviewResponse {
  response: {
    data: {
      shop: ShopReviewData;
    };
  };
}

export interface ShopReviewData {
  name: string;
  reviews: ReviewData[];
}

export interface ReviewData {
  UID: string;
  creationDate: string;
  comment: string;
  mark: string;
  reviewer?: {
    profile: UserProfile;
  };
}

export interface UserProfile {
  firstname?: string;
  lastname?: string;
}

export interface ShopReviewsApi {
  getByID(shopId: string): Promise<ShopReviewData>;
}

export class ShopReviewsApiClient implements ShopReviewsApi {
  constructor(private client: ApiClient, private baseURL: string) {}

  getByID = async (shopId: string): Promise<ShopReviewData> => {
    const response = await this.client.get<ShopReviewResponse>(
      `${this.baseURL}/shops/${shopId}/reviews.json`
    );
    return response.data.response.data.shop;
  };
}
