document.addEventListener("DOMContentLoaded", function () {
    // Load Header and Footer
    fetch("header.html")
        .then(response => response.text())
        .then(data => document.getElementById("header").innerHTML = data)
        .then(() => updateNavbar()); // Ensure navbar updates after loading

    fetch("footer.html")
        .then(response => response.text())
        .then(data => document.getElementById("footer").innerHTML = data);
});

// Get current user
function getCurrentUser() {
    try {
        const userData = sessionStorage.getItem("loggedInUser");
        return userData ? JSON.parse(userData) : null;
    } catch (e) {
        console.error("Error parsing user data:", e);
        return null;
    }
}

// Check if user is logged in
function isLoggedIn() {
    return getCurrentUser() !== null;
}

// Update navbar dynamically
function updateNavbar() {
    const dropdownMenu = document.querySelector(".dropdown-menu-end");
    if (!dropdownMenu) return;

    const user = getCurrentUser();
    
    if (user) {
        dropdownMenu.innerHTML = `
            <li><a class="dropdown-item" href="profile.html"><i class="fas fa-user-circle"></i> View Profile</a></li>
            <li><a class="dropdown-item" href="#"><i class="fas fa-cog"></i> Settings</a></li>
            <li><a class="dropdown-item" href="#"><i class="fas fa-question-circle"></i> Help & Support</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#" id="logout-btn"><i class="fas fa-sign-out-alt"></i> Logout</a></li>
        `;

        // Attach logout event listener
        document.getElementById("logout-btn")?.addEventListener("click", handleLogout);
    } else {
        dropdownMenu.innerHTML = `
            <li><a class="dropdown-item" href="login.html"><i class="fas fa-sign-in-alt"></i> Sign In</a></li>
        `;
    }
}

// Logout function
function handleLogout(event) {
    event.preventDefault();
    sessionStorage.removeItem("loggedInUser");
    updateNavbar();
    showToast("You have been logged out");

    // Redirect if on a protected page
    if (window.location.pathname.includes("profile.html")) {
        window.location.href = "login.html";
    }
}

// Protect restricted pages
function protectRoutes() {
    const protectedRoutes = ["profile.html"];
    const currentPath = window.location.pathname.split("/").pop();

    if (protectedRoutes.includes(currentPath) && !isLoggedIn()) {
        sessionStorage.setItem("loginRedirect", window.location.href);
        window.location.href = "login.html";
    }
}

// Show toast notification
function showToast(message, type = "success") {
    const toast = document.createElement("div");
    toast.className = `auth-toast auth-toast-${type}`;
    toast.innerHTML = `<i class="fas fa-${type === "success" ? "check" : "exclamation"}-circle"></i> ${message}`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// Initialize authentication logic
document.addEventListener("DOMContentLoaded", function () {
    protectRoutes();
    updateNavbar();
});

// Global function for successful login
window.auth = {
    handleSuccessfulLogin: function (userData) {
        sessionStorage.setItem("loggedInUser", JSON.stringify(userData));
        updateNavbar();

        const redirectUrl = sessionStorage.getItem("loginRedirect") || "home.html";
        sessionStorage.removeItem("loginRedirect");
        window.location.href = redirectUrl;
    },
};
