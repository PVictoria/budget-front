import React from "react";
import Navigation from "../Navigation";

class CreateArticle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: localStorage.getItem('userSecretId'),
        };
    }

    componentDidMount() {
        if (this.state.id === 'null') {
            this.props.history.push('/login');
        }
    }

    render() {
        return (
            <div className="row" style={{height: '100%'}}>
                <div className="col-sm-3  menu-style" style={{width: '100%'}}><Navigation/></div>
                <div className="col-sm-15 all-elements-padding" style={{width: '75%'}}>
                    <h1 className="page-header">Create Article</h1>
                    <input ref={input => (this._article = input)}
                           id="article"
                           name="article"
                           required="true"
                           placeholder="New article"/>
                    <button onClick={this.createHandleClick}>Create</button>
                    <button onClick={this.cancelHandleClick}>Cancel</button>

                </div>
            </div>
        );
    }

    createHandleClick = () => {
        if (this._article.value.length === 0) {
            alert("Название не может быть пустым");
            return;
        }
        if (!this._article.value.match("^[a-zA-Z0-9_.-]*$")) {
            alert("Название статьи может сожержать только буквы, цифры и символы '_'  '.'  '-'  ");
            return;
        }
        fetch("http://localhost:8080/article", {
            method: "POST",
            dataType: "JSON",
            headers: {
                'Content-Type': 'application/json',
            },
            body: '{ "name" : "' + this._article.value + '" }'
        }).then(res => {
            if (res.ok) {
                this.props.history.push("/articles")
            } else {
                alert("Статья стаким названием уже существует");
            }
        });
    };

    cancelHandleClick = () => {
        document.getElementById("article").value = "";
    };
}

export default CreateArticle;