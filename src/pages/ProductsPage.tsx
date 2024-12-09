import { useSelector } from "react-redux";
import { RootState } from "../store";
import Products from "../features/products/Products";
import ProductsOperations from "../features/products/ProductsOperations";
import Pagination from "../ui/Pagination";
import { useSearchParams } from "react-router-dom";

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const { items: products, wishlistItems } = useSelector(
    (state: RootState) => state.products
  );
  const productsShow = searchParams.get("products") || "all";
  const renderList = (list: string) => {
    if (list === "all") return products;
    if (list === "wishlist") return wishlistItems;
    return [];
  };

  return (
    <>
      <ProductsOperations />
      <Products />
      {renderList(productsShow).length > 0 && (
        <Pagination count={renderList(productsShow).length} />
      )}
    </>
  );
};

export default ProductsPage;
