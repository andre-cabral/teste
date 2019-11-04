import React, {Component} from 'react';

export default class ResultCard extends Component {
    constructor(props) {
        super(props);

        this.cardOnClick = this.cardOnClick.bind(this);
    }

    cardOnClick(){
        this.props.setMainContentComponent('Edit', this.props);
    }

    render() {
        const {
            title = '',
            model = '',
            brand = '',
            year = '',
            km = '',
            price = ''
        } = this.props;

        return (
            <li className="result__card" onClick={this.cardOnClick}>
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