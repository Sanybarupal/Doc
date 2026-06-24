# Git Merge

Jab aap kisi doosri branch (e.g. `feature-login`) par apna kaam complete kar lete hain, toh aap `git merge` ki madad se us branch ka sara code main branch mein jod dete hain.

## Process
Pehle us branch mein jao jisme data lena hai (e.g. `main`):
```bash
git checkout main
```

Fir jis branch ko add karna hai, usko merge karo:
```bash
git merge feature-login
```