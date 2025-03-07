import React, {Component} from 'react';
import Loading from '../Loading';
import '../../assets/styles/Edit.css';

export default class Edit extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        
        this.state = {
			id: '',
            title: '',
            model: '',
            brand: '',
            year: '',
            color: '',
            km: '',
            price: '',

            loadingEdit: false,
            loadingBrands: true,
            brandsList: [],

            removed: false,

            message: ' '
        };

        this.inputTitleOnChange = this.inputTitleOnChange.bind(this);
        this.inputModelOnChange = this.inputModelOnChange.bind(this);
        this.inputBrandOnChange = this.inputBrandOnChange.bind(this);
        this.inputYearOnChange = this.inputYearOnChange.bind(this);
        this.inputColorOnChange = this.inputColorOnChange.bind(this);
        this.inputKmOnChange = this.inputKmOnChange.bind(this);
        this.inputPriceOnChange = this.inputPriceOnChange.bind(this);

        this.setLoadingBrands = this.setLoadingBrands.bind(this);
        this.setBrandsList = this.setBrandsList.bind(this);
        this.fetchBrandsList = this.fetchBrandsList.bind(this);

        this.setLoadingEdit = this.setLoadingEdit.bind(this);
        this.fetchEdit = this.fetchEdit.bind(this);

        this.fetchRemove = this.fetchRemove.bind(this);
        this.setRemoved = this.setRemoved.bind(this);

        this.setMessage = this.setMessage.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;

        const {
            id = '',
            title = '',
            model = '',
            brand = '',
            year = '',
            color = '',
            km = '',
            price = '',
            message = ' '
        } = this.props;

        this.setState({ id, title, model, brand, year, color, km, price, message });

        this.fetchBrandsList();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    setLoadingBrands(value = false){
        this.setState({
            loadingBrands: value
        });
    }

    setBrandsList(value = []){
        this.setState({
            brandsList: value
        });
    }

    fetchBrandsList() {
		const that = this; 

        fetch(`http://private-anon-74a3b17c93-tradersclubapi.apiary-mock.com/api/brands`)
        .then(response => {
          
          if (response.status === 404) {
            // Error on API
            console.log('404');
            if (this._isMounted) {
                that.setMessage('Problemas ao carregar a lista de marcas.');
                that.setLoadingBrands(false);
            }
			//that.props.setMainContentComponent('Error', that.state);
          } else {
            // API response ok        
            response.json().then( (json) => {
                if (this._isMounted) {
                    if(typeof json.brands !== 'undefined'){
                        that.setBrandsList(json.brands);
                    } else {
                        that.setBrandsList([]);
                    }
                    that.setMessage(' ');
                    that.setLoadingBrands(false);
                }
                //that.props.setMainContentComponent('ResultList', that.state);
            });
          }
        })
        .catch(() => {
            // request error
            console.log('error');
            if (this._isMounted) {
                that.setMessage('Problemas ao carregar a lista de marcas.');
                that.setLoadingBrands(false);
            }
            //that.props.setMainContentComponent('Error', that.state);
        });
    }

    inputTitleOnChange(e) {
        this.setState({
            title: e.target.value
        });
    }

    inputModelOnChange(e) {
        this.setState({
            model: e.target.value
        });
    }

    inputBrandOnChange(e) {
        this.setState({
            brand: e.target.value
        });
    }

    inputYearOnChange(e) {
        this.setState({
            year: e.target.value
        });
    }

    inputColorOnChange(e) {
        this.setState({
            color: e.target.value
        });
    }

    inputKmOnChange(e) {
        this.setState({
            km: e.target.value
        });
    }

    inputPriceOnChange(e) {
        this.setState({
            price: e.target.value
        });
    }

    setLoadingEdit(value = false){
        this.setState({
            loadingEdit: value
        });
    }

    fetchEdit(){
        const that = this;
        that.setLoadingEdit(true);

        const data = { 
            car: {
                'id': this.state.id,
                'title': this.state.title,
                'model': this.state.model,
                'brand': this.state.brand,
                'year': this.state.year,
                'color': this.state.color,
                'km': this.state.km,
                'price': this.state.price
            }
        };
        fetch(
            `https://private-anon-74a3b17c93-tradersclubapi.apiary-mock.com/api/cars/${this.state.id}`, 
            {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            }
        )
        .then(response => {
            if (response.status === 404) {
                // Error on API
                console.log('404');
                if (this._isMounted) {
                    that.setMessage('Problemas ao salvar o formulário.');
                    that.setLoadingEdit(false);
                }
                //that.props.setMainContentComponent('Error', that.state);
            } else {
                // API response ok
                if (this._isMounted) {
                    that.setMessage('Formulário salvo com sucesso.');
                    that.setLoadingEdit(false);
                    that.props.setMainContentComponent('Edit', this.props);
                }
            }
        })
        .catch(() => {
            // request error
            console.log('error');
            if (this._isMounted) {
                that.setMessage('Problemas ao salvar o formulário.');
                that.setLoadingEdit(false);
            }
            //that.props.setMainContentComponent('Error', that.state);
        });;
    }

    fetchNew(){
        const that = this;
        that.setLoadingEdit(true);

        const data = { 
            car: {
                'id': this.state.id,
                'title': this.state.title,
                'model': this.state.model,
                'brand': this.state.brand,
                'year': this.state.year,
                'color': this.state.color,
                'km': this.state.km,
                'price': this.state.price
            }
        };
        fetch(
            `https://private-anon-74a3b17c93-tradersclubapi.apiary-mock.com/api/cars`, 
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            }
        )
        .then(response => {
            if (response.status === 404) {
                // Error on API
                console.log('404');
                if (this._isMounted) {
                    that.setMessage('Problemas ao criar o formulário.');
                    that.setLoadingEdit(false);
                }
                //that.props.setMainContentComponent('Error', that.state);
            } else {
                // API response ok
                if (this._isMounted) {
                    response.json().then( (json) => {
                        if(typeof json.car !== 'undefined'){
                            that.setState({...json.car});
                            that.setMessage('Formulário criado com sucesso.');
                            that.setLoadingEdit(false);
                        } else {
                            that.setMessage('Problemas ao criar o formulário.');
                            that.setLoadingEdit(false);
                        }
                    });
                }
            }
        })
        .catch(() => {
            // request error
            console.log('error');
            if (this._isMounted) {
                that.setMessage('Problemas ao criar o formulário.');
                that.setLoadingEdit(false);
            }
            //that.props.setMainContentComponent('Error', that.state);
        });;
    }

    fetchRemove(){
        const that = this;
        that.setLoadingEdit(true);

        fetch(
            `https://private-anon-74a3b17c93-tradersclubapi.apiary-mock.com/api/cars/${this.state.id}`, 
            {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            }
        )
        .then(response => {
            if (response.status === 404) {
                // Error on API
                console.log('404');
                if (this._isMounted) {
                    that.setMessage('Problemas ao tentar remover o formulário.');
                    that.setLoadingEdit(false);
                }
                //that.props.setMainContentComponent('Error', that.state);
            } else {
                // API response ok
                if (this._isMounted) {
                    that.setMessage('Formulário removido com sucesso.');
                    that.setRemoved(true);
                    that.setLoadingEdit(false);
                }
            }
        })
        .catch(() => {
            // request error
            console.log('error');
            if (this._isMounted) {
                that.setMessage('Problemas ao tentar remover o formulário.');
                that.setLoadingEdit(false);
            }
            //that.props.setMainContentComponent('Error', that.state);
        });;
    }

    setRemoved(value = false){
        this.setState({
            removed: value
        });
    }

    setMessage(value = ' '){
        this.setState({
            message: value
        });
    }

    render() {
        const {
            title = '',
            model = '',
            brand = '',
            year = '',
            color = '',
            km = '',
            price = '',

            message = ' '
        } = this.state;

        const {
            isNew = false
        } = this.props;

        const 
            removeOnClick = () => {this.fetchRemove();},
            cancelOnClick = () => {this.props.setMainContentComponent('Banner', {});},
            saveOnClick = () => {
                if(!isNew){
                    this.fetchEdit();
                } else {
                    this.fetchNew();
                }
            },
            editSubmit = (e) => {e.preventDefault();}
        ;

        return (
            <section className="edit">
                <p className="edit__message">{message}</p>
                { this.state.removed && 
                    <button className="edit__button edit__button--transparent" disabled={this.state.loadingEdit} onClick={cancelOnClick} type="submit">Voltar</button> 
                }
                { this.state.loadingBrands && !this.state.removed &&
                    <Loading />
                }
                { !this.state.loadingBrands && !this.state.removed &&
                    <form className="edit__form" onSubmit={editSubmit}>
                        <input className="edit__input edit__input--first" id="edit__title" type="text" placeholder="" defaultValue={title} onChange={this.inputTitleOnChange} />
                        <input className="edit__input edit__input--half" id="edit__model" type="text" placeholder="" defaultValue={model} onChange={this.inputModelOnChange} />
                        <input className="edit__input edit__input--half" id="edit__year" type="number" placeholder="" defaultValue={year} onChange={this.inputYearOnChange} />
                        <select className="edit__select" id="edit__brand" onChange={this.inputBrandOnChange} defaultValue={brand}>
                            { this.state.brandsList.map((item) => {
                                return <option className="edit__option" key={item.id} value={item.name}>{item.name}</option>;
                            })}
                        </select>
                        <input className="edit__input edit__input--half" id="edit__color" type="text" placeholder="" defaultValue={color} onChange={this.inputColorOnChange} />
                        <input className="edit__input edit__input--half" id="edit__price" type="number" placeholder="" defaultValue={price} onChange={this.inputPriceOnChange} />
                        <input className="edit__input edit__input--last edit__input--half" id="edit__km" type="number" placeholder="" defaultValue={km} onChange={this.inputKmOnChange} />
                        
                        <div className="edit__button-container">
                            { !isNew && 
                                <button className="edit__button edit__button--first edit__button--transparent" disabled={this.state.loadingEdit} onClick={removeOnClick} type="submit">Remover</button>
                            }
                            <button className={`edit__button edit__button--transparent${isNew ? ' edit__button--first' : ''}`} disabled={this.state.loadingEdit} onClick={cancelOnClick} type="submit">Cancelar</button>
                            {this.state.loadingEdit && <Loading small={true} />}
                            <button className="edit__button edit__button--last" disabled={this.state.loadingEdit} onClick={saveOnClick} type="submit">Salvar</button>
                        </div>
                    </form>
                }
            </section>
        );
    }
}