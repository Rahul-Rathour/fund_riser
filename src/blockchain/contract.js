import { ethers } from 'ethers';
import CrowdfundingABI from './CrowdfundingABI.json';

// Replace with your new deployment address from Remix
const CONTRACT_ADDRESS = '0xf369b5e5A9e4d3dDBb65C5295429F969D955bC6A'; // e.g., '0x1234567890abcdef1234567890abcdef12345678'

export const getContract = async () => {
  if (!window.ethereum) {
    throw new Error('MetaMask is not installed. Please install it to proceed.');
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, CrowdfundingABI, signer);
  return contract;
};