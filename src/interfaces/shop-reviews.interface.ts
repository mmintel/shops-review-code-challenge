import { ShopReview } from "./shop-review.interface";

export interface ShopReviews {
  getByID: (shopId: string) => Promise<ShopReview>;
}
