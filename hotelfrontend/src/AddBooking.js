import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'bootstrap/dist/css/bootstrap.css';

export class AddBooking extends React.Component {

    state = {
        numGuests: null,
        numBeds: null,
        view: "",
        luxury: "",
        checkin: "",
        checkout: "",
        error: null,
        rooms: [],
        available: [],
        ready: false,
        name: null,
        email: null,
        favourites: [],
        bookingSuccess: false,
        successIndex: null,
        unavailable: false
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
        this.handleName = this.handleName.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
      }

      handleGuests(event) {
         this.setState({numGuests: event.target.value});
      }

      handleBeds(event) {
        this.setState({numBeds: parseInt(event.target.value)});
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
        this.filterRooms();
        event.preventDefault();
      }

      handleName(event){
        this.setState({name: event.target.value});
      }

      handleEmail(event){
        this.setState({email: event.target.value});
      }

      confirmBooking(index){
          var inpObj = document.getElementById("cform");
          if (inpObj.checkValidity()) {
                this.setState({
                bookingSuccess: true,
                successIndex: index
                });
          } else {
            alert("Please fill both name and e-mail fields inorder to book this room.");
          }
      }

      checkCustomer(room_id){
        var url = "http://127.0.0.1:8000/filterCustomers?name=" + this.state.name + "&email=" + this.state.email;
        fetch(url).then(response => response.json()).then((data) => {
            if(data.length == 0){
               this.addCustomer(room_id);
            } else {
                let customerId = data[0]["pk"];
                this.addBooking(customerId, room_id);
            }
        }).catch(console.log("Checking if customer exists, adding if doesn't exist and then making a booking under their id"));
        }


      addCustomer(room_id){
        var url = "http://127.0.0.1:8000/api/customers/";
        fetch(url, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email
            })
        }).then( () => {
        this.checkCustomer(room_id);
        }).catch(console.log("Waiting to Add Customer"));
      }

       addBooking(customerId, room_id){
              var url = "http://127.0.0.1:8000/api/bookings/";
              fetch(url, {
                  method: "POST",
                  headers: { "Content-type": "application/json" },
                  body: JSON.stringify({
                      "customer": customerId,
                      "room": room_id,
                      "numguests": this.state.numGuests,
                      "cancelled": false,
                      "checkin": this.state.checkin,
                      "checkout": this.state.checkout,
                      "rating": 0
                  })
              });
            }

      renderSuccess(index){
        var booking = this.state.available[index];
        let one = "number ";
        let two = " in";
        let matched = booking.match(new RegExp(one + "(.*)" + two));
        let room_id = matched[1];
        this.checkCustomer(room_id);
        var booked = booking.replace("available", "now booked") + "<p>Booking is under the name " + this.state.name + " and a confirmation e-mail will be sent shortly to " + this.state.email + " .</p>Thank you for visiting Book Book Go, have a great day! &#128516;";
        return(
        <div class="alert alert-success alert-dismissible fade show m-3 p-3">
            <strong>Success!</strong> <span dangerouslySetInnerHTML={ { __html : booked }}/>
            <button type="button" class="close" data-dismiss="alert">&times;</button>
        </div>
        );
      }


      addFavourites(result, name, index, room_id){
      console.log("Adding to Favs");
              if(this.state.favourites.includes(result)){
                  return;
              }
              let favs = [];
              localStorage.setItem(room_id, JSON.stringify(result));
              favs.push(result);
              this.setState({
                  favourites: this.state.favourites.concat(favs)
              });
              let hi = document.getElementsByClassName(name);
              hi[0]['style']['color'] = "seagreen";
          }

     remFavourites(favourite, name, index, room_id){

            let favs = this.state.favourites;
            favs.splice(index, 1);
            this.setState({
                favourites: favs
            });
            localStorage.removeItem(room_id);
            let hi = document.getElementsByClassName(name);
            hi[0]['style']['color'] = "darkgray";
        }

      renderCustomerDeets(index){
          return(
          <div class="row p-3 m-3">
          <form id="cform">
            <div class="form-row">
              <div class="col">
                <input type="text" class="form-control" placeholder="Name" value={this.state.name} onChange={this.handleName} required/>
              </div>
              <div class="col">
                <input type="email" class="form-control" placeholder="E-mail"  value={this.state.email} onChange={this.handleEmail} required/>
              </div>
              <div class="col">
                <input class="btn btn-success" onClick={() => this.confirmBooking(index)} type="button" value="Book!"/>
              </div>
            </div>
            </form>
          </div>
          );
      }


      renderNoResults(){
      return(
        <div class="p-3 m-3 alert alert-danger alert-dismissible fade show">
            <span><strong>Sorry!</strong> There are no rooms available that match your search criteria. Please search with different criteria.</span>
        </div>);
      }


      renderSearchResults() {
       const { available } = this.state;
       return (
         <div className="col-8">
          {available.map((result,index) => {
          let one = "number ";
          let two = " in";
          let matched = result.match(new RegExp(one + "(.*)" + two));
          var room_id = matched[1];
          var btnName = "btn toBeFaved p-3 " + room_id;
          const notFavStyle = {color: 'darkgray'};
          const resultsBody = result;
            return (
              <div class="alice container mb-2 border border-success rounded">
              <div>
                <div class="row">
                    <span class="input-group-btn">
                        <button className={btnName} onClick={() => this.addFavourites(result, btnName, index, room_id)} style={notFavStyle}>
                            <FontAwesomeIcon className="favStar" icon="star" />
                        </button>
                    </span>
                    <span class="col-10 p-3" dangerouslySetInnerHTML={ { __html : resultsBody }}/>
                    <br />
                    </div>
                    {this.renderCustomerDeets(index)}
                </div>
              </div> );})}
          </div> );}



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
                        let one = "number ";
                        let two = " in";
                        let matched = favourite.match(new RegExp(one + "(.*)" + two));
                        var room_id = matched[1];
                        let btnName = "btn toBeFaved p-3 " + room_id;
                          const FavStyle = {
                              color: 'seagreen',
                          };
                          const favResultsBody = favourite;
                          return(
                              <div className="container">
                              <div className="row">
                                  <span className="input-group-btn">
                                      <button className={btnName} onClick={() => this.remFavourites(favourite, btnName, index, room_id)} style={FavStyle}>
                                          <FontAwesomeIcon className="favStar" icon="star" />
                                      </button>
                                  </span>
                                  <div className="col-8" dangerouslySetInnerHTML={ { __html : favResultsBody }}/>
                                  <br /> <br />
                              </div>
                          </div>
                          );
                      })
                      }
                  </div>
              );
          }

      makeRoomAvailable(room_id){
        var availableRooms = this.state.available;
        var availableInfo = "Room number " + room_id + " in the " + this.state.luxury + " suite comes with " + this.state.numBeds + " beds, and has a " + this.state.view +
        ". It is available from " + this.state.checkin + " to " + this.state.checkout + "!";
        availableRooms.push(availableInfo);
        this.setState({
        available: availableRooms,
        ready: true
        });
        console.log(this.state.available);
      }


      filterBookings(){
        var len = this.state.rooms.length;
        for(let i = 0; i < len; i++){
            let room_id = this.state.rooms[i]["pk"]
            console.log(this.state.rooms[i]["pk"]);
            var url = "http://127.0.0.1:8000/filterBookings?room_id=" + room_id + "&checkin=" + this.state.checkin + "&checkout=" + this.state.checkout;
            fetch(url).then(response => response.json()).then((data) => {
                        if(data.length == 0){
                        this.setState({unavailable: false});
                           this.makeRoomAvailable(room_id);
                        } else{
                            this.setState({unavailable: true});
                        }
                    }).catch(console.log("Waiting to filter bookings"));

        }
      }

      filterRooms(){
        var url = "http://127.0.0.1:8000/filterRooms?beds=" + this.state.numBeds + "&view=" + this.state.view + "&luxury=" + this.state.luxury;
        fetch(url).then(response => response.json()).then((data) => {
        console.log(data, "rooms");
        this.setState({rooms: data});
        if(data.length == 0){
             this.setState({unavailable: true});
        } else {
            this.filterBookings();
        }
        }).catch(console.log("Waiting to filter rooms"));
        }


    render(){
      const { ready, available, bookingSuccess, unavailable } = this.state;
        return(
           <div>
           <div style={{ "textAlign":"center" }}><h3>Create a Booking</h3><br/></div>
           { bookingSuccess ? this.renderSuccess(this.state.successIndex) : console.log("didn't succeed")}
           {unavailable ? this.renderNoResults() : console.log("")}
            <div class="container pb-3">
            <div class="row">
                <form onSubmit={this.handleSubmit} class="col-4 p-3 border border-info rounded">
                    <div class="form-group">
                        <label><strong> Number of Guests </strong></label>
                        <input class="form-control" type="number" min="1" max="12" value={this.state.numGuests} onChange={this.handleGuests} required/>
                    </div>
                    <div class="form-group">
                        <label><strong> Number of Beds </strong></label>
                        <input class="form-control" type="number" min="1" max="8" value={this.state.numBeds} onChange={this.handleBeds}  required/>
                    </div>
                    <div class="form-group">
                        <label><strong> Type of View </strong></label><br/>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input"  type="radio" id="Street View" name="view" value="street"  value={this.state.view} onChange={this.handleView} required />
                            <label class="form-check-label"  for="street"> Street</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input"  type="radio" id="Garden View" name="view" value="garden"  value={this.state.view} onChange={this.handleView} />
                            <label class="form-check-label"  for="garden"> Garden</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input"  type="radio" id="River View" name="view" value="river"  value={this.state.view} onChange={this.handleView} />
                            <label class="form-check-label"  for="river"> River</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input"  type="radio" id="City Skyline" name="view" value="skyline"  value={this.state.view} onChange={this.handleView} />
                            <label class="form-check-label"  for="skyline"> City Skyline</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input"  type="radio" id="No View" name="view" value="none"  value={this.state.view} onChange={this.handleView} />
                            <label class="form-check-label"  for="none"> No View</label>
                        </div>
                    </div>
                    <div class="form-group">
                        <label><strong> Type of Suite </strong></label><br/>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" id="single" name="luxury" value="single"  value={this.state.luxury} onChange={this.handleLuxury}  required/>
                            <label class="form-check-label" for="single"> Single</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" id="Double" name="luxury" value="double"  value={this.state.luxury} onChange={this.handleLuxury} />
                            <label class="form-check-label" for="double"> Double</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" id="Queen" name="luxury" value="queen"  value={this.state.luxury} onChange={this.handleLuxury} />
                            <label class="form-check-label" for="queen"> Queen</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" id="King" name="luxury" value="king"  value={this.state.luxury} onChange={this.handleLuxury} />
                            <label class="form-check-label" for="king"> King</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" id="Studio" name="luxury" value="studio"  value={this.state.luxury} onChange={this.handleLuxury} />
                            <label class="form-check-label" for="studio"> Studio</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" id="Master Suite" name="luxury" value="master"  value={this.state.luxury} onChange={this.handleLuxury} />
                            <label class="form-check-label" for="master"> Master</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" id="President Suite" name="luxury" value="president"  value={this.state.luxury} onChange={this.handleLuxury} />
                            <label class="form-check-label" for="president"> Presidential</label>
                        </div>
                    </div>
                    <div class="form-group">
                        <label><strong> Check-In Date </strong></label>
                        <input class="form-control"  type="date" id="checkin" name="checkin"  value={this.state.checkin} onChange={this.handleCheckin}  required/>
                    </div>
                    <div class="form-group">
                        <label><strong> Check-Out Date </strong></label>
                        <input class="form-control"  type="date" id="checkout" name="checkout"  value={this.state.checkout} onChange={this.handleCheckout}  required/>
                    </div>
                    <div>
                        <input class="btn btn-success"  type="submit" value="Search!"/>
                    </div>
                    </form>
                      {ready ? this.renderSearchResults() : console.log("No favs to render yet")}
                      </div>
            </div>
            {this.renderFavBar()}
            </div>
        );
    }
}

export default AddBooking;
