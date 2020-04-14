/* eslint-disable no-unused-expressions */
import React from 'react';
import stat1 from './images/stat1.png';
import stat2 from './images/stat2.png';
import stat3 from './images/stat3.png';
import Rating from '@material-ui/lab/Rating';

export class StatsBody extends React.Component {

    state = { avgRating: null,
              sumBookings: null,
              sumEmptyRooms: null,
              mostPopularView: null
    };

    componentDidMount() {
    fetch('http://127.0.0.1:8000/avgRating')
      .then(response => response.json())
      .then(data => this.setState({ avgRating: data.rating__avg }));

      fetch('http://127.0.0.1:8000/sumBookings')
      .then(response => response.json())
      .then(data => this.setState({ sumBookings: data }));

      fetch('http://127.0.0.1:8000/sumEmptyRooms')
      .then(response => response.json())
      .then(data => this.setState({ sumEmptyRooms: data }));

      fetch('http://127.0.0.1:8000/mostPopularView')
      .then(response => response.json())
      .then(data => this.setState({ mostPopularView: data.room__view }));
    }


    renderStatsBody() {
        const stats = this.state
        var rating = parseFloat(stats.avgRating);
        var rooms = parseInt(stats.sumEmptyRooms);
        var bookings = parseInt(stats.sumBookings);

        console.log(rating)
        return(
            <div className="container">
            <div className="d-flex justify-content-center">
                <div className="row">
                    <div style={{marginTop: '0px'}}> 
                        <h6>Hotel average rating:</h6>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-center" style={{marginBottom: '60px'}}>
                <Rating name="half-rating-read" value={rating} precision={0.5} readOnly size="large" />
            </div>
                <div className="row justify-content-center" style={{marginBottom: '60px'}}>
                    <div className="card-deck">
                        <div className="card text-center border-0">
                          <img src={stat1} alt="rooms available"/>
                          <div className="card-body">
                            <h5 className="card-title">Rooms available:</h5>
                            <p className="card-text">{rooms}</p>
                          </div>
                        </div>
                        <div className="card text-center border-0">
                          <img src={stat2} alt="number of bookings so far"/>
                          <div className="card-body">
                            <h5 className="card-title">Customers received so far:</h5>
                            <p className="card-text">{bookings}</p>
                          </div>
                        </div>
                        <div className="card text-center border-0">
                          <img src={stat3} alt="most popular room type"/>
                          <div className="card-body">
                            <h5 className="card-title">Most popular view:</h5>
                            <p className="card-text">{stats.mostPopularView}</p>
                          </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
            if(true) {
                return this.renderStatsBody();
            }
            // else render AppBody
            return(
                <h1>Not good!</h1>
            );
    }    
}
export default StatsBody;