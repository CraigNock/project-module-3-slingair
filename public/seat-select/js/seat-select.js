const flightInput = document.getElementById('flight');
const seatsDiv = document.getElementById('seats-section');
const confirmButton = document.getElementById('confirm-button');
const invalid = document.getElementById('invalid');

let selection = '';


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
    }
    )


//renders seats to select
const renderSeats = (seating) => {
    seatsDiv.innerHTML = '';
    document.querySelector('.form-container').style.display = 'block';

    const alpha = ['A', 'B', 'C', 'D', 'E', 'F'];
    for (let r = 1; r < 11; r++) {
        const row = document.createElement('ol');
        row.classList.add('row');
        row.classList.add('fuselage');
        seatsDiv.appendChild(row);
        for (let s = 1; s < 7; s++) {
            const seatNumber = `${r}${alpha[s-1]}`;
            const seat = document.createElement('li')
            const seatOccupied = `<li><label class="seat"><span id="${seatNumber}" class="occupied">${seatNumber}</span></label></li>`
            const seatAvailable = `<li><label class="seat"><input type="radio" name="seat" value="${seatNumber}" /><span id="${seatNumber}" class="avail">${seatNumber}</span></label></li>`        
            
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
            document.getElementById('seat-number').innerText = `(${selection})`;
            confirmButton.disabled = false;
        }
    });
}

//fetches flight info on selection, initializes seat rendering
const toggleFormContent = (event) => {
    const flightNumber = flight.value;
    // console.log('toggleFormContent: ', flightNumber);
    let seating = undefined;
    if (flightNumber.length < 5 
        //nobody likes having to capitalize flight numbers.
        || flightNumber[0].toLowerCase() !== 's' 
        || flightNumber[1].toLowerCase() !== 'a'
        || !((parseInt(flightNumber[2]) + parseInt(flightNumber[3]) + parseInt(flightNumber[4])) >= 0)
        ){
        console.log('invalid flight number'); //replace with proper error later
    } else {
        fetch(`/seat-check/${flightNumber}`)
            .then(data => data.json())
            .then(data => {
                // console.log(data.seatList);
                seating = data.seatList;
                renderSeats(seating);
            })
    }; 
};

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
                let querystring = data.userData['id'];
                window.location.href = `http://localhost:8000/seat-select/confirmed.html?id=${querystring}`;
            }
        });
};

//sends new reservation/user info to server, redirects to confirmation page
const handleConfirmSeat = (event) => {
    event.preventDefault();
    let details = {
        flight: flight.value,
        seat: selection,
        firstName: givenName.value,
        surname: surname.value,
        email:email.value
    };
    // console.log(details);
    fetch('/confirmed', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept" : "application/json"
        },
        body:JSON.stringify(details)
    })
    .then(data => data.json())
    .then(data => {
        console.log(data);
        console.log('confirm '+ data.userRes);
        let querystring = data.userRes['id'];
        window.location.href = `http://localhost:8000/seat-select/confirmed.html?id=${querystring}`;
    })
}

// flightInput.addEventListener('blur', toggleFormContent);