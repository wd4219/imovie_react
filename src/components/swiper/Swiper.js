import React, {Component} from 'react';
import './Swiper.css';
export default class Swiper extends Component{
  constructor(props) {
    super(props);
    this.sliderRef = React.createRef();
    this.state = {
      index: 1,
    }
    this.translateX = null;
    this.direction =  '';
  }
  componentWillMount() {
    this.screenWidth = window.screen.width;
  }

  componentDidMount() {
    this._autoSlide();
  }

  componentWillUnmount() {
    this._stopTimeOut();
  }

  _stopTimeOut() {
    this.timer && clearTimeout(this.timer);
    this.timer = null;
  }

  _changePosition(direction) {
    let length = this.props.children.length;
    let leftArr= Array.from(this.sliderRef.current.children).map((elem)=>{
      return Number(getComputedStyle(elem).getPropertyValue('left').slice(0,-2));
    });
    let minLeftIndex = leftArr.indexOf(Math.min(...leftArr));
    let maxLeftIndex = leftArr.indexOf(Math.max(...leftArr));
    console.log(leftArr);
    console.log(minLeftIndex,maxLeftIndex);
    if(direction === 'right') {
      this.sliderRef.current.children[maxLeftIndex].style.left = leftArr[minLeftIndex] - this.screenWidth + 'px';
      if(this.state.index === 1) {
        this.setState({index: length});
      } else {
        this.setState((prevState)=>{
          return {
            index: prevState.index - 1
          };
        });
      }
    } else if(direction === 'left') {
      this.sliderRef.current.children[minLeftIndex].style.left = leftArr[maxLeftIndex] + this.screenWidth + 'px';
      if(this.state.index === length) {
        this.setState({index: 1});
      } else {
        this.setState((prevState)=>{
          return {
            index: prevState.index + 1
          };
        })
      }
    }
    console.log('现在是第' + this.state.index + '个');
  }

  _touchStart(e) {
    this._stopTimeOut();
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
      if(moveX - this.startX > 0) { //判断滑动方向
        // 向右滑动
        this.sliderRef.current.style.transform = `translateX(${this.nowTranslateX + distance}px)`;
      } else {
        //向左滑动
        this.sliderRef.current.style.transform = `translateX(${this.nowTranslateX - distance}px)`;
      }
    }
  }

  _touchEnd() {
    let transform = getComputedStyle(this.sliderRef.current).getPropertyValue('transform');
    let translateX = Number(transform.slice(7, transform.length - 1).split(', ')[4]);
    let percent = (Math.abs(translateX) % this.screenWidth ) / this.screenWidth;
    if(translateX > this.translateX) {   //判断切换方向
      console.log('向右切换');
      if(this.translateX === 0) {
        percent = (this.screenWidth - Math.abs(translateX)) / this.screenWidth
      } else {
        percent = (Math.abs(translateX) % this.screenWidth ) / this.screenWidth;
      }
      if(percent < (1 - this.props.percent)) {
        this.sliderRef.current.style.transform = `translateX(${this.translateX + this.screenWidth}px)`;
        this.sliderRef.current.style.transition = `transform ${this.props.speed}ms`;
        this.direction = 'right';
      } else {
        this.sliderRef.current.style.transform = `translateX(${this.translateX}px)`;
        this.sliderRef.current.style.transition = `transform ${this.props.speed}ms`;
        this.direction = '';
      }
    } else if(translateX < this.translateX){
      console.log('向左切换');
      if(percent > this.props.percent) {
        this.sliderRef.current.style.transform = `translateX(${this.translateX - this.screenWidth}px)`;
        this.sliderRef.current.style.transition = `transform ${this.props.speed}ms`;
        this.direction = 'left';
      } else {
        this.sliderRef.current.style.transform = `translateX(${this.translateX}px)`;
        this.sliderRef.current.style.transition = `transform ${this.props.speed}ms`;
        this.direction = '';
      }
    } else {
      !this.timer && this._autoSlide();
      this.direction = '';
    }
    this._changePosition(this.direction);
  }

  _onTransitionEnd() {
    console.log('执行了transitionend');
    this.sliderRef.current.style.transition = 'none';
    this.translateX = null;
    !this.timer && this._autoSlide();
  }

  _autoSlide() {
    this.timer = setTimeout(()=>{
      let transform = getComputedStyle(this.sliderRef.current).getPropertyValue('transform');
      let translateX = Number(transform.slice(7, transform.length - 1).split(', ')[4]);
      this.sliderRef.current.style.transform = `translateX(${translateX - this.screenWidth}px)`;
      this.sliderRef.current.style.transition = `transform ${this.props.speed}ms`;
      this.direction = 'left';
      this._changePosition(this.direction);
      this._autoSlide();
    },this.props.duration);
  }

  render() {
    let length = this.props.children.length;
    let sliderElement = [];
    if(length === 2) {
      sliderElement.push(...this.props.children);
      sliderElement.push(...this.props.children);
    } else {
      sliderElement.push(...this.props.children);
    }
    return (
      <div className="swiper-container" onTouchStart={this._touchStart.bind(this)} onTouchMove={this._touchMove.bind(this)} onTouchEnd={this._touchEnd.bind(this)}>
        <div className="swiper-list-content" ref={this.sliderRef} onTransitionEnd={this._onTransitionEnd.bind(this)} style={{width: this.screenWidth * sliderElement.length,transform: `translateX(-${this.screenWidth}px)`}}>
          {sliderElement.map((item,index)=>{
            return (
              <div className="swiper-list-item" key={index} style={{left: index !== sliderElement.length - 1 ? this.screenWidth * (index + 1) + 'px': 0,width: this.screenWidth + 'px'}}>
                {item}
              </div>
            )
          })}
        </div>
        <div className="dots">
          {
            this.props.children.map((item,index)=>{
              return (
                <div className={`dot ${index + 1 === this.state.index ? 'active':''}`} key={index} ></div>
              )
            })
          }
        </div>
      </div>
    )
  }
}