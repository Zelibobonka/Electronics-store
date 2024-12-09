import styled from "styled-components";
import MainNav from "./MainNav";

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
`;

const HeaderWrap = styled.div`
  display: flex;
  width: 100%;
  padding: 0.5rem;
  background-color: var(--color-grey-200);
  border-radius: 0.5rem;
`;

const Header = () => {
  return (
    <StyledHeader>
      <HeaderWrap>
        <MainNav />
      </HeaderWrap>
    </StyledHeader>
  );
};

export default Header;
