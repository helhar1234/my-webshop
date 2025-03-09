function createNavbar() {
    const navbarHTML = `
        <!-- Header Section Start -->
        <div class="header_section">
            <div class="container-fluid">
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <div class="logo"><a href="index.html"><img src="../../public/images/logos/logo.png" alt="Logo"></a></div>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" 
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav mr-auto">
                            <li class="nav-item"><a class="nav-link" href="index.html">HOME</a></li>
                            <li class="nav-item"><a class="nav-link" href="shop.html">SHOP</a></li>
                            <li class="nav-item"><a class="nav-link" href="vegetables.html">VEGETABLES</a></li>
                            <li class="nav-item"><a class="nav-link" href="about.html">ABOUT</a></li>
                            <li class="nav-item"><a class="nav-link" href="contact.html">CONTACT US</a></li>
                        </ul>
                        <form class="form-inline my-2 my-lg-0">
                            <div class="search_icon"><a href="#"><img src="../../public/images/icons/search-icon.png" alt="Search"></a></div>
                        </form>
                    </div>
                </nav>
            </div>
        </div>
        <!-- Header Section End -->
    `;

    // Navbar ins Dokument einfügen
    document.getElementById("navbar").innerHTML = navbarHTML;
}

// Funktion nach dem Laden des DOMs ausführen
document.addEventListener("DOMContentLoaded", createNavbar);
