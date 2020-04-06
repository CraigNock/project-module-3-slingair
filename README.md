# Module 3 - Node - Mini project

<img src='public\seat-select\images\screenshots\header.png' style='width:100%' />

---

## The App

### Screenshots

<img src='public\seat-select\images\screenshots\seat-select.png' style='float:left;width:48%;margin-right:4%;' />
<img src='public\seat-select\images\screenshots\confirmed.png' style='float:left;width:48%' />

### Functionality

- When a user navigates to `/seat-select` he/she is presented with an input to enter the flight number.//(done)
- With the flight number, make a request to the server for the seating availability on that flight.//(done)
- When a response with seating is received, display the seating input as well as the form requesting user's information.//(done)
- User selects a seat, enters information and clicks 'Confirm'.//(done)
- Contact the server with the data, and wait for a success response to redirect to the `/confirmed.html` page.//(done)
- The confirmed page should display a confirmation message to the user with the info that they entered on the previous screen.//(done)


---

## Requirements for Project Completion

### Minimum Viable Product Details

1. user can select a flight from a dropdown (or any other means you decide to implement).//(done)
2. user can select an available seat.//(done)
3. user can enter his/her personal information.//(done)
4. user can view the flight confirmation page.//(done)
5. given a `userId` (or other user info --up to you), user should be able to view his reservation.//(done)


### Optional

1. Connect to the remote db/server to get "live" data. See the `dev_notes` for information on the endpoints.
2. Create an admin page that displays the seat status for a flight. //(done)
    - you could reuse the flight selection method you implemented above.//(done)
    - this page should display a table of all seats, and their status.//(done)
3. The admin page also displays the name of the user in the seat.//(done)
4. Each seat also has a link to view the reservation details. //(done)