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
                    <button onClick={this.registrationHandleClick}>CREATE</button>
                </dev>
            </div>
        )
    }

    loginHandleClick = () => {
        if (this._username.value.length === 0 || this._password.value.length === 0) {
            alert("Имя или пароль не должны быть пустыми")
        }
        fetch('http://localhost:8080/user', {
            method: 'POST',
            dataType: 'JSON',
            headers: {
                'Content-Type': 'application/json',
            },
            body: '{ "name" : "' + this._username.value + '",  "password" : "' + this._password.value + '" }'
        })
            .then(res => {
                return res.json();
            })
            .then(data => {
                this.setState({id: data.id});
                localStorage.setItem('userSecretId', this.state.id);
                this.props.history.push({pathname: '/greeting', state: {id: this.state.id}})
            })
            .catch(err => {
                console.log(err);
                alert("Пользователь с таким именеи и паролем не найден")
            });
    };
    //todo: второй раз пароль не скрывается
    registrationHandleClick = () => {
        if (this._username.value.length === 0 || this._password.value.length === 0) {
            alert("Имя или пароль не должны быть пустыми");
            return;
        }
        var password2 = prompt("Please enter your password again", "");
        if (password2 !== this._password.value) {
            alert("Пароли не совпали");
        } else {
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
                    if (data.status === 500) {
                        console.log("ERRRR");
                        alert("Пользователь с таким именем уже существкет");
                        return;
                    }

                    this.setState({id: data.id});
                    console.log(this.state.id);
                    localStorage.setItem('userSecretId', this.state.id);
                    this.props.history.push('/greeting')
                })
                .catch(err => {
                    console.log(err);
                    alert("Не удалось создать пользователя");
                });
        }
    }

}

export default Login