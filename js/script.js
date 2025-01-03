const BASE_URL = 'http://used-car-shop.rf.gd/'; // Ensure this ends with a single slash

// Fetch car listings
function fetchCarListings() {
    const listingsDiv = document.getElementById('car-listings');
    listingsDiv.innerHTML = '<p>Loading...</p>'; // Show loading message

    fetch(`${BASE_URL}fetch_listings.php`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Response Data:', data); // Debugging
            if (data.status === 'success' && data.listings.length > 0) {
                listingsDiv.innerHTML = ''; // Clear loading message
                data.listings.forEach(listing => {
                    const carDiv = document.createElement('div');
                    carDiv.classList.add('car-listing');
                    carDiv.innerHTML = `
                        <h3>${listing.title}</h3>
                        <p><strong>Brand:</strong> ${listing.brand}</p>
                        <p><strong>Model:</strong> ${listing.model}</p>
                        <p><strong>Year:</strong> ${listing.year}</p>
                        <p><strong>Price:</strong> $${listing.price.toFixed(2)}</p>
                    `;
                    listingsDiv.appendChild(carDiv);
                });
            } else {
                listingsDiv.innerHTML = '<p>No car listings found.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching listings:', error);
            listingsDiv.innerHTML = '<p>Failed to load car listings. Please try again later.</p>';
        });
}

// Handle registration form submission
function handleRegistration(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    fetch(`${BASE_URL}register.php`, {
        method: 'POST',
        body: formData,
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Registration Response:', data); // Debugging
            if (data.status === 'success') {
                alert('Registration successful!');
                form.reset();
            } else {
                alert(`Error: ${data.message}`);
            }
        })
        .catch(error => {
            console.error('Error during registration:', error);
            alert('An error occurred. Please try again later.');
        });
}

// Handle login form submission
function handleLogin(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    fetch(`${BASE_URL}login.php`, {
        method: 'POST',
        body: formData,
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Login Response:', data); // Debugging
            if (data.status === 'success') {
                alert('Login successful!');
                window.location.href = 'dashboard.php'; // Redirect on success
            } else {
                alert(`Error: ${data.message}`);
            }
        })
        .catch(error => {
            console.error('Error during login:', error);
            alert('An error occurred. Please try again later.');
        });
}
