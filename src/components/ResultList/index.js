import React, {Component} from 'react';
import ResultCard from '../ResultCard';
import '../../assets/styles/Result.css';

export default class ResultList extends Component {
    render() {
        const {
            queryResults = []
        } = this.props;
        return (
            <section className="result">
                { queryResults.length > 0 && 
                    <ul className="result__list">
                        {queryResults.map((item => {
                            return (<ResultCard key={item.id} {...item} />);
                        }))}
                    </ul>
                }
                { queryResults.length === 0 && 
                    <h3 className="result__empty">Nenhum resultado foi encontrado.</h3>
                }
            </section>
        );
    }
}