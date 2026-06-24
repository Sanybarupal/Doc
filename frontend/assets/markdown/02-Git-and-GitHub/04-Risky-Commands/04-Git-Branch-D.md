# Delete Branch (Force)

Command: `git branch -D branch-name`

## Ye kya karta hai?
Yeh kisi branch ko forcefully delete kar deta hai, bhale hi uske andar ka code aapne abhi tak main branch mein merge na kiya ho.

> [!WARNING]
> **Risky Kyun Hai?** Agar us branch mein kuch important code tha jo abhi merge nahi hua, toh `-D` chalane se wo code kho sakta hai. Safely delete karne ke liye lowercase `-d` (`git branch -d branch-name`) ka use karein.