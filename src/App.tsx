import { Keypair } from "@solana/web3.js";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { useState } from "react";
import nacl from "tweetnacl";

interface Wallet {
  publicKey: string;
  mnemonic: string;
}

const App = () => {
  const [wallet, setWallet] = useState<Wallet[]>([]);

  const createWallet = () => {
    const mnemonic = generateMnemonic();
    const seed = mnemonicToSeedSync(mnemonic);
    const path = `m/44'/501'/${wallet.length}'/0'`;
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const keypair = Keypair.fromSecretKey(secret);

    setWallet((prev) => [
      ...prev,
      {
        publicKey: keypair.publicKey.toBase58(),
        mnemonic,
      },
    ]);
  };

  return (
    <div
      style={{
        padding: "2rem",
        fontFamily: "Roboto Mono",
        maxWidth: 700,
        margin: "0 auto",
      }}
    >
      <h1>Generate Wallet</h1>
      <button
        onClick={createWallet}
        style={{
          fontFamily: "Roboto Mono",
          padding: "12px 24px",
          fontSize: "1rem",
          cursor: "pointer",
          background: "#000000",
          color: "white",
          border: "none",
          borderRadius: "8px",
        }}
      >
        Create Wallet
      </button>
      <div style={{ marginTop: "2rem" }}>
        {wallet.map((wallet, i) => (
          <div
            key={i}
            style={{
              background: "#000000",
              color: "#eee",
              padding: "1rem",
              borderRadius: "8px",
              marginBottom: "1rem",
            }}
          >
            <h3>Wallet {i + 1}</h3>
            <p>
              <strong>Address:</strong>
              <br />
              {wallet.publicKey}
            </p>
            <p>
              <strong>Mnemonic:</strong>
              <br />
              <span style={{ color: "#ffffff" }}>{wallet.mnemonic}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
