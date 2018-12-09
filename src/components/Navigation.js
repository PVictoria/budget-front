import React, {Component} from 'react';
import "./style.css"

class Navigation extends Component {
    render() {
        return (
            <div>
                <nav className="navigation grid grid-gutters large-grid-fit med-grid-fit small-grid-1of2 menu-style">
                    <li className="menu-item nav-item">
                        <a className="nav-link menu-item-font"
                           href="https://leanpub.com/reactspeedcoding">
                            <i className="fa fa-book"></i> Book
                        </a>
                    </li>
                    <li className="menu-item nav-item">
                        <a className="nav-link  menu-item-font"
                           href="https://github.com/manavsehgal/reactspeedcoding">Link</a>
                    </li>
                </nav>
            </div>
        );
    }
}

export default Navigation;