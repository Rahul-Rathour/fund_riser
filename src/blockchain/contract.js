import { ethers } from 'ethers';
import CrowdfundingABI from './CrowdfundingABI.json';

// Replace with your new deployment address from Remix
const CONTRACT_ADDRESS = '0xb4541ee93B9e0F843b94A62F3800fE9166e95d41'; // e.g., '0x1234567890abcdef1234567890abcdef12345678'

export const getContract = async () => {
  if (!window.ethereum) {
    throw new Error('MetaMask is not installed. Please install it to proceed.');
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, CrowdfundingABI, signer);
  return contract;
};