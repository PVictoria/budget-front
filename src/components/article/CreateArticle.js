import React from "react";
import Navigation from "../Navigation";

class CreateArticle extends React.Component {
    componentDidMount() {
        if (this.state.id === 'null') {
            this.props.history.push('/login');
        }
    }

    render() {
        return (
            <div className="row">
                <div className="col-sm-3  menu-style" style={{width: '100%'}}><Navigation/></div>
                <div className="col-sm-15" style={{width: '75%'}}>
                    <h1>Create Article</h1>
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