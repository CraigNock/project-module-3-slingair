
const conFlight = document.getElementById('flight');
const conSeat = document.getElementById('seat');
const conName = document.getElementById('name');
const conEmail = document.getElementById('email');


// let resId = queryString = window.location.substring( window.location.indexOf('?') + 1 );
let resId = window.location.search;
resId = resId.substring(4);
console.log(resId);

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
        userData = data.userData;
        conFlight.innerText = userData.flight;
        conSeat.innerText = userData.seat;
        conName.innerText = userData.givenName + ' ' + userData.surname;
        conEmail.innerText = userData.email;
    });




