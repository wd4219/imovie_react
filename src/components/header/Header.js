import React, {Component} from 'react';
import './Header.css';
export default class Header extends Component{
  render() {
    let defaultChildren = (
      <React.Fragment>
        <div className="left-content" onClick={()=>{alert(1);}}>返回</div>
        <div className="center-content">
          这是首页
        </div>
        <div className="right-content">分享</div>
      </React.Fragment>
    );
    return (
      <header className="nav-bar">
        {this.props.children ? this.props.children : defaultChildren}
      </header>
    );
  }
}