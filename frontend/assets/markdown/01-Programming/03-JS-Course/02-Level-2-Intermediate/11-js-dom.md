# JS DOM (Document Object Model)
DOM ke zariye JavaScript HTML elements ko read, update aur delete kar sakti hai.

```javascript
// Element select karna
let btn = document.querySelector(".my-btn");

// Event lagana
btn.addEventListener("click", () => {
  alert("Button Clicked!");
});
```