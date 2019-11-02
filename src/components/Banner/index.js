import React, {Component} from 'react';

export default class Banner extends Component {
    render() {
        return (
            <section className="banner">
                <h2 className="banner__text">Pesquisa de veículos<br /> do <span className="banner__name">TradersClub</span></h2>
            </section>
        );
    }
}