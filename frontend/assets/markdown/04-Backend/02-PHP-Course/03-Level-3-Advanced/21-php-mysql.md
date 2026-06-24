# PHP MySQL
PHP ko database (MySQL) se jodne ke liye `mysqli` ya `PDO` ka use hota hai.

```php
<?php
$conn = new mysqli("localhost", "username", "password", "database");

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully";
?>
```