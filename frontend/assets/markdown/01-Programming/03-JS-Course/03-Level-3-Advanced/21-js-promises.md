# JS Promises
Promises asynchronous operations handle karne ke liye use hote hain (jaise server se data mangwana). Iske 3 state hote hain: Pending, Fulfilled, Rejected.

```javascript
let myPromise = new Promise(function(resolve, reject) {
  setTimeout(() => resolve("Data received!"), 2000);
});

myPromise.then(res => console.log(res));
```