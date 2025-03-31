// profile.js - Enhanced version with complete logout functionality

function loadProfile() {
    const currentUser = getCurrentUser();
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }

    // Update profile elements
    updateProfileElements(currentUser);

    // Setup logout functionality
    setupLogout();
}

function getCurrentUser() {
    try {
        const userData = sessionStorage.getItem("loggedInUser");
        return userData ? JSON.parse(userData) : null;
    } catch (e) {
        console.error("Error parsing user data:", e);
        return null;
    }
}

function updateProfileElements(user) {
    // Update profile picture
    const profilePicture = document.querySelector('.profile-picture');
    // profilePicture.src = user.profilePic || '/Alex/Images/nhica.JPG';

    // Update name
    const profileName = document.querySelector('.profile-info h3');
    profileName.textContent = `${user.firstName || ''} ${user.lastName || ''}`.trim();

    // Update info values
    const infoValues = document.querySelectorAll('.info-value');
    infoValues[0].textContent = user.email || 'No email provided';
    infoValues[1].textContent = user.inGameName || 'No IGN set';
    infoValues[2].textContent = user.playerId || 'No Player ID';
}

function setupLogout() {
    // Get all logout elements (profile page and dropdown)
    const logoutItems = [
        document.getElementById('logout-item'),
        document.getElementById('logout') // From dropdown
    ];

    logoutItems.forEach(item => {
        item?.addEventListener('click', function(e) {
            e.preventDefault();
            handleLogout();
        });
    });
}

function handleLogout() {
    // Clear user session
    sessionStorage.removeItem("loggedInUser");
    
    // Show logout notification
    showPopup('You have been logged out.', "fas fa-sign-out-alt");
    
    // Redirect after delay
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 1000);
}

// Notification function (similar to your reference code)
function showPopup(message, icon = "fas fa-check-circle") {
    const popup = document.createElement("div");
    popup.className = "review-popup show";
    popup.innerHTML = `<i class="${icon}"></i> <span>${message}</span>`;
    document.body.appendChild(popup);
    setTimeout(() => {
        popup.classList.remove("show");
        setTimeout(() => popup.remove(), 300);
    }, 3000);
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('profile.html')) {
        loadProfile();
    }
});