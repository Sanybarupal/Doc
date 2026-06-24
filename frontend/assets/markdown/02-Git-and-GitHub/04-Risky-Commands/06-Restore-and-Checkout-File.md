# Git Checkout / Restore File

Commands:
- `git checkout -- file-name` (Purana tareeqa)
- `git restore file-name` (Naya tareeqa)

## Ye kya karte hain?
Agar aapne kisi tracked file mein kuch changes kiye hain (lekin add/commit nahi kiye), aur aapko lagta hai "yaar pehle jaisa tha wahi theek tha", toh ye command us file ko uske last saved state mein wapas laa deti hai.

> [!WARNING]
> **Risky Kyun Hai?** Aapne jo bhi nayi typing ki hogi, wo turant permanently delete ho jayegi. Isse wapas nahi laya ja sakta.