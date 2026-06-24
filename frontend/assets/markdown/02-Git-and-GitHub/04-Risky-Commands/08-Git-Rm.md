# Git Rm

Command: `git rm file-name`

## Ye kya karta hai?
Yeh file ko aapke computer (working directory) se bhi delete kar deta hai aur Git ke index se bhi hata deta hai (taaki agle commit me file delete record ho jaye).

> [!WARNING]
> Agar aap sirf Git tracking se file hatana chahte hain par computer mein rakhna chahte hain, toh hamesha `git rm --cached file-name` use karein.