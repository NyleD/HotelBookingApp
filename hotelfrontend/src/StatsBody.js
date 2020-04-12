/* eslint-disable no-unused-expressions */
import React from 'react';
import stat1 from './images/stat1.png';
import stat2 from './images/stat2.png';
import stat3 from './images/stat3.png';

export class StatsBody extends React.Component {

    state = { stats: true };

    renderStatsBody() {
        return(
            <div className="container">
            <div className="d-flex justify-content-center">
                <div className="row">
                    <div style={{marginTop: '60px'}}> 
                        <h6>The hotel's average rating:</h6>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-center" style={{marginBottom: '60px'}}>
                <div className="row">__</div>
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