import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
  padding: 0.5rem;
`;

const NavList = styled.ul`
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
`;

const NavItem = styled.li`
  & a.active {
    text-decoration: underline;
  }
`;

const MainNav = () => {
  return (
    <Nav>
      <NavList>
        <NavItem>
          <NavLink to="/">Главная</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/products">Товары</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/create-product">Создать товар</NavLink>
        </NavItem>
      </NavList>
    </Nav>
  );
};

export default MainNav;
