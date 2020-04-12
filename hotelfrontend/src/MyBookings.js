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

import CreateIcon from '@material-ui/icons/Create';
import CloseIcon from '@material-ui/icons/Close';

const url = "http://127.0.0.1:8000/api/bookings/";

export class MyBookings extends React.Component {
	state = {
		isLoading: true,
		bookingData: [],
		customer: 837,
		dialogData: {},
		isDialogOpen: false,
	};

	componentDidMount() {
		this.fetchBookings(this.state.customer);
	}

	fetchBookings(customer) {
		fetch(url)
			.then((response) => { return response.json(); })
			.then((data) => {
				this.setState({
					isLoading: false,
					bookingData: data,
				});
			});
	}

	renderFilter() {
		const filterById = (event) => {
			this.setState({
				customer: event.target.value,
				//isLoading: true,
			});
			//this.fetchBookings(event.target.value);
		}

		return(
			<TextField
				id="outlined-basic"
				label="User ID"
				style={{ margin: 10 }}
				value={this.state.customer}
				onChange={filterById}
			/>
		);
	}

	renderTable() {
		const { isLoading, bookingData, customer } = this.state;
		
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
			});
		};

		const isEditable = (cancelled, checkin) => {
			var checkinDate = Date.parse(checkin);
			var nowDate = Date.now();
			return !cancelled && checkinDate > nowDate;
		};

		return(
			<TableContainer component={Paper}>
				<Table style={{ maxWidth: 1000 }}>
					<TableHead>
						<TableRow>
							<TableCell></TableCell>
							<TableCell>Check-In Date</TableCell>
							<TableCell>Check-Out Date</TableCell>
							<TableCell>Room #</TableCell>
							<TableCell># of Guests</TableCell>
							<TableCell>Status</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>{ !isLoading ?
						bookingData.map((row) => {
							if (row.customer == customer) {
								return(
									<TableRow key={row.id} selected={!isEditable(row.cancelled, row.checkin)} >
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
									</TableRow>
								);
							}
							return null;
						})
					: null }</TableBody>
				</Table>
			</TableContainer>
		);
	}

	renderDialog() {
		const isOpen = this.state.isDialogOpen;
		const dialogData = this.state.dialogData;

		const closeDialog = () => {
			this.setState({
				isDialogOpen: false,
			});
		}

		const updateBooking = () => {
			fetch(url, {
				method: "PUT",
				body: bookingAttributes
			}).then((response) => { console.log(response.json()); });
		}

		const cancelBooking = () => {
			fetch(url, {
				method: "PUT",
				body: {
					id: dialogData.id,
					customer: this.state.customer,
					checkin: dialogData.checkin,
					checkout: dialogData.checkout,
					room: dialogData.room,
					numguests: dialogData.numguests,
					rating: dialogData.rating,
					cancelled: true,
				}
			}).then((response) => { console.log(response.json()); });
		}

		var bookingAttributes = {
			id: dialogData.id,
			customer: this.state.customer,
			checkin: dialogData.checkin,
			checkout: dialogData.checkout,
			room: dialogData.room,
			numguests: dialogData.numguests,
			rating: dialogData.rating,
			cancelled: dialogData.cancelled,
		}

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
						label="Check-In Date"
						type="date"
						defaultValue={bookingAttributes.checkin}
						InputLabelProps={{ shrink: true }}
					/>
				</DialogContent>
				<DialogContent>
					<TextField
						label="Check-Out Date"
						type="date"
						defaultValue={bookingAttributes.checkout}
						InputLabelProps={{ shrink: true }}
					/>
				</DialogContent>
				<DialogContent>
					<TextField
						label="Room #"
						type="number"
						defaultValue={bookingAttributes.room}
					/>
				</DialogContent>
				<DialogContent>
					<TextField
						label="# of Guests"
						type="number"
						defaultValue={bookingAttributes.numguests}
					/>
				</DialogContent>
				<DialogActions>
					<Button
						variant="contained"
						color="secondary"
					>
						CANCEL BOOKING
					</Button>
					<Button
						variant="contained"
						color="primary"
						onClick={updateBooking}
					>
						UPDATE BOOKING
					</Button>
				</DialogActions>
			</Dialog>
		);
	}

	render() {
		return(
			<div style={{ margin: 10 }}>
				<h1>My Bookings</h1>
				{ this.renderFilter() }
				{ this.renderTable() }
				{ this.renderDialog() }
			</div>
		);
	}
}

export default MyBookings