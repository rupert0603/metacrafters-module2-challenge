// Import Solana web3 functinalities
const {
  Connection,
  PublicKey,
  clusterApiUrl,
  LAMPORTS_PER_SOL,
} = require("@solana/web3.js");

const USER_PUBLIC_KEY = process.argv[2];

const airDropSol = async () => {
  try {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

    const fromAirDropSignature = await connection.requestAirdrop(
      new PublicKey(USER_PUBLIC_KEY),
      2 * LAMPORTS_PER_SOL
    );
    await connection.confirmTransaction(fromAirDropSignature);
  } catch (err) {
    console.log(err);
  }
};

const getWalletBalance = async () => {
  try {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

    const walletBalance = await connection.getBalance(
      new PublicKey(USER_PUBLIC_KEY)
    );

    console.log(
      `Wallet balance: ${parseInt(walletBalance) / LAMPORTS_PER_SOL} SOL`
    );
  } catch (err) {
    console.log(err);
  }
};

// Show the wallet balance before and after airdropping SOL
const mainFunction = async () => {
  await getWalletBalance();
  await airDropSol();
  await getWalletBalance();
};

mainFunction();
