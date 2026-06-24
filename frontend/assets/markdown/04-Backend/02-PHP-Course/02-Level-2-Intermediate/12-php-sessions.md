# PHP Sessions
Sessions ka use information store karne ke liye hota hai jo multiple pages par access ki ja sake (jaise login state).

```php
<?php
  session_start();
  $_SESSION["username"] = "admin";
?>
```