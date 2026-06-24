# Git Checkout & Git Switch

Ek branch se dusri branch mein jaane ke liye `checkout` ya `switch` ka use hota hai. 

## Git Checkout
Puraani command jo branch change karne ke alawa files ko restore bhi kar sakti thi:
```bash
# Branch change karna
git checkout feature-login

# Nayi branch banakar turant usme jana
git checkout -b new-feature
```

## Git Switch
Git ke naye versions mein sirf branch change karne ke liye ek clear command banai gayi hai:
```bash
git switch feature-login
```