import React from 'react';
import "./Css/TittleList.css";
import Axios from "axios";
import { Link } from 'react-router-dom';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            DataList: [],
            TitleValue: null,
            dataSubTitle: [],
            toggle: false
        };
        this.myFunction = this.myFunction.bind(this);
    }
    componentDidMount(props) {
        Axios.get("https://obscure-lake-21900.herokuapp.com/tittle/gettitle/")
            .then(
                (result) => {
                    this.setState({
                        DataList: result.data
                    });
                },
                (error) => {
                    console.log(error);
                }
            )
        Axios.get("https://obscure-lake-21900.herokuapp.com/subtittle/getsubtitle/")
            .then((res) => {
                // console.log(res)
                this.setState({
                    dataSubTitle: res.data
                })
            }).catch(Err => console.log(Err));
    };

    myFunction() {
        alert("Clicked")
    }
    render() {
        return (
                <div className="SearchbarDiv">
                <input className="form-control" style={{width:"85%", float:"left"}} type="text"></input>
                <i onClick={()=>this.myFunction()} style={{float:"right", fontSize:"40px", color:"#F9F8ED"}} class="fa 7x fa-search"></i>
                </div>
        );
    }
}


export default SearchBar;
