import React, {Component} from "react"

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
            items: []
        };
        this.loginHandleClick = this.loginHandleClick.bind(this);
        this.registrationHandleClick = this.registrationHandleClick.bind(this);
    }

    render() {
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
        fetch('http://localhost:8080/user/create/', {
            method: 'POST',
            dataType: 'JSON',
            headers: {
                'Content-Type': 'application/json',
            },
            body: '{ "name": "yourValue",  "passwoed": "ourOtherValue" }'
        })
            .then(res => {
                return res.json();
            })
            .then(data => {
                const iii = data;
                console.log(iii);
                alert(iii);
                this.setState({items: data});
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