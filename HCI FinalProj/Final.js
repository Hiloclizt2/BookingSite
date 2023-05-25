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
// Select the form element
const bookingForm = document.querySelector('#booking-form');
// Select the tbody element of the booking table
const bookingTableBody = document.querySelector('#booking-table tbody');

// Retrieve existing bookings from localStorage or initialize as empty array
let bookings = JSON.parse(localStorage.getItem('bookings')) || [];

// Render all bookings in the table
bookings.forEach((booking, index) => {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${booking.placeName}</td>
    <td>${booking.numOfGuests}</td>
    <td>${booking.arrivalDate}</td>
    <td>${booking.leavingDate}</td>
    <td><button class="delete-btn" data-index="${index}">Delete</button></td>
  `;
  bookingTableBody.appendChild(row);
});

// Add event listener for form submission
bookingForm.addEventListener('submit', (e) => {
  e.preventDefault(); // prevent form from reloading the page

  // Get input values
  const placeName = document.querySelector('#place-name-input').value;
  const numOfGuests = document.querySelector('#num-of-guests-input').value;
  const arrivalDate = document.querySelector('#arrival-date-input').value;
  const leavingDate = document.querySelector('#leaving-date-input').value;

  // Check if leaving date is before or equal to arrival date
  if (new Date(leavingDate) <= new Date(arrivalDate)) {
    alert('The leaving date must be after the arrival date.');
    return; // exit the function and prevent further processing
  }

  // Create a new booking object
  const booking = {
    placeName,
    numOfGuests,
    arrivalDate,
    leavingDate
  };

  // Add the new booking to the array
  bookings.push(booking);

  // Store updated bookings array in localStorage
  localStorage.setItem('bookings', JSON.stringify(bookings));

  // Optional: display confirmation message to user
  alert('Booking successful!');

  // Clear the form inputs
  bookingForm.reset();

  // Clear the booking table body
  bookingTableBody.innerHTML = '';

  // Render all bookings in the table
  renderBookings();
});

// Function to delete a booking from the array, local storage, and table
function deleteBooking(index) {
  bookings.splice(index, 1); // remove the booking from the array
  localStorage.setItem('bookings', JSON.stringify(bookings)); // update localStorage
  renderBookings(); // update the table with the remaining bookings
}

// Function to render all bookings in the table
function renderBookings() {
  bookingTableBody.innerHTML = ''; // clear the table body

  bookings.forEach((booking, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${booking.placeName}</td>
      <td>${booking.numOfGuests}</td>
      <td>${booking.arrivalDate}</td>
      <td>${booking.leavingDate}</td>
      <td><button class="delete-btn" data-index="${index}">Delete</button></td>
    `;
    bookingTableBody.appendChild(row);
  });
}

// Add event listener for delete buttons
bookingTableBody.addEventListener('click', (e) => {
  if (e.target && e.target.matches('.delete-btn')) {
    const index = e.target.dataset.index;
    deleteBooking(index);
  }
});

// Call renderBookings() on page load to display any existing bookings
renderBookings();