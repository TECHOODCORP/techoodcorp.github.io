document.addEventListener("DOMContentLoaded", function () {
    const products = [
        // Item Boxes
        { name: "Fuzzy Buddy Ultra Ticket Box", price: "₱59.00", img: "box1.png", hoverImg: "box1.1.png", category: "Item Boxes" },
        { name: "Bug Out Ultra Ticket Box", price: "₱59.00", img: "box2.png", hoverImg: "box2.1.png", category: "Item Boxes" },
        { name: "GO Rocket Box", price: "₱289.00", img: "box3.png", hoverImg: "box3.1.png", category: "Item Boxes" },
        { name: "Ultra Raid Box", price: "₱149.00", img: "box4.png", hoverImg: "box4.1.png", category: "Item Boxes" },
        { name: "Might and Mastery Box", price: "₱149.00", img: "box5.png", hoverImg: "box5.1.png", category: "Item Boxes" },

        // Other Items (Incubators, Revives, Passes)
        { name: "Super Incubator", price: "₱88.00", img: "super_incubator.png", hoverImg: "super_incubator.png", category: "Item Boxes" },
        { name: "Egg Incubator", price: "₱88.00", img: "egg_incubator.png", hoverImg: "egg_incubator.png", category: "Item Boxes" },
        { name: "Max Revive", price: "₱59.00", img: "max_revive.png", hoverImg: "max_revive.png", category: "Item Boxes" },
        { name: "Premium Battle Pass", price: "₱88.00", img: "premiumbp.png", hoverImg: "premiumbp.png", category: "Item Boxes" },
        { name: "Max Particle Pack x6", price: "₱235.00", img: "max_particle.png", hoverImg: "max_particle.png", category: "Item Boxes" },
        { name: "Max Mushroom", price: "₱289.00", img: "max_mushroom.png", hoverImg: "max_mushroom.png", category: "Item Boxes" },

        // PokéCoins
        { name: "110 PokéCoins", price: "₱29.00", img: "coins1.png", hoverImg: "coins1.png", category: "PokéCoins" },
        { name: "600 PokéCoins", price: "₱149.00", img: "coins2.png", hoverImg: "coins2.png", category: "PokéCoins" },
        { name: "1,300 PokéCoins", price: "₱289.00", img: "coins3.png", hoverImg: "coins3.png", category: "PokéCoins" },
        { name: "2,700 PokéCoins", price: "₱589.00", img: "coins4.png", hoverImg: "coins4.png", category: "PokéCoins" },
        { name: "5,600 PokéCoins", price: "₱1,170.00", img: "coins5.png", hoverImg: "coins5.png", category: "PokéCoins" },
        { name: "15,500 PokéCoins", price: "₱2,950.00", img: "coins6.png", hoverImg: "coins6.png", category: "PokéCoins" },

        // Daily Bundles
        { name: "Weekly Adventure Bundle", price: "₱289.00", img: "daily1.png", hoverImg: "daily1.1.png", category: "Daily Bundles" },
        { name: "Monthly Special Pack", price: "₱548.00", img: "daily2.png", hoverImg: "daily2.1.png", category: "Daily Bundles" },
        { name: "Limited-Time Raid Bundle", price: "₱989.00", img: "daily3.png", hoverImg: "daily3.1.png", category: "Daily Bundles" },
    ];

    const productGrid = document.getElementById("product-grid");
    const categoryButtons = document.querySelectorAll(".category-btn");

    function renderProducts(filterCategory = "All Products") {
        productGrid.innerHTML = ""; // Clear grid before adding products

        const filteredProducts = filterCategory === "All Products"
            ? products
            : products.filter(product => product.category === filterCategory);

        filteredProducts.forEach(product => {
            const productHTML = `
                <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
                    <div class="card product-card">
                        <div class="product-img">
                            <img src="./assets/items/${product.img}" class="main-img" alt="${product.name}">
                            <img src="./assets/items/${product.hoverImg}" class="hover-img" alt="${product.name} Inclusions">
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text price">${product.price}</p>
                            <a href="order.html?name=${encodeURIComponent(product.name)}&price=${encodeURIComponent(product.price)}&img=${encodeURIComponent(product.img)}&hoverImg=${encodeURIComponent(product.hoverImg)}" class="btn add-to-cart">Add To Cart</a>
                        </div>
                    </div>
                </div>
            `;
            productGrid.innerHTML += productHTML;
        });
    }

    renderProducts(); // Initial render of all products

    categoryButtons.forEach(button => {
        button.addEventListener("click", function () {
            categoryButtons.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");

            renderProducts(this.textContent.trim());
        });
    });
});