import React, {Component} from 'react';

export default class ResultCard extends Component {
    render() {
        const {
            id = '',
            title = '',
            model = '',
            brand = '',
            year = '',
            color = '',
            km = '',
            price = ''
        } = this.props;

        return (
            <li className="result__card">
                <h3 className="result__title">{title}</h3>
                <p className="result__price">R$ {price}</p>
                <p className="result__details">
                    <span className="result__model">{model}</span>
                    &nbsp;&middot;&nbsp;
                    <span className="result__brand">{brand}</span>
                    &nbsp;&middot;&nbsp;
                    <span className="result__km">{km} KM</span>
                </p>
                <p className="result__year">{year}</p>
            </li>
        );
    }
}