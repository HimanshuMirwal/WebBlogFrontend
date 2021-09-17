import React, { Component } from "react";
import Logo from "../logoSection/Logo";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Footer from "../FooterSection/Footer";
import Axios from "axios";
import "./css/FullDescription.css";
import { Link } from "react-router-dom";
import parse from 'html-react-parser';

export default class FullDescription extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Data: {
                LinksName: []
            },
        }
        this.onClickGotoTop = this.onClickGotoTop.bind(this);
    }
    componentDidMount(props) {
        const len = this.props.match.params.Value.length;
        const fromNotifications = this.props.match.params.Value.substring(1, len);
        console.log(fromNotifications);
        Axios.get("https://obscure-lake-21900.herokuapp.com/place/getplace/:" + fromNotifications)
            .then((res) => {
                this.setState({
                    Data: {...res.data ,
                            PlaceTourExplaination:parse(res.data.PlaceTourExplaination),
                            LinksName:res.data.imageLinksArray.map(data=> { return data})   
                        },

                    
                })
            })
            .catch(Err => alert(Err));
    }
    onClickGotoTop() {
        document.getElementById("top").scrollIntoView(true)
        
    }
    render() {
        return (
            <>
                <Logo />
               
                <div className="FullDescriptionMain">
                    <div className="DescriptionContent">
                        <h2 className="descriptionHeading" id="top">
                            {this.state.Data.PlaceForTour}
                        </h2>
                        <hr></hr>

                        <button id="" className="btn  btn-success myBtn" onClick={() => this.onClickGotoTop()}>
                            <i className="fa fa-arrow-up"></i>
                        </button>

                        <h4><p className="descriptionFirstPAragraph">
                            {this.state.Data.city}
                        </p></h4>
                        
                        <Carousel autoPlay infiniteLoop interval="3000">
                            {
                                 this.state.Data.LinksName.map((user) => {
                                    return  <div key={user}><img height="500px" width="100%" src={user} /> </div>
                            })
                            }
                        </Carousel>
                        
                        <hr></hr>
                        <span className="descriptionParagraph" id="viewinfo">
                            {this.state.Data.PlaceTourExplaination}
                        </span>
                        <Link to={"/"}>
                            <button style={{marginTop:"5%"}} className="btn btn-success">back</button>
                        </Link>
                    </div>
                </div>
                <Footer />
            </>
        )
    }
}