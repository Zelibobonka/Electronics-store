import { useAppDispatch } from "../../hooks/useAppDispatch";
import { Link } from "react-router-dom";
import { deleteItem, Product, toggleItemToWishlist } from "./productsSlice";
import { HiOutlineHeart, HiTrash } from "react-icons/hi";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import styled from "styled-components";

const StyledProduct = styled.li`
  height: 100%;
  padding: 0.7rem;
  border: 1px solid var(--color-grey-200);
  border-radius: 0.5rem;
`;

const ProductLink = styled(Link)`
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
  height: 100%;
`;

const ImgWrap = styled.div`
  position: relative;
  display: block;
  height: 0;
  padding-bottom: 100%;
`;

const Img = styled.img`
  position: absolute;
  inset: 0;
  border-radius: var(--border-radius-md);
`;

const Title = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 0.9rem;
`;

const BottomWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding-top: 0.5rem;
  margin-top: auto;
`;

const Price = styled.p`
  font-size: 1rem;
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
`;

interface ProductProps {
  product: Product;
}

const Button = styled.button`
  & svg {
    width: 1.3rem;
    height: 1.3rem;
  }

  &.active svg {
    color: var(--color-red-700);
    fill: var(--color-red-700);
  }
`;

const ProductItem: React.FC<ProductProps> = ({ product }) => {
  const { id, title, image, price } = product;
  const dispatch = useAppDispatch();
  const { wishlistItems } = useSelector((state: RootState) => state.products);
  const isWishlist = wishlistItems.some((item) => item.id === id);
  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(deleteItem(id));
  };
  const handleToggleToWishlist = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(toggleItemToWishlist(product));
  };

  return (
    <StyledProduct>
      <ProductLink to={`/products/${id}`}>
        <ImgWrap>
          <Img src={image} alt={title} width="300" height="300" />
        </ImgWrap>
        <Title>{title}</Title>
        <BottomWrap>
          <Price>
            <b>{price} $</b>
          </Price>
          <Buttons>
            <Button onClick={handleDelete}>
              <HiTrash />
            </Button>
            <Button
              className={`${isWishlist ? "active" : ""}`}
              onClick={handleToggleToWishlist}
            >
              <HiOutlineHeart />
            </Button>
          </Buttons>
        </BottomWrap>
      </ProductLink>
    </StyledProduct>
  );
};

export default ProductItem;
