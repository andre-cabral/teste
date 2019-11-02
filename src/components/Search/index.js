import React, {Component} from 'react';

export default class Search extends Component {
    render() {
        const { 
            inputId = 'input-search',
            inputClass = 'search__input',
            inputPlaceholder = '',
            inputOnChange = () => {},
                        
            buttonOnClick = () => {},
            buttonClass = 'search__button',
            buttonType = 'submit',
            buttonText = 'Cadastrar',

            querySubmit = (e) => {e.preventDefault();this.fetchQuery();}
        } = this.props;

        return (
            <form className="search" onSubmit={querySubmit}>
                <input className={inputClass} id={inputId} type="text" placeholder={inputPlaceholder} onChange={inputOnChange} />
                <button className={buttonClass} onClick={buttonOnClick} type={buttonType}>{buttonText}</button>
            </form>
        );
    }
}