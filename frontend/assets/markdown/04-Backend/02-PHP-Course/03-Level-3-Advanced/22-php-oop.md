# PHP Object Oriented Programming
OOP classes aur objects par based hai jo code ko reuse karne me madad karta hai.

```php
<?php
class Car {
  public $color;
  public function __construct($color) {
    $this->color = $color;
  }
}
$myCar = new Car("Red");
?>
```