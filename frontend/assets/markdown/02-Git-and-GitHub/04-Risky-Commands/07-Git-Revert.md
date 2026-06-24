# Git Revert

Command: `git revert <commit-id>`

## Ye kya karta hai?
Yeh pehle ki hui galti ko sudharne ka sabse safe tareeqa hai. Agar aapse galat code commit ho gaya hai, toh `git revert` us code ke ulte (inverse) changes ka ek naya commit bana deta hai, jisse galti theek ho jati hai par history se kuch delete nahi hota.

> [!NOTE]
> Ye command "Risky" nahi hai (Reset ke mukable), par confusing lag sakti hai kyunki ye actually ek aur naya commit create karti hai purane effect ko cancel karne ke liye.