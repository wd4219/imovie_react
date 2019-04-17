import React, {Component} from 'react';
import './Swiper.css';
export default class Swiper extends Component{
  constructor(props) {
    super(props);
    this.sliderRef = React.createRef();
    this.sliderContainerRef = React.createRef();
    this.state = {
      index: 1,
      offset: 0
    }
    this.translateX = null;
    this.direction =  '';
  }

  static defaultProps = {
    percent: 0.2, //判断切换的节点
    speed: 300, //切换速度
    duration: 2000, //切换频率
    padding: 0, //轮播项的左padding
    itemWidth: 375, //项的宽度包含padding
    autoPlay: true,
  }

  componentDidMount() {
    let offset = (this.sliderContainerRef.current.offsetWidth - this.props.itemWidth - this.props.padding) / 2;
    this.setState({offset});
    let transform = getComputedStyle(this.sliderRef.current).getPropertyValue('transform');
    this.translateX = Number(transform.slice(7, transform.length - 1).split(', ')[4]) + offset;  
    if(Array.isArray(this.props.children)) {
      this._autoSlide();
    }
  }

  componentWillUnmount() {
    this._stopTimeOut();
  }

  _stopTimeOut() {
    this.timer && clearTimeout(this.timer);
    this.timer = null;
  }

  _changePosition() {
    let length = this.props.children.length;
    let leftArr= Array.from(this.sliderRef.current.children).map((elem)=>{
      return Number(getComputedStyle(elem).getPropertyValue('left').slice(0,-2));
    });
    let minLeftIndex = leftArr.indexOf(Math.min(...leftArr));
    let maxLeftIndex = leftArr.indexOf(Math.max(...leftArr));
    console.log(leftArr);
    console.log(minLeftIndex,maxLeftIndex);
    if(this.direction === 'right') {
      this.sliderRef.current.children[maxLeftIndex].style.left = leftArr[minLeftIndex] - this.props.itemWidth + 'px';
      if(this.state.index === 1) {
        this.setState({index: length});
      } else {
        this.setState((prevState)=>{
          return {
            index: prevState.index - 1
          };
        });
      }
    } else if(this.direction === 'left') {
      this.sliderRef.current.children[minLeftIndex].style.left = leftArr[maxLeftIndex] + this.props.itemWidth + 'px';
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
    let transform = getComputedStyle(this.sliderRef.current).getPropertyValue('transform');
    this.nowTranslateX = Number(transform.slice(7, transform.length - 1).split(', ')[4]);
    this.sliderRef.current.style.transform = `translateX(${this.nowTranslateX}px)`;
    this.sliderRef.current.style.transition = 'none';
    if(this.direction === 'right') {
      this.direaction = 'left';
      this._changePosition();
    } else if(this.direction === 'left') {
      this.direction = 'right';
      this._changePosition();
    }
    this.direction = '';
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
    let percent = Math.abs(translateX - this.translateX) / this.props.itemWidth;
    if(percent > this.props.percent) {
      if(translateX > this.translateX) {   //判断切换方向
        console.log('向右切换');
        this.sliderRef.current.style.transform = `translateX(${this.translateX + this.props.itemWidth}px)`;
        this.sliderRef.current.style.transition = `transform ${this.props.speed}ms`;
        this.direction = 'right';
      } else if(translateX < this.translateX){
        console.log('向左切换');
        this.sliderRef.current.style.transform = `translateX(${this.translateX - this.props.itemWidth}px)`;
        this.sliderRef.current.style.transition = `transform ${this.props.speed}ms`;
        this.direction = 'left';
      } else {
        !this.timer && this._autoSlide();
        this.direction = '';
      }
    } else {
      this.sliderRef.current.style.transform = `translateX(${this.translateX}px)`;
      this.sliderRef.current.style.transition = `transform ${this.props.speed}ms`;
      this.direction = '';
    }
    this._changePosition();
  }

  _onTransitionEnd() {
    console.log('执行了transitionend');
    this.sliderRef.current.style.transition = 'none';
    let transform = getComputedStyle(this.sliderRef.current).getPropertyValue('transform');
    this.translateX = Number(transform.slice(7, transform.length - 1).split(', ')[4]);
    this.direction = '';
    !this.timer && this._autoSlide();
  }

  _autoSlide() {
    if(this.props.autoPlay) {
      this.timer = setTimeout(()=>{
        let transform = getComputedStyle(this.sliderRef.current).getPropertyValue('transform');
        let translateX = Number(transform.slice(7, transform.length - 1).split(', ')[4]);
        this.sliderRef.current.style.transform = `translateX(${translateX - this.props.itemWidth}px)`;
        this.sliderRef.current.style.transition = `transform ${this.props.speed}ms`;
        this.direction = 'left';
        this._changePosition();
        this._autoSlide();
      },this.props.duration);
    }
  }

  render() {
    if(Array.isArray(this.props.children)) {
      let length = this.props.children.length;
      let sliderElement = [];
      if(length === 2) {
        sliderElement.push(...this.props.children,...this.props.children);
        if(this.props.padding > 0) {
          sliderElement.unshift(this.props.children[1]);
          sliderElement.push(this.props.children[0]);
        }
      } else {
        sliderElement.push(...this.props.children);
        if(this.props.padding > 0) {
          let centerValue =  Math.round(length / 2);
          sliderElement.unshift(...this.props.children.slice(0,centerValue));
          sliderElement.push(...this.props.children.slice(centerValue));
        }
      }
      return (
        <div className="swiper-container" ref={this.sliderContainerRef}  onTouchStart={this._touchStart.bind(this)} onTouchMove={this._touchMove.bind(this)} onTouchEnd={this._touchEnd.bind(this)}>
          <div className="swiper-list-content" ref={this.sliderRef} onTransitionEnd={this._onTransitionEnd.bind(this)} style={{width: this.props.itemWidth * sliderElement.length + 'px',transform: `translateX(-${this.props.itemWidth * (this.props.padding > 0 ? 2 : 1) - this.state.offset}px)`}}>
            {sliderElement.map((item,index)=>{
              return (
                <div className="swiper-list-item" key={index} style={{left: (index !== sliderElement.length - 1 ? this.props.itemWidth * (index + 1) + 'px': 0),width: (this.props.itemWidth + 'px'), paddingLeft: (this.props.padding + 'px') }}>
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
    } else {
      return (
        <div className="swiper-container">
          <div className="swiper-list-content" style={{width: this.props.itemWidth + 'px'}}>
            {this.props.children}
          </div>
        </div>
      );
    }
  }
}