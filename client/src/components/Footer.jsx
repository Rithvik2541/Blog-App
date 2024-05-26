import React from 'react';

function Footer() {
  return (
    <footer className="bg-secondary text-white pt-5 pb-4">
      <div className="container text-center text-md-left">
        <div className="row text-center text-md-left">
          <div className="col-lg-3 col-md-6 col-sm-6">
            <h6 className="text-uppercase mb-4 font-weight-bold">Information</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#" style={{ textDecoration: 'none', color: 'white' }}>Pages</a>
              </li>
              <li className="mb-2">
                <a href="#" style={{ textDecoration: 'none', color: 'white' }}>Our Team</a>
              </li>
              <li className="mb-2">
                <a href="#" style={{ textDecoration: 'none', color: 'white' }}>Features</a>
              </li>
              <li className="mb-2">
                <a href="#" style={{ textDecoration: 'none', color: 'white' }}>Pricing</a>
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 col-sm-6">
            <h6 className="text-uppercase mb-4 font-weight-bold">Resources</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#" style={{ textDecoration: 'none', color: 'white' }}>Wikipedia</a>
              </li>
              <li className="mb-2">
                <a href="#" style={{ textDecoration: 'none', color: 'white' }}>React blog</a>
              </li>
              <li className="mb-2">
                <a href="#" style={{ textDecoration: 'none', color: 'white' }}>Term &amp; Service</a>
              </li>
              <li className="mb-2">
                <a href="#" style={{ textDecoration: 'none', color: 'white' }}>Angular dev</a>
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 col-sm-6">
            <h6 className="text-uppercase mb-4 font-weight-bold">Help</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#" style={{ textDecoration: 'none', color: 'white' }}>Sign Up</a>
              </li>
              <li className="mb-2">
                <a href="#" style={{ textDecoration: 'none', color: 'white' }}>Login</a>
              </li>
              <li className="mb-2">
                <a href="#" style={{ textDecoration: 'none', color: 'white' }}>Terms of Services</a>
              </li>
              <li className="mb-2">
                <a href="#" style={{ textDecoration: 'none', color: 'white' }}>Privacy Policy</a>
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 col-sm-6">
            <h6 className="text-uppercase mb-4 font-weight-bold">Contact Us</h6>
            <p>Contact us if need help with anything</p>
            <p>+91 9999999999</p>
          </div>
        </div>

        <div className="text-center mt-5">
          <p className="footer-alt mb-0 f-14">2019 © VNR, All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
