# CSS Variables
Variables se aap values (jaise colors) ko store kar sakte hain aur pure CSS mein reuse kar sakte hain.

```css
:root {
  --main-color: #3b82f6;
}

button {
  background-color: var(--main-color);
}
```