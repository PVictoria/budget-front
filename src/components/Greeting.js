import React, {Component} from "react";
import Navigation from "./Navigation";

class Greeting extends Component {

    constructor(props) {
        super(props);
        console.log("id " + props.history.id);
        console.log("local " + localStorage.getItem('userSecretId'));

        this.state = {
            id: localStorage.getItem('userSecretId'),
            items: []

        };
    }

    componentDidMount() {
        if (this.state.id === 'null') {
            this.props.history.push('/login');
            return;
        }
        fetch("http://localhost:8080/user/" + this.state.id, {
            method: "GET",
            dataType: "JSON",
        })
            .then((resp) => {
                return resp.json();
            })
            .then((data) => {
                this.setState({items: data});
            })
            .catch((error) => {
                console.log(error, "catch the hoop")
            })
    }

    render() {
        return (
            <div className="row" style={{height: '100%'}}>
                <div className="col-sm-3  menu-style" style={{width: '100%'}}><Navigation/></div>
                <div className="col-sm-15  all-elements-padding" style={{width: '75%'}}>
                    <h2 className="page-header">Hello, {this.state.items.name}!</h2>
                </div>
            </div>
        )
    }
}

export default Greeting