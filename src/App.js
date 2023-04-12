import { useEffect, useState } from "react";

// Dependencies
import { Routes, Route } from "react-router-dom";
import Web3 from "web3";
import Web3Modal from "web3modal";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import NavigationBarComponent from "./components/NavigationBarComponent";

// Pages
import LandingPage from "./pages/LandingPage";
import TeamPage from "./pages/TeamPage";
import AboutPage from "./pages/AboutPage";
import RoadmapPage from "./pages/RoadmapPage";

// App
const App = () => {
  // States
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState(false);
  const [roadmapBoxes, setRoadmapBoxes] = useState([]);

  // Smart Contract
  const SMART_CONTRACT_ABI = [
    {
      inputs: [
        { internalType: "address", name: "_signerAddress", type: "address" },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "approved",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "Approval",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "operator",
          type: "address",
        },
        {
          indexed: false,
          internalType: "bool",
          name: "approved",
          type: "bool",
        },
      ],
      name: "ApprovalForAll",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        { indexed: true, internalType: "address", name: "to", type: "address" },
        {
          indexed: true,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "Transfer",
      type: "event",
    },
    {
      inputs: [
        { internalType: "uint256", name: "qty", type: "uint256" },
        { internalType: "address", name: "to", type: "address" },
      ],
      name: "adminMint",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "tokenId", type: "uint256" },
      ],
      name: "approve",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "owner", type: "address" }],
      name: "balanceOf",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
      name: "burn",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "burnLive",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "_maxSupply", type: "uint256" },
      ],
      name: "changeMaxSupply",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "_maxSupply", type: "uint256" },
      ],
      name: "changePresaleMaxSupply",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "newPrice", type: "uint256" }],
      name: "changePresalePrice",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "newPrice", type: "uint256" }],
      name: "changePrice",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "newPrice", type: "uint256" }],
      name: "changeTokenfyPresalePrice",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "newPrice", type: "uint256" }],
      name: "changeTokenfyPrice",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "contractURI",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "ethEnabled",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "_tokenId", type: "uint256" }],
      name: "exists",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
      name: "getApproved",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "instantRevealActive",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "owner", type: "address" },
        { internalType: "address", name: "operator", type: "address" },
      ],
      name: "isApprovedForAll",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "maxPerMint",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "maxSupply",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "qty", type: "uint256" }],
      name: "mint",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "qty", type: "uint256" },
        { internalType: "uint256", name: "value", type: "uint256" },
      ],
      name: "mintTokenfy",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "name",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
      name: "ownerOf",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "presaleLive",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "presaleMaxPerMint",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "presaleMaxSupply",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "bytes32", name: "hash", type: "bytes32" },
        { internalType: "bytes", name: "sig", type: "bytes" },
        { internalType: "uint256", name: "qty", type: "uint256" },
        { internalType: "uint256", name: "max", type: "uint256" },
        { internalType: "uint256", name: "expiresAt", type: "uint256" },
      ],
      name: "presaleMint",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "bytes32", name: "hash", type: "bytes32" },
        { internalType: "bytes", name: "sig", type: "bytes" },
        { internalType: "uint256", name: "qty", type: "uint256" },
        { internalType: "uint256", name: "max", type: "uint256" },
        { internalType: "uint256", name: "expiresAt", type: "uint256" },
        { internalType: "uint256", name: "value", type: "uint256" },
      ],
      name: "presaleMintTokenfy",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "", type: "address" }],
      name: "presaleMinted",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "presalePricePerToken",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "pricePerToken",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "contract IERC1155",
          name: "erc1155Token",
          type: "address",
        },
        { internalType: "uint256", name: "id", type: "uint256" },
        { internalType: "address", name: "to", type: "address" },
      ],
      name: "reclaimERC1155",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "contract IERC20",
          name: "erc20Token",
          type: "address",
        },
        { internalType: "address", name: "to", type: "address" },
      ],
      name: "reclaimERC20",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "contract IERC721",
          name: "erc721Token",
          type: "address",
        },
        { internalType: "uint256", name: "id", type: "uint256" },
        { internalType: "address", name: "to", type: "address" },
      ],
      name: "reclaimERC721",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "from", type: "address" },
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "tokenId", type: "uint256" },
      ],
      name: "safeTransferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "from", type: "address" },
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "tokenId", type: "uint256" },
        { internalType: "bytes", name: "_data", type: "bytes" },
      ],
      name: "safeTransferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "saleLive",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "operator", type: "address" },
        { internalType: "bool", name: "approved", type: "bool" },
      ],
      name: "setApprovalForAll",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "string", name: "newBaseURI", type: "string" }],
      name: "setBaseURI",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "bool", name: "live", type: "bool" }],
      name: "setBurnLive",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "string", name: "newuri", type: "string" }],
      name: "setContractURI",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "bool", name: "enabled", type: "bool" }],
      name: "setETHEnabled",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "bool", name: "reveal", type: "bool" }],
      name: "setInstantReveal",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "_maxPerMint", type: "uint256" },
      ],
      name: "setMaxPerMint",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "bool", name: "live", type: "bool" }],
      name: "setPresaleLive",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "_maxPerMint", type: "uint256" },
      ],
      name: "setPresaleMaxPerMint",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "bool", name: "live", type: "bool" }],
      name: "setSaleLive",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "_signer", type: "address" }],
      name: "setSignerAddress",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "bool", name: "enabled", type: "bool" }],
      name: "setTokenfyEnabled",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
      name: "supportsInterface",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "symbol",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
      name: "tokenURI",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "tokenfyAddress",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "tokenfyEnabled",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "tokenfyPresalePrice",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "tokenfyPrice",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "totalSupply",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "from", type: "address" },
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "tokenId", type: "uint256" },
      ],
      name: "transferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "withdrawEarnings",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];
  const SMART_CONTRACT_ADDRESS = "0x630fD418668Ab8121E8e3e45676bCF4C859320B3";

  // Functions
  useEffect(() => {
    axios
      .get(
        "https://aarrohan.com/projects/nft-dapps/buy-the-dip/api/roadmap-boxes-and-options"
      )
      .then((res) => {
        setRoadmapBoxes(res.data.roadmap_boxes);
      });
  }, []);

  const connectWallet = async () => {
    if (Web3.givenProvider) {
      const providerOptions = {};

      const web3Modal = new Web3Modal({
        network: "mainnet",
        cacheProvider: true,
        providerOptions,
      });

      const provider = await web3Modal.connect();
      const web3 = new Web3(provider);

      web3.eth.net.getId();

      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];

      const { ethereum } = window;

      const networkId = await ethereum.request({
        method: "net_version",
      });

      if (networkId === 1 || networkId === `${1}`) {
        setWalletConnected(true);
        setWalletAddress(account);

        toast.success("You can click on options to vote");

        axios
          .get(
            `https://aarrohan.com/projects/nft-dapps/buy-the-dip/api/roadmap-boxes-and-options?wallet_address=${account}`
          )
          .then((res) => {
            setRoadmapBoxes(res.data.roadmap_boxes);
          });
      } else {
        toast.error(`Please change your network to Ethereum Mainnet`);

        await web3.currentProvider.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: Web3.utils.toHex(1) }],
        });

        setWalletConnected(true);
        setWalletAddress(account);

        toast.success("You can click on options to vote");

        axios
          .get(
            `https://aarrohan.com/projects/nft-dapps/buy-the-dip/api/roadmap-boxes-and-options?wallet_address=${account}`
          )
          .then((res) => {
            setRoadmapBoxes(res.data.roadmap_boxes);
          });
      }
    } else {
      window.open(`https://metamask.app.link/dapp/${window.location.href}`);
    }
  };

  const vote = async (roadmapBox, option) => {
    if (walletConnected) {
      const web3 = new Web3(Web3.givenProvider);
      await Web3.givenProvider.enable();

      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];

      const contract = new web3.eth.Contract(
        SMART_CONTRACT_ABI,
        SMART_CONTRACT_ADDRESS
      );

      contract.methods
        .balanceOf(account)
        .call()
        .then((res) => {
          if (parseInt(res) > 0) {
            toast.success("Voting...");

            axios
              .post(
                `https://aarrohan.com/projects/nft-dapps/buy-the-dip/api/vote?box_uid=${roadmapBox.uid}&option_uid=${option.uid}&wallet_address=${account}`
              )
              .then(() => {
                axios
                  .get(
                    `https://aarrohan.com/projects/nft-dapps/buy-the-dip/api/roadmap-boxes-and-options?wallet_address=${account}`
                  )
                  .then((res) => {
                    setRoadmapBoxes(res.data.roadmap_boxes);
                  });

                toast.success("Voted successfully!");
              });
          } else {
            toast.error(
              "You are not a holder of Space Cadets NFT, so you can't vote"
            );
          }
        });
    } else {
      toast.error("Please connect your wallet to vote");
    }
  };

  return (
    <>
      {/* Toast container */}
      <ToastContainer
        theme="colored"
        position="bottom-right"
        autoClose={3000}
      />

      {/* Navigation bar component */}
      <NavigationBarComponent />

      {/* Routes */}
      <Routes>
        {/* Landing page */}
        <Route path="/" element={<LandingPage />} />

        {/* Team page */}
        <Route path="/team" element={<TeamPage />} />

        {/* About page */}
        <Route path="/about" element={<AboutPage />} />

        {/* Roadmap page */}
        <Route
          path="/roadmap"
          element={
            <RoadmapPage
              walletConnected={walletConnected}
              connectWallet={connectWallet}
              vote={vote}
              roadmapBoxes={roadmapBoxes}
            />
          }
        />
      </Routes>
    </>
  );
};

// Export
export default App;
