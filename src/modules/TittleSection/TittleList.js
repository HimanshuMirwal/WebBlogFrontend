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
            <>
                <nav class="navbar navbar-expand-lg NavBarCustom">
                    <button onClick={() => this.myFunction()} class="navbar-toggler BottonToggle" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        {(this.state.toggle) ? <i className="fa 2x fa-caret-up " aria-hidden="true"></i> : <i className="fa fa-caret-down" aria-hidden="true"></i>}
                    </button>
                    <SearchBar/>
                    <div class="collapse navbar-collapse" style={{width:"75%"}} id="navbarSupportedContent">
                    
                    <FullPage DataList={this.state.DataList} dataSubTitle={this.state.dataSubTitle} />
                    <MobilePage DataList={this.state.DataList} dataSubTitle={this.state.dataSubTitle} />
                    </div>
                </nav>
                </>
        );
    }
}

const FullPage = (props)=>{
return(
    <p style={{margin:"0",  width: "100%"}}>
                    <ul class="navbar-nav mr-auto">
                    <p style={{margin:"0", width: "100%"}} className="DisplayFull">
                            {
                                props.DataList.map((data) => {
                                    return (<>
                                        <li class="nav-item dropdown FullPage1stLiItem">
                                        <a class="nav-link dropdown-toggle TittleLink" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            {data.TittleName}
                                        </a>
                                        <div class="dropdown-menu DropDownMenu" aria-labelledby="navbarDropdown">
                                            {
                                                props.dataSubTitle.map(subtittle => {
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
                                
                                    </>)

                                })
                            }
                            </p>

                            
                        </ul>
                        </p>
)
}
const MobilePage = (props)=>{
    return( 
            <ul class="navbar-nav mr-auto ULDisplay" >
                                {
                                    props.DataList.map((data) => {
                                        return (<>
                                            <li class="nav-item dropdown">
                                            <a class="nav-link dropdown-toggle TittleLink" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                {data.TittleName}
                                            </a>
                                            <div class="dropdown-menu DropDownMenu" aria-labelledby="navbarDropdown">
                                                {
                                                    props.dataSubTitle.map(subtittle => {
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
                                        </>)
                                    })
                                }
                            </ul>
    )
    }
export default App;
