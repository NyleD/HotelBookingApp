/* eslint-disable no-unused-expressions */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import hallway from './images/hotel-hallway.jpg';
import bedroom from './images/hotel-bedroom.jpg';
import bathroom from './images/hotel-bathroom.jpg'

export class AppBody extends React.Component {

    state = {
        isLoading: true,
        error: null,
        allData: [],
        results: [],
        favourites: [],
        takeout: false,
        coffee: false,
        bluebin: false
    };

    componentDidMount() {
        this.fetchUsers();
    }

    fetchUsers() {
        fetch(`https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000`)
            .then(response => response.json())
            .then(data =>
                this.setState({
                    allData: data,
                })
            )
            .catch(error => this.setState({ error, isLoading: false }));
    }


    searchData(searchVal){

        let data = this.state.allData;
        var results = [];
        if(this.state.takeout){
            searchVal = "takeout";
        } else if (this.state.coffee){
            searchVal = "Coffee";
        } else if (this.state.bluebin){
            searchVal = "Blue Bin";
        }
        //var searchField = "category";
        for (let i=0 ; i < data.length ; i++)
        {
            if (JSON.stringify(data[i]).includes(searchVal) && searchVal !== ''){
                results.push(data[i]);
            }
        }

        this.setState({
            isLoading: false,
            results: results
        });
    }

    addFavourites(result, name){
        if(this.state.favourites.includes(result)){
            return;
        }
        let favs = [];
        localStorage.setItem(result.title, JSON.stringify(result));
        favs.push(result);
        this.setState({
            favourites: this.state.favourites.concat(favs)
        });
        let hi = document.getElementsByClassName(name);
        hi[0]['style']['color'] = "seagreen";
    }

    remFavourites(favourite, name, index){

        let favs = this.state.favourites;
        favs.splice(index, 1);
        this.setState({
            favourites: favs
        });

        let hi = document.getElementsByClassName(name);
        hi[0]['style']['color'] = "darkgray";
    }

    renderFavBar(){
        const { favourites } = this.state;
        return (
            <div className="minty">
                <h3 className="favsBar">
                    <strong>
                        Favourites
                    </strong>
                </h3>
                {favourites.map((favourite,index) => {
                    let btnName = "btn toBeFaved" + favourite.title;
                    const FavStyle = {
                        color: 'seagreen',
                    };
                    const favResultsBody = ((favourite.body).replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&"));
                    return(
                        <div className="container">
                        <div className="row">
                            <span className="input-group-btn">
                                <button className={btnName} onClick={() => this.remFavourites(favourite, btnName, index)} style={FavStyle}>
                                    <FontAwesomeIcon className="favStar" icon="star" />
                                </button>
                            </span>
                            <div className="col-3 titleDisplay">{favourite.title}</div>
                            <div className="col-8" dangerouslySetInnerHTML={ { __html : favResultsBody }}/>
                            <br />
                        </div>
                    </div>
                    );
                })
                }
            </div>
        );
    }

    renderSearchBar(){
            return (
                <div className="container">
                    <div className="row">
                        <input type="text" className="input col-10" placeholder="Search..."  />
                        <div className="col-1"> </div>
                        <button className="btn btn-success"><FontAwesomeIcon icon="search" rotation={90}/></button>
                    </div>
                    <br />
                    <div className="row ">
                        <div className="col-4"> <button className="btn btn-success" onClick={() => this.searchData('takeout')}>Takeout <FontAwesomeIcon icon="search" rotation={90}/></button> </div>
                        <div className="col-4"><button className="btn btn-success" onClick={() => this.searchData('Blue Bin')}>Blue Bin <FontAwesomeIcon icon="search" rotation={90}/></button> </div>
                        <div className="col-4"><button className="btn btn-success" onClick={() => this.searchData('coffee')}>Coffee <FontAwesomeIcon icon="search" rotation={90}/></button> </div>
                    </div>
                    <br />

                </div>
            );
        }

    renderImages(){
        return(
            <div className="container">
                <div className="row">
                   <img className="col-4 bluebin img-fluid img-responsive" src={hallway} alt="Hallway" />
                    <img className="col-4 bluebin img-fluid img-responsive" src={bedroom} alt="Bedroom" />
                    <img className="col-4 bluebin img-fluid img-responsive" src={bathroom} alt="Bathroom" />
                </div>
            </div>

        )
    }


    render(){
        const { isLoading, error, results} = this.state;
        return(
            <div>
                {error ? <p>{error.message}</p> : null}
                {this.renderSearchBar()}
                {!isLoading ? (results.map((result,index) => {
                    let btnName = "btn toBeFaved" + result.title;
                    const notFavStyle = {
                        color: 'darkgray',
                    };

                    const resultsBody = ((result.body).replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&"));
                    return (
                    <div className="container">
                        <div className="row">
                            <span className="input-group-btn">
                                <button className={btnName} onClick={() => this.addFavourites(result, btnName )} style={notFavStyle}>
                                    <FontAwesomeIcon className="favStar" icon="star" />
                                </button>
                            </span>
                            <div className="col-3 titleDisplay">{result.title}</div>
                            <div className="col-8" dangerouslySetInnerHTML={ { __html : resultsBody }}/>
                            <br />
                        </div>
                    </div>
                    );
                })) : (
                    <h5 className="col-12">Click one of the above buttons to mock a search and go ahead and Favourite/Unfavourite them!</h5>
                )}
                {this.renderFavBar()}
                {this.renderImages()}
            </div>
        );
    }
}

export default AppBody;