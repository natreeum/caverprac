import dotenv from 'dotenv';
dotenv.config();

import Caver from 'caver-js';
const caver = new Caver('https://api.baobab.klaytn.net:8651/');

const wallet_address = '0x6eBF1B366A5a040a20670Ad4705A235DCB2c0249';

async function transferTest() {
  // get keyring
  const keyring = caver.wallet.newKeyring(
    wallet_address,
    process.env.WALLET_PRIVATE_KEY
  );

  // create value transfer transaction
  const vt = caver.transaction.valueTransfer.create({
    from: keyring.address,
    to: '0x3BFBb8c43d3f6c088683F1f2484a563531c6c17E',
    value: caver.utils.toPeb(1, 'KLAY'),
    gas: 25000,
  });

  // sign to the transaction
  const signed = await caver.wallet.sign(keyring.address, vt);

  // send transaction to the klaytn network
  const receipt = await caver.rpc.klay.sendRawTransaction(signed);
  console.log(receipt);
}

transferTest();
