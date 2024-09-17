import detectEthereumProvider from "@metamask/detect-provider"
import Web3 from "web3"; 
import ABI from './abi.json'

if (typeof window.ethereum  !== 'undefined'){
  window.ethereum.on('accountsChanged', (accounts) => {
    console.log('account changed');
    localStorage.setItem("acct", accounts[0]);
    window.location.href= "./";
  });
}



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

  document.getElementById("logbut").textContent = account.substring(0,7).concat("..");


  }
}


async function callForPrice() {
  const web3 = new Web3(window.ethereum);
  const abiInstance = ABI.abi;
  const contract = new web3.eth.Contract(
                                    abiInstance,
                     "0x6a5fef6a0d30e124f4ffcec677ae712e8964a6cb");
  
  const myAddress = localStorage.getItem("acct");
  contract.methods.retrieve_base_price()
    .call({from: myAddress})
    .then((result) => {
        console.log('Return Value:', result);
        localStorage.setItem("baseprice", result);
    })
    .catch((error) => {
        console.error('Call Error:', error);
    });
}
window.callForPrice = callForPrice;

async function callForPings() {
  const web3 = new Web3(window.ethereum);
  const abiInstance = ABI.abi;
  const contract = new web3.eth.Contract(
                                    abiInstance,
                     "0x6a5fef6a0d30e124f4ffcec677ae712e8964a6cb");

  const myAddress = localStorage.getItem("acct");
  contract.methods.fetch_pings()
    .call({from: myAddress})
    .then((result) => {
        console.log('Return Value:', result);
    })
    .catch((error) => {
        console.error('You are not Tier 2+ Renter');
    });
}
window.callForPings = callForPings;

async function callForUrlActive() {
  const web3 = new Web3(window.ethereum);
  const abiInstance = ABI.abi;
  const contract = new web3.eth.Contract(
                                    abiInstance,
                     "0x6a5fef6a0d30e124f4ffcec677ae712e8964a6cb");

  const myAddress = localStorage.getItem("acct");
  contract.methods.retrieve_active_urls()
    .call({from: myAddress})
    .then((result) => {
        var i = 0;
        var res = [];
        while (i < 21){
          var el = decodeURIComponent(result[i]);
          res.push(el);
          i++;
        }
        console.log('Return Value:', res);
    })
    .catch((error) => {
        console.error('Call Error:', error);
    });
}
window.callForUrlActive = callForUrlActive;

async function callForPicActive() {
  const web3 = new Web3(window.ethereum);
  const abiInstance = ABI.abi;
  const contract = new web3.eth.Contract(
                                    abiInstance,
                     "0x6a5fef6a0d30e124f4ffcec677ae712e8964a6cb");

  const myAddress = localStorage.getItem("acct");
  contract.methods.retrieve_active_pics()
    .call({from: myAddress})
    .then((result) => {
        var i = 0;
        var res = [];
        while (i < 21){
          var el = decodeURIComponent(result[i]);
          res.push(el);
          i++;
        }
        console.log('Return Value:', res);
    })
    .catch((error) => {
        console.error('Call Error:', error);
    });
}
window.callForPicActive = callForPicActive;

async function callForNameActive() {
  const web3 = new Web3(window.ethereum);
  const abiInstance = ABI.abi;
  const contract = new web3.eth.Contract(
                                    abiInstance,
                     "0x6a5fef6a0d30e124f4ffcec677ae712e8964a6cb");

  const myAddress = localStorage.getItem("acct");
  contract.methods.retrieve_active_names()
    .call({from: myAddress})
    .then((result) => {
        var i = 0;
        var res = [];
        while (i < 21){
          var el = decodeURIComponent(result[i]);
          res.push(el);
          i++;
        }
        console.log('Return Value:', res);
    })
    .catch((error) => {
        console.error('Call Error:', error);
    });
}
window.callForNameActive = callForNameActive;

async function callForAddressActive() {
  const web3 = new Web3(window.ethereum);
  const abiInstance = ABI.abi;
  const contract = new web3.eth.Contract(
                                    abiInstance,
                     "0x6a5fef6a0d30e124f4ffcec677ae712e8964a6cb");

  const myAddress = localStorage.getItem("acct");
  contract.methods.retrieve_acitve_owners()
    .call({from: myAddress})
    .then((result) => {
        var i = 0;
        var res = [];
        while (i < 21){
          var el = decodeURIComponent(result[i]);
          res.push(el);
          i++;
        }
        console.log('Return Value:', res);
    })
    .catch((error) => {
        console.error('Call Error:', error);
    });
}
window.callForAddressActive = callForAddressActive;

async function callForMaxTier() {
  const web3 = new Web3(window.ethereum);
  const abiInstance = ABI.abi;
  const contract = new web3.eth.Contract(
                                    abiInstance,
                     "0x6a5fef6a0d30e124f4ffcec677ae712e8964a6cb");

  const myAddress = localStorage.getItem("acct");
  contract.methods.fetch_max_tier()
    .call({from: myAddress})
    .then((result) => {

        console.log('Return Value:', result);
    })
    .catch((error) => {
        console.error('Call Error:', error);
    });
}
window.callForMaxTier = callForMaxTier;



async function updateContract() {
  const web3 = new Web3(window.ethereum);
  const abiInstance = ABI.abi;
  const contract = new web3.eth.Contract(
                                    abiInstance,
                     "0x6a5fef6a0d30e124f4ffcec677ae712e8964a6cb");
  
  const myAddress = localStorage.getItem("acct");
  const pay = Number(localStorage.getItem("baseprice"));
  console.log(pay);
  const encoded_url = encodeURIComponent("https://www.pokemon.com/us");
  const encoded_pic = encodeURIComponent("https://pokemonletsgo.pokemon.com/assets/img/common/char-pikachu.png");
  contract.methods.rent(11, "pokemon", encoded_url, encoded_pic)
    .send({from: myAddress , value: 2* pay, gas: '1000000', gasPrice:1000000000})
    .catch((error) => {
        console.error('Call Error:', error);
    });
}
window.updateContract = updateContract;

async function start_wall(){

  if (localStorage.getItem("acct")){
    const ac = localStorage.getItem("acct");
    document.getElementById("logbut").textContent =  ac.substring(0,7).concat("..");
  }
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
            <img class="middle-img" src="./img/gold.png" />
            <p style="font-size:0.5em">&nbsp;</p>
        </div>
        <div style="float:left;margin-right:5px;width: `.concat(w.toString().concat('px')).concat(`">
            <img class="middle-img" src="./img/gold.png" />
            <p style="font-size:0.5em">&nbsp;</p>
        </div>
        <div style="float:left;margin-right:5px;width:`.concat(w.toString().concat('px')).concat(`">
            <img src="./img/gold.png"   />
            <p style="font-size:0.5em">&nbsp;</p>
        </div>
        <div style="float:left;margin-right:5px;width:`.concat(w.toString().concat('px')).concat(`">
            <img class="middle-img" src="./img/gold.png" />
            <p style="font-size:0.5em">&nbsp;</p>
        </div>
        <div style="float:left;margin-right:5px;width: `.concat(w.toString().concat('px')).concat(`">
            <img src="./img/gold.png"   />
            <p style="font-size:0.5em">&nbsp;</p>
        </div>
        <div style="float:left;margin-right:5px;width: `.concat(w.toString().concat('px')).concat(`">
            <img class="middle-img" src="./img/gold.png" />
            <p style="font-size:0.5em">&nbsp;</p>
        </div>

        <div style="float:left;margin-right:5px;width: `.concat(w.toString().concat('px')).concat(`">
            <img class="middle-img" src="./img/gold.png" />
            <p style="font-size:0.5em">&nbsp;</p>
        </div>
    </div>

    <div class="image123" style="margin-left:6%;">

        <div style="float:left;margin-right:5px;width:`.concat(w.toString().concat('px')).concat(`">
            <img src="./img/silver.png"   />
            <p style="font-size:0.5em">&nbsp;</p>
        </div>
        <div style="float:left;margin-right:5px;width: `.concat(w.toString().concat('px')).concat(`">
            <img class="middle-img" src="./img/silver.png" />
            <p style="font-size:0.5em">&nbsp;</p>
        </div>
        <div style="float:left;margin-right:5px;width: `.concat(w.toString().concat('px')).concat(`">
            <img src="./img/silver.png"   />
            <p style="font-size:0.5em">&nbsp;</p>
        </div>
        <div style="float:left;margin-right:5px;width: `.concat(w.toString().concat('px')).concat(`">
            <img class="middle-img" src="./img/silver.png" />
            <p style="font-size:0.5em">&nbsp;</p>
        </div>
        <div style="float:left;margin-right:5px;width: `.concat(w.toString().concat('px')).concat(`">
            <img src="./img/silver.png"   />
            <p style="font-size:0.5em">&nbsp;</p>
        </div>
        <div style="float:left;margin-right:5px;width: `.concat(w.toString().concat('px')).concat(`">
            <img class="middle-img" src="./img/silver.png" />
            <p style="font-size:0.5em">&nbsp;</p>
        </div>

        <div style="float:left;margin-right:5px;width: `.concat(w.toString().concat('px')).concat(`">
            <img class="middle-img" src="./img/silver.png" />
            <p style="font-size:0.5em">&nbsp;</p>

      </div>
    </div>
    <div class="image123" style="margin-left:6%;">

        <div style="float:left;margin-right:5px;width: `.concat(w.toString().concat('px')).concat(`">
            <img src="./img/bronze.png"   />
        </div>
        <div style="float:left;margin-right:5px;width: `.concat(w.toString().concat('px')).concat(`">
            <img class="middle-img" src="./img/bronze.png" />
        </div>
        <div style="float:left;margin-right:5px;width: `.concat(w.toString().concat('px')).concat(`">
            <img src="./img/bronze.png"   />
        </div>
        <div style="float:left;margin-right:5px;width: `.concat(w.toString().concat('px')).concat(`">
            <img class="middle-img" src="./img/bronze.png" />
        </div>
        <div style="float:left;margin-right:5px;width: `.concat(w.toString().concat('px')).concat(`">
            <img src="./img/bronze.png"   />
        </div>
        <div style="float:left;margin-right:5px;width: `.concat(w.toString().concat('px')).concat(`">
            <img class="middle-img" src="./img/bronze.png" />
        </div>

        <div style="float:left;margin-right:5px;width: `.concat(w.toString().concat('px')).concat(`">
            <img class="middle-img" src="./img/bronze.png" />

      </div>
    </div>
  `)))))))))))))))))))))));
  root_el.innerHTML = root_el.innerHTML + addendum;

}
window.start_wall = start_wall;

async function go_home(){
  window.location.href = "./";
}
window.go_home = go_home;

async function go_about(){
  window.location.href = "./about.html";
}
window.go_about = go_about;

async function go_pings(){
  window.location.href = "./pings.html";
}
window.go_pings = go_pings;

async function load_pings(){
  const add = localStorage.getItem("acct");
  if (add == ""){
    console.log("You are not connected to a wallet");
    window.location.href = "./";
  }
  else {
    const web3 = new Web3(window.ethereum);
    const abiInstance = ABI.abi;
    const contract = new web3.eth.Contract(
                                      abiInstance,
                      "0x6a5fef6a0d30e124f4ffcec677ae712e8964a6cb");


    const res = await contract.methods.fetch_max_tier()
      .call({from: add});
      console.log(res);
      if (res >= 2){
        const res2 = await contract.methods.fetch_pings()
        .call({from: add});
        const res5 = await contract.methods.fetch_ping_names()
        .call({from: add});
        var i = 0;
        while (i < res2.length){
          var added = res5[i].concat(" (").concat(res2[i].substring(0,10).concat("..")).concat(")");
          document.getElementById("mypings").innerHTML = document.getElementById("mypings").innerHTML + `
            <p>`.concat(added).concat(`</p><br/>
          `);
            i++;
        }
        if (res2.length == 0){
          document.getElementById("mypings").textContent = "No Pings Yet. Such empty, much wow.";
        }
      }
      else {
        document.getElementById("bod").innerHTML = `<br/><br/>
          <div style="color: aqua;font-size: 2em;"> This feature is only available for the Silver and Gold Tier. </div>
        `;
        return;
      }
      var el = document.getElementById("ping_conf");
      const cur_width = Number((el.style.width).replace("%", ""));
      const factor = (1600 / screen.width);
      el.style.width = (cur_width * factor).toString().concat("%");
      if (res == 2){
        document.getElementById("ping_cont").innerHTML = `
          <div style = "color:red;font-size: 1.1em">Locked. This is a Gold Tier Feature</div>
        `;
      }
      else {
        const res3 = await contract.methods.retrieve_active_names().call({from: add});
        const res4 = await contract.methods.retrieve_acitve_owners().call({from: add});
        var j = 0;
        while (j < 14){
          if (res4[j].toLowerCase() != add.toLowerCase() && res3[j] != ""){
            console.log(res4[j].toLowerCase());
            document.getElementById("ping").innerHTML = document.getElementById("ping").innerHTML + `
              <option value="`.concat(res4[j].toLowerCase()).concat(`">`.concat(res3[j]).concat(`</option>
            `));
          }
          j++;
        }


      }


  }
}
window.load_pings = load_pings;

async function confirm_ping(){
  const target = document.getElementById("ping").value;
  if (target == "none"){
    console.log("choose");
  }
  else {
    console.log(target);
    const web3 = new Web3(window.ethereum);
    const abiInstance = ABI.abi;
    const contract = new web3.eth.Contract(
                                      abiInstance,
                      "0x6a5fef6a0d30e124f4ffcec677ae712e8964a6cb");

    const myAddress = localStorage.getItem("acct");

    contract.methods.ping(target)
      .send({from: myAddress , gas: '1000000', gasPrice:1000000000})
      .catch((error) => {
          console.error('Call Error:', error);
      });
  }
}
window.confirm_ping = confirm_ping;




