<template>
  <div id="app">
    <h1>Simple Storage DApp</h1>
    <div>
      <input v-model="newValue" placeholder="Enter a value" />
      <button @click="setValue">Set Value</button>
    </div>
    <div>
      <button @click="getValue">Get Value</button>
      <p>Stored Value: {{ storedValue }}</p>
    </div>
  </div>
</template>

<script>
import Web3 from 'web3';
import SimpleStorage from './contracts/SimpleStorage.json';

export default {
  data() {
    return {
      web3: null,
      contract: null,
      accounts: [],
      newValue: '',
      storedValue: ''
    };
  },
  async created() {
    // 初始化Web3
    this.web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
    this.accounts = await this.web3.eth.requestAccounts();

    // 获取网络ID
    const networkId = await this.web3.eth.net.getId();
    const deployedNetwork = SimpleStorage.networks[networkId];

    // 初始化合约
    this.contract = new this.web3.eth.Contract(
        SimpleStorage.abi,
        deployedNetwork && deployedNetwork.address
    );
  },
  methods: {
    async setValue() {
      await this.contract.methods.setValue(this.newValue).send({ from: this.accounts[0] });
      this.newValue = '';
    },
    async getValue() {
      const value = await this.contract.methods.getValue().call();
      this.storedValue = value;
    }
  }
};
</script>

<style>
#app {
  text-align: center;
  margin-top: 60px;
}
</style>