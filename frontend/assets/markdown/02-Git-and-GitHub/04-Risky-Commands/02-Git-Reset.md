# Git Reset (Hard)

Command: `git reset --hard <commit-id>`

## Ye kya karta hai?
Ye aapke code ko poori tarah se us purane commit jaisa bana deta hai. Jo bhi naye changes aapne kiye they (chahe wo saved hon ya unsaved), wo sab permanently delete ho jayenge.

> [!CAUTION]
> **Risky Kyun Hai?** `--hard` flag ki wajah se aapka uncommitted data permanently delete ho jata hai aur isko undo karna lagbhag namumkin hai. 

Agar aap sirf commit history wapas karna chahte hain bina files loose kiye, toh `git reset --soft` use karein.