<?php
// Include the database connection
include 'db.php';

// Set response headers to allow JSON response
header('Content-Type: application/json');

// Fetch all car listings
try {
    $query = "SELECT 
                car_listings.id,
                car_listings.title,
                car_listings.brand,
                car_listings.model,
                car_listings.year,
                car_listings.price,
                car_listings.description,
                car_listings.image_path,
                users.username AS seller
              FROM car_listings
              JOIN users ON car_listings.user_id = users.id
              ORDER BY car_listings.created_at DESC";

    $listings = fetchData($query);

    if (!empty($listings)) {
        echo json_encode(['status' => 'success', 'listings' => $listings]);
    } else {
        echo json_encode(['status' => 'success', 'message' => 'No car listings found.', 'listings' => []]);
    }
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => 'Failed to fetch car listings.', 'error' => $e->getMessage()]);
}
?>
