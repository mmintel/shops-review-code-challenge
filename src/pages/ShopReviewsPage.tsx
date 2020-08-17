import React from "react";
import { useParams } from "react-router-dom";
import ShopReviews from "../components/ShopReviews";

const ShopReviewsPage: React.FC = () => {
  const { id } = useParams();
  return <ShopReviews shopId={id} />;
};

export default ShopReviewsPage;
