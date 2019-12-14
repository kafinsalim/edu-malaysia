import React from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import { StoreProvider, createStore } from "easy-peasy";
import { Breadcrumb, Card, Icon, Tooltip } from "antd";
import "./style.css";

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

const HeaderContainer = styled.div`
  display: flex;
  width: 100%;
  height: 56px;
  justify-content: space-between
  background-color: white;
  padding: 16px;
  box-shadow: 0px 0px 3px #adadad;
  z-index: 99;
`;

const Header = ({ onSiderToggleClick }) => (
  <HeaderContainer>
    <div>
      <a onClick={() => onSiderToggleClick()}>
        <Icon
          type="menu-fold"
          size="lg"
          style={{ marginRight: 16 }}
        />
      </a>
    </div>
    <b>EDU MALAYSIA</b>
    <div>
      <Icon type="bell" size="lg" style={{ padding: 8 }} />
      <Icon type="user" size="lg" style={{ padding: 8 }} />
      <Icon type="fullscreen" size="lg" style={{ padding: 8 }} />
    </div>
  </HeaderContainer>
);

const StyledSider = styled.div`
  height: 100%;
  box-shadow: 0px 0px 3px #adadad;
  z-index: 99;
`;

const Title = styled.div`
  text-align: center;
  height: 56px;
  padding: 16px;
  box-shadow: 0px 0px 1px #adadad;
  z-index: 100;
`;

const StyledLink = styled(Link)`
  display: block;
  padding: 16px 24px;
  font-size: 14px;
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

const Menu = ({
  text,
  to,
  active = false,
  icon,
  toggle = false,
  onClick
}) => {
  const MenuContent = () => (
    <div
      style={{
        display: "flex",
        minWidth: toggle ? 0 : 200,
        transition: 0.5
      }}
    >
      <Icon type={icon} style={{ marginRight: 8, marginTop: 4 }} />
      <span style={{ display: toggle ? "none" : "block" }}>
        {text}
      </span>
    </div>
  );
  return (
    <StyledLink
      to={to}
      active={active}
      toggle={false}
      onClick={() => onClick(text)}
    >
      {toggle ? (
        <Tooltip placement="right" title={text}>
          <MenuContent />
        </Tooltip>
      ) : (
        <MenuContent />
      )}
    </StyledLink>
  );
};

const Sider = ({ children }) => <StyledSider>{children}</StyledSider>;

export default function AppLayout({ children }) {
  const [activeMenu, setActiveMenu] = React.useState("Home");
  const [toggleSider, setToggleSider] = React.useState(false);
  console.log("render activeMenu", activeMenu);

  const handleSiderToggle = () => {
    setToggleSider(!toggleSider);
  };

  return (
    <WindowLayout>
      <Sider>
        <Title>
          <div style={{ display: "inline", whiteSpace: "nowrap" }}>
            <span style={{ display: "inline" }}>E</span>
            <span
              style={{
                display: toggleSider ? "none" : "inline"
              }}
            >
              DU-Malaysia
            </span>
          </div>
        </Title>
        <br />
        <Menu
          text="Home"
          to="/"
          toggle={toggleSider}
          icon="dashboard"
          active={activeMenu === "Home"}
          onClick={setActiveMenu}
        />
        <Menu
          text="Teacher"
          to="/teacher"
          toggle={toggleSider}
          icon="user"
          active={activeMenu === "Teacher"}
          onClick={setActiveMenu}
        />
        <Menu
          text="CLC"
          to="/clc"
          toggle={toggleSider}
          icon="bank"
          active={activeMenu === "CLC"}
          onClick={setActiveMenu}
        />
      </Sider>
      <ContentLayout>
        <Header onSiderToggleClick={handleSiderToggle} />
        <Container>
          <Breadcrumb style={{ marginBottom: 16 }}>
            <Breadcrumb.Item>
              <Icon type="home" />
            </Breadcrumb.Item>
            <Breadcrumb.Item>{activeMenu}</Breadcrumb.Item>
            <Breadcrumb.Item>Data</Breadcrumb.Item>
          </Breadcrumb>
          <Card style={{ minHeight: "70%" }}>{children}</Card>
          <br />
          <span style={{ float: "right" }}>Edu Malaysia - 2019</span>
        </Container>
      </ContentLayout>
    </WindowLayout>
  );
}
