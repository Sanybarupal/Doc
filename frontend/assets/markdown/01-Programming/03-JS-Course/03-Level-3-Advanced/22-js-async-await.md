# JS Async / Await
`async` aur `await` Promises ko aur asaan aur padhne layak banate hain.

```javascript
async function fetchData() {
  let response = await fetch("https://api.example.com/data");
  let data = await response.json();
  console.log(data);
}
```