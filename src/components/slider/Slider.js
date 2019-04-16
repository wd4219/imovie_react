import React, {Component} from 'react';
import './Slider.css';

export default class Slider extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let titleElement = (
      <h2 className="slider-title">
        <span>{this.props.titleBar.title}</span>
        {this.props.titleBar.left && this.props.titleBar.left}
      </h2>);
    return  (
      <div className="slider-container">
        {titleElement}
        <div className="slider-list-content">
          {
            this.props.children.map((item,index)=>{
              return (
                <div className="slider-list-item" key={index}>
                  {item}
                </div>
              )
            })
          
          }
        </div>
      </div>
    );
  }
}