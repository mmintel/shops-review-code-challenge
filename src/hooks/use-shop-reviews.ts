import { useQuery } from "react-query";
import { shopReviewsService } from "../container";

export function useShopReviews(shopId: string) {
  return useQuery(
    ["shopReviews", shopId],
    (_, shopId: string) => shopReviewsService.getByID(shopId),
    {
      enabled: shopId,
    }
  );
}
