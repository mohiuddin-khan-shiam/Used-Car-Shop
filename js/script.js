document.addEventListener('DOMContentLoaded', () => {
    // Fetch and display car listings on page load
    fetchCarListings();

    // Handle registration form submission
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegistration);
    }

    // Handle login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
});

/**
 * Fetch car listings from the server and display them
 */
function fetchCarListings() {
    fetch('backend/fetch_listings.php')
        .then(response => response.json())
        .then(data => {
            const listingsDiv = document.getElementById('car-listings');
            if (data.status === 'success' && data.listings.length > 0) {
                listingsDiv.innerHTML = ''; // Clear existing content
                data.listings.forEach(listing => {
                    const carDiv = document.createElement('div');
                    carDiv.classList.add('car-listing');
                    carDiv.innerHTML = `
                        <h3>${listing.title}</h3>
                        <p><strong>Brand:</strong> ${listing.brand}</p>
                        <p><strong>Model:</strong> ${listing.model}</p>
                        <p><strong>Year:</strong> ${listing.year}</p>
                        <p><strong>Price:</strong> $${listing.price.toFixed(2)}</p>
                        <p><strong>Seller:</strong> ${listing.seller}</p>
                        <p>${listing.description}</p>
                        ${listing.image_path ? `<img src="${listing.image_path}" alt="${listing.title}" width="200">` : ''}
                    `;
                    listingsDiv.appendChild(carDiv);
                });
            } else {
                listingsDiv.innerHTML = '<p>No car listings available.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching listings:', error);
            const listingsDiv = document.getElementById('car-listings');
            listingsDiv.innerHTML = '<p>Failed to load car listings. Please try again later.</p>';
        });
}

/**
 * Handle user registration form submission
 * @param {Event} event
 */
function handleRegistration(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    fetch('backend/register.php', {
        method: 'POST',
        body: formData,
    })
        .then(response => response.json())
        .then(data => {
            const responseMessage = document.getElementById('registerResponse');
            responseMessage.textContent = data.message;

            if (data.status === 'success') {
                responseMessage.style.color = 'green';
                form.reset();
            } else {
                responseMessage.style.color = 'red';
            }
        })
        .catch(error => {
            console.error('Error during registration:', error);
            const responseMessage = document.getElementById('registerResponse');
            responseMessage.textContent = 'An error occurred. Please try again later.';
            responseMessage.style.color = 'red';
        });
}

/**
 * Handle user login form submission
 * @param {Event} event
 */
function handleLogin(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    fetch('backend/login.php', {
        method: 'POST',
        body: formData,
    })
        .then(response => response.json())
        .then(data => {
            const responseMessage = document.getElementById('loginResponse');
            responseMessage.textContent = data.message;

            if (data.status === 'success') {
                responseMessage.style.color = 'green';
                // Redirect to dashboard or homepage after successful login
                window.location.href = 'dashboard.php';
            } else {
                responseMessage.style.color = 'red';
            }
        })
        .catch(error => {
            console.error('Error during login:', error);
            const responseMessage = document.getElementById('loginResponse');
            responseMessage.textContent = 'An error occurred. Please try again later.';
            responseMessage.style.color = 'red';
        });
}

