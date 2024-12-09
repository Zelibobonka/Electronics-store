import { Outlet } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import MainContainer from "./MainContainer";

const Layout = () => {
  return (
    <MainContainer>
      <Header />
      <Main>
        <Outlet />
      </Main>
    </MainContainer>
  );
};

export default Layout;
