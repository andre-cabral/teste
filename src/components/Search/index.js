import React, {Component} from 'react';

export default class Search extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
			queryValue: '',
			queryResults: []
        };

        this.inputOnChange = this.inputOnChange.bind(this);
		this.fetchQuery = this.fetchQuery.bind(this);
        this.setQueryResults = this.setQueryResults.bind(this);
    }

    inputOnChange(e) {
        /* PREVENTS THE USER FROM ACCIDENTALLY GETTING OUT OF THE
        EDIT OR NEW SCREEN IF HE TYPES SOMETHING ON THE SEARCH BAR */
        if(this.props.mainContentComponent !== 'New' && this.props.mainContentComponent !== 'Edit'){
            /* CLEAR THE DELAY TO FETCH */
            if(typeof this.timerID !== 'undefined'){
                clearTimeout(this.timerID);
            }
    
            this.props.setIsLoading(true);
            this.setState({
                queryValue: e.target.value
            });
    
            /* CREATE A DELAY TO ONLY FETCH THE API 
            WHEN THE USER STOPS TYPING FOR A SMALL TIME */
            this.timerID = setTimeout(
                () => {this.fetchQuery();},
                400
            );
        }
        
    }
	
	setQueryResults(value = []){
        this.setState({
            queryResults: value
		});		
    }

    fetchQuery() {
		const that = this; 
        that.props.setIsLoading(true);

        fetch(`https://private-anon-74a3b17c93-tradersclubapi.apiary-mock.com/api/cars?search=${this.state.queryValue}`)
        .then(response => {
          
          if (response.status === 404) {
            // Error on API
			console.log('404');
			that.setQueryResults([]);
			that.props.setIsLoading(false);
			that.props.setMainContentComponent('Error', that.state);
          } else {
            // API response ok        
            response.json().then( (json) => {
				if(typeof json.cars !== 'undefined'){
					that.setQueryResults(json.cars);
				} else {
					that.setQueryResults([]);
				}
                that.props.setIsLoading(false);
                that.props.setMainContentComponent('ResultList', that.state);
            });
          }
        })
        .catch(() => {
          // request error
          console.log('error');
		  that.props.setIsLoading(false);
		  that.props.setMainContentComponent('Error', that.state);
        });
    }
    
    render() {
        const 
			inputOnChange = this.inputOnChange,
			buttonOnClick = () => {this.props.setMainContentComponent('New', {title: this.state.queryValue});},
			querySubmit = (e) => {e.preventDefault();}
		;

        return (
            <form className="search" onSubmit={querySubmit}>
                <input className="search__input" id="input__search" type="text" placeholder="" onChange={inputOnChange} />
                <button className="search__button" onClick={buttonOnClick} type="submit">Cadastrar</button>
            </form>
        );
    }
}