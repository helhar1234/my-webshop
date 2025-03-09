function createContactSection() {
    const contactHTML = `
        <!-- Contact Section Start -->
        <div class="contact_section layout_padding">
            <div class="container">
                <div class="image_2"><img src="../../public/images/logos/img-2.png" alt="Contact Image"></div>
                <h1 class="about_taital">Contact Us</h1>
                <div class="row">
                    <div class="col-md-6">
                        <div class="mail_section">
                            <input type="text" id="contactName" class="email-bt" placeholder="Your Name" name="Name">
                            <input type="email" id="contactEmail" class="email-bt" placeholder="Email" name="Email">
                            <input type="tel" id="contactPhone" class="email-bt" placeholder="Phone Number" name="Phone">
                            <textarea id="contactMessage" class="massage-bt" placeholder="Message" rows="5"></textarea>
                            <div class="send_bt"><a href="#" id="sendMessageBtn">Send</a></div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="map_main">
                            <div class="map-responsive">
                                <iframe src="https://www.google.com/maps/embed/v1/place?key=AIzaSyA0s1a7phLN0iaD6-UE7m4qP-z21pH0eSc&q=Höchstädtplatz+6" 
                                    width="600" height="480" frameborder="0" style="border:0; width: 100%;" allowfullscreen></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Contact Section End -->
    `;

    // Kontaktformular ins Dokument einfügen
    document.getElementById("contact").innerHTML = contactHTML;

    // Event Listener für das Absenden des Formulars
    document.getElementById("sendMessageBtn").addEventListener("click", (event) => {
        event.preventDefault(); // Verhindert das Neuladen der Seite

        const name = document.getElementById("contactName").value;
        const email = document.getElementById("contactEmail").value;
        const phone = document.getElementById("contactPhone").value;
        const message = document.getElementById("contactMessage").value;

        if (!name || !email || !message) {
            alert("Bitte fülle alle erforderlichen Felder aus.");
            return;
        }

        console.log("📩 Nachricht gesendet:", { name, email, phone, message });
        alert("Deine Nachricht wurde erfolgreich gesendet!");
    });
}

// Funktion nach dem Laden des DOMs ausführen
document.addEventListener("DOMContentLoaded", createContactSection);
