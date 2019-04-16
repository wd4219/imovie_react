import React, {Component} from 'react';
import './Marquee.css';
import { version } from 'core-js';
export default class Marquee extends Component {
  constructor(props) {
    super(props);
    this.marqueeRef = React.createRef();
    this.marqueeContainerRef = React.createRef();
    this.state = {
      height: 0,
      width: 0
    }
  }
  componentDidMount() {
    if(this.props.type === 'vertical') {
      this.setState({height: this.marqueeContainerRef.current.clientHeight});
      this.setState({width: this.marqueeContainerRef.current.clientWidth});
    } else {
      this.setState({height: this.marqueeContainerRef.current.clientHeight});
      this.setState({width: this.marqueeContainerRef.current.clientWidth});
    }
    if(this.props.children && this.props.children.length > 1) {
      this._marquee();
    }
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  _marquee() {
    this.timer = setTimeout(()=>{
      let transform = getComputedStyle(this.marqueeRef.current).getPropertyValue('transform');
      if(this.props.type === 'vertical') {
        let translateY = Number(transform.slice(7, transform.length - 1).split(', ')[5]);
        this.marqueeRef.current.style.transform = `translateY(${translateY - this.state.height}px)`;
        this.marqueeRef.current.style.transition = `transform ${this.props.speed}ms`;
      } else {
        let translateX = Number(transform.slice(7, transform.length - 1).split(', ')[4]);
        this.marqueeRef.current.style.transform = `translateX(${translateX - this.state.width}px)`;
        this.marqueeRef.current.style.transition = `transform ${this.props.speed}ms`;
      }
    },this.props.duration);
  }

  _onTransitionEnd() {
    this._marquee();
    this._changePosition();
  }

  _changePosition() {
    if(this.props.type === 'vertical') {
      let valueArr= Array.from(this.marqueeRef.current.children).map((elem)=>{
        return Number(getComputedStyle(elem).getPropertyValue('top').slice(0,-2));
      });
      let minValueIndex = valueArr.indexOf(Math.min(...valueArr));
      let maxValueIndex = valueArr.indexOf(Math.max(...valueArr));
      this.marqueeRef.current.children[minValueIndex].style.top = valueArr[maxValueIndex] +  this.state.height + 'px';
    } else {
      let valueArr= Array.from(this.marqueeRef.current.children).map((elem)=>{
        return Number(getComputedStyle(elem).getPropertyValue('left').slice(0,-2));
      });
      let minValueIndex = valueArr.indexOf(Math.min(...valueArr));
      let maxValueIndex = valueArr.indexOf(Math.max(...valueArr));
      this.marqueeRef.current.children[minValueIndex].style.left = valueArr[maxValueIndex] + this.state.width + 'px';
    }
  }

  render() {
    let contentStyle = {};
    let itemStyle = {};
    if(this.props.type === 'vertical') {
      contentStyle = {
        height: this.state.height * this.props.children.length + 'px',
        width: '100%'
      };
    } else {
      contentStyle = {
        height: '100%',
        width: this.state.width * this.props.children.length + 'px'
      };
    }
    
    return (
      <div className="marquee-container" ref={this.marqueeContainerRef}>
        <div className="marquee-list-content" style={contentStyle} ref={this.marqueeRef} onTransitionEnd={this._onTransitionEnd.bind(this)}>
          {
            this.props.children.map((item,index)=>{
              if(this.props.type === 'vertical') {
                itemStyle = {
                  height: this.state.height + 'px',
                  width: '100%',
                  top: this.state.height * index + 'px'
                };
              } else {
                itemStyle = {
                  height: '100%',
                  width: this.state.width + 'px',
                  left: this.state.width * index + 'px'
                };
              }
              return (
                <div className="marquee-list-item" style={itemStyle} key={index}>
                  {item}
                </div>
              );
            })
          }
        </div>        
      </div>
    );
  }
}