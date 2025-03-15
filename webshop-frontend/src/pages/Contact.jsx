import { useState } from "react";

function Contact() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Hier könnte ein API-Call hinzugefügt werden
        console.log("Kontaktformular gesendet:", { name, email, message });
        setSuccess(true);
        setName("");
        setEmail("");
        setMessage("");
    };

    return (
        <div style={{ textAlign: "center", padding: "2rem" }}>
            <h1>Kontakt</h1>
            {success && <p style={{ color: "green" }}>Danke für deine Nachricht!</p>}
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "400px", margin: "0 auto" }}>
                <input 
                    type="text" 
                    placeholder="Dein Name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                />
                <input 
                    type="email" 
                    placeholder="Deine E-Mail" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
                <textarea 
                    placeholder="Deine Nachricht" 
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)} 
                    required 
                />
                <button type="submit">Absenden</button>
            </form>
        </div>
    );
}

export default Contact;
