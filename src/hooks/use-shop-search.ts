import { useQuery } from "react-query";
import { shopSearchService } from "../container";

export function useShopSearch(term: string, page: number = 0) {
  return useQuery(
    ["shopReviews", term, page],
    (_, term: string, page: number) => shopSearchService.search(term, page),
    {
      enabled: term,
    }
  );
}
