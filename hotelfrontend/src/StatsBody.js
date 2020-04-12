/* eslint-disable no-unused-expressions */
import React from 'react';
import stat1 from './images/stat1.png';
import stat2 from './images/stat2.png';
import stat3 from './images/stat3.png';
import Rating from '@material-ui/lab/Rating';

export class StatsBody extends React.Component {

    state = { stats: true };

    renderStatsBody() {
        return(
            <div className="container">
            <div className="d-flex justify-content-center">
                <div className="row">
                    <div style={{marginTop: '30px'}}> 
                        <h6>Hotel average rating:</h6>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-center" style={{marginBottom: '60px'}}>
                <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly size="large" />
            </div>
                <div className="row justify-content-center">
                    <div class="card-deck">
                        <div class="card text-center border-0">
                          <img src={stat1} alt="rooms available"/>
                          <div class="card-body">
                            <h5 class="card-title">Rooms available:</h5>
                            <p class="card-text">__</p>
                          </div>
                        </div>
                        <div class="card text-center border-0">
                          <img src={stat2} alt="number of bookings so far"/>
                          <div class="card-body">
                            <h5 class="card-title">Bookings so far:</h5>
                            <p class="card-text">__</p>
                          </div>
                        </div>
                        <div class="card text-center border-0">
                          <img src={stat3} alt="most popular room type"/>
                          <div class="card-body">
                            <h5 class="card-title">Most popular view:</h5>
                            <p class="card-text">__</p>
                          </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
            if(this.state.stats === true) {
                return this.renderStatsBody();
            }
            // else render AppBody
            return(
                <h1>Not good!</h1>
            );
    }    
}
export default StatsBody;