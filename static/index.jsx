var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;


var App = React.createClass({
	
	getInitialState() {
		return {
			text: '',
			entity: '',
			id: 0,
		}
	},

	contextTypes: {
		router: React.PropTypes.func,
	},

    onClick_() {
    	var router = this.context.router;
    	router.transitionTo(this.state.entity, {id: this.state.id}, {text: this.state.text});
    },

    onEntityChange_(e) {
    	this.setState({
    		entity: e.target.value,
    	});
    },

    onIdChange_(e) {
    	this.setState({
    		id: e.target.value,
    	});
    },

    onTextChange_(e) {
    	this.setState({
    		text: e.target.value,
    	});
    },

	render() {
		return (
			<div>
			    <h2>My App</h2>
			    <div className='bar'>
				    <input className='item' type='text' onChange={this.onTextChange_} />
				    <select className='item' onChange={this.onEntityChange_} >
						<option value=''/>
					  	<option value='doctor'>Doctor</option>
					  	<option value='drug'>Drug</option>
					  	<option value='place'>Place</option>
					</select>
					 <select className='item' onChange={this.onIdChange_} >
						<option value=''/>
					  	<option value='1'>1</option>
					  	<option value='2'>2</option>
					  	<option value='3'>3</option>
					</select>
					<button className='item' onClick={this.onClick_}>Search</button>
				</div>
			    <RouteHandler />
			</div>
		)
	}

});


var Doctor = React.createClass({

	render() {
		var id = this.props.params.id;
		var text = this.props.query.text;
		return (
			<div>
				Doctor {id} {text}
			</div>
		);
	}
});

var Drug = React.createClass({

	render() {
		var id = this.props.params.id;
		var text = this.props.query.text;
		return (
			<div>
				Drug {id} {text} 
			</div>
		);
	}
});

var Place = React.createClass({

	render() {
		var id = this.props.params.id;
		var text = this.props.query.text;
		return (
			<div>
				Place {id} {text}
			</div>
		);
	}
});


var routes = (
	<Route path='/' handler={App}>
	  <Route name='doctor' path='doctor/:id' handler={Doctor} />
	  <Route name='drug' path='drug/:id' handler={Drug} />
	  <Route name='place' path='place/:id' handler={Place} />
	</Route>
);


Router.run(routes, Router.HistoryLocation, (Root) => {
  React.render(<Root/>, document.getElementById('content'));
});
