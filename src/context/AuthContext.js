import React, { createContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [userRole, setUserRole] = useState('donor'); // Default: donor

  const connectWallet = async () => {
    try {
      if (!window.ethereum) throw new Error('No crypto wallet found');
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setCurrentAccount(address);

      // Role assignment
      const adminAddress = 'YOUR_ADMIN_ADDRESS'.toLowerCase(); // Replace with actual admin address
      if (address.toLowerCase() === adminAddress) {
        setUserRole('admin');
      } else {
        // Check if user has created campaigns (for 'creator' role)
        const contract = await getContract(); // Assuming getContract is imported
        const userCampaigns = await contract.userCampaigns(address);
        if (userCampaigns.length > 0) {
          setUserRole('creator');
        } else {
          setUserRole('donor'); // Default role
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setCurrentAccount(accounts[0]);
          // Re-check role on account change
          connectWallet(); // Re-run role assignment
        } else {
          setCurrentAccount(null);
          setUserRole('donor');
        }
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ currentAccount, userRole, connectWallet, setUserRole }}>
      {children}
    </AuthContext.Provider>
  );
};

// Import this in AuthContext.js if not already in scope
import { getContract } from '../blockchain/contract';