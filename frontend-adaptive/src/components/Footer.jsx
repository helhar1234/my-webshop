function Footer() {
    return (
      <footer className="footer">
        {/* Footer Top: Address, Social Links, Newsletter */}
        <div className="footer__top">
          {/* Address Section */}
          <div className="footer__section footer__address">
            <h2>Address</h2>
            <p>
              <img src="/images/icons/map-icon.png" alt="Map" width="20" /> Höchstädtplatz 6
            </p>
            <p>
              <img src="/images/icons/call-icon.png" alt="Phone" width="20" /> +43 699 156766412
            </p>
            <p>
              <img src="/images/icons/mail-icon.png" alt="Email" width="20" /> info@freshly.at
            </p>
          </div>
  
          {/* Social Links Section */}
          <div className="footer__section footer__social">
            <h2>Social Links</h2>
            <p>
              <a href="#">
                <img src="/images/icons/fb-icon.png" alt="Facebook" width="20" /> Facebook
              </a>
            </p>
            <p>
              <a href="#">
                <img src="/images/icons/twitter-icon.png" alt="Twitter" width="20" /> Twitter
              </a>
            </p>
            <p>
              <a href="#">
                <img src="/images/icons/instagram-icon.png" alt="Instagram" width="20" /> Instagram
              </a>
            </p>
            <p>
              <a href="#">
                <img src="/images/icons/linkedin-icon.png" alt="LinkedIn" width="20" /> LinkedIn
              </a>
            </p>
          </div>
  
          {/* Newsletter Section */}
          <div className="footer__section footer__newsletter">
            <h2>Newsletter</h2>
            <input type="email" placeholder="Enter Your Email" />
            <br />
            <button>Subscribe</button>
          </div>
        </div>
  
        {/* Footer Middle: Google Maps */}
        <div className="footer__map">
          <h2>Our Location</h2>
          <iframe
            src="https://www.google.com/maps/embed/v1/place?key=AIzaSyA0s1a7phLN0iaD6-UE7m4qP-z21pH0eSc&q=Höchstädtplatz+6"
            width="600"
            height="300"
            frameBorder="0"
            allowFullScreen
            title="Our Location"
          ></iframe>
        </div>
  
        {/* Footer Bottom: Copyright */}
        <div className="footer__bottom">
          © 2024 Erstellt von Helene Harrer für die Bachelorarbeit
        </div>
      </footer>
    );
  }
  
  export default Footer;
  