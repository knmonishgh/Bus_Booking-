import React from 'react'
import '../resources/footer.css';

function Footer() {
  return (
    <div className='footer'>
        <div class="box-container">
 
 <div className="box">
    <h3>Quick Links</h3>
    <a href="#">Home</a>
    <a href="#">About</a>
    <a href="#">Contact</a>
    <a href="#">Help</a>
 </div>

 <div className="box">
    <h3>Useful Links</h3>
    <a href="#">Register</a>
    <a href="#">Profile</a>
    <a href="#">Manage Bookings</a>
    <a href="#">Show my Ticket</a>
 </div>

 <div className="box">
    <h3>Contact Info</h3>
    <p> <i class="ri-phone-fill"></i> +919992222222 </p>
    <p> <i class="ri-phone-fill"></i> +919992223333 </p>
    <p> <i class="ri-mail-fill"></i> contact@travelswift.com </p>
    <p> <i class="ri-map-pin-line"></i> Bangalore, India - 560064 </p>
 </div>

 <div className="box">
    <h3>Follow us</h3>
    <a href="#"> <i class="ri-facebook-circle-fill"></i> facebook </a>
    <a href="#"> <i class="ri-twitter-fill"></i> twitter </a>
    <a href="#"> <i class="ri-instagram-fill"></i> instagram </a>
    <a href="#"> <i class="ri-linkedin-fill"></i> linkedin </a>
 </div>

</div>

<p className="credit"> &copy; copyright  @ 2023 by TravelSwift </p>

</div>
  )
}

export default Footer