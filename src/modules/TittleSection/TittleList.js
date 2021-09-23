import React from 'react';
import "./Css/TittleList.css";
import Axios from "axios";
import { Link } from 'react-router-dom';
import SearchBar from "./SearchBar";
class App extends React.Component {
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
        (this.state.toggle) ? this.setState({ toggle: false }) : this.setState({ toggle: true });
    }
    render() {
        return (
            <div className="mainTittleCss" >
                <nav class="navbar navbar-expand-lg CustomNavWidth">
                    <button onClick={() => this.myFunction()} class="navbar-toggler BottonToggle" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        {(this.state.toggle) ? <i className="fa 2x fa-caret-up " aria-hidden="true"></i> : <i className="fa fa-caret-down" aria-hidden="true"></i>}
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav mr-auto">
                            {
                                this.state.DataList.map((data) => {
                                    return <li class="nav-item dropdown">
                                        <a class="nav-link dropdown-toggle TittleLink" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            {data.TittleName}
                                        </a>
                                        <div class="dropdown-menu DropDownMenu" aria-labelledby="navbarDropdown">
                                            {
                                                this.state.dataSubTitle.map(subtittle => {
                                                    if (subtittle.TittleName === data.TittleName) {
                                                        return (<Link to={{
                                                            pathname: "/subtitle/" + subtittle.TittleName + "/" + subtittle.subtittleName,
                                                            TitleValue: subtittle.TittleName,
                                                            SubTittleValue: subtittle.subtittleName
                                                        }}
                                                            className="dropdown-item dropDownItem"
                                                        >{subtittle.subtittleName}
                                                        </Link>)
                                                    }
                                                })
                                            }
                                        </div>
                                    </li>

                                })
                            }
                        </ul>
                    </div>
                </nav>
                {/* <SearchBar/> */}
            </div>
        );
    }
}


export default App;
