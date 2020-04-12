
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'bootstrap/dist/css/bootstrap.css';

export class AddBooking extends React.Component {

    state = {
        numGuests: null,
        numBeds: 0,
        view: "",
        luxury: "",
        checkin: "",
        checkout: ""
    };

    constructor(props) {
        super(props);
        this.handleGuests = this.handleGuests.bind(this);
        this.handleBeds = this.handleBeds.bind(this);
        this.handleView = this.handleView.bind(this);
        this.handleLuxury = this.handleLuxury.bind(this);
        this.handleCheckin = this.handleCheckin.bind(this);
        this.handleCheckout = this.handleCheckout.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      handleGuests(event) {
         this.setState({numGuests: event.target.value});
      }

      handleBeds(event) {
        this.setState({numBeds: event.target.value});
      }

      handleView(event) {
        this.setState({view: event.target.id});
      }

      handleLuxury(event) {
        this.setState({luxury: event.target.id});
      }

      handleCheckin(event) {
        this.setState({checkin: event.target.value});
      }

      handleCheckout(event) {
         this.setState({checkout: event.target.value});
      }

      handleSubmit(event) {
        alert('Checkin date is : ' + this.state.checkin);
        event.preventDefault();
      }

    render(){
        return(
            <div class="container pb-3">
                <form onSubmit={this.handleSubmit} class="mx-auto col-4 p-3 border border-info rounded">
                    <div class="form-group">
                        <label><strong> Number of Guests </strong></label>
                        <input class="form-control" type="number" value={this.state.numGuests} onChange={this.handleGuests} />
                    </div>
                    <div class="form-group">
                        <label><strong> Number of Beds </strong></label>
                        <input class="form-control" type="number" value={this.state.numBeds} onChange={this.handleBeds} />
                    </div>
                    <div class="form-group">
                        <label><strong> Type of View </strong></label><br/>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input"  type="radio" id="street" name="view" value="street"  value={this.state.view} onChange={this.handleView} />
                            <label class="form-check-label"  for="street"> Street</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input"  type="radio" id="garden" name="view" value="garden"  value={this.state.view} onChange={this.handleView} />
                            <label class="form-check-label"  for="garden"> Garden</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input"  type="radio" id="river" name="view" value="river"  value={this.state.view} onChange={this.handleView} />
                            <label class="form-check-label"  for="river"> River</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input"  type="radio" id="skyline" name="view" value="skyline"  value={this.state.view} onChange={this.handleView} />
                            <label class="form-check-label"  for="skyline"> City Skyline</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input"  type="radio" id="none" name="view" value="none"  value={this.state.view} onChange={this.handleView} />
                            <label class="form-check-label"  for="none"> No View</label>
                        </div>
                    </div>
                    <div class="form-group">
                        <label><strong> Type of Suite </strong></label><br/>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" id="single" name="luxury" value="single"  value={this.state.luxury} onChange={this.handleLuxury} />
                            <label class="form-check-label" for="single"> Single</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" id="double" name="luxury" value="double"  value={this.state.luxury} onChange={this.handleLuxury} />
                            <label class="form-check-label" for="double"> Double</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" id="queen" name="luxury" value="queen"  value={this.state.luxury} onChange={this.handleLuxury} />
                            <label class="form-check-label" for="queen"> Queen</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" id="king" name="luxury" value="king"  value={this.state.luxury} onChange={this.handleLuxury} />
                            <label class="form-check-label" for="king"> King</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" id="studio" name="luxury" value="studio"  value={this.state.luxury} onChange={this.handleLuxury} />
                            <label class="form-check-label" for="studio"> Studio</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" id="master" name="luxury" value="master"  value={this.state.luxury} onChange={this.handleLuxury} />
                            <label class="form-check-label" for="master"> Master</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" id="president" name="luxury" value="president"  value={this.state.luxury} onChange={this.handleLuxury} />
                            <label class="form-check-label" for="president"> Presidential</label>
                        </div>
                    </div>
                    <div class="form-group">
                        <label><strong> Check-In Date </strong></label>
                        <input class="form-control"  type="date" id="checkin" name="checkin"  value={this.state.checkin} onChange={this.handleCheckin} />
                    </div>
                    <div class="form-group">
                        <label><strong> Check-Out Date </strong></label>
                        <input class="form-control"  type="date" id="checkout" name="checkout"  value={this.state.checkout} onChange={this.handleCheckout} />
                    </div>
                    <div>
                        <input class="btn btn-success"  type="submit" value="Search!"/>
                    </div>
                    </form>
            </div>
        );
    }
}

export default AddBooking;