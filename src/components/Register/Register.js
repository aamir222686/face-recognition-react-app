import React, { Component } from 'react';


class Register extends Component {
	constructor (props) {
		super(props);
		this.state= {
			registerName: '',
			registerEmail:'',
			registerPassword: ''
		}
	}

	onNameChange = (event) => {
		this.setState({registerName: event.target.value})
	}

	onEmailChange = (event) => {
		this.setState({registerEmail: event.target.value})
	}

	onPasswordChange = (event) => {
		this.setState({registerPassword: event.target.value})
	}

	onRegisterButton = () => {
		fetch('https://enigmatic-hamlet-07374.herokuapp.com/register', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				name: this.state.registerName,
				email: this.state.registerEmail,
				password: this.state.registerPassword

			})
		})
		.then(response => response.json())
		.then(user => {
			if (user.id) {
				this.props.loadUser(user);
				this.props.onRouteChange('home');
			}else {
				alert('Something Wrong');
			}
		})
	}

	render() {
		return (
		<div className="vh-100 dt w-100">
			<div className="dtc v-mid tc">
				<article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-3 code">
					<main className="pa4 black-80">
					  <div className="measure">
					    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
					      <legend className="f2 fw6 ph0 mh0 tc">Register</legend>
					      <div className="mt3">
					        <label className="db fw6 lh-copy f6" htmlFor="email-address">Name</label>
					        <input onChange={this.onNameChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name"/>
					      </div>
					      <div className="mt3">
					        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
					        <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
					      </div>
					      <div className="mv3">
					        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
					        <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
					      </div>
					    </fieldset>
					    <div className="center">
					      <input onClick={this.onRegisterButton} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib tc" type="submit"  value="Register"/>
					    </div>
					  </div>
					</main>
				</article>
			</div>
		</div>
		)
	}	
}

export default Register; 