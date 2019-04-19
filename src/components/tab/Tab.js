import React, { Component } from 'react'
import './Tab.css';
export default class Tab extends Component {

  constructor(props) {
    super(props);
    this.tabRef = React.createRef();
  }

  componentDidMount() {
    let transform = getComputedStyle(this.tabRef.current).getPropertyValue('transform');
    this.translateX = Number(transform.slice(7, transform.length - 1).split(', ')[4]);
  }


  _onTouchStart(e) {
    this.startX = e.touches[0].clientX;
    this.startY = e.touches[0].clientY;
    let transform = getComputedStyle(this.tabRef.current).getPropertyValue('transform');
    this.nowTranslateX = Number(transform.slice(7, transform.length - 1).split(', ')[4]);
    this.tabRef.current.style.transition = 'none';
    this.tabRef.current.style.transform = `translateX(${this.nowTranslateX}px)`;
  }

  _onTouchMove(e) {
    let moveX = e.touches[0].clientX;
    let moveY = e.touches[0].clientY;
    let distance = Math.abs(moveX - this.startX);
    let transform = getComputedStyle(this.tabRef.current).getPropertyValue('transform');
    let translateX = Number(transform.slice(7, transform.length - 1).split(', ')[4]);
    if(translateX > 0) {
      this.tabRef.current.style.transform = `translateX(0)`;
    } else if(translateX < - 1500) {
      this.tabRef.current.style.transform = `translateX(-1500px)`;
    } else {
      if(Math.abs(moveX - this.startX) > Math.abs(moveY - this.startY)) {
        if(moveX - this.startX > 0) { //判断滑动方向
          // 向右滑动
          this.tabRef.current.style.transform = `translateX(${this.nowTranslateX + distance}px)`;
        } else if(moveX - this.startX < 0){
          //向左滑动
          this.tabRef.current.style.transform = `translateX(${this.nowTranslateX - distance}px)`;
        }
      }
    } 
  }

  _onTouchEnd(e) {
    let transform = getComputedStyle(this.tabRef.current).getPropertyValue('transform');
    let translateX = Number(transform.slice(7, transform.length - 1).split(', ')[4]);
    let percent = Math.abs(translateX - this.translateX) / 375;
    if(percent > 0.5) {
      if(translateX > this.translateX) {   //判断切换方向
        console.log('向右切换');
        this.tabRef.current.style.transform = `translateX(${this.translateX + 375}px)`;
        this.tabRef.current.style.transition = `transform ${3000}ms`;
        this.direction = 'right';
      } else if(translateX < this.translateX){
        console.log('向左切换');
        this.tabRef.current.style.transform = `translateX(${this.translateX - 375}px)`;
        this.tabRef.current.style.transition = `transform ${3000}ms`;
        this.direction = 'left';
      }
    } else {
      this.tabRef.current.style.transform = `translateX(${this.translateX}px)`;
      this.tabRef.current.style.transition = `transform ${3000}ms`;
      this.direction = '';
    }
  }

  _onTransitionEnd(){
    this.tabRef.current.style.transition = 'none';
    let transform = getComputedStyle(this.tabRef.current).getPropertyValue('transform');
    this.translateX = Number(transform.slice(7, transform.length - 1).split(', ')[4]);
  }

  render() {
    return (
      <div>
        <div className="tab-nav">
          <div className="tab-nav-list">
            <div className="tab-nav-item active">
              tab1
            </div>
            <div className="tab-nav-item">
              tab2
            </div>
            <div className="tab-nav-item">
              tab3
            </div>
            <div className="tab-nav-item">
              tab4
            </div>
            <div className="tab-nav-item">
              tab5
            </div>
          </div>
        </div>
        <div className="tab-container"  onTouchStart={this._onTouchStart.bind(this)} onTouchMove={this._onTouchMove.bind(this)} onTouchEnd={this._onTouchEnd.bind(this)}>
          <div className="tab-container-list" ref={this.tabRef} onTransitionEnd={this._onTransitionEnd.bind(this)}>
            <div className="tab-container-item">
              这是内容1
            </div>
            <div className="tab-container-item">
              这是内容2
            </div>
            <div className="tab-container-item">
              这是内容3
            </div>
            <div className="tab-container-item">
              这是内容4
            </div>
            <div className="tab-container-item">
              这是内容5
            </div>
          </div>
        </div>
      </div>
    )
  }
}
