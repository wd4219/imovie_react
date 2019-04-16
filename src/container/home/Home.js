import React, {Component} from 'react';
import Header from '../../components/header/Header.js';
import Swiper from '../../components/swiper/Swiper.js';
import Slider from '../../components/slider/Slider.js';
import Marquee from '../../components/marquee/Marquee.js';
export default class Home extends Component{
  render() {
    return (
      <div>
        <Header>
        </Header>
        <Swiper percent={0.2} speed={200} duration={2000}>
          <img src="//gw.alicdn.com/tps/i4/TB1RA8bQmzqK1RjSZPxSuw4tVXa.jpg_790x10000Q75.jpg_.webp" />
          <img src="//gw.alicdn.com/imgextra/i1/191/O1CN01YVlYGl1DHWA3mKWQo_!!191-0-lubanu.jpg_790x10000Q75.jpg_.webp" />
          <img src="//gw.alicdn.com/imgextra/i1/191/O1CN01YVlYGl1DHWA3mKWQo_!!191-0-lubanu.jpg_790x10000Q75.jpg_.webp" />
          <img src="//gw.alicdn.com/tps/i4/TB1m1ahHAvoK1RjSZFNSuwxMVXa.jpg_790x10000Q75.jpg_.webp"/>
        </Swiper>
        <Slider titleBar={{title: '这是标题',left: (<span>全部</span>)}}>
          <div>
            <img src="//gw.alicdn.com/tps/i4/TB1RA8bQmzqK1RjSZPxSuw4tVXa.jpg_790x10000Q75.jpg_.webp" />
          </div>
          <div>
            <img src="//gw.alicdn.com/imgextra/i1/191/O1CN01YVlYGl1DHWA3mKWQo_!!191-0-lubanu.jpg_790x10000Q75.jpg_.webp" />
          </div>
          <div>
            <img src="//gw.alicdn.com/imgextra/i1/191/O1CN01YVlYGl1DHWA3mKWQo_!!191-0-lubanu.jpg_790x10000Q75.jpg_.webp" />
          </div>
          <div>
            <img src="//gw.alicdn.com/tps/i4/TB1m1ahHAvoK1RjSZFNSuwxMVXa.jpg_790x10000Q75.jpg_.webp"/>
          </div>
        </Slider>
        <div style={{height: '100px', width: '120px'}}>
          <Marquee type="vertical" speed={300} duration={2000}>
            <div>项目1</div>
            <div>项目2</div>
            {/* <div>项目3</div>
            <div>项目4</div> */}
          </Marquee>
        </div>
      </div>
    )
  }
}
