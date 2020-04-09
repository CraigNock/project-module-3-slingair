
const flightInput = document.getElementById('flight');
const seatsDiv = document.getElementById('seats-section');
const invalid = document.getElementById('invalid');
const seatsTable = document.getElementById('seatsTable');

//data box
const conIdNum = document.getElementById('idNum');
const conFlightNum = document.getElementById('flightNum');
const conSeat = document.getElementById('seat');
const conName = document.getElementById('name');
const conEmail = document.getElementById('email');

let flightsData = [];
let singleFlight = [];

document.querySelector('.form-container').style.display = 'block';

//checks id or email, sends to confirm/reservation box (somewhat unecessary after pulling in all data for flights)
const handleGetRes = (event) => {
    event.preventDefault();
    let resId = rescheck.value;
    fetch('/reservation', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept" : "application/json"
        },
        body:JSON.stringify({resId})
    })
        .then(data => data.json())
        .then(data => {
            if (data.status !== '200'){
                console.log('bad id');
                invalid.style.display = 'inline-block';
            } else {
                userData = data.userData;
                conIdNum.innerText = userData.id;
                conFlightNum.innerText = userData.flight;
                conSeat.innerText = userData.seat;
                conName.innerText = userData.firstName + ' ' + userData.surname;
                conEmail.innerText = userData.email;
            }
        });
};

//on load gets flight numbers
fetch('/seat-select/flights')
    .then(data => data.json())
    .then(data => {
        let flights = data.flights;
        // console.log(flights);
        flights.forEach(flight => {
            let flightNum = document.createElement('option');
            flightNum.innerText = `${flight}`;
            document.getElementById('flight').appendChild(flightNum);
        })
    });

fetch(`/passengers`)
    .then(data => data.json())
    .then(data => {
        // console.log(data.userArray);
        flightsData = data.userArray;
        
    })


const clearData = () => {
    seatsTable.innerHTML = '';

    conIdNum.innerText = '';
    conFlightNum.innerText = '';
    conSeat.innerText = '';
    conName.innerText = '';
    conEmail.innerText = '';
};

//fetches flight info on selection, initializes seat rendering
const toggleFormContent = (event) => {
    clearData();
    const flightNumber = flight.value;
    singleFlight = [];
    flightFilter(flightNumber);

    let seating = undefined;
    fetch(`/seat-check/${flightNumber}`)
        .then(data => data.json())
        .then(data => {
            // console.log(data.seatList);
            seating = data.seatList;
            renderSeats(seating);
        })
    
};

//populates an array with user data for a single flight
const flightFilter = (flightNum) => {
    flightsData.forEach(passenger => {
        if (passenger.flight === flightNum) {
            singleFlight.push(passenger);
            let row = seatsTable.insertRow(-1);
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            cell1.innerText = `${passenger.seat}`;
            cell2.innerText = `${passenger.surname}`;
        }
    });
    console.log(singleFlight);
};





//renders seats to select
const renderSeats = (seating) => {
    seatsDiv.innerHTML = '';
    const alpha = ['A', 'B', 'C', 'D', 'E', 'F'];
    for (let r = 1; r < 11; r++) {
        const row = document.createElement('ol');
        row.classList.add('row');
        row.classList.add('fuselage');
        seatsDiv.appendChild(row);
        for (let s = 1; s < 7; s++) {
            const seatNumber = `${r}${alpha[s-1]}`;
            const seat = document.createElement('li')
            const seatOccupied = `<li><label class="seat"><input type="radio" name="seat" value="${seatNumber}" /><span id="${seatNumber}" class="avail">${seatNumber}</span></label></li>` 
            const seatAvailable = `<li><label class="seat"><span id="${seatNumber}" class="occupied">${seatNumber}</span></label></li>`      
            
            let avail = seating.find(chair => chair.id === seatNumber).isAvailable;
            seat.innerHTML = avail ? seatAvailable : seatOccupied;
            row.appendChild(seat);
        }
    }
    let seatMap = document.forms['seats'].elements['seat'];
    seatMap.forEach(seat => {
        seat.onclick = () => {
            selection = seat.value;
            seatMap.forEach(x => {
                if (x.value !== seat.value) {
                    document.getElementById(x.value).classList.remove('selected');
                }
            })
            document.getElementById(seat.value).classList.add('selected');

            seatUserGrab(selection);
        }
    });
}
//fills user-info box 
const seatUserGrab = (seatId) => {
    let passenger = singleFlight.find(reservation => 
        reservation.seat === `${seatId}`
    );
    conIdNum.innerText = passenger.id;
    conFlightNum.innerText = passenger.flight;
    conSeat.innerText = passenger.seat;
    conName.innerText = passenger.firstName + ' ' + passenger.surname;
    conEmail.innerText = passenger.email;
}