import detectEthereumProvider from "@metamask/detect-provider"
import Web3 from "web3"; 
import ABI from './abi.json'

if (typeof window.ethereum  !== 'undefined'){
  window.ethereum.on('accountsChanged', (accounts) => {
    console.log('account changed');
    localStorage.setItem("acnty", accounts[0]);
    window.location.reload();
  });
}

function screen_check(){
  var el = document.getElementById("wallbod");
  var w = el.clientWidth;
  if (w <= 700){
    document.getElementById("wallbod").innerHTML = `
     <div class="pageHeader homeHeader">
      <a class="walletBtn" onclick="go_about();" style="cursor:pointer;">About</a>
      <a class="walletBtn" onclick="go_home();" style="cursor:pointer;">Home</a>


    </div>
    <br/><br/>
    <div class="homeWrapper">


      <div class="homeText3">WallXa</div>
      <div class="homeText">Now on the Taraxa Testnet</div><br/>
      <div style="color: red; font-size: 1.3em;"> Since WallXa is all about the "Wall", it only supports desktop and similar large screen type devices. Please use any such device to access WallXa </div>
      <br/>

    `;
    return false;
  }
  return true;
}


async function connect() {
    
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
            document.getElementById("wallbod").innerHTML = `
     <div class="pageHeader homeHeader">
      <a class="walletBtn" onclick="go_about();" style="cursor:pointer;">About</a>
      <a class="walletBtn" onclick="go_home();" style="cursor:pointer;">Home</a>


    </div>
    <br/><br/>
    <div class="homeWrapper">


      <div class="homeText3">WallXa</div>
      <div class="homeText">Now on the Taraxa Testnet</div><br/>
      <div style="color: red; font-size: 1.3em;"> Please install MetaMask. Make sure you allow it to connect to WallXa! </div>
      <br/>

    `;
        }
      }
    }
    await startApp(provider);
  } else {
    console.log("Please install MetaMask!");
    document.getElementById("wallbod").innerHTML = `
     <div class="pageHeader homeHeader">
      <a class="walletBtn" onclick="go_about();" style="cursor:pointer;">About</a>
      <a class="walletBtn" onclick="go_home();" style="cursor:pointer;">Home</a>


    </div>
    <br/><br/>
    <div class="homeWrapper">


      <div class="homeText3">WallXa</div>
      <div class="homeText">Now on the Taraxa Testnet</div><br/>
      <div style="color: red; font-size: 1.3em;"> Please install MetaMask. Make sure you allow it to connect to WallXa! </div>
      <br/>

    `;

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
  localStorage.setItem("acnty",account.toString());

  document.getElementById("logbut").textContent = account.substring(0,7).concat("..");


  }
}


async function callForPrice() {
  const web3 = new Web3(window.ethereum);
  const abiInstance = ABI.abi;
  const contract = new web3.eth.Contract(
                                    abiInstance,
                     "0x6a5fef6a0d30e124f4ffcec677ae712e8964a6cb");
  
  const myAddress = localStorage.getItem("acnty");
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

  const myAddress = localStorage.getItem("acnty");
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

  const myAddress = localStorage.getItem("acnty");
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

  const myAddress = localStorage.getItem("acnty");
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

  const myAddress = localStorage.getItem("acnty");
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

  const myAddress = localStorage.getItem("acnty");
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

  const myAddress = localStorage.getItem("acnty");
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
  
  const myAddress = localStorage.getItem("acnty");
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
  const ok_screen = screen_check();
  if (!ok_screen){
    return;
  }
  await connect();
  if (localStorage.getItem("acnty")){
    const ac = localStorage.getItem("acnty");
    document.getElementById("logbut").textContent =  ac.substring(0,7).concat("..");
  }
  else {
    return;
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
        <div id="g11" style="cursor:pointer;float:left;margin-right:5px;width: `.concat(w.toString().concat('px')).concat(`" onclick="rent_or_check(1)">
            <img id="g1" class="middle-img" src="./img/gold.png" />
            <p style="font-size:0.5em">&nbsp;</p>
        </div>
        <div id="g22" style="cursor:pointer;float:left;margin-right:5px;width: `.concat(w.toString().concat('px')).concat(`" onclick="rent_or_check(2)">
            <img id="g2" class="middle-img" src="./img/gold.png" />
            <p style="font-size:0.5em">&nbsp;</p>
        </div>
        <div id="g33" style="cursor:pointer;float:left;margin-right:5px;width:`.concat(w.toString().concat('px')).concat(`" onclick="rent_or_check(3)">
            <img id="g3" src="./img/gold.png"   />
            <p style="font-size:0.5em">&nbsp;</p>
        </div>
        <div id="g44" style="cursor:pointer;float:left;margin-right:5px;width:`.concat(w.toString().concat('px')).concat(`" onclick="rent_or_check(4)">
            <img id="g4" class="middle-img" src="./img/gold.png" />
            <p style="font-size:0.5em">&nbsp;</p>
        </div>
        <div id="g55" style="cursor:pointer;float:left;margin-right:5px;width: `.concat(w.toString().concat('px')).concat(`" onclick="rent_or_check(5)">
            <img id="g5" src="./img/gold.png"   />
            <p style="font-size:0.5em">&nbsp;</p>
        </div>
        <div id="g66" style="cursor:pointer;float:left;margin-right:5px;width: `.concat(w.toString().concat('px')).concat(`" onclick="rent_or_check(6)">
            <img id="g6" class="middle-img" src="./img/gold.png" />
            <p style="font-size:0.5em">&nbsp;</p>
        </div>

        <div id="g77" style="cursor:pointer;float:left;margin-right:5px;width: `.concat(w.toString().concat('px')).concat(`" onclick="rent_or_check(7)">
            <img id="g7" class="middle-img" src="./img/gold.png" />
            <p style="font-size:0.5em">&nbsp;</p>
        </div>
    </div>

    <div class="image123" style="margin-left:6%;">

        <div id="s11" style="cursor:pointer;float:left;margin-right:5px;width:`.concat(w.toString().concat('px')).concat(`" onclick="rent_or_check(8)">
            <img id="s1" src="./img/silver.png"   />
            <p style="font-size:0.5em">&nbsp;</p>
        </div>
        <div id="s22" style="cursor:pointer;float:left;margin-right:5px;width: `.concat(w.toString().concat('px')).concat(`" onclick="rent_or_check(9)">
            <img id="s2" class="middle-img" src="./img/silver.png" />
            <p style="font-size:0.5em">&nbsp;</p>
        </div>
        <div id="s33" style="cursor:pointer;float:left;margin-right:5px;width: `.concat(w.toString().concat('px')).concat(`" onclick="rent_or_check(10)">
            <img id="s3" src="./img/silver.png"   />
            <p style="font-size:0.5em">&nbsp;</p>
        </div>
        <div id="s44" style="cursor:pointer;float:left;margin-right:5px;width: `.concat(w.toString().concat('px')).concat(`" onclick="rent_or_check(11)">
            <img id="s4" class="middle-img" src="./img/silver.png" />
            <p style="font-size:0.5em">&nbsp;</p>
        </div>
        <div id="s55" style="cursor:pointer;float:left;margin-right:5px;width: `.concat(w.toString().concat('px')).concat(`" onclick="rent_or_check(12)">
            <img id="s5" src="./img/silver.png"   />
            <p style="font-size:0.5em">&nbsp;</p>
        </div>
        <div id="s66" style="cursor:pointer;float:left;margin-right:5px;width: `.concat(w.toString().concat('px')).concat(`" onclick="rent_or_check(13)">
            <img id="s6" class="middle-img" src="./img/silver.png" />
            <p style="font-size:0.5em">&nbsp;</p>
        </div>

        <div id="s77" style="cursor:pointer;float:left;margin-right:5px;width: `.concat(w.toString().concat('px')).concat(`" onclick="rent_or_check(14)">
            <img id="s7" class="middle-img" src="./img/silver.png" />
            <p style="font-size:0.5em">&nbsp;</p>

      </div>
    </div>
    <div class="image123" style="margin-left:6%;">

        <div id="b11" style="cursor:pointer;float:left;margin-right:5px;width: `.concat(w.toString().concat('px')).concat(`" onclick="rent_or_check(15)">
            <img id="b1" src="./img/bronze.png"   />
        </div>
        <div id="b22" style="cursor:pointer;float:left;margin-right:5px;width: `.concat(w.toString().concat('px')).concat(`" onclick="rent_or_check(16)">
            <img id="b2" class="middle-img" src="./img/bronze.png" />
        </div>
        <div id="b33" style="cursor:pointer;float:left;margin-right:5px;width: `.concat(w.toString().concat('px')).concat(`" onclick="rent_or_check(17)">
            <img id="b3" src="./img/bronze.png"   />
        </div>
        <div id="b44" style="cursor:pointer;float:left;margin-right:5px;width: `.concat(w.toString().concat('px')).concat(`" onclick="rent_or_check(18)">
            <img id="b4" class="middle-img" src="./img/bronze.png" />
        </div>
        <div id="b55" style="cursor:pointer;float:left;margin-right:5px;width: `.concat(w.toString().concat('px')).concat(`" onclick="rent_or_check(19)">
            <img id="b5" src="./img/bronze.png"   />
        </div>
        <div id="b66" style="cursor:pointer;float:left;margin-right:5px;width: `.concat(w.toString().concat('px')).concat(`" onclick="rent_or_check(20)">
            <img id="b6" class="middle-img" src="./img/bronze.png" />
        </div>

        <div id="b77" style="cursor:pointer;float:left;margin-right:5px;width: `.concat(w.toString().concat('px')).concat(`" onclick="rent_or_check(21)">
            <img id="b7" class="middle-img" src="./img/bronze.png" />

      </div>
    </div>
  `)))))))))))))))))))))));
  root_el.innerHTML = root_el.innerHTML + addendum;
  const web3 = new Web3(window.ethereum);
  const abiInstance = ABI.abi;
  const contract = new web3.eth.Contract(
                                    abiInstance,
                    "0x6a5fef6a0d30e124f4ffcec677ae712e8964a6cb");
  var add = "";
  var c_add = localStorage.getItem("acnty");
  if (c_add){
    if (c_add.length > add.length){
      add = c_add;
    }
  }
  else {
    add = "0xD0dC8A261Ad1B75A92C5e502AE10c3Fde042b879".toLowerCase();
  }
  const res = await contract.methods.retrieve_active_urls().call({from: add});
  const res2 = await contract.methods.retrieve_active_pics().call({from: add});
  const res3 = await contract.methods.retrieve_active_names().call({from: add});

  var i = 0;
  while (i < 7){
    var el1 = decodeURIComponent(res[i]);
    var el2 = decodeURIComponent(res2[i]);
    var im_val = "g".concat((i+1).toString());
    if (el1 != ""){
      document.getElementById(im_val).src = el2;
      if (document.getElementById(im_val).width > document.getElementById(im_val).height){
        document.getElementById(im_val).style.setProperty('width', document.getElementById(im_val).height.toString().concat("px"), 'important');
      }
      else {
        document.getElementById(im_val).style.setProperty('height', document.getElementById(im_val).width.toString().concat("px"), 'important');
      }
    }
    i++;
  }
  i = 0;
  while (i < 7){
    var el1 = decodeURIComponent(res[7 + i]);
    var el2 = decodeURIComponent(res2[7 + i]);
    var im_val = "s".concat((i+1).toString());
    if (el1 != ""){
      document.getElementById(im_val).src = el2;
      if (document.getElementById(im_val).width > document.getElementById(im_val).height){
        document.getElementById(im_val).style.setProperty('width', document.getElementById(im_val).height.toString().concat("px"), 'important');
      }
      else {
        document.getElementById(im_val).style.setProperty('height', document.getElementById(im_val).width.toString().concat("px"), 'important');
      }

    }

    i++;
  }
  i = 0;
  while (i < 7){
    var el1 = decodeURIComponent(res[14 + i]);
    var el2 = decodeURIComponent(res2[14 + i]);

    var im_val = "b".concat((i+1).toString());
    if (el1 != ""){
      document.getElementById(im_val).src = el2;

      if (document.getElementById(im_val).width > document.getElementById(im_val).height){
        document.getElementById(im_val).style.setProperty('width', document.getElementById(im_val).height.toString().concat("px"), 'important');
      }
      else {
        document.getElementById(im_val).style.setProperty('height', document.getElementById(im_val).width.toString().concat("px"), 'important');
      }


    }
    i++;
  }


  i = 0;
  while (i < 7){
    var im_val = "g".concat((i+1).toString());
    var div_val = "g".concat((i+1).toString()).concat((i+1).toString());
    var el3 = decodeURIComponent(res3[i]);
    checkImage(document.getElementById(im_val).src, div_val, el3, w, factor);

    i++;
  }
  i = 0;
  while (i < 7){
    var im_val = "s".concat((i+1).toString());
    var div_val = "s".concat((i+1).toString()).concat((i+1).toString());
    var el3 = decodeURIComponent(res3[7 + i]);
    checkImage(document.getElementById(im_val).src, div_val, el3, w, factor);

    i++;
  }
  i = 0;
  while (i < 7){
    var im_val = "b".concat((i+1).toString());
    var div_val = "b".concat((i+1).toString()).concat((i+1).toString());
    var el3 = decodeURIComponent(res3[14 + i]);
    checkImage(document.getElementById(im_val).src, div_val, el3, w, factor);

    i++;
  }

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
  const ok_screen = screen_check();
  if (!ok_screen){
    return;
  }
  var eth = window.ethereum;
  if (eth && eth.accounts){
    localStorage.setItem("acnty", eth.accounts[0]);
  }
  else {
    console.log("not logged in");
    localStorage.setItem("acnty", "");
    await connect();
    console.log(localStorage.getItem("acnty"));
  }
  var add = localStorage.getItem("acnty");
  if (add == ""){
    console.log("You are not connected to a wallet");
    //window.location.href = "./";
    return;
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

    const myAddress = localStorage.getItem("acnty");

    contract.methods.ping(target)
      .send({from: myAddress , gas: '1000000', gasPrice:1000000000})
      .catch((error) => {
          console.error('Call Error:', error);
      });
  }
}
window.confirm_ping = confirm_ping;

async function rent_or_check(n){
  const web3 = new Web3(window.ethereum);
  const abiInstance = ABI.abi;
  const contract = new web3.eth.Contract(
                                    abiInstance,
                    "0x6a5fef6a0d30e124f4ffcec677ae712e8964a6cb");
  var add = "";
  var c_add = localStorage.getItem("acnty");
  if (c_add){
    if (c_add.length > add.length){
      add = c_add;
    }
  }
  else {
    add = "0xD0dC8A261Ad1B75A92C5e502AE10c3Fde042b879".toLowerCase();
  }
  const res = await contract.methods.retrieve_active_urls().call({from: add});
  if (res[n - 1] != ""){
    console.log("occupied");
    window.location.href = "./details.html?slot=".concat(n.toString());
  }
  else {
    console.log("rent now!");
    window.location.href = "./rent.html?slot=".concat(n.toString());
  }
}
window.rent_or_check = rent_or_check;


async function load_details(){
  const ok_screen = screen_check();
  if (!ok_screen){
    return;
  }
  var eth = window.ethereum;
  if (eth && eth.accounts){
    localStorage.setItem("acnty", eth.accounts[0]);
  }
  else {
    console.log("not logged in");
    localStorage.setItem("acnty", "");
    await connect();
    console.log(localStorage.getItem("acnty"));
  }
  var add = localStorage.getItem("acnty");
  if (add == ""){
    console.log("You are not connected to a wallet");
    //window.location.href = "./";
    return;
  }
  var url = window.location.toString();
  var n = url.substring(url.indexOf('=') + 1);
  console.log(n);
  if (isNaN(parseInt(n))){
    window.location.href = "./";
  }
  else if (parseInt(n) > 21 || parseInt(n) < 1) {
    window.location.href = "./";
  }
  else {}

  const web3 = new Web3(window.ethereum);
  const abiInstance = ABI.abi;
  const contract = new web3.eth.Contract(
                                    abiInstance,
                    "0x6a5fef6a0d30e124f4ffcec677ae712e8964a6cb");
  add = "";
  var c_add = localStorage.getItem("acnty");
  if (c_add){
    if (c_add.length > add.length){
      add = c_add;
    }
  }
  else {
    add = "0xD0dC8A261Ad1B75A92C5e502AE10c3Fde042b879".toLowerCase();
  }
  const res = await contract.methods.retrieve_active_urls().call({from: add});
  const res2 = await contract.methods.retrieve_active_pics().call({from: add});
  const res3 = await contract.methods.retrieve_acitve_owners().call({from: add});
  const res4 = await contract.methods.retrieve_active_names().call({from: add});

  if (res4[n - 1] == ""){
    window.location.href = "./rent.html?slot=".concat(n.toString());
  }

  const factor = (document.getElementById("wrap1").clientWidth / 672);
  console.log(factor);
  document.getElementById("pimg").width = Math.floor(document.getElementById("wrap1").clientWidth / (factor * 2.5));
  document.getElementById("pimg").src = decodeURIComponent(res2[n-1]);
  document.getElementById("url_val").textContent = decodeURIComponent(res[n - 1]);
  document.getElementById("url_val").href = decodeURIComponent(res[n - 1]);
  document.getElementById("add_val").textContent = res3[n - 1];
  document.getElementById("ptit").textContent = res4[n - 1];
}
window.load_details = load_details;


async function load_rent(){
  const ok_screen = screen_check();
  if (!ok_screen){
    return;
  }
  var eth = window.ethereum;
  if (eth && eth.accounts){
    localStorage.setItem("acnty", eth.accounts[0]);
  }
  else {
    console.log("not logged in");
    localStorage.setItem("acnty", "");
    await connect();
    console.log(localStorage.getItem("acnty"));
  }
  var add = localStorage.getItem("acnty");
  if (add == ""){
    console.log("You are not connected to a wallet");
    //window.location.href = "./";
    return;
  }
  var url = window.location.toString();
  var n = url.substring(url.indexOf('=') + 1);
  console.log(n);
  if (isNaN(parseInt(n))){
    window.location.href = "./";
  }
  else if (parseInt(n) != parseFloat(n)){
    window.location.href = "./";
  }
  else if (parseInt(n) > 21 || parseInt(n) < 1) {
    window.location.href = "./";
  }
  else {
    var el = document.getElementById("rent_conf");
    const cur_width = Number((el.style.width).replace("%", ""));
    const factor = (1600 / screen.width);
    el.style.width = (cur_width * factor).toString().concat("%");
  }

  const web3 = new Web3(window.ethereum);
  const abiInstance = ABI.abi;
  const contract = new web3.eth.Contract(
                                    abiInstance,
                    "0x6a5fef6a0d30e124f4ffcec677ae712e8964a6cb");
  add = "";
  var c_add = localStorage.getItem("acnty");
  if (c_add){
    if (c_add.length > add.length){
      add = c_add;
      document.getElementById("logbut").textContent = add.substring(0,7).concat("..");
    }
  }
  else {
    add = "0xD0dC8A261Ad1B75A92C5e502AE10c3Fde042b879".toLowerCase();
  }
  const res = await contract.methods.retrieve_active_urls().call({from: add});
  const res2 = await contract.methods.retrieve_active_pics().call({from: add});
  const res3 = await contract.methods.retrieve_acitve_owners().call({from: add});
  const res4 = await contract.methods.retrieve_active_names().call({from: add});

  var tier = 0;
  if (res4[n - 1] != ""){
    window.location.href = "./details.html?slot=".concat(n.toString());
  }
  else {
    if (n >= 1 && n < 8){
      tier = 3;
    }
    else if (n >=8 && n < 15){
      tier = 2;
    }
    else if (n >= 15 && n < 22){
      tier = 1;
    }
    else {
      tier = 4;
    }
    if (tier == 0 || tier == 4){
      window.location.href = "./";
    }
    document.getElementById("slot").textContent = "Rent Slot ".concat(n.toString());
  }


  console.log(tier);


  var eth = window.ethereum;
  if (eth && eth.accounts){
    localStorage("acnty", eth.accounts[0]);
  }
  else {
    console.log("not logged in");
    localStorage.setItem("acnty", "");
    await connect();
    console.log(localStorage.getItem("acnty"));
  }
}
window.load_rent = load_rent;

async function confirm_rent(){
  var url = window.location.toString();
  var n = url.substring(url.indexOf('=') + 1);
  console.log(n);
  if (isNaN(parseInt(n))){
    window.location.href = "./";
  }
  else if (parseInt(n) != parseFloat(n)){
    window.location.href = "./";
  }
  else if (parseInt(n) > 21 || parseInt(n) < 1) {
    window.location.href = "./";
  }
  else {}
  var add = "";
  var c_add = localStorage.getItem("acnty");
  if (c_add){
    if (c_add.length > add.length){
      add = c_add;

    }
  }
  else {
    await connect();
    add = localStorage.getItem("acnty");
  }
  const web3 = new Web3(window.ethereum);
  const abiInstance = ABI.abi;
  const contract = new web3.eth.Contract(
                                    abiInstance,
                    "0x6a5fef6a0d30e124f4ffcec677ae712e8964a6cb");

  const res = await contract.methods.retrieve_active_urls().call({from: add});
  if (res[n - 1] != ""){
    document.getElementById("res_box").textContent = "Error! Purchase Failed. Is this slot already rented?";
  }
  else {
    const res2 = await contract.methods.retrieve_base_price().call({from: add});
    console.log(res2);
    const url_entry = document.getElementById("pweb").value;
    const name_entry = document.getElementById("pname").value;
    const pic_entry = document.getElementById("ppic").value;
    var tier = 0;
    if (n >= 1 && n < 8){
      tier = 3;
    }
    else if (n >=8 && n < 15){
      tier = 2;
    }
    else if (n >= 15 && n < 22){
      tier = 1;
    }
    else {
      tier = 4;
    }
    if (tier == 0 || tier == 4){
      window.location.href = "./";
    }
    if (url_entry == "" || pic_entry == "" || name_entry == ""){
      document.getElementById("res_box").textContent = "Error! All fields are mandatory!";
    }
    else {
      const encoded_url = encodeURIComponent(url_entry);
      const encoded_pic = encodeURIComponent(pic_entry);
      const encoded_name = encodeURIComponent(name_entry);
      const pay = tier*Number(res2);

      try {
        const res3 = await contract.methods.rent(parseInt(n), encoded_name, encoded_url, encoded_pic)
                .send({from: add , value: pay, gas: '1000000', gasPrice:1000000000});
        document.getElementById("res_box").textContent = "Slot rented successfully!";
      }
      catch (err){
        console.log(err);
        document.getElementById("res_box").textContent = "Error! Check if you don't have enough tokens of if the slot is already taken.";
      }



    }

  }

}
window.confirm_rent = confirm_rent;



var checkImage = function(url, el, name, w, f){
    var s = document.createElement("IMG");
    s.src = url;
    s.onerror = function(){
  		console.log("file with "+url+" invalid");
        const fontsize = 2.00 * f;
        console.log(fontsize);
         document.getElementById(el).innerHTML = `
          <div style="color:whitesmoke;font-size:`.concat(fontsize.toString()).concat(`em;display:flex;align-items:center; justify-content:center; background-image: linear-gradient(to right, blue, cyan);width:`.concat(w.toString()).concat(`px;height: `.concat(w.toString()).concat(`px">`.concat(name).concat(`</div>
        `))));
    }
    s.onload = function(){
        console.log("file with "+url+" valid");
    }
}

