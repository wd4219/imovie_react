import React, {Component} from 'react';
// import Swiper from '../../components/swiper/Swiper.js';
import Tab from '../../components/tab/Tab';
import './Home.css';

export default class Home extends Component{
  render() {

    let swiperOption = {
      // percent: 0.2, //判断切换的节点
      // speed: 2000, //切换速度
      // duration: 3000, //切换频率
      // padding: 10, //轮播项的左padding
      // itemWidth: 260, //项的宽度包含padding
      // autoPlay: true, //是否自动播放
    }

    return (
      <div>
        {/* <header className="header">
          <div className="header__logo">imove</div>
          <div className="header__search"></div>
        </header> */}
        {/* <div style={{height: '142px'}}>
          <Swiper {...swiperOption}>
            <img src="//gw.alicdn.com/imgextra/i4/93/O1CN01c7uwIp1CYdLoRQ5v6_!!93-0-lubanu.jpg_790x10000Q75.jpg_.webp"/>
            <img src="//gw.alicdn.com/imgextra/i1/191/O1CN01YVlYGl1DHWA3mKWQo_!!191-0-lubanu.jpg_790x10000Q75.jpg_.webp"/>
            <img src="//gw.alicdn.com/tps/i4/TB1pdcKOzTpK1RjSZKPSuu3UpXa.jpg_790x10000Q75.jpg_.webp" />
            <img src="//gw.alicdn.com/tps/i4/TB1m1ahHAvoK1RjSZFNSuwxMVXa.jpg_790x10000Q75.jpg_.webp"/>
          </Swiper>
        </div> */}

        <Tab></Tab>
      </div>
    )
  }
}
