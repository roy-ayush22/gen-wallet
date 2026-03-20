# 🔐 forge

A learning project for building a full-stack Web3 application.

> **Goal:** Build a complete Web3 wallet app that lets users create wallets, manage accounts, transfer funds, and check balances.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, TypeScript, Vite |
| Styling | CSS (Tailwind planned) |
| Solana | `@solana/web3.js`, `ed25519-hd-key`, `tweetnacl` |
| Ethereum | `ethers v6`, `@scure/bip32` |
| Crypto primitives | `bip39`, `@noble/secp256k1`, `ethereum-cryptography` |
| Backend *(planned)* | Node.js, Express.js |
| Database *(planned)* | MongoDB + Prisma |

---

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (or Node.js 20+)

### Install & Run

```bash
# Clone the repo
git clone https://github.com/your-username/forge.git
cd forge

# Install dependencies
bun install

# Start dev server
bun run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📂 Project Structure

```
forge/
├── src/
│   ├── App.tsx          # Main app — wallet generation UI
│   ├── main.tsx         # React entry point
│   ├── App.css          # Global styles
│   └── index.css
├── public/
├── index.html
├── vite.config.ts       # Vite + node polyfills config
├── tsconfig.app.json
└── package.json
```

---

## ⚠️ Disclaimer

This is a **learning project**. Do **not** use wallets generated here to store real funds. Private keys and mnemonics are displayed in plaintext for educational purposes only.

---

## 📚 Learning Resources

- [Solana Docs](https://docs.solana.com/)
- [Ethereum Docs](https://ethereum.org/en/developers/docs/)
- [BIP-39 Spec](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki)
- [BIP-44 Spec](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki)
- [ethers.js Docs](https://docs.ethers.org/v6/)