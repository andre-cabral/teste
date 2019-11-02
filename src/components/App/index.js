import React, {Component} from 'react';
import Menu from '../Menu';
import Search from '../Search';
import Banner from '../Banner';
import '../../assets/styles/reset.css';
import '../../assets/styles/Shared.css';

export default class App extends Component {
    render() {
        return (
            <div className="container">
                <Menu />
                <div className="content">
                    <Search />
                    <div className="content__main">
                        <Banner />
                    </div>
                </div>
            </div>
        );
    }
}