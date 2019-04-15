import React from 'react';
import './Footer.css';
import { BrowserRouter as Router,NavLink } from 'react-router-dom';
function Footer() {
  let listItem = [{
    icon: require('./homepage.png'),
    selectedIcon: './homepage.png',
    text: '首页',
    url: '/'
  },{
    icon: require('./homepage.png'),
    selectedIcon: './homepage.png',
    text: '电影',
    url: '/movie'
  },{
    icon: require('./homepage.png'),
    selectedIcon: './homepage.png',
    text: '电视',
    url: '/tv'
  },{
    icon: require('./homepage.png'),
    selectedIcon: './homepage.png',
    text: '我的',
    url: '/my'
  }];
  return (
    <footer>
        <ul className="footer-list">
          {
            listItem.map((item,index)=>{
              return (
                <li key={index} className="footer-list-item">
                  <NavLink to={item.url} activeClassName="active" exact>
                    <img src={item.icon} alt={item.text}/>
                    <div>{item.text}</div>
                  </NavLink>
                </li>
              )
            })
          }
        </ul>
    </footer>
  )
}

export default Footer;