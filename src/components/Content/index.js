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
			isLoading: false,
			mainContentComponent: 'Banner',
			mainContentProps: {}
        };

        this.setIsLoading = this.setIsLoading.bind(this);
		this.setMainContentComponent = this.setMainContentComponent.bind(this);
		this.renderMainContentComponent = this.renderMainContentComponent.bind(this);
    }

    setIsLoading(value = true){
        this.setState({
			isLoading: value
        });
	}

	setMainContentComponent(value = 'Banner', props = {}){
        this.setState({
			mainContentComponent: value,
			mainContentProps: props
        });
	}

	renderMainContentComponent(props){
		switch(this.state.mainContentComponent){
			case 'Banner':
				return <Banner {...props} setIsLoading={this.setIsLoading} setMainContentComponent={this.setMainContentComponent}  />
			case 'ResultList':
				return <ResultList {...props} setIsLoading={this.setIsLoading} setMainContentComponent={this.setMainContentComponent}  />
			default:
				return <Banner {...props} setIsLoading={this.setIsLoading} setMainContentComponent={this.setMainContentComponent} />
		}
	}

    render() {
        return (
			<div className="content">
				<Search setIsLoading={this.setIsLoading} setMainContentComponent={this.setMainContentComponent} />
				<div className="content__main">
					{this.state.isLoading &&
						<Loading />
					}
					{!this.state.isLoading && 
						this.renderMainContentComponent(this.state.mainContentProps)
					}
				</div>
			</div>
        );
    }
}