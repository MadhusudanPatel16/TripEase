import React from "react";
import "./contactUs.css";

const Contact = () => {
  return (
    <div className="contact-container">
      <div className="contact-header">
        <h1>We'd love to hear from you!</h1>
      </div>
      
      <div className="contact-content">
        <div className="contact-details">
          <h2>Would like to talk?</h2>
          <h3>CONTACT DETAILS</h3>
          <p>
            If you have a story to share or a question that has not been answered
            on our website, please get in touch with us via contact details
            listed below or fill in the form on the right.
          </p>
          <p className="contact-address">
            📍 712, Pearls Best Heights-II, Netaji Subash Place, Pitampura, New Delhi - 110034
          </p>
        </div>

        <div className="contact-form">
          <h2>Have a question?</h2>
          <h3>GET IN TOUCH</h3>
          <form>
            <label>Full Name *</label>
            <input type="text" placeholder="Enter your name" required />
            
            <label>Email *</label>
            <input type="email" placeholder="Enter your email" required />

            <label>Message *</label>
            <textarea placeholder="Write your message here" required></textarea>
            
            <button type="submit">Contact us</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
