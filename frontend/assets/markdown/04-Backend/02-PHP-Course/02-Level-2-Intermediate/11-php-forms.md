# PHP Forms
PHP `$_GET` aur `$_POST` superglobals ka use karke HTML forms ka data receive karta hai.

```php
<?php
  if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['fname'];
    echo "Name is " . $name;
  }
?>
```