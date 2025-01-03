const BASE_URL = 'used-car-shop.rf.gd';

function fetchCarListings() {
    fetch(`${BASE_URL}fetch_listings.php`)
        .then(response => response.json())
        .then(data => {
            // Process data
        })
        .catch(error => {
            console.error('Error fetching listings:', error);
        });
}

function handleRegistration(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    fetch(`${BASE_URL}register.php`, {
        method: 'POST',
        body: formData,
    })
        .then(response => response.json())
        .then(data => {
            // Process data
        })
        .catch(error => {
            console.error('Error during registration:', error);
        });
}

function handleLogin(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    fetch(`${BASE_URL}login.php`, {
        method: 'POST',
        body: formData,
    })
        .then(response => response.json())
        .then(data => {
            // Process data
        })
        .catch(error => {
            console.error('Error during login:', error);
        });
}
