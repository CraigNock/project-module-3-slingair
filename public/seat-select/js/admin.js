
const flightInput = document.getElementById('flight');
const seatsDiv = document.getElementById('seats-section');
const invalid = document.getElementById('invalid');

//data box
const conIdNum = document.getElementById('idNum');
const conFlightNum = document.getElementById('flightNum');
const conSeat = document.getElementById('seat');
const conName = document.getElementById('name');
const conEmail = document.getElementById('email');

document.querySelector('.form-container').style.display = 'block';

//checks id or email, sends to confirm/reservation page
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


let flightData = 'flying beef';



//fetches flight info on selection, initializes seat rendering
const toggleFormContent = (event) => {
    const flightNumber = flight.value;
    // console.log('toggleFormContent: ', flightNumber);
    pullPassengers(flightNumber);
    let seating = undefined;
    fetch(`/seat-check/${flightNumber}`)
        .then(data => data.json())
        .then(data => {
            // console.log(data.seatList);
            seating = data.seatList;
            renderSeats(seating);
        })
    
};

const pullPassengers = (flightNum) => {
    fetch(`/passengers/${flightNum}`)
        .then(
            console.log('passengaaaars')
        )
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
            //pull data to confirm box
        }
    });
}


//*pull all users in flight beforehand instead */
// const seatUserGrab = (seatId) => {
//     fetch('/seat-user')
//         .then(console.log('beef2'))
//     //     .then(data => data.json())
//     //     .then(data => {
//     //         userData = data.userData;
//     //         conIdNum.innerText = userData.id;
//     //         conFlightNum.innerText = userData.flight;
//     //         conSeat.innerText = userData.seat;
//     //         conName.innerText = userData.firstName + ' ' + userData.surname;
//     //         conEmail.innerText = userData.email;
//     // });
// }