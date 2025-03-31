document.addEventListener("DOMContentLoaded", function () {
    // Load Header and Footer
    fetch("header.html")
        .then(response => response.text())
        .then(data => document.getElementById("header").innerHTML = data);

    fetch("footer.html")
        .then(response => response.text())
        .then(data => document.getElementById("footer").innerHTML = data);

    // Get product data from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const reviewProductName = urlParams.get("name");
    const reviewProductPrice = urlParams.get("price");
    const reviewProductImg = urlParams.get("img");
    const reviewPopup = document.getElementById("review-popup");

    if (reviewProductName && reviewProductPrice && reviewProductImg) {
        document.getElementById("review-name").textContent = reviewProductName;
        document.getElementById("review-price").textContent = `Price: ${reviewProductPrice}`;
        document.getElementById("review-img").src = `./assets/items/${reviewProductImg}`;
        document.getElementById("review-inclusions").textContent = "Included items available.";

        // Add to Cart Button
        document.getElementById("confirm-review").addEventListener("click", function () {
            let reviewQuantity = document.getElementById("review-quantity").value;
            let reviewCart = JSON.parse(localStorage.getItem("reviewCart")) || [];
            reviewCart.push({
                name: reviewProductName,
                price: reviewProductPrice,
                img: reviewProductImg,
                quantity: reviewQuantity
            });
            localStorage.setItem("reviewCart", JSON.stringify(reviewCart));

            // Show the pop-up notification
            reviewPopup.classList.add("show");
            setTimeout(() => {
                reviewPopup.classList.remove("show");
            }, 2000);
        });
    } else {
        document.getElementById("review-card").innerHTML = "<p class='text-center'>No product selected.</p>";
    }
});

// Handle the return button (arrow) click
document.getElementById('back-button').addEventListener('click', function() {
    // Redirect to the store page
    window.location.href = 'store.html';
});
