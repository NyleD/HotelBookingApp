
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'bootstrap/dist/css/bootstrap.css';
import addBookingIcon from './images/add.png';
import manageBookingIcon from './images/manage.png';
import statsIcon from './images/stats.png';

export class HomePage extends React.Component {

    render(){
        return(
        <div>
        <div class="container">
            <div class="row">
            <div class="col-sm">
            <div class="card text-center">
              <div class="card-header"></div>
              <div class="card-body">
                <h5 class="card-title">Create a Booking</h5>
                <img src={addBookingIcon} alt="add booking icon" width="100" height="100"/><br/><br/>
                <a href="/Search" class="btn btn-info">Book Now!</a>
              </div>
              <div class="card-footer"></div>
            </div>
            </div>
            <div class="col-sm">
            <div class="card text-center">
              <div class="card-header"></div>
              <div class="card-body">
                <h5 class="card-title">Manage a Booking</h5>
                <img src={manageBookingIcon} alt="manage Booking Icon" width="100" height="100"/><br/><br/>
                <a href="/MyBookings" class="btn btn-info">View Bookings!</a>
              </div>
              <div class="card-footer"></div>
            </div>
            </div>
            <div class="col-sm">
            <div class="card text-center">
              <div class="card-header"></div>
              <div class="card-body">
                <h5 class="card-title">View Hotel Statistics</h5>
                <img src={statsIcon} alt="stats Icon" width="100" height="100"/><br/><br/>
                <a href="/Stats" class="btn btn-info">Check Stats!</a>
              </div>
              <div class="card-footer"></div>
            </div>
            </div>
            </div>
            </div>
            <div>
            <p class="footer"> &copy; BookBookGo 2020. All Rights Reserved. </p>
            </div>
            </div>

        );
    }
}

export default HomePage;