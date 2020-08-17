import { ShopReviewsApi } from "../api/shop-reviews.api";
import { ShopReviewsService } from "./shop-reviews.service";
import { ShopReviewModel } from "../models/shop-review.model";

const mockReviewsApi: ShopReviewsApi = {
  getByID: jest.fn().mockResolvedValue({
    shop: {
      name: "foo",
      reviews: [],
    },
  }),
};

describe("ShopReviewsService", () => {
  it("initializes without crashing", () => {
    expect(() => new ShopReviewsService(mockReviewsApi));
  });

  describe("getByID", () => {
    it("calls the api wit the right URL", async () => {
      const shopReviewService = new ShopReviewsService(mockReviewsApi);
      expect(mockReviewsApi.getByID).not.toHaveBeenCalled();
      await shopReviewService.getByID("foo");
      expect(mockReviewsApi.getByID).toHaveBeenCalledTimes(1);
      expect(mockReviewsApi.getByID).toHaveBeenCalledWith("foo");
    });

    it("returns a ShopReview", async () => {
      const shopReviewService = new ShopReviewsService(mockReviewsApi);
      const shopReview = await shopReviewService.getByID("foo");
      expect(shopReview).toBeInstanceOf(ShopReviewModel);
    });
  });
});
