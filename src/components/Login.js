import React, {Component} from "react"

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            items: []
        };
        this.loginHandleClick = this.loginHandleClick.bind(this);
        this.registrationHandleClick = this.registrationHandleClick.bind(this);
    }

    render() {
        console.log("render");
        console.log(this.state.id)
        return (
            <div>
                <dev className="input-group container align-middle">
                    <input ref={input => (this._username = input)}
                           name="username"
                           required="true"
                           placeholder="Username"/>
                    <input ref={input => (this._password = input)}
                           name="password"
                           type="password"
                           required="true"
                           placeholder="Password"/>
                </dev>
                <dev className="btn-group container align-middle">
                    <button onClick={this.loginHandleClick}>LOGIN</button>
                    <button onClick={this.registrationHandleClick}>REGISTRATION</button>
                </dev>
            </div>
        )
    }

    loginHandleClick = () => {
        // console.log(this._password.value)
        fetch('http://localhost:8080/user/create/', {
            method: 'POST',
            dataType: 'JSON',
            headers: {
                'Content-Type': 'application/json',
            },
            body: '{ "name": "' + this._username.value + '",  "password": "' + this._password.value + '" }'
        })
            .then(res => {
                return res.json();
            })
            .then(data => {
                const iii = data;
                console.log(iii);
                this.setState({id: data.id});
                console.log(this.state.id)
                this.props.history.push('/greeting')
            })
            .catch(err => {
                console.log(err);
            });
    };
    registrationHandleClick = () => {
        console.log("REGISTRATION");
        return (
            <div>
                <h3>HELLO</h3>
            </div>
        )
    }

}

export default Login