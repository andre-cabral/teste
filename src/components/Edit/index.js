import React, {Component} from 'react';

export default class Edit extends Component {
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
            <section className="edit">
                <h2 className="edit__text">{id} {title} {model} {brand} {year} {color} {km} {price}</h2>
            </section>
        );
    }
}