document.addEventListener("DOMContentLoaded", function () {
    // Load Header and Footer
    fetch("header.html").then(response => response.text()).then(data => document.getElementById("header").innerHTML = data);
    fetch("footer.html").then(response => response.text()).then(data => document.getElementById("footer").innerHTML = data);

    // Cart
    let cartItems = JSON.parse(localStorage.getItem("reviewCart")) || [];
    let cartContainer = document.getElementById("cart-items");
    let checkoutButton = document.getElementById("checkout-btn");
    let totalPriceDisplay = document.getElementById("total-price");

    if (cartItems.length === 0) {
        cartContainer.innerHTML = "<p class='text-center'>Your cart is empty.</p>";
        checkoutButton.style.display = "none";
        return;
    }

    // Display cart items
    cartItems.forEach((item, index) => {
        let itemPrice = parseFloat(item.price.replace(/[^0-9.]/g, ""));
        let totalPrice = itemPrice * item.quantity;

        let cartItem = document.createElement("div");
        cartItem.classList.add("cart-item", "d-flex", "align-items-center", "mb-3", "p-3", "border", "rounded");
        cartItem.innerHTML = `
            <input type="checkbox" class="item-checkbox me-3" data-index="${index}" data-price="${totalPrice}">
            <img src="./assets/items/${item.img}" class="cart-img me-3" alt="Product Image">
            <div class="cart-details">
                <h5 class="cart-title">${item.name}</h5>
                <p class="cart-price">Price: ₱${itemPrice.toFixed(2)}</p>
                <p class="cart-quantity">Quantity: ${item.quantity}</p>
                <p class="cart-total"><strong>Total: ₱${totalPrice.toFixed(2)}</strong></p>
            </div>
        `;
        cartContainer.appendChild(cartItem);
    });

    // Update total when checkboxes are clicked
    document.querySelectorAll(".item-checkbox").forEach((checkbox) => {
        checkbox.addEventListener("change", updateTotal);
    });

    function updateTotal() {
        let selectedTotal = 0;
        document.querySelectorAll(".item-checkbox:checked").forEach((checkedItem) => {
            selectedTotal += parseFloat(checkedItem.getAttribute("data-price"));
        });
        totalPriceDisplay.textContent = selectedTotal.toFixed(2);
    }

    // Checkout Button Click
    checkoutButton.addEventListener("click", function () {
        if (!isLoggedIn()) {
            showNotification("Please log in to proceed with checkout.");
            return;
        }

        let selectedItems = document.querySelectorAll(".item-checkbox:checked");
        if (selectedItems.length === 0) {
            showNotification("Please select at least one item to checkout.");
            return;
        }

        document.getElementById('payment-modal').style.display = 'flex';
    });

    // Close Payment Modal
    document.getElementById('close-modal').addEventListener('click', function () {
        document.getElementById('payment-modal').style.display = 'none';
    });

    // Confirm Payment
    document.getElementById('confirm-payment').addEventListener('click', function () {
        let paymentMethod = document.querySelector('input[name="payment"]:checked');
        if (!paymentMethod) {
            showNotification("Please select a payment method!");
            return;
        }

        showNotification(`Payment Successful with ${paymentMethod.value}!`);

        let selectedItems = document.querySelectorAll(".item-checkbox:checked");
        let updatedCart = cartItems.filter((_, index) => {
            return ![...selectedItems].some(item => parseInt(item.getAttribute("data-index")) === index);
        });

        localStorage.setItem("reviewCart", JSON.stringify(updatedCart));

        document.getElementById('payment-modal').style.display = 'none';
        showCheckoutPopup();
        setTimeout(() => location.reload(), 2000);
    });

    function showCheckoutPopup() {
        let popup = document.createElement("div");
        popup.classList.add("review-popup");
        popup.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>Payment Successful! Thank you for your purchase.</span>
        `;
        document.body.appendChild(popup);

        setTimeout(() => {
            popup.style.opacity = "1";
            popup.style.transform = "translateY(0)";
        }, 100);

        setTimeout(() => {
            popup.style.opacity = "0";
            popup.style.transform = "translateY(20px)";
            setTimeout(() => {
                popup.remove();
            }, 300);
        }, 3000);
    }

    function showNotification(message) {
        let popup = document.createElement("div");
        popup.classList.add("review-popup");
        popup.innerHTML = `
            <i class="fas fa-exclamation-circle"></i>
            <span>${message}</span>
        `;
        document.body.appendChild(popup);

        setTimeout(() => {
            popup.style.opacity = "1";
            popup.style.transform = "translateY(0)";
        }, 100);

        setTimeout(() => {
            popup.style.opacity = "0";
            popup.style.transform = "translateY(20px)";
            setTimeout(() => {
                popup.remove();
            }, 300);
        }, 3000);
    }
});
