import React from "react";
import { useShopSearch } from "../hooks/use-shop-search";
import Loading from "./Loading";
import { Link } from "react-router-dom";

interface SearchResultProps {
  term: string;
  page?: number;
}

const SearchResult: React.FC<SearchResultProps> = ({ term, page }) => {
  const { isLoading, data: shops } = useShopSearch(term, page);

  if (isLoading) {
    return <Loading />;
  }

  if (!shops) {
    return <div>No shops available.</div>;
  }

  return (
    <div>
      <h2>Search results</h2>
      {shops && (
        <ul>
          {shops.map((shop) => (
            <li key={shop.id}>
              <Link to={`/shop/${shop.id}/reviews`}>{shop.name}</Link>{" "}
              <strong>{shop.overallMark}</strong>
              {shop.reviews && (
                <ul>
                  {shop.reviews.map((review) => (
                    <li key={review.id}>
                      {review.comment} (Relevanz: {review.relevanceScore})
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchResult;
