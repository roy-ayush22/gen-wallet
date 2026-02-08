import { HDKey } from "@scure/bip32";
import { Keypair } from "@solana/web3.js";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { ethers } from "ethers";
import { useState } from "react";
import nacl from "tweetnacl";

interface Wallet {
  type: "solana" | "ethereum";
  publicKey: string;
  mnemonic: string;
}

const App = () => {
  const [wallet, setWallet] = useState<Wallet[]>([]);

  const createSolanaWallet = () => {
    const mnemonic = generateMnemonic();
    const seed = mnemonicToSeedSync(mnemonic);
    const path = `m/44'/501'/${wallet.length}'/0'`;
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const keypair = Keypair.fromSecretKey(secret);

    setWallet((prev) => [
      ...prev,
      {
        type: "solana",
        publicKey: keypair.publicKey.toBase58(),
        mnemonic,
      },
    ]);
  };

  const createEthWallet = () => {
    const mnemonic = generateMnemonic();
    const seed = mnemonicToSeedSync(mnemonic);
    const path = `m/44'/60'/0'/0/${wallet.length}`;
    const derivedSeed = HDKey.fromMasterSeed(seed).derive(path);
    const secret = Buffer.from(derivedSeed.privateKey!).toString("hex");
    const ethWallet = new ethers.Wallet(secret);

    setWallet((prev) => [
      ...prev,
      {
        type: "ethereum",
        publicKey: ethWallet.address,
        mnemonic,
      },
    ]);
  };

  const solWallets = wallet.filter((w) => w.type === "solana");
  const ethWallets = wallet.filter((w) => w.type === "ethereum");

  return (
    <div
      style={{
        padding: "2rem 1rem",
        fontFamily: "Roboto Mono",
        maxWidth: 800,
        margin: "0 auto",
      }}
    >
      <h1 style={{ marginBottom: "1.5rem" }}>Generate Wallet</h1>

      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {/* Solana Section */}
        <div style={{ flex: 1, minWidth: 300 }}>
          <button
            onClick={createSolanaWallet}
            style={{
              fontFamily: "Roboto Mono",
              padding: "10px 20px",
              fontSize: "0.8rem",
              cursor: "pointer",
              background: "#000000",
              color: "white",
              border: "none",
              borderRadius: "8px",
              width: "100%",
            }}
          >
            Create Solana Wallet
          </button>
          <div
            style={{
              marginTop: "1rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            {solWallets.map((w, i) => (
              <div
                key={i}
                style={{
                  background: "#000000",
                  color: "#eee",
                  padding: "0.6rem 0.8rem",
                  borderRadius: "8px",
                  fontSize: "0.7rem",
                  wordBreak: "break-all",
                }}
              >
                <h4 style={{ margin: "0 0 0.3rem 0", fontSize: "0.8rem" }}>
                  Solana Wallet {i + 1}
                </h4>
                <p style={{ margin: "0.2rem 0" }}>
                  <strong>Address:</strong>
                  <br />
                  {w.publicKey}
                </p>
                <p style={{ margin: "0.2rem 0" }}>
                  <strong>Mnemonic:</strong>
                  <br />
                  <span style={{ color: "#ffffff" }}>{w.mnemonic}</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Ethereum Section */}
        <div style={{ flex: 1, minWidth: 300 }}>
          <button
            onClick={createEthWallet}
            style={{
              fontFamily: "Roboto Mono",
              padding: "10px 20px",
              fontSize: "0.8rem",
              cursor: "pointer",
              background: "#000000",
              color: "white",
              border: "none",
              borderRadius: "8px",
              width: "100%",
            }}
          >
            Create Ethereum Wallet
          </button>
          <div
            style={{
              marginTop: "1rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            {ethWallets.map((w, i) => (
              <div
                key={i}
                style={{
                  background: "#000000",
                  color: "#eee",
                  padding: "0.6rem 0.8rem",
                  borderRadius: "8px",
                  fontSize: "0.7rem",
                  wordBreak: "break-all",
                }}
              >
                <h4 style={{ margin: "0 0 0.3rem 0", fontSize: "0.8rem" }}>
                  Ethereum Wallet {i + 1}
                </h4>
                <p style={{ margin: "0.2rem 0" }}>
                  <strong>Address:</strong>
                  <br />
                  {w.publicKey}
                </p>
                <p style={{ margin: "0.2rem 0" }}>
                  <strong>Mnemonic:</strong>
                  <br />
                  <span style={{ color: "#ffffff" }}>{w.mnemonic}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
