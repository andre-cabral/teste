import React, {Component} from 'react';

export default class ResultCard extends Component {
    render() {
        const {
            title = '',
            price = '',
            model = '',
            brand = '',
            km = '',
            year = ''
        } = this.props;

        return (
            <li className="result__card">
                <h3 className="result__title">{title}</h3>
                <p className="result__price">{price}</p>
                <p className="result__details">
                    <span className="result__model">{model}</span>
                    &nbsp;&middot;&nbsp;
                    <span className="result__brand">{brand}</span>
                    &nbsp;&middot;&nbsp;
                    <span className="result__km">{km}</span>
                </p>
                <p className="result__year">{year}</p>
            </li>
        );
    }
}