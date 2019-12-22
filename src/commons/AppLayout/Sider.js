import React from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import { Icon } from "antd";
import Menus from "./menuConfig";

const StyledSider = styled.div`
  height: 100vh;
  box-shadow: 0px 0px 3px #adadad;
  z-index: 99;
`;

const Brand = styled.div`
  display: inline-block;
  text-align: center;
  height: 56px;
  width: 100%;
  padding: 16px;
  box-shadow: 0px 0px 1px #adadad;
  z-index: 100;
`;

const BrandText = styled.div`
  display: inline;
  ${props =>
    !!props.toggle &&
    css`
      display: none;
    `}
`;

const StyledLink = styled(Link)`
  display: flex;
  font-size: 14px;
  color: #666;
  min-width: ${props => (!!props.toggle ? "0px" : "200px")};
  padding: 8px ${props => (!!props.toggle ? "16px" : "24px")};
  transition: all 0.5s;
  border-right: 3px solid white;
  ${props =>
    !!props.active &&
    css`
      background-color: aliceblue;
      color: #1890ff;
      border-right: 3px solid blue;
    `}
`;

const MenuIcon = styled(Icon)`
  display: inline-block;
  margin-right: ${props => (!!props.toggle ? "0px" : "12px")};
  line-height: 32px !important;
`;

const MenuText = styled.span`
  display: ${props => (!!props.toggle ? "none" : "inline-block")};
  line-height: 32px;
  white-space: nowrap;
`;

const Menu = ({ text, path, active = "/", icon, toggle = false, onClick }) => {
  const isActive = active === text ? 1 : 0; // attribute give warning on boolean
  return (
    <StyledLink
      to={path}
      active={isActive}
      toggle={toggle}
      onClick={() => onClick(text)}
    >
      <MenuIcon toggle={toggle} type={icon} />
      <MenuText toggle={toggle}>{text}</MenuText>
    </StyledLink>
  );
};

const MenuList = ({ items, toggle, active, onClick }) =>
  items.map(item => (
    <Menu
      key={item.text}
      text={item.text}
      path={item.path}
      icon={item.icon}
      toggle={toggle}
      active={active}
      onClick={onClick}
    />
  ));

export default ({ activeMenu, setActiveMenu, toggleSiderStatus }) => {
  const isToggled = toggleSiderStatus ? 1 : 0; // attribute give warning on boolean
  return (
    <StyledSider>
      <Brand>
        <span>E</span>
        <BrandText toggle={isToggled}>DU-Malaysia</BrandText>
      </Brand>
      <br />
      <MenuList
        items={Menus}
        toggle={isToggled}
        active={activeMenu}
        onClick={setActiveMenu}
      />
    </StyledSider>
  );
};
