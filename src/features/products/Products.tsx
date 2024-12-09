import { useSelector } from "react-redux";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useSearchParams } from "react-router-dom";
import { RootState } from "../../store";
import { useEffect } from "react";
import { fetchProducts } from "./productsSlice";
import { PAGE_SIZE } from "../../utils/constants";
import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import ProductItem from "./ProductItem";

const ProductList = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;

  @media (max-width: 1367px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 1100px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 920px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 479px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const Products = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const {
    items: products,
    status,
    wishlistItems,
  } = useSelector((state: RootState) => state.products);
  const productsShow = searchParams.get("products") || "all";
  const renderList = (list: string) => {
    if (list === "all") return products;
    if (list === "wishlist") return wishlistItems;
    return [];
  };
  const page = Number(searchParams.get("page")) || 1;
  const startIndex = (page - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const productsToDisplay = renderList(productsShow).slice(
    startIndex,
    endIndex
  );

  useEffect(() => {
    if (status === "idle" || status === "error") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  if (status === "loading") return <Spinner />;

  if (status === "error") return <p>❌Ошибка загрузки данных</p>;

  return (
    <ProductList>
      {productsToDisplay.length ? (
        productsToDisplay.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))
      ) : (
        <p>Нет товаров</p>
      )}
    </ProductList>
  );
};

export default Products;
