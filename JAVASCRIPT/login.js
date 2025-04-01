const loginText = document.querySelector(".title-text .login");
const loginForm = document.querySelector("form.login");
const loginBtn = document.querySelector("label.login");
const signupBtn = document.querySelector("label.signup");
const signupLink = document.querySelector("form .signup-link a");
 
// Form slider functionality
signupBtn.onclick = () => {
    loginForm.style.marginLeft = "-50%";
    loginText.style.marginLeft = "-50%";
};
 
loginBtn.onclick = () => {
    loginForm.style.marginLeft = "0%";
    loginText.style.marginLeft = "0%";
};
 
signupLink.onclick = () => {
    signupBtn.click();
    return false;
};
 
// Player ID generation
function generatePlayerId() {
    return `${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)}`;
}
 
function isValidEmail(email) {
    // Regular expression for validating email with 2 or 3 domain levels
    const emailRegex = /^[a-zA-Z0-9]+([._-][a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z]{2,}){1,2}$/;
 
    // Check if email matches the regex
    if (!emailRegex.test(email)) return false;
 
    // Split email into local and domain parts
    const [localPart, domainPart] = email.split("@");
 
    // Validate length constraints
    if (localPart.length > 64 || domainPart.length > 253) return false;
 
    return true;
}
// User management functions
let users = JSON.parse(localStorage.getItem("users")) || [];
 
function saveUsers() {
    localStorage.setItem("users", JSON.stringify(users));
}
 
function signUpUser(firstName, lastName, email, playerId, inGameName, password) {
    users.push({ firstName, lastName, email, playerId, inGameName, password });
    saveUsers();
    showPopup(`Sign up successful! Please log in.<br>Your Player ID: ${playerId}`, "fas fa-check-circle");
}
 
function loginUser(email, password) {
    return users.find(user => user.email === email && user.password === password) || null;
}
 
// Form event handlers
document.addEventListener('DOMContentLoaded', function () {
    // Generate player ID for signup form if field exists
    const playerIdField = document.getElementById('playerId');
    if (playerIdField) playerIdField.value = generatePlayerId();
 
    // Login form handler
    document.getElementById('loginButton')?.addEventListener('click', function () {
        const email = loginForm.querySelector('input[type="text"]').value.trim();
        const password = loginForm.querySelector('input[type="password"]').value.trim();
 
        if (!isValidEmail(email)) {
            showPopup('Please enter a valid email address.', "fas fa-exclamation-circle");
            return;
        }
 
        const user = loginUser(email, password);
        if (user) {
            if (window.auth && typeof window.auth.handleSuccessfulLogin === 'function') {
                window.auth.handleSuccessfulLogin(user);
            } else {
                console.error('Global auth handler not found');
                showPopup('Login successful!', "fas fa-check-circle");
                setTimeout(() => window.location.href = 'home.html', 1000);
            }
        } else {
            showPopup('Incorrect credentials. Try again.', "fas fa-times-circle");
        }
    });
 
    // Signup form handler
    document.getElementById('signupButton')?.addEventListener('click', function () {
        const signupForm = document.querySelector('form.signup');
        const firstName = signupForm.querySelector('input[placeholder="First Name"]').value.trim();
        const lastName = signupForm.querySelector('input[placeholder="Last Name"]').value.trim();
        const email = signupForm.querySelector('input[placeholder="Email Address"]').value.trim();
        const playerId = document.getElementById('playerId').value;
        const inGameName = signupForm.querySelector('input[placeholder="In-Game Name"]').value.trim();
        const password = signupForm.querySelector('input[placeholder="Password"]').value.trim();
        const confirmPassword = signupForm.querySelector('input[placeholder="Confirm password"]').value.trim();
 
        // Validation
        if (!firstName || !lastName || !email || !inGameName || !password || !confirmPassword) {
            showPopup('Please fill in all required fields.', "fas fa-exclamation-circle");
            return;
        }
 
        if (!isValidEmail(email)) {
            showPopup('Please enter a valid email address.', "fas fa-exclamation-circle");
            return;
        }
 
        if (password.length < 8) {
            showPopup('Password must be at least 8 characters long.', "fas fa-exclamation-triangle");
            return;
        }
 
        if (password !== confirmPassword) {
            showPopup('Passwords do not match.', "fas fa-exclamation-triangle");
            return;
        }
 
        if (users.some(user => user.email === email)) {
            showPopup('This email is already registered.', "fas fa-user-times");
            return;
        }
 
        signUpUser(firstName, lastName, email, playerId, inGameName, password);
    });
});
 
// Notification popup function
function showPopup(message, icon = "fas fa-check-circle") {
    let popup = document.createElement("div");
    popup.className = "review-popup show";
    popup.innerHTML = `<i class="${icon}"></i> <span>${message}</span>`;
    document.body.appendChild(popup);
    setTimeout(() => {
        popup.classList.remove("show");
        setTimeout(() => popup.remove(), 300);
    }, 3000);
}
 