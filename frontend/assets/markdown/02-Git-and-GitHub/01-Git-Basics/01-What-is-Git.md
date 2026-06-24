# Git Kya Hai? (What is Git?)

Git ek **Version Control System (VCS)** hai. Iska kaam hai aapke code mein hue badlaav (changes) ko track karna.

Socho agar aap ek project par kaam kar rahe ho, aur aapse galti se kuch delete ho jaye, toh Git ki madad se aap aaram se purane version par wapas ja sakte ho (jaise game mein checkpoint hota hai!).

## Git Kyun Zaroori Hai?

1. **Undo mistakes:** Agar code toot gaya, toh picchle version pe wapas jao.
2. **Teamwork:** Ek hi project par kai log ek saath kaam kar sakte hain.
3. **Backup:** Aapka code cloud par safe rehta hai (via GitHub).

## Git aur GitHub mein kya farq hai?

Aksar log Git aur GitHub ko ek hi samajhte hain, par dono alag hain:

*   **Git** ek software hai jo aapke computer par install hota hai aur versions track karta hai.
*   **GitHub** ek website (cloud storage) hai jahan aap apne Git repositories ko online host karte ho.

## Basic Git Commands

Code track karna shuru karne ke liye kuch zaroori commands:

```bash
# Naya project initialize karne ke liye
git init

# Changes ko stage karne ke liye
git add .

# Changes ko save (commit) karne ke liye
git commit -m "Mera pehla commit"
```

> [!IMPORTANT]
> Git use karne se pehle usko apni email aur naam batana zaroori hai:
> `git config --global user.name "Aapka Naam"`
> `git config --global user.email "aap@email.com"`
