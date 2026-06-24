# Git Rebase

Rebase bhi Merge ki tarah branches ko jodne ka kaam karta hai, par iska tareeqa alag hai. Rebase history ko clean banata hai by moving all the local commits to the tip of the target branch.

## Example
Aap feature branch par hain aur main ke changes laane hain:
```bash
git rebase main
```

> [!WARNING]
> Kabhi bhi aisi branch ko rebase mat karo jise aapne server par push kar diya ho aur dusre log us par kaam kar rahe hon. Ye risky ho sakta hai.