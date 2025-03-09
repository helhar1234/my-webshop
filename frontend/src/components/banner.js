function createBanner() {
    const bannerHTML = `
        <!-- Banner Section Start -->
        <div class="banner_section layout_padding">
            <div class="container">
                <div id="main_slider" class="carousel slide" data-ride="carousel">
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="image_1"><img src="public/images/logos/img-1.png" alt="Banner Image"></div>
                                </div>
                                <div class="col-md-6">
                                    <h1 class="banner_taital">Vegetables <span style="color: #ecad15;">Shop</span></h1>
                                    <p class="banner_text">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem</p>
                                    <div class="buy_bt"><a href="#">Buy Now</a></div>
                                    <div class="read_bt"><a href="#">Read More</a></div>
                                </div>
                            </div>
                        </div>
                        <div class="carousel-item">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="image_1"><img src="public/images/logos/img-1.png" alt="Banner Image"></div>
                                </div>
                                <div class="col-md-6">
                                    <h1 class="banner_taital">Vegetables <span style="color: #ecad15;">Shop</span></h1>
                                    <p class="banner_text">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem</p>
                                    <div class="buy_bt"><a href="#">Buy Now</a></div>
                                    <div class="read_bt"><a href="#">Read More</a></div>
                                </div>
                            </div>
                        </div>
                        <div class="carousel-item">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="image_1"><img src="public/images/logos/img-1.png" alt="Banner Image"></div>
                                </div>
                                <div class="col-md-6">
                                    <h1 class="banner_taital">Vegetables <span style="color: #ecad15;">Shop</span></h1>
                                    <p class="banner_text">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem</p>
                                    <div class="buy_bt"><a href="#">Buy Now</a></div>
                                    <div class="read_bt"><a href="#">Read More</a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <a class="carousel-control-prev" href="#main_slider" role="button" data-slide="prev">
                        <i class=""><img src="public/images/icons/left-icon.png" alt="Previous"></i>
                    </a>
                    <a class="carousel-control-next" href="#main_slider" role="button" data-slide="next">
                        <i class=""><img src="public/images/icons/right-icon.png" alt="Next"></i>
                    </a>
                </div>
            </div>
        </div>
        <!-- Banner Section End -->
    `;

    // Banner ins Dokument einfügen
    document.getElementById("banner").innerHTML = bannerHTML;
}

// Funktion nach dem Laden des DOMs ausführen
document.addEventListener("DOMContentLoaded", createBanner);
