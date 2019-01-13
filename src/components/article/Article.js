import React from 'react';
import ReactTable from "react-table";
import Navigation from "../Navigation";

class Article extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selected: [],
            selectedNames: [],
            items: [],
            rowNum: 0
        };
        this.deleteHandleClick = this.deleteHandleClick.bind(this);
    }

    componentDidMount() {
        if (this.state.id === 'null') {
            this.props.history.push('/login');
            return;
        }
        fetch("http://localhost:8080/article", {
            method: "GET",
            dataType: "JSON",
        })
            .then((resp) => {
                return resp.json();
            })
            .then((data) => {
                this.setState({items: data});
                this.setState({rowNum: this.state.items.length});
            })
            .catch((error) => {
                console.log(error, "catch the hoop")
            });
    }

    render() {
        console.log("renderTable");
        console.log(this.state.items.length);

        const columns = [
            {
                Header: 'Name',
                accessor: 'name',
            },
            {
                Header: 'Selection',
                accessor: '',
                width: 100,
                Cell: ({original}) => {
                    return (<input
                        style={{width: '15px', height: '15px'}}
                        type="checkbox"
                        className="checkbox item-font-color"
                        onChange={() => this.onCheckboxChange(original.name)}
                    />);
                }
            }
        ];
        return (
            <div className="row" style={{height: '100%'}}>
                <div className="col-sm-3  menu-style" style={{width: '100%'}}><Navigation/></div>
                <div className="col-sm-15 all-elements-padding" style={{width: '75%'}}>

                    <button className="button-position" style={{'margin': '10px', 'right': '150px'}}
                            onClick={this.createHandleClick}>Create
                    </button>
                    <button className="deletion-button button-position" style={{margin: '10px'}}
                            onClick={this.deleteHandleClick}>Delete
                    </button>
                    <h1 className="page-header">Articles</h1>
                    <ReactTable className="item-font-color"
                                data={this.state.items}
                                columns={columns}
                                defaultSorted={[{id: "name", desc: false}]}
                                showPagination={true}
                                loadingText=""
                                defaultPageSize={10}
                    />
                </div>
            </div>
        );
    }

    onCheckboxChange(name) {
        console.log(name);
        const newSelected = Object.assign({}, this.state.selected);
        newSelected[name] = !this.state.selected[name];
        this.setState({selected: name});
        if (this.state.selectedNames.indexOf(name) === -1) {
            this.state.selectedNames.push(name);
        } else {
            this.state.selectedNames.splice(this.state.selectedNames.indexOf(name), 1);
        }
        console.log("-------------");
        this.state.selectedNames.forEach(value => console.log('list ' + value));
        console.log("......................");
    };

    deleteHandleClick = () => {
        console.log("DELETEON-------------");
        this.state.selectedNames.forEach(value => {
            console.log('list ' + value)
            this.deleteArticle(value);
        });
        console.log("DELETEON......................");
        console.log(this.selectedNames);
    };

    createHandleClick = () => {
        this.props.history.push('/create-article');
    }


    deleteArticle(value) {
        fetch("http://localhost:8080/article/" + value, {
            method: "DELETE",
            dataType: "JSON",
        })
            .then(res => {
                if (res.status === 500) {
                    alert("Невозможно удалить эту статью, возможно, она где-то используется");
                } else {
                    window.location.reload();
                }
            })
            .catch((error) => {
                console.log(error, "catch the hoop")
            });

    }
}


export default Article;
