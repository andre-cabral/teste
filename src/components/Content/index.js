import React, {Component} from 'react';
import Search from '../Search';
import Banner from '../Banner';
import ResultList from '../ResultList';
import Loading from '../Loading';

export default class Content extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
			queryValue: '',
			queryResults: [],
			hasSearched: false,
			isLoading: false,
        };

        this.inputOnChange = this.inputOnChange.bind(this);
        this.setIsLoading = this.setIsLoading.bind(this);
		this.fetchQuery = this.fetchQuery.bind(this);
		this.setQueryResults = this.setQueryResults.bind(this);
    }

    inputOnChange(e) {
        this.setState({
            queryValue: e.target.value
        });
    }

    setIsLoading(value = true){
        this.setState({
			isLoading: value,
			hasSearched: true
        });
	}
	
	setQueryResults(value = []){
        this.setState({
            queryResults: value
		});
		
		console.log(this.state)
    }

    fetchQuery() {
		const that = this;   
        that.setIsLoading(true);

        fetch(`https://private-anon-74a3b17c93-tradersclubapi.apiary-mock.com/api/cars?search=${this.state.queryValue}`)
        .then(response => {
          
          if (response.status === 404) {
            // Error on API
			console.log('404');
			that.setQueryResults([]);
            that.setIsLoading(false);
          } else {
            // API response ok        
            response.json().then(function(json) {
				if(typeof json.cars !== 'undefined'){
					that.setQueryResults(json.cars);
				} else {
					that.setQueryResults([]);
				}
            });
    
            that.setIsLoading(false);
          }
        })
        .catch(() => {
          // request error
          console.log('error');
          that.setIsLoading(false);
        });
      }

    render() {
		const searchProps = {
			inputId: 'input-search',
			inputClass: 'search__input',
			inputPlaceholder: '',
			inputOnChange: this.inputOnChange,
					
			buttonOnClick: () => {},
			buttonClass: 'search__button',
			buttonType: 'submit',
			buttonText: 'Cadastrar',

			querySubmit: (e) => {e.preventDefault();this.fetchQuery();}
		};

        return (
			<div className="content">
				<Search {...searchProps} />
				<div className="content__main">
					{this.state.isLoading &&
						<Loading />
					}
					{!this.state.isLoading && !this.state.hasSearched &&
						<Banner />
					}
					{!this.state.isLoading && this.state.hasSearched &&
						<ResultList queryResults={this.state.queryResults} />
					}
				</div>
			</div>
        );
    }
}