import { ShopReviewsApi } from "../api/shop-reviews.api";
import { ShopReviewModel } from "../models/shop-review.model";
import { ShopReviews } from "../interfaces/shop-reviews.interface";
import { ShopReview } from "../interfaces/shop-review.interface";

export class ShopReviewsService implements ShopReviews {
  constructor(private shopReviewsApi: ShopReviewsApi) {}

  getByID = async (shopId: string): Promise<ShopReview> => {
    const shopReviews = await this.shopReviewsApi.getByID(shopId);
    return new ShopReviewModel(shopReviews);
  };
}
