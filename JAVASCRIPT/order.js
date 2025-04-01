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

    // Simulated inclusions based on product name
    const productInclusions = {
        "Fuzzy Buddy Ultra Ticket Box": [
            { img: "ticket1.png", name: "x1 Ticket" },
            { img: "ultra_ball.png", name: "x2 Ultra Ball" }
        ],
        "Special Package": [
            { img: "potion.png", name: "x3 Potion" },
            { img: "revive.png", name: "x1 Revive" }
        ],
        "Bug Out Ultra Ticket Box": [
            { img: "rare_candy.png", name: "x2 Rare Candy" },
            { img: "ticket2.png", name: "x1 Ticket" }
        ],
        "GO Rocket Box": [
            { img: "ultra_ball.png", name: "x5 Ultra Ball" },
            { img: "premiumbp.png", name: "x1 Premium Battle Pass" },
            { img: "silver_pinap.png", name: "x2 Silver Pinap Berry" },
            { img: "rocket_radar.png", name: "x1 Rocket Radar" }
        ],
        "Ultra Raid Box": [
            { img: "remotebp.png", name: "x1 Remote Battle Pass" },
            { img: "egg_incubator.png", name: "x2 Egg Incubator" },
            { img: "premiumbp.png", name: "x1 Premium Battle Pass" }
        ],
        "Might and Mastery Box": [
            { img: "remotebp.png", name: "x2 Remote Battle Pass" },
            { img: "postcard.png", name: "x1 Postcard" },
            { img: "premiumbp.png", name: "x1 Premium Battle Pass" }
        ],
        "Weekly Adventure Bundle": [
            { img: "remotebp.png", name: "x1 Remote Battle Pass" },
            { img: "egg_incubator.png", name: "x2 Egg Incubator" },
            { img: "postcard.png", name: "x1 Postcard" }
        ],
        "Monthly Special Pack": [
            { img: "ultra_ball.png", name: "x10 Ultra Ball" },
            { img: "silver_pinap.png", name: "x3 Silver Pinap Berry" },
            { img: "egg_incubator.png", name: "x2 Egg Incubator" },
            { img: "postcard.png", name: "x2 Postcard" },
            { img: "max_revive.png", name: "x3 Max Revive" }
        ],
        "Limited-Time Raid Bundle": [
            { img: "ultra_ball.png", name: "x15 Ultra Ball" },
            { img: "remotebp.png", name: "x3 Remote Battle Pass" },
            { img: "max_mushroom.png", name: "x1 Max Mushroom" },
            { img: "premiumbp.png", name: "x2 Premium Battle Pass" },
            { img: "rare_candy.png", name: "x5 Rare Candy" }
        ]
    };
    

    if (reviewProductName && reviewProductPrice && reviewProductImg) {
        document.getElementById("review-name").textContent = reviewProductName;
        document.getElementById("review-price").textContent = `Price: ${reviewProductPrice}`;
        document.getElementById("review-img").src = `./assets/items/${reviewProductImg}`;

        // Populate inclusions section
        const inclusionContainer = document.getElementById("review-inclusions");
        inclusionContainer.innerHTML = ""; // Clear previous content

        if (productInclusions[reviewProductName]) {
            productInclusions[reviewProductName].forEach((item) => {
                let inclusionItem = document.createElement("div");
                inclusionItem.classList.add("inclusion-item");

                inclusionItem.innerHTML = `
                    <img src="./assets/items/${item.img}" alt="${item.name}" class="inclusion-img">
                    <span>${item.name}</span>
                `;

                inclusionContainer.appendChild(inclusionItem);
            });
        } else {
            inclusionContainer.innerHTML = "<p>No other inclusions available.</p>";
        }

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
