import { Review } from "./review.interface";

export interface ShopSearchResult {
  id: string;
  name: string;
  overallMark: string;
  reviews: Review[];
}
