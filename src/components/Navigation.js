import React, {Component} from 'react';
import "./style/style.css"

//todo: refactor links
class Navigation extends Component {
    render() {
        return (
            <div>
                <nav
                    className="navigation grid grid-gutters large-grid-fit med-grid-fit small-grid-1of2">
                    <li className="menu-item nav-item">
                        <a className="nav-link logout-button-color"
                           href="http://localhost:3000/login">
                            Logout
                        </a>
                    </li>
                    <li className="menu-item nav-item">
                        <a className="nav-link menu-item-font-color" href='/operations'>
                            Operation list
                        </a>
                    </li>
                    <li className="menu-item nav-item">
                        <a className="nav-link menu-item-font-color" href='/create-operation'>
                            Create operation
                        </a>
                    </li>
                    <li className="menu-item nav-item">
                        <a className="nav-link menu-item-font-color" href='/balance'>
                            Balance
                        </a>
                    </li>
                    <li className="menu-item nav-item">
                        <a className="nav-link menu-item-font-color" href='/articles'>
                            Articles
                        </a>
                    </li>

                    <li className="menu-item nav-item">
                        <a className="nav-link menu-item-font-color" href='/create-article'>
                            Create article
                        </a>
                    </li>
                    <li className="menu-item nav-item">
                        <a className="nav-link menu-item-font-color" href='/box-chart'>
                            Bar graph
                        </a>
                    </li>
                    <li className="menu-item nav-item">
                        <a className="nav-link menu-item-font-color" href='/line-chart'>
                            Linear graph
                        </a>
                    </li>
                    <li className="menu-item nav-item">
                        <a className="nav-link menu-item-font-color" href='/pie-chart'>
                            Pie chart
                        </a>
                    </li>
                </nav>
            </div>
        );
    }
}

export default Navigation;