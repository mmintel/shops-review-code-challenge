import axios from "axios";

import { ShopReviewsService } from "./services/shop-reviews.service";
import { ShopSearchService } from "./services/shop-search.service";
import { ShopSearchApiClient } from "./api/shop-search.api";
import { ShopReviewsApiClient } from "./api/shop-reviews.api";
import { ShopReviews } from "./interfaces/shop-reviews.interface";
import { ShopSearch } from "./interfaces/shop-search.interface";

const shopSearchApi = new ShopSearchApiClient(
  axios,
  "https://www.trustedshops.de/wp-json/ts-wp-api/v1"
);

const shopReviewsApi = new ShopReviewsApiClient(
  axios,
  "https://api.trustedshops.com/rest/internal/v2"
);

export const shopReviewsService: ShopReviews = new ShopReviewsService(
  shopReviewsApi
);
export const shopSearchService: ShopSearch = new ShopSearchService(
  shopSearchApi,
  shopReviewsService
);
