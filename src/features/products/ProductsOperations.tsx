import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

const StyledProductsOperations = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  &.active {
    text-decoration: underline;
  }
`;

interface Button {
  name: string;
  value: string;
  label: string;
}

const buttons: Button[] = [
  { name: "products", value: "all", label: "Все товары" },
  { name: "products", value: "wishlist", label: "В избранном" },
];

const ProductsOperations = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleSearchParams(name: string, value: string) {
    if (searchParams.get(name) === value) return;

    searchParams.set(name, value);
    searchParams.set("page", "1");
    setSearchParams(searchParams);
  }

  return (
    <StyledProductsOperations>
      {buttons.map((button, index) => {
        const isActive =
          searchParams.get(button.name) === button.value ||
          (!searchParams.get(button.name) && index === 0);

        return (
          <Button
            key={index}
            className={isActive ? "active" : ""}
            onClick={() => handleSearchParams(button.name, button.value)}
          >
            {button.label}
          </Button>
        );
      })}
    </StyledProductsOperations>
  );
};

export default ProductsOperations;
