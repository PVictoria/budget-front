import React, {Component} from "react"

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
           value: ''
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

        return (
            <div>
                <h3>HELLO</h3>
            </div>
        )
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