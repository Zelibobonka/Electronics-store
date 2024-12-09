import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useMoveBack } from "../../hooks/useMoveBack";
import { RootState } from "../../store";
import { deleteItem, toggleItemToWishlist } from "./productsSlice";
import { HiOutlineHeart, HiTrash } from "react-icons/hi";
import styled from "styled-components";

const StyledFullProduct = styled.div`
  display: grid;
  grid-template-columns: 500px 1fr;
  gap: 1rem 2rem;

  @media (max-width: 1023px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
`;

const ImgWrap = styled.div`
  position: relative;
  margin: 0 auto;
`;

const Img = styled.img`
  max-width: 500px;
`;

const ProductInfo = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  row-gap: 0.8rem;
`;

const P = styled.p`
  font-size: 0.9rem;
`;

const PriceWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem 0.7rem;
  align-items: flex-end;
`;

const Price = styled.p`
  font-size: 1rem;
`;

const Buttons = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const Button = styled.button`
  display: flex;
  gap: 0.5rem;
  align-items: center;

  &.active svg {
    color: var(--color-red-700);
    fill: var(--color-red-700);
  }
`;

function FullProduct() {
  const { productId } = useParams();
  const id = Number(productId);
  const dispatch = useAppDispatch();
  const moveBack = useMoveBack();
  const { items: products, wishlistItems } = useSelector(
    (state: RootState) => state.products
  );
  const product = products.find((item) => item.id === id);

  if (!product) return <p>Товар не найден</p>;

  const { image, title, description, brand, model, price } = product;
  const isWishlist = wishlistItems.some((item) => item.id === id);
  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(deleteItem(id));
    moveBack();
  };
  const handleToggleToWishlist = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(toggleItemToWishlist(product));
  };

  return (
    <StyledFullProduct>
      <ImgWrap>
        <Img src={image} alt={title} width="300" height="300" />
      </ImgWrap>
      <ProductInfo>
        <Buttons>
          <Button onClick={handleDelete}>
            <HiTrash /> удалить
          </Button>
          <Button
            className={`${isWishlist ? "active" : ""}`}
            onClick={handleToggleToWishlist}
          >
            <HiOutlineHeart /> в избранное
          </Button>
        </Buttons>
        <P>
          <b>Бренд:</b> {brand}
        </P>
        <P>
          <b>Модель:</b> {model}
        </P>
        <P>
          <b>Название:</b> {title}
        </P>
        <P>
          <b>Описание:</b> {description}
        </P>
        <PriceWrap>
          <Price>
            <b>Цена</b>: {price} $
          </Price>
        </PriceWrap>
      </ProductInfo>
    </StyledFullProduct>
  );
}

export default FullProduct;
