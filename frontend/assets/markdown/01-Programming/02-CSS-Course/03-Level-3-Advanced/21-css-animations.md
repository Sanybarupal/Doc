# CSS Animations
Animations se aap kisi element ko ek style se dusri style mein change kar sakte hain (smoothly).

```css
@keyframes example {
  from {background-color: red;}
  to {background-color: yellow;}
}

div {
  animation-name: example;
  animation-duration: 4s;
}
```