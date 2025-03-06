import { create } from 'ipfs-http-client';

const auth = 'Basic ' + Buffer.from(
  process.env.NEXT_PUBLIC_PINATA_API_KEY + ':' + process.env.NEXT_PUBLIC_PINATA_API_SECRET
).toString('base64');

let ipfsClient;

try {
  ipfsClient = create({
    host: 'api.pinata.cloud',
    port: 443,
    protocol: 'https',
    headers: {
      authorization: auth,
    },
  });
  console.log('IPFS client initialized successfully');
} catch (err) {
  console.error('Failed to initialize IPFS client:', err);
  throw new Error('IPFS client initialization failed: ' + err.message);
}

if (!process.env.NEXT_PUBLIC_PINATA_API_KEY || !process.env.NEXT_PUBLIC_PINATA_API_SECRET) {
  console.error('Pinata API Key or Secret is missing. Please set them in a .env file.');
}

module.exports = { ipfsClient };
