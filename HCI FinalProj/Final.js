let searchBtn = document.querySelector('#search-btn');
let searchBar = document.querySelector('.search-bar-container');
let formBtn = document.querySelector('#login-btn');
let loginForm = document.querySelector('.login-form-container');
let formClose = document.querySelector('#form-close');
let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('.navbar');
let videoBtn = document.querySelectorAll('.vid-btn');

window.onscroll = () =>{
    searchBtn.classList.remove('fa-times');
    searchBar.classList.remove('active');
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
    loginForm.classList.remove('active');
}

menu.addEventListener('click', () =>{
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
    
});

searchBtn.addEventListener('click', () =>{
    searchBtn.classList.toggle('fa-times');
    searchBar.classList.toggle('active');
});

formBtn.addEventListener('click', () =>{
    loginForm.classList.add('active');
});
 
formClose.addEventListener('click', () =>{
    loginForm.classList.remove('active');
});

videoBtn.forEach(btn =>{
    btn.addEventListener('click', ()=>{
        document.querySelector('.controls .active').classList.remove('active');
        btn.classList.add('active');
        let src = btn.getAttribute('data-src');
        document.querySelector('#video-slider').src = src;
    });
});

var swiper = new Swiper(".review-slider", {
    spaceBetween: 20,
    loop:true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    breakpoints: {
        640: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
    },
});

var swiper = new Swiper(".brand-slider", {
    spaceBetween: 20,
    loop:true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    breakpoints: {
        450: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        991: {
          slidesPerView: 4,
        },
        1200: {
          slidesPerView: 5,
        },
       },
});
const bookingForm = document.getElementById("booking-form");

bookingForm.addEventListener("submit", function(event) {
  event.preventDefault();

  // Get the input field values
  const placeNameInput = document.getElementById("place-name");
  const guestsInput = document.getElementById("guests");
  const arrivalsInput = document.getElementById("arrivals");
  const leavingInput = document.getElementById("leaving");

  // Check if the leaving date is earlier than the arrival date
  if (new Date(leavingInput.value) < new Date(arrivalsInput.value)) {
    alert("Leaving date cannot be earlier than arrival date!");
    return;
  }

  // Create a new booking object
  const booking = {
    placeName: placeNameInput.value,
    guests: guestsInput.value,
    arrivals: arrivalsInput.value,
    leaving: leavingInput.value
  };

  // Save the booking object to local storage
  const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
  bookings.push(booking);
  localStorage.setItem("bookings", JSON.stringify(bookings));

  // Show confirmation message
  const confirmationMessage = document.createElement("div");
  confirmationMessage.innerHTML = `Thank you for booking ${booking.placeName}!`;
  confirmationMessage.classList.add("confirmation-message");
  document.body.appendChild(confirmationMessage);
  setTimeout(function () {
    confirmationMessage.remove();
  }, 3000);

  // Reset the form inputs
  bookingForm.reset();
});

function checkBooking() {
  // Get the booked user's information from your database or API
  const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
  const lastBooking = bookings[bookings.length - 1];
  
  // Update the Check My Booking button based on whether a booking exists or not
  const checkBookingButton = document.getElementById("check-booking-button");
  if (lastBooking) {
    checkBookingButton.innerHTML = `My Booking: ${lastBooking.placeName}`;
    checkBookingButton.href = `#${lastBooking.placeName}`;
    
    // Display the booking information to the user in a fixed message format
    alert(`Your booking details:\nPlace Name: ${lastBooking.placeName}\nNumber of Guests: ${lastBooking.guests}\nArrival Date: ${lastBooking.arrivals}\nLeaving Date: ${lastBooking.leaving}`);
  } else {
    checkBookingButton.innerHTML = "No Booking Found";
    checkBookingButton.href = "#";
    
    // Display a fixed message to the user indicating there is no booking found
    alert("Sorry, we could not find a booking for you.");
  }
}