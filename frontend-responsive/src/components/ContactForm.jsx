import { useState } from "react";

function ContactForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Kontaktformular gesendet:", { name, email, message });
        setSuccess(true);

        setName("");
        setEmail("");
        setMessage("");
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-12 col-sm-10 col-md-8 col-lg-6">
                    {success && (
                        <p className="text-success text-center">
                            Danke für deine Nachricht!
                        </p>
                    )}
                    <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
                        <input
                            type="text"
                            placeholder="Dein Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="input"
                        />
                        <input
                            type="email"
                            placeholder="Deine E-Mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="input"
                        />
                        <textarea
                            placeholder="Deine Nachricht"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                            className="input"
                            rows={5}
                        />
                        <button className="button button--primary" type="submit">
                            Absenden
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ContactForm;
