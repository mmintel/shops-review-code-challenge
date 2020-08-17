import React, { useState } from "react";
import { useShopReviews } from "../hooks/use-shop-reviews";
import Loading from "./Loading";
import Reviews, { Highlight } from "./Reviews";
import { ReviewsSortKey } from "../interfaces/shop-review.interface";

interface ShopReviewsListProps {
  shopId: string;
}

const ShopReviews: React.FC<ShopReviewsListProps> = ({ shopId }) => {
  const { data, isLoading } = useShopReviews(shopId);
  const [orderBy, setOrderBy] = useState<ReviewsSortKey>(
    ReviewsSortKey.CREATION_DATE
  );
  const [highlighted, setHighlighted] = useState<Highlight>(Highlight.EVEN);

  if (isLoading) {
    return <Loading data-testid="loading" />;
  }

  if (!data) {
    return <div data-testid="no-data">No data available.</div>;
  }

  const { name, getReviewsSortedBy } = data;
  const reviews = getReviewsSortedBy(orderBy);

  const handleOrderBy = (e: React.FormEvent<HTMLSelectElement>) => {
    setOrderBy(e.currentTarget.value as ReviewsSortKey);
  };

  const toggleHighlighted = () => {
    return setHighlighted(
      highlighted === Highlight.ODD ? Highlight.EVEN : Highlight.ODD
    );
  };

  return (
    <div style={{ margin: "1rem" }}>
      <h1>Reviews for {name}</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "1rem",
        }}
      >
        <button data-testid="highlight-toggle" onClick={toggleHighlighted}>
          Highlight: {highlighted}
        </button>
        <div>
          <label htmlFor="orderBy" style={{ marginRight: "0.5rem" }}>
            Order by
          </label>
          <select
            name="orderBy"
            id="orderBy"
            onChange={handleOrderBy}
            value={orderBy}
          >
            <option value="creationDate">Creation Date descending</option>
            <option value="mark">Mark descending</option>
            <option value="relevanceScore">relevance score descending</option>
          </select>
        </div>
      </div>
      <Reviews
        reviews={reviews}
        highlight={highlighted}
        data-testid={`highlighted:${highlighted}`}
      />
    </div>
  );
};

export default ShopReviews;
