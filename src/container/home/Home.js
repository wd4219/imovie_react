import React, {Component} from 'react';
import Header from '../../components/header/Header.js';
import Swiper from '../../components/swiper/Swiper.js';
export default class Home extends Component{
  render() {
    return (
      <div>
        <Header>
        </Header>
        <Swiper/>
      </div>
    )
  }
}
