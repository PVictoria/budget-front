import React, {Component} from 'react';
import "./style/style.css"

//todo: refactor links
class Navigation extends Component {
    render() {
        return (
            <div>
                <nav className="navigation grid grid-gutters large-grid-fit med-grid-fit small-grid-1of2 menu-style">
                    <li className="menu-item nav-item">
                        <a className="nav-link menu-item-font"
                           href="http://localhost:3000/login">
                            <i className="fa fa-book"></i> Login
                        </a>
                    </li>
                    <li className="menu-item nav-item">
                        <a className="nav-link menu-item-font" href='/operations'>
                            <i className="fa fa-book"/>Operation list
                        </a>
                    </li>
                    <li className="menu-item nav-item">
                        <a className="nav-link menu-item-font" href='/create-operation'>
                            <i className="fa fa-book"/>Create operation
                        </a>
                    </li>
                    <li className="menu-item nav-item">
                        <a className="nav-link menu-item-font" href='/balance'>
                            <i className="fa fa-book"/>Balance
                        </a>
                    </li>
                    <li className="menu-item nav-item">
                        <a className="nav-link menu-item-font" href='/articles'>
                            <i className="fa fa-book"/>Articles
                        </a>
                    </li>

                    <li className="menu-item nav-item">
                        <a className="nav-link menu-item-font" href='/create-article'>
                            <i className="fa fa-book"/>Create article
                        </a>
                    </li>
                    <li className="menu-item nav-item">
                        <a className="nav-link menu-item-font" href='/box-chart'>
                            <i className="fa fa-book"/>Bar graph
                        </a>
                    </li>
                    <li className="menu-item nav-item">
                        <a className="nav-link menu-item-font" href='/line-chart'>
                            <i className="fa fa-book"/>Linear graph
                        </a>
                    </li>
                    <li className="menu-item nav-item">
                        <a className="nav-link menu-item-font" href='/pie-chart'>
                            <i className="fa fa-book"/>Pie chart
                        </a>
                    </li>
                </nav>
            </div>
        );
    }
}

export default Navigation;