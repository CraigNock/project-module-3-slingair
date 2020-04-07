# Module 3 - Node - Mini project

<img src='public\seat-select\images\screenshots\header.png' style='width:100%' />

---

## The App

### Screenshots
### Old
<img src='public\seat-select\images\screenshots\seatselectnew.png' style='float:left;width:48%;margin-right:4%;' />
<img src='public\seat-select\images\screenshots\confirmnew.png' style='float:left;width:48%' />

<img src='public\seat-select\images\screenshots\admin.png' style='float:left;width:48%' />

---





---
### Functionality

- Origionally when a user navigates to `/seat-select` he/she is presented with an input to enter the flight number. Updated to dropdown.
- With the flight number selected, makes a request to the server for the seating availability on that flight.
- When a response with seating is received, displays the seating input as well as the form requesting user's information.
- User selects a seat, enters information and clicks 'Confirm'
- Contact the server with the data, and wait for a success response to redirects to the `/confirmed.html` page.

- The confirmed page displays a confirmation message to the user with the info that they entered on the previous screen plus a reservation id number.
- user can select a flight from a dropdown 
- user can select/deselect an available seat by clicking it.
- user can enter his/her personal information.
- On confirmation user is sent to the flight confirmation page.
- Given an email or given id number, user is able to view their reservation.
- Connects to the remote db/server to get/add "live" data. 
- SlingshotAirlines header and logo navigates back to homepage at any time
---
## Admin Page
- can be accessed by seat-select/admin in url

- Created an admin page that displays the seat status for a flight, reusing the    flight selection method, but inverted.
- Dropdown allows for different flight selection
- Displays a table of all seats on flight, and the last name of seats passenger
- Selection of an occupied seat shows an in-window reservation card with all details.
