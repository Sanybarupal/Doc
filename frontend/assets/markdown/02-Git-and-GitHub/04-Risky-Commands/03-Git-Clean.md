# Git Clean

Command: `git clean -f` ya `git clean -fd`

## Ye kya karta hai?
Yeh command aapke project mein maujood un untracked files (nayee files jo Git mein add nahi hui hain) ko permanently delete kar deta hai.
- `-f` ka matlab force delete files.
- `-fd` ka matlab files aur directories dono delete karna.

> [!CAUTION]
> **Risky Kyun Hai?** Ye deleted files Recycle Bin (Trash) mein nahi jaati hain, balki hamesha ke liye gayab ho jati hain. Ye command chalane se pehle `git clean -n` chala kar check karein ki kya delete hone wala hai.