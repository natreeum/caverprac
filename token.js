// import caver
import Caver from 'caver-js';

// import abi
import abi from './abi.js';

// import contract address
import contract_address from './contractAddress';

// load environment vaiables
import dotenv from 'dotenv';
dotenv.config();

// connect caver with baobab network
const caver = new Caver('https://api.baobab.klaytn.net:8651/');

// Load contract
const contract = new caver.contract(abi, contract_address);

const callBalanceOf = async (walletAddress) => {
  const balanceOf = await contract.methods.balanceOf(walletAddress).call();
  console.log(balanceOf);
};

callBalanceOf('0x3BFBb8c43d3f6c088683F1f2484a563531c6c17E');

const sendMint = async (walletAddress, amount) => {
  // caver와 지갑 연결
  caver.wallet.newKeyring(
    // 지갑 공개키(지갑 주소)
    '0x6ebf1b366a5a040a20670ad4705a235dcb2c0249',
    // .env파일에 저장되어있는 지갑 개인키
    process.env.WALLET_PRIVATE_KEY
  );
  const mintRes = await contract.methods
    // mint method는 두 개의 인자를 필요로 한다. 받을사람의 주소, 수량
    .mint(walletAddress, amount)
    // 주황색 버튼이기 때문에 함수실행지갑, gas limit을 명시해주어야 한다.
    // 여기서 from에 들어갈 수 있는건 caver에 연결된 지갑이다.
    .send({ from: '0x6ebf1b366a5a040a20670ad4705a235dcb2c0249', gas: 250000 });
  console.log(mintRes);
};

// sendMint('0x3BFBb8c43d3f6c088683F1f2484a563531c6c17E', 10);
