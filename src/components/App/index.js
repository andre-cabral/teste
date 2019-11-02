import React, {Component} from 'react';
import Menu from '../Menu';
import Content from '../Content';
import '../../assets/styles/Reset.css';
import '../../assets/styles/Shared.css';

export default class App extends Component {
    render() {
        return (
            <div className="container">
                <Menu />
                <Content />
            </div>
        );
    }
}