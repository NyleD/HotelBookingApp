/* eslint-disable no-unused-expressions */
import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Rating from '@material-ui/lab/Rating';

import CreateIcon from '@material-ui/icons/Create';
import CloseIcon from '@material-ui/icons/Close';

const urlBookings = "http://127.0.0.1:8000/api/bookings";
const urlUpdateBookings = "http://127.0.0.1:8000/api/modifyBooking";
const urlRooms = "http://127.0.0.1:8000/api/rooms";

export class MyBookings extends React.Component {
	state = {
		isLoading: true,
		bookingData: [],
		customer: 67,
		newCustomer: 67,
		dialogData: {},
		isDialogOpen: false,
		rooms: [],
		validDates: true,
		validGuests: true,
		isShowAll: true,
		bookingError: false,
	};

	componentDidMount() {
		this.fetchData();
	};

	fetchData() {
		this.fetchBookings()
			.then(() => { this.fetchRooms(); })
			.then(() => {
				this.setState({
					isLoading: false,
				});
			});
		};

	fetchBookings() {
		return fetch(urlBookings+"?customer="+this.state.newCustomer)
			.then((response) => { return response.json(); })
			.then((data) => {
				this.setState({
					bookingData: data,
					isDialogOpen: false,
					customer: this.state.newCustomer,
					bookingError: false,
				});
			});
	};

	fetchRooms() {
		return fetch(urlRooms)
			.then((response) => { return response.json(); })
			.then((data) => {
				this.setState({
					rooms: data,
				});
			})
	};

	openErrorSnackbar() {
		this.setState({
			bookingError: true,
			isDialogOpen: false,
		});
	}

	stringToDate(s) {
		return Date.UTC(parseInt(s.substring(0, 4)), parseInt(s.substring(5, 7))-1, parseInt(s.substring(8, 10)));
	};

	today() {
		var nowDate = new Date();
		return Date.UTC(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate());
	}

	renderFilter() {
		const { isShowAll } = this.state;
		const customerChanged = (event) => {
			this.setState({
				newCustomer: event.target.value,
			});
		};

		const refreshBookings = (event) => {
			this.fetchBookings();
		};

		const toggleDisplay = (event) => {
			this.setState({
				isShowAll: !isShowAll,
			});
		};

		return(
			<div>
				<TextField
					id="outlined-basic"
					label="User ID"
					style={{ margin: 10 }}
					value={this.state.newCustomer}
					onChange={customerChanged}
				/>
				<Button
					variant="contained"
					color="primary"
					onClick={refreshBookings}
				>
					Refresh Bookings
				</Button>
				<Button
					variant="contained"
					color="default"
					onClick={toggleDisplay}
				>
					{ isShowAll ? "Hide" : "Show" } Inactive Bookings
				</Button>
			</div>
		);
	};

	renderTable() {
		const { isLoading, bookingData, customer, isShowAll, } = this.state;
		
		const openDialog = (event, row) => {
			this.setState({
				isDialogOpen: true,
				dialogData: {
					id: row.id,
					checkin: row.checkin,
					checkout: row.checkout,
					room: row.room,
					numguests: row.numguests,
					rating: row.rating,
					cancelled: row.cancelled,
				},
				validDates: true,
				validGuests: true,
			});
		};

		const isEditable = (cancelled, checkin) => {
			var checkinDate = this.stringToDate(checkin);
			var nowDate = this.today();
			return !cancelled && checkinDate > nowDate;
		};

		const setRating = (event, row) => {
			var body = JSON.stringify({
				booking_id: row.id,
				cancelled: row.cancelled,
				checkin: row.checkin,
				checkout: row.checkout,
				customer_id: customer,
				numguests: row.numguests,
				room_id: row.room,
				rating: event.target.value,
			});

			fetch(urlUpdateBookings, {
				method: "PUT",
				body: body,
			}).then((response) => { return response.json(); })
			.then((data) => {
				console.log(data);
				if (data.result == "Fail") {
					this.openErrorSnackbar();
				} else if (data.result == "Success") {
					this.fetchBookings();
				}
			});
		};

		const rows = bookingData.map((row) => {
			return(
				<TableRow
					key={row.id}
					selected={!isEditable(row.cancelled, row.checkin)}
					hidden={!isShowAll && !isEditable(row.cancelled, row.checkin)}
				>
					<TableCell size="small">
						<IconButton
							onClick={(event) => openDialog(event, row)}
							hidden={!isEditable(row.cancelled, row.checkin)}
						>
							<CreateIcon />
						</IconButton>
					</TableCell>
					<TableCell>{ row.checkin }</TableCell>
					<TableCell>{ row.checkout }</TableCell>
					<TableCell>{ row.room }</TableCell>
					<TableCell>{ row.numguests }</TableCell>
					<TableCell>{ row.cancelled ? "Cancelled" : (isEditable(row.cancelled, row.checkin) ? "Upcoming" : "Completed") }</TableCell>
					<TableCell>
						<Rating
							name={"bookingRating"+row.id}
							hidden={row.cancelled ? true : (isEditable(row.cancelled, row.checkin) ? true : false)}
							value={ row.rating }
							onChange={(event) => setRating(event, row)}
						/>
						{row.cancelled ? "N/A" : (isEditable(row.cancelled, row.checkin) ? "N/A" : "")}
					</TableCell>
				</TableRow>
			);
		});

		return(
			<TableContainer component={Paper} style={{ maxWidth: 1000, margin: "auto" }}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell></TableCell>
							<TableCell>Check-In Date</TableCell>
							<TableCell>Check-Out Date</TableCell>
							<TableCell>Room #</TableCell>
							<TableCell># of Guests</TableCell>
							<TableCell>Status</TableCell>
							<TableCell>Rating</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>{ !isLoading ? rows : null }</TableBody>
				</Table>
			</TableContainer>
		);
	};

	renderDialog() {
		const isOpen = this.state.isDialogOpen;
		const { isLoading, validDates, validGuests, dialogData, rooms, customer } = this.state;

		const closeDialog = () => {
			this.setState({
				isDialogOpen: false,
			});
		};

		const validateDates = (checkin, checkout) => {
			if (checkin == undefined || checkout == undefined || checkin == '' || checkout == '')
				return false;

			var checkinDate = this.stringToDate(checkin);
			var checkoutDate = this.stringToDate(checkout);
			var nowDate = this.today();

			return nowDate < checkinDate && checkinDate <= checkoutDate;
		};

		const validateGuests = (num) => {
			return num > 0;
		};

		const validateData = () => {
			return validateDates(dialogData.checkin, dialogData.checkout) && validateGuests();
		};

		const updateBooking = () => {
			var body = JSON.stringify({
				booking_id: dialogData.id,
				cancelled: dialogData.cancelled,
				checkin: dialogData.checkin,
				checkout: dialogData.checkout,
				customer_id: customer,
				numguests: dialogData.numguests,
				room_id: dialogData.room,
				rating: dialogData.rating,
			});

			fetch(urlUpdateBookings, {
				method: "PUT",
				body: body,
			}).then((response) => { return response.json(); })
			.then((data) => {
				console.log(data);
				if (data.result == "Fail") {
					this.openErrorSnackbar();
				} else if (data.result == "Success") {
					this.fetchBookings();
				}
			});
		};

		const cancelBooking = () => {
			var body = JSON.stringify({
				booking_id: dialogData.id,
				cancelled: true,
				checkin: dialogData.checkin,
				checkout: dialogData.checkout,
				customer_id: customer,
				numguests: dialogData.numguests,
				room_id: dialogData.room,
				rating: dialogData.rating,
			});

			fetch(urlUpdateBookings, {
				method: "PUT",
				body: body,
			}).then((response) => { return response.json(); })
			.then((data) => {
				console.log(data);
				if (data.result == "Fail") {
					this.openErrorSnackbar();
				} else if (data.result == "Success") {
					this.fetchBookings();
				}
			});
		};

		return(
			<Dialog
				open={isOpen}
				onClose={closeDialog}
			>
				<div>
					<DialogTitle style={{ float: "left" }}>
						Edit Booking
					</DialogTitle>
					<IconButton onClick={closeDialog} style={{ float: "right" }}>
						<CloseIcon />
					</IconButton>
				</div>
				<DialogContent>
					<TextField
						error={!validDates}
						helperText={validDates ? "" : "Invalid Date Range"}
						label="Check-In Date"
						type="date"
						defaultValue={dialogData.checkin}
						InputLabelProps={{ shrink: true }}
						onChange={(event) => {
							this.setState({
								dialogData: {...dialogData,
									checkin: event.target.value,
								},
								validDates: validateDates(event.target.value, dialogData.checkout),
							});
						}}
					/>
				</DialogContent>
				<DialogContent>
					<TextField
						error={!validDates}
						helperText={validDates ? "" : "Invalid Date Range"}
						label="Check-Out Date"
						type="date"
						defaultValue={dialogData.checkout}
						InputLabelProps={{ shrink: true }}
						onChange={(event) => {
							this.setState({
								dialogData: {...dialogData,
									checkout: event.target.value,
								},
								validDates: validateDates(dialogData.checkin, event.target.value),
							});
						}}
					/>
				</DialogContent>
				<DialogContent>
					<InputLabel>Room #</InputLabel>
					<Select
						defaultValue={dialogData.room}
						onChange={(event) => {
							this.setState({
								dialogData: {...dialogData,
									room: event.target.value,
								}
							});
						}}
					>
						{isLoading ? null :
							rooms.map((row) => {
								return (
									<MenuItem key={row.id} value={row.id}>{row.id}</MenuItem>
								);
							})
						}
					</Select>
				</DialogContent>
				<DialogContent>
					<TextField
						error={!validGuests}
						helperText={validGuests ? "" : "Invalid Number of Guests"}
						label="# of Guests"
						type="number"
						defaultValue={dialogData.numguests}
						onChange={(event) => {
							this.setState({
								dialogData: {...dialogData,
									numguests: event.target.value,
								},
								validGuests: validateGuests(event.target.value),
							});
						}}
					/>
				</DialogContent>
				<DialogActions>
					<Button
						variant="contained"
						color="secondary"
						onClick={cancelBooking}
					>
						CANCEL BOOKING
					</Button>
					<Button
						variant="contained"
						color="primary"
						onClick={updateBooking}
						disabled={!validDates || !validGuests}
					>
						UPDATE BOOKING
					</Button>
				</DialogActions>
			</Dialog>
		);
	};

	renderSnackbar() {
		const { bookingError } = this.state;

		const closeSnackbar = (event) => {
			this.setState({
				bookingError: false,
			});
		};

		return (
			<Snackbar
				open={bookingError}
				autoHideDuration={5000}
				onClose={closeSnackbar}
			>
				<Alert onClose={closeSnackbar} severity="error">
					The changes conflict with another booking.
				</Alert>
			</Snackbar>
		);
	};

	render() {
		return(
			<div style={{ "textAlign":"center" }}>
				<h1>My Bookings</h1><br/>
				{ this.renderFilter() }
				{ this.renderTable() }
				{ this.renderDialog() }
				{ this.renderSnackbar() }
			</div>
		);
	};
}

export default MyBookings