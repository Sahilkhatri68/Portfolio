const express = require("express");
const router = express.Router();
const web3 = require("@solana/web3.js");
const web3_token = require("@solana/spl-token");


// console.log(web3_token);

let SECRET_KEY = Uint8Array.from([
  98, 244, 118, 105, 231, 113, 253, 11, 186, 152, 239, 216, 224, 234, 20, 17,
  148, 4, 230, 101, 40, 201, 235, 63, 188, 216, 101, 197, 199, 37, 48, 36, 24,
  22, 73, 2, 169, 235, 194, 206, 85, 87, 19, 162, 252, 3, 103, 93, 106, 141,
  146, 69, 148, 249, 139, 53, 77, 15, 228, 22, 227, 208, 253, 169,
]);

let connection = new web3.Connection(
  web3.clusterApiUrl("mainnet-beta"),
  "confirmed"
);

let wallet_key = web3.Keypair.fromSecretKey(SECRET_KEY);
let minted_token = new web3.PublicKey(
  "EoqJXTxCc67i18B7nwWs59RBkTe8rStTreRhCCq1eVTH"
);

router.post("/check_balance", async (req, res) => {
  // destination address
  const destination_address = new web3.PublicKey(req.body.destination_address);
  const to_address = await web3_token.getAssociatedTokenAddress(
    minted_token,
    destination_address
  );

  try {
    const balance = await web3_token.getAccount(connection, to_address);
    console.log(balance);
    res.status(200).json({
      balance: balance,
    });
  } catch (error) {
    res.status(500).json({
      error: "error.message",
    });
  }
});

//Request airdrop
router.post("/", middleware, async (req, res) => {
  //From Account
  const from_account = await web3_token.getOrCreateAssociatedTokenAccount(
    connection,
    wallet_key,
    minted_token,
    wallet_key.publicKey
  );

  // destination address
  const destination_address = new web3.PublicKey(req.body.destination_address);
  const to_address = await web3_token.getAssociatedTokenAddress(
    minted_token,
    destination_address
  );

  try {
    //Transfer Tokens method 1
    const signature = await web3_token.transfer(
      connection,
      wallet_key,
      from_account.address,
      to_address,
      wallet_key.publicKey,
      web3.LAMPORTS_PER_SOL * req.body.amount
    );

    res.status(200).json({
      message: "success",
      signature: signature,
      view: `https://solscan.io/tx/${signature}`,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
});

//Middleware
async function middleware(req, res, next) {
  try {
    //Check all the fields are present
    if (!req.body.destination_address || !req.body.amount)
      return res.status(400).json({
        message: "Please fill all the fields",
      });

    // //Check if the amount is a number
    if (isNaN(req.body.amount))
      return res.status(400).json({
        message: "Amount must be a number",
      });

    // //Check if the amount is less than the balance
    const from_account = await web3_token.getOrCreateAssociatedTokenAccount(
      connection,
      wallet_key,
      minted_token,
      wallet_key.publicKey
    );

    const balance = await web3_token.getAccount(
      connection,
      from_account.address
    );
    if (balance < req.body.amount)
      return res.status(400).json({
        message: "Insufficient balance",
      });

    next();
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
}

module.exports = router;
