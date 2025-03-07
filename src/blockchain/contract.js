import { ethers } from 'ethers';
import CrowdfundingABI from './CrowdfundingABI.json';

// Replace with your new deployment address from Remix
const CONTRACT_ADDRESS = '0x91d174a2933A867018a9788429847D2F054080C3'; // e.g., '0x5134d8c5869eD6fbB47cd27425a74D27CdeB8bC2'

export const getContract = async () => {
  if (!window.ethereum) {
    throw new Error('MetaMask is not installed. Please install it to proceed.');
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, CrowdfundingABI, signer);
  return contract;
};