
const conIdNum = document.getElementById('idNum');
const conFlight = document.getElementById('flight');
const conSeat = document.getElementById('seat');
const conName = document.getElementById('name');
const conEmail = document.getElementById('email');


// let resId = queryString = window.location.substring( window.location.indexOf('?') + 1 );
let resId = window.location.search;
resId = resId.substring(4);
console.log(resId);

//redirect needed if not valid id 
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
            window.location.href = 'http://localhost:8000/seat-select';
        } else {
            userData = data.userData;
            conIdNum.innerText = userData.id;
            conFlight.innerText = userData.flight;
            conSeat.innerText = userData.seat;
            conName.innerText = userData.firstName + ' ' + userData.surname;
            conEmail.innerText = userData.email;
        }
    });




