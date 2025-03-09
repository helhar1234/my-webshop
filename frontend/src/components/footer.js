function createFooter() {
    const footerHTML = `
        <!-- Footer Section Start -->
        <div class="footer_section layout_padding">
            <div class="container">
                <div class="row">
                    <div class="col-md-4">
                        <h1 class="address_text">Address</h1>
                        <div class="location_text"><a href="#"><img src="../../public/images/icons/map-icon.png"><span class="padding_left_15">Höchstädtplatz 6</span></a></div>
                        <div class="location_text"><a href="#"><img src="../../public/images/icons/call-icon.png"><span class="padding_left_15">+43 699 156766412</span></a></div>
                        <div class="location_text"><a href="#"><img src="../../public/images/icons/mail-icon.png"><span class="padding_left_15">Locations</span></a></div>
                    </div>
                    <div class="col-md-4">
                        <h1 class="address_text">Social link</h1>
                        <div class="location_text"><a href="#"><img src="../../public/images/icons/fb-icon.png"><span class="padding_left_15">Facebook</span></a></div>
                        <div class="location_text"><a href="#"><img src="../../public/images/icons/twitter-icon.png"><span class="padding_left_15">Twitter</span></a></div>
                        <div class="location_text"><a href="#"><img src="../../public/images/icons/instagram-icon.png"><span class="padding_left_15">Instagram</span></a></div>
                        <div class="location_text"><a href="#"><img src="../../public/images/icons/linkedin-icon.png"><span class="padding_left_15">Linkedin</span></a></div>
                    </div>
                    <div class="col-md-4">
                        <h1 class="address_text">Newsletter</h1>
                        <input type="text" class="enter_text" placeholder="Enter Your Email">
                        <div class="subscribe_bt"><a href="#">subscribe</a></div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Footer Section End -->
        
        <!-- Copyright Section Start -->
        <div class="copyright_section">
            <p class="copyright_text">© 2024 Erstellt von Helene Harrer für die Bachelorarbeit</p>
        </div>
        <!-- Copyright Section End -->
    `;

    // Footer ins Dokument einfügen
    document.getElementById("footer").innerHTML = footerHTML;
}

// Funktion nach dem Laden des DOMs ausführen
document.addEventListener("DOMContentLoaded", createFooter);
