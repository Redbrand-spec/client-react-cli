import React from 'react'
import { Menu } from 'antd'
import { NavLink, useLocation } from 'react-router-dom'

const Layout = (props) => {
  const Url = useLocation()
  return (
    <>
      <Menu
      selectedKeys={[Url.pathname]}
      mode="horizontal">
      <Menu.Item key="/">
        <NavLink to="/" >
          Курсы
        </NavLink>
      </Menu.Item>
      <Menu.Item key="/bascet">
        <NavLink to="/bascet">
          Корзина
        </NavLink>
      </Menu.Item>
      <Menu.Item key="/add">
        <NavLink to="/add">
          добавить товар
        </NavLink>
      </Menu.Item>
      </Menu>
        {props.children}
    </>
  )
}

export default Layout