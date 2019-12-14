import React from "react";
// import { Layout } from "antd";
import styled, { css } from "styled-components";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import { StoreProvider, createStore } from "easy-peasy";
import { Breadcrumb, Icon, Card } from "antd";
import Dashboard from "./pages/dashboard";
import Teachers from "./pages/teacher";
import Clc from "./pages/clc";

import "./App.css";

const WindowLayout = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  background-color: white;
`;

const ContentLayout = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const StyledHeader = styled.div`
  display: flex;
  width: 100%;
  height: 56px;
  background-color: white;
  padding: 16px;
  box-shadow: 0px 0px 3px #adadad;
  z-index: 99;
`;

const Header = () => (
  <StyledHeader>
    <Icon type="menu-fold" style={{ marginRight: 16 }} />
    <b>EDU MALAY</b>
  </StyledHeader>
);

const StyledSider = styled.div`
  width: 325px;
  height: 100%;
  box-shadow: 0px 0px 3px #adadad;
  z-index: 99;
`;

const SiderTitle = styled.div`
  text-align: center;
  height: 56px;
  padding: 16px;
  box-shadow: 0px 0px 1px #adadad;
  z-index: 100;
`;

const StyledSiderMenu = styled(Link)`
  display: block;
  width: 100%;
  padding: 16px 24px;
  font-size: 16px;
  color: #666;
  ${props =>
    props.active &&
    css`
      background-color: aliceblue;
      border-right: 3px solid blue;
    `}
`;

const Container = styled.div`
  padding: 24px;
  background-color: #eff1f4;
  height: 100%;
`;

const SiderMenu = ({ children, to, active }) => {
  return (
    <StyledSiderMenu to={to} active={active}>
      {/* <Tooltip placement="right" title={menu}> */}
      {children}
      {/* </Tooltip> */}
    </StyledSiderMenu>
  );
};

const Sider = ({ children }) => <StyledSider>{children}</StyledSider>;

function AppLayout({ children }) {
  return (
    <WindowLayout>
      <Sider>
        <SiderTitle>EDU-Malay</SiderTitle>
        <SiderMenu to="/">
          <Icon type="dashboard" style={{ marginRight: 8 }} />
          Home
        </SiderMenu>
        <SiderMenu to="/teachers" active={true}>
          <Icon type="user" style={{ marginRight: 8 }} />
          Teachers
        </SiderMenu>
        <SiderMenu to="/clc">
          <Icon type="bank" style={{ marginRight: 8 }} />
          CLC
        </SiderMenu>
      </Sider>
      <ContentLayout>
        <Header />
        <Container>
          <Breadcrumb style={{ marginBottom: 16 }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="">Teachers</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Data</Breadcrumb.Item>
          </Breadcrumb>
          <Card>{children}</Card>
          <br />
          <span style={{ float: "right" }}>
            website by ralalians - 2019
          </span>
        </Container>
      </ContentLayout>
    </WindowLayout>
  );
}

function AppRouter() {
  return (
    <BrowserRouter>
      <AppLayout>
        <React.Suspense fallback={<h1>loading</h1>}>
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/teachers" component={Teachers} />
            <Route path="/clc" component={Clc} />
          </Switch>
        </React.Suspense>
      </AppLayout>
    </BrowserRouter>
  );
}

function App() {
  return (
    // <StoreProvider store={store}>
    <AppRouter />
    // </StoreProvider>
  );
}

export default App;
