const flightInput = document.getElementById('flight');
const seatsDiv = document.getElementById('seats-section');
const confirmButton = document.getElementById('confirm-button');

let selection = '';

const renderSeats = (seating) => {
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


const toggleFormContent = (event) => {
    const flightNumber = flightInput.value;
    console.log('toggleFormContent: ', flightNumber);
    let seating = undefined;
    if (flightNumber.length < 5 
        || flightNumber[0].toLowerCase() !== 's' 
        || flightNumber[1].toLowerCase() !== 'a'
        || !((parseInt(flightNumber[2]) + parseInt(flightNumber[3]) + parseInt(flightNumber[4])) >= 0)
        ){
        console.log('invalid flight number'); //replace with proper error later
    } else {
        fetch(`/seat-check/${flightNumber}`)
            .then(data => data.json())
            .then(data => {
                console.log(data.flightSeats);
                seating = data.flightSeats;
                renderSeats(seating);
            })
    }; 
}

const handleConfirmSeat = (event) => {
    event.preventDefault();
    
    let details = {
        flight: flight.value,
        seat: selection,
        firstName: givenName.value,
        surname: surname.value,
        email:email.value
    };
    console.log(details);
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
        // let querystring = data.data['seat'];
        let querystring = '88a33c23-3332-4ef2-bd71-be7a6430485f';
        window.location.href = `http://localhost:8000/seat-select/confirmed.html?id=${querystring}`;
        // window.location.href = `http://localhost:8000/seat-select/confirmed/${querystring}.html`;

    })
}

flightInput.addEventListener('blur', toggleFormContent);