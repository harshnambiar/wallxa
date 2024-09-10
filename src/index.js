import detectEthereumProvider from "@metamask/detect-provider"
import Web3 from "web3"; 
import ABI from './abi.json'

async function connect(code) {
    
  const provider = await detectEthereumProvider()

  if (provider && provider === window.ethereum) {
    console.log("MetaMask is available!");
    const chainId = 1946;
    console.log(window.ethereum.networkVersion);
    if (window.ethereum.networkVersion !== chainId) {
        const cid = '0x34A';
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: cid }]
        });
        console.log("changed to taraxa testnet successfully");
        
      } catch (err) {
          // This error code indicates that the chain has not been added to MetaMask
        if (err.code === 4902) {
        console.log("please add Taraxa Testnet as a network");
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainName: 'Taraxa Testnet',
                chainId: cid,
                nativeCurrency: { name: 'TARA', decimals: 18, symbol: 'TARA' },
                rpcUrls: ['https://rpc.testnet.taraxa.io/']
              }
            ]
          });
        }
        else {
            console.log(err);
        }
      }
    }
    await startApp(provider);
  } else {
    console.log("Please install MetaMask!")
  }



}
window.connect = connect;


async function startApp(provider) {
  if (provider !== window.ethereum) {
    console.error("Do you have multiple wallets installed?")
  }
  else {
    const accounts = await window.ethereum
    .request({ method: "eth_requestAccounts" })
    .catch((err) => {
      if (err.code === 4001) {
        console.log("Please connect to MetaMask.")
      } else {
        console.error(err)
      }
    })
  const account = accounts[0];
  var web3 = new Web3(window.ethereum);
  const bal = await web3.eth.getBalance(account);
  console.log(bal);
  console.log(account);
  localStorage.setItem("acct",account.toString());
  }
}


async function callContract() {
  const web3 = new Web3(window.ethereum);
  const abiInstance = ABI.abi;
  const contract = new web3.eth.Contract(
                                    abiInstance,
                     "0xddFA5fE9a651eF1411605dA65D73971429841280");
  
  const myAddress = localStorage.getItem("acct");
  contract.methods.fetch()
    .call({from: myAddress})
    .then((result) => {
        console.log('Return Value:', result);
    })
    .catch((error) => {
        console.error('Call Error:', error);
    });
}
window.callContract = callContract;


async function updateContract() {
  const web3 = new Web3(window.ethereum);
  const abiInstance = ABI.abi;
  const contract = new web3.eth.Contract(
                                    abiInstance,
                     "0xddFA5fE9a651eF1411605dA65D73971429841280");
  
  const myAddress = localStorage.getItem("acct");
  contract.methods.increment()
    .send({from: myAddress})
    .catch((error) => {
        console.error('Call Error:', error);
    });
}
window.updateContract = updateContract;

async function start_wall(){
  var el = document.getElementById("wall");
  var w = Math.floor((el.clientWidth)/7.5);
  console.log(el.clientWidth);
  const factor = (el.clientWidth/ 1200);
  const dims = el.getBoundingClientRect();
  const top_st = Math.floor((1 + 0.1*factor)* (dims.top + window.scrollY));
  const left_st = Math.floor(0.65*(1-factor/10) * (dims.left + window.scrollX));
  var root_el = document.getElementById("cont");
  var addendum = `
  <div style="display:block;position:absolute;top:`.concat(top_st.toString().concat('px')).concat(`;left:`.concat(left_st.toString().concat('px')).concat(`;width:90%;height:100%">
        <div class="image123" style="margin-left:6%;">
        <div style="float:left;margin-right:5px;width: `.concat(w.toString().concat('px')).concat(`">
            <img src="./img/home.png"   />
            <p style="font-size:0.5em">&nbsp;</p>
        </div>
        <div style="float:left;margin-right:5px;width: `.concat(w.toString().concat('px')).concat(`">
            <img class="middle-img" src="./img/home.png" />
            <p style="font-size:0.5em">&nbsp;</p>
        </div>
        <div style="float:left;margin-right:5px;width:`.concat(w.toString().concat('px')).concat(`">
            <img src="./img/home.png"   />
            <p style="font-size:0.5em">&nbsp;</p>
        </div>
        <div style="float:left;margin-right:5px;width:`.concat(w.toString().concat('px')).concat(`">
            <img class="middle-img" src="./img/home.png" />
            <p style="font-size:0.5em">&nbsp;</p>
        </div>
        <div style="float:left;margin-right:5px;width: `.concat(w.toString().concat('px')).concat(`">
            <img src="./img/home.png"   />
            <p style="font-size:0.5em">&nbsp;</p>
        </div>
        <div style="float:left;margin-right:5px;width: `.concat(w.toString().concat('px')).concat(`">
            <img class="middle-img" src="./img/home.png" />
            <p style="font-size:0.5em">&nbsp;</p>
        </div>

        <div style="float:left;margin-right:5px;width: `.concat(w.toString().concat('px')).concat(`">
            <img class="middle-img" src="./img/home.png" />
            <p style="font-size:0.5em">&nbsp;</p>
        </div>
    </div>

    <div class="image123" style="margin-left:6%;">

        <div style="float:left;margin-right:5px;width:`.concat(w.toString().concat('px')).concat(`">
            <img src="./img/home.png"   />
            <p style="font-size:0.5em">&nbsp;</p>
        </div>
        <div style="float:left;margin-right:5px;width: `.concat(w.toString().concat('px')).concat(`">
            <img class="middle-img" src="./img/home.png" />
            <p style="font-size:0.5em">&nbsp;</p>
        </div>
        <div style="float:left;margin-right:5px;width: `.concat(w.toString().concat('px')).concat(`">
            <img src="./img/home.png"   />
            <p style="font-size:0.5em">&nbsp;</p>
        </div>
        <div style="float:left;margin-right:5px;width: `.concat(w.toString().concat('px')).concat(`">
            <img class="middle-img" src="./img/home.png" />
            <p style="font-size:0.5em">&nbsp;</p>
        </div>
        <div style="float:left;margin-right:5px;width: `.concat(w.toString().concat('px')).concat(`">
            <img src="./img/home.png"   />
            <p style="font-size:0.5em">&nbsp;</p>
        </div>
        <div style="float:left;margin-right:5px;width: `.concat(w.toString().concat('px')).concat(`">
            <img class="middle-img" src="./img/home.png" />
            <p style="font-size:0.5em">&nbsp;</p>
        </div>

        <div style="float:left;margin-right:5px;width: `.concat(w.toString().concat('px')).concat(`">
            <img class="middle-img" src="./img/home.png" />
            <p style="font-size:0.5em">&nbsp;</p>

      </div>
    </div>
    <div class="image123" style="margin-left:6%;">

        <div style="float:left;margin-right:5px;width: `.concat(w.toString().concat('px')).concat(`">
            <img src="./img/home.png"   />
        </div>
        <div style="float:left;margin-right:5px;width: `.concat(w.toString().concat('px')).concat(`">
            <img class="middle-img" src="./img/home.png" />
        </div>
        <div style="float:left;margin-right:5px;width: `.concat(w.toString().concat('px')).concat(`">
            <img src="./img/home.png"   />
        </div>
        <div style="float:left;margin-right:5px;width: `.concat(w.toString().concat('px')).concat(`">
            <img class="middle-img" src="./img/home.png" />
        </div>
        <div style="float:left;margin-right:5px;width: `.concat(w.toString().concat('px')).concat(`">
            <img src="./img/home.png"   />
        </div>
        <div style="float:left;margin-right:5px;width: `.concat(w.toString().concat('px')).concat(`">
            <img class="middle-img" src="./img/home.png" />
        </div>

        <div style="float:left;margin-right:5px;width: `.concat(w.toString().concat('px')).concat(`">
            <img class="middle-img" src="./img/home.png" />

      </div>
    </div>
  `)))))))))))))))))))))));
  root_el.innerHTML = root_el.innerHTML + addendum;

}
window.start_wall = start_wall;
