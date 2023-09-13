import { Injectable } from '@nestjs/common';
import Web3 from 'web3';
import { ethers } from 'ethers';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

@Injectable()
export class BlockchainService {
  public web3: Web3;
  private contract: any;
  private contractAddress = process.env.BC_CONTRACT_ADDRESS;
  private contractABI = require('../../../blockchain/build/contracts/Points.json').abi
  private adminAddress: string;
  private adminPrivateKey: string;
  private readonly provider: ethers.Provider;

  constructor() {
    this.web3 = new Web3(new Web3.providers.HttpProvider(process.env.BC_SERVER_ADDRESS));
    this.adminAddress = process.env.ADMIN_ADDRESS;
    this.adminPrivateKey = process.env.ADMIN_PRIVATE_KEY;
    this.contract = new this.web3.eth.Contract(this.contractABI, this.contractAddress);
    this.provider = new ethers.JsonRpcProvider(process.env.BC_SERVER_ADDRESS);
  }

  async getTransaction(txHash: string): Promise<ethers.TransactionResponse> {
    return this.provider.getTransaction(txHash);
  }

  async getPoints(address: string): Promise<number> {
    const balance = await this.contract.methods.balanceOf(address).call({ from: this.adminAddress });
    return parseFloat(balance.toString());
  }

  async createAddress(): Promise<string> {
    const newAccount = this.web3.eth.accounts.create();
    return newAccount.address;
  }

  async getCurrentPrice(): Promise<number> {
    return await this.contract.methods.getCurrentPrice().call({ from: this.adminAddress });
  }

  async addPointsToAddress(address: string, amount: number): Promise<void> {
    const feeHistory = await this.web3.eth.getFeeHistory(1, 'latest', []);
    const baseFeePerGas = feeHistory.baseFeePerGas[0];
    const maxPriorityFeePerGas = this.web3.utils.toWei('3', 'gwei');
    const maxFeePerGas = (BigInt(baseFeePerGas) + BigInt(maxPriorityFeePerGas)).toString();

    const tx = {
      from: this.adminAddress,
      to: this.contractAddress,
      gas: 2000000,
      maxPriorityFeePerGas,
      maxFeePerGas,
      data: this.contract.methods.addPointsToAddress(address, amount).encodeABI()
    };

    const signedTx = await this.web3.eth.accounts.signTransaction(tx, this.adminPrivateKey);
    await this.web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  }

  async removePointsFromAddress(address: string, amount: number): Promise<void> {
    const feeHistory = await this.web3.eth.getFeeHistory(1, 'latest', []);
    const baseFeePerGas = feeHistory.baseFeePerGas[0];
    const maxPriorityFeePerGas = this.web3.utils.toWei('3', 'gwei');
    const maxFeePerGas = (BigInt(baseFeePerGas) + BigInt(maxPriorityFeePerGas)).toString();

    const tx = {
      from: this.adminAddress,
      to: this.contractAddress,
      gas: 2000000,
      maxPriorityFeePerGas,
      maxFeePerGas,
      data: this.contract.methods.removePointsFromAddress(address, amount).encodeABI()
    };

    const signedTx = await this.web3.eth.accounts.signTransaction(tx, this.adminPrivateKey);
    await this.web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  }
}
