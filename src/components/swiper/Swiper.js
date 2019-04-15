import React, {Component} from 'react';
import './Swiper.css';
export default class Swiper extends Component{
  constructor(props) {
    super(props);
    this.sliderRef = React.createRef();
    this.option = {
      index: 1,
      speed: 2000
    };
    this.translateX = null;
    this.direction =  'left';
  }

  _changePosition(direction) {
    let leftArr= Array.from(this.sliderRef.current.children).map((elem)=>{
      return Number(getComputedStyle(elem).getPropertyValue('left').slice(0,-2));
    });
    let minLeftIndex = leftArr.indexOf(Math.min(...leftArr));
    let maxLeftIndex = leftArr.indexOf(Math.max(...leftArr));
    console.log(leftArr);
    console.log(minLeftIndex,maxLeftIndex);
    if(direction === 'right') {
      this.sliderRef.current.children[maxLeftIndex].style.left = leftArr[minLeftIndex] - 375 + 'px';
    } else {
      this.sliderRef.current.children[minLeftIndex].style.left = leftArr[maxLeftIndex] + 375 + 'px';
    }
  }

  _touchStart(e) {
    this.startX = e.touches[0].clientX;
    this.startY = e.touches[0].clientY;
    if(!this.translateX) {
      let transform = getComputedStyle(this.sliderRef.current).getPropertyValue('transform');
      this.translateX = Number(transform.slice(7, transform.length - 1).split(', ')[4]);
    }
    let transform = getComputedStyle(this.sliderRef.current).getPropertyValue('transform');
    this.nowTranslateX = Number(transform.slice(7, transform.length - 1).split(', ')[4]);
    this.sliderRef.current.style.transform = `translateX(${this.nowTranslateX}px)`;
    this.sliderRef.current.style.transition = 'none';
  }

  _touchMove(e){
    let moveX = e.touches[0].clientX;
    let moveY = e.touches[0].clientY;
    let distance = Math.abs(moveX - this.startX);
    if(distance > Math.abs(moveY - this.startY)) {
      if(moveX - this.startX > 0) {
        this.sliderRef.current.style.transform = `translateX(${this.nowTranslateX + distance}px)`;
      } else {
        this.sliderRef.current.style.transform = `translateX(${this.nowTranslateX - distance}px)`;
      }
    }
  }

  _touchEnd(e) {
    let transform = getComputedStyle(this.sliderRef.current).getPropertyValue('transform');
    let translateX = Number(transform.slice(7, transform.length - 1).split(', ')[4]);
    let percent = ((Math.abs(translateX) > 375 ? Math.abs(translateX) : (375 - Math.abs(translateX)))  % 375) / 375;
    console.log(translateX, this.translateX);
    console.log(percent);
    if(percent > 0.3) {
      if(translateX > this.translateX) {
        console.log('向右切换');
        this.sliderRef.current.style.transform = `translateX(${this.translateX + 375}px)`;
        this.sliderRef.current.style.transition = `transform ${this.option.speed}ms`;
        this.direction = 'right';
      } else {
        console.log('向左切换');
        this.sliderRef.current.style.transform = `translateX(${this.translateX - 375}px)`;
        this.sliderRef.current.style.transition = `transform ${this.option.speed}ms`;
        this.direction = 'left';
      }
    } else {
      this.sliderRef.current.style.transform = `translateX(${this.translateX}px)`;
      this.sliderRef.current.style.transition = `transform ${this.option.speed}ms`;
    }
    
  }

  _onTransitionEnd() {
    console.log('执行了transitionend');
    this.sliderRef.current.style.transition = 'none';
    this.translateX = null;
    this._changePosition(this.direction);
  }

  render() {
    return (
      <div className="swiper-container" onTouchStart={this._touchStart.bind(this)} onTouchMove={this._touchMove.bind(this)} onTouchEnd={this._touchEnd.bind(this)}>
        <div className="swiper-list-content" ref={this.sliderRef} onTransitionEnd={this._onTransitionEnd.bind(this)}>
          <img src="//gw.alicdn.com/tps/i4/TB1RA8bQmzqK1RjSZPxSuw4tVXa.jpg_790x10000Q75.jpg_.webp" style={{left: '375px'}} />
          <img src="//gw.alicdn.com/imgextra/i1/191/O1CN01YVlYGl1DHWA3mKWQo_!!191-0-lubanu.jpg_790x10000Q75.jpg_.webp" style={{left: '750px'}} />
          <img src="//gw.alicdn.com/imgextra/i4/18/O1CN01A1T6PW1C0He1GT3Qr_!!18-0-lubanu.jpg_790x10000Q75.jpg_.webp" style={{left: '1125px'}} />
          <img src="//gw.alicdn.com/tps/i4/TB1m1ahHAvoK1RjSZFNSuwxMVXa.jpg_790x10000Q75.jpg_.webp" style={{left: '0'}}/>
        </div>
        <div className="dots">
          <div className="dot active"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      </div>
    )
  }
}