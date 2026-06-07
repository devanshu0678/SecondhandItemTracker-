const contractAddress = "0xAfAf60D0dA9a050327D07eAa14ebD9AB2C0ac7C8";
const abi = [[
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "ItemRegistered",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "to",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "itemId",
				"type": "uint256"
			}
		],
		"name": "getItem",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			}
		],
		"name": "registerItem",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "itemId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]b
    /* YOUR CONTRACT ABI HERE */];

async function registerItem() {
    const itemName = document.getElementById("itemName").value;
    const itemDesc = document.getElementById("itemDesc").value;

    if (!window.ethereum) {
        alert("Please install MetaMask!");
        return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);

    try {
        await contract.registerItem(itemName, itemDesc);
        alert("Item Registered Successfully!");
    } catch (error) {
        console.error(error);
        alert("Error registering item");
    }
}

async function transferOwnership() {
    const itemId = document.getElementById("itemId").value;
    const newOwner = document.getElementById("newOwner").value;

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);

    try {
        await contract.transferOwnership(itemId, newOwner);
        alert("Ownership Transferred!");
    } catch (error) {
        console.error(error);
        alert("Error transferring ownership");
    }
}

async function getItemInfo() {
    const itemId = document.getElementById("searchItemId").value;

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(contractAddress, abi, provider);

    try {
        const item = await contract.getItem(itemId);
        document.getElementById("itemInfo").innerHTML = `
            <p><strong>Name:</strong> ${item[0]}</p>
            <p><strong>Description:</strong> ${item[1]}</p>
            <p><strong>Current Owner:</strong> ${item[2]}</p>
            <p><strong>Previous Owners:</strong> ${item[3].join(", ")}</p>
        `;
    } catch (error) {
        console.error(error);
		const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS";

const abi = [
  {
    "inputs":[
      {"internalType":"string","name":"name","type":"string"},
      {"internalType":"string","name":"description","type":"string"}
    ],
    "name":"registerItem",
    "outputs":[],
    "stateMutability":"nonpayable",
    "type":"function"
  },
  {
    "inputs":[
      {"internalType":"uint256","name":"itemId","type":"uint256"},
      {"internalType":"address","name":"newOwner","type":"address"}
    ],
    "name":"transferOwnership",
    "outputs":[],
    "stateMutability":"nonpayable",
    "type":"function"
  },
  {
    "inputs":[
      {"internalType":"uint256","name":"itemId","type":"uint256"}
    ],
    "name":"getItem",
    "outputs":[
      {"internalType":"string","name":"","type":"string"},
      {"internalType":"string","name":"","type":"string"},
      {"internalType":"address","name":"","type":"address"},
      {"internalType":"address[]","name":"","type":"address[]"}
    ],
    "stateMutability":"view",
    "type":"function"
  }
];

let account = null;

async function connectWallet() {
  if (!window.ethereum) {
    alert("Please install MetaMask");
    return;
  }

  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts"
  });

  account = accounts[0];

  document.getElementById("wallet").innerText =
    "Connected: " + account.substring(0, 6) + "..." + account.substring(account.length - 4);
}

async function registerItem() {
  try {
    const itemName = document.getElementById("itemName").value;
    const itemDesc = document.getElementById("itemDesc").value;

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      contractAddress,
      abi,
      signer
    );

    const tx = await contract.registerItem(
      itemName,
      itemDesc
    );

    await tx.wait();

    alert("Item Registered Successfully");
  } catch (err) {
    console.error(err);
    alert("Registration Failed");
  }
}

async function transferOwnership() {
  try {
    const itemId = document.getElementById("itemId").value;
    const newOwner = document.getElementById("newOwner").value;

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      contractAddress,
      abi,
      signer
    );

    const tx = await contract.transferOwnership(
      itemId,
      newOwner
    );

    await tx.wait();

    alert("Ownership Transferred");
  } catch (err) {
    console.error(err);
    alert("Transfer Failed");
  }
}

async function getItemInfo() {
  try {
    const itemId = document.getElementById("searchItemId").value;

    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const contract = new ethers.Contract(
      contractAddress,
      abi,
      provider
    );

    const item = await contract.getItem(itemId);

    document.getElementById("itemInfo").innerHTML = `
      <h3>Item Details</h3>
      <p><b>Name:</b> ${item[0]}</p>
      <p><b>Description:</b> ${item[1]}</p>
      <p><b>Current Owner:</b> ${item[2]}</p>
      <p><b>Previous Owners:</b><br>
      ${item[3].join("<br>")}</p>
    `;
  } catch (err) {
    console.error(err);
    alert("Item Not Found");
  }
}
        alert("Error fetching item");
    }
}
