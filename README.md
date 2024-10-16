# 最简化的区块链本地开发环境搭建方案

Ganache 是一个用于以太坊开发的个人区块链，允许您在本地快速地部署和测试智能合约，无需配置复杂的环境。这对于学习和开发而言，是最简便的方式。

## A步骤概览

1. **安装Ganache**
2. **编写智能合约**
3. **编译和部署智能合约**
4. **开发前端DApp**
5. **运行并测试DApp**

### **详细步骤**

#### **步骤1：安装Ganache**

1. **下载并安装**

    - 前往 [Ganache 官方网站](https://trufflesuite.com/ganache/)。
    - 下载适用于您的操作系统（Windows、macOS 或 Linux）的安装包。
    - 运行安装程序，按照指引完成安装。

2. **启动Ganache**

    - 打开 Ganache 应用程序。
    - 选择“Quickstart”或“新建工作区”来创建一个新的本地区块链。
  
#### **步骤2：编写智能合约**

1. **安装Truffle框架**

    - Truffle 是一个以太坊开发框架，简化了智能合约的编译、部署和测试。

    - 全局安装 Truffle：

      ```bash
      npm install -g truffle
      ```

2. **初始化Truffle项目**

    - 创建项目目录并初始化：

      ```bash
      mkdir smartcontracts
      cd asmartcontracts
      truffle init
      ```

3. **编写合约代码**

    - 在 `contracts/` 目录下，创建 `SimpleStorage.sol`：

    ```solidity
     // SPDX-License-Identifier: MIT
     pragma solidity ^0.8.0;

    contract SimpleStorage {
     uint256 private value;

    // 设置值
    function setValue(uint256 _value) public {
        value = _value;
    }

    // 获取值
    function getValue() public view returns (uint256) {
        return value;
    }
    }
      ```

---

#### **步骤3：编译和部署智能合约**

1. **配置Truffle网络**

    - 编辑 `truffle-config.js`，添加开发网络配置：

      ```javascript
      module.exports = {
        networks: {
          development: {
            host: "127.0.0.1",     // Ganache 运行的主机
            port: 7545,            // Ganache 默认端口
            network_id: "*",       // 任何网络ID
          },
        },
        compilers: {
          solc: {
            version: "0.8.0",      // 与合约中指定的Solidity版本匹配
          },
        },
      };
      ```

2. **编译合约**

   ```bash
   truffle compile
   ```

    - 确保编译成功，没有错误。

3. **编写部署脚本**

    - 在 `migrations/` 目录下创建 `2_deploy_contracts.js`：

      ```javascript
       const SimpleStorage = artifacts.require("SimpleStorage");

       module.exports = function (deployer) {
       deployer.deploy(SimpleStorage);
        };

      ```

4. **部署合约到Ganache**

   ```bash
   truffle migrate --network development
   ```

    - 这会将合约部署到本地运行的Ganache区块链。
---

#### **步骤4：开发前端DApp**

1. **创建Vue应用**

   ```bash
   npm install -g @vue/cli
   vue create simple-storage
   cd simple-storage

   ```

2. **安装依赖**

    - 在React项目中安装 `web3` 依赖：

      ```bash
      npm install web3
      ```

    - 将合约的ABI和地址复制到React项目中。

        - 从 `build/contracts/SimpleStorage.json` 中获取ABI和合约地址。

        - 将 `SimpleStorage.json` 复制到 `src/contracts/` 目录下。

3. **编写vue组件**

    - 编辑 `src/App.vue`，添加以下代码：

      ```vue
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
       
      ```

---

#### **步骤5：运行并测试DApp**

1. **启动Vue应用**

    - 在 vue 项目目录下，运行：

      ```bash
      npm run serve
      ```

    - 应用将在 `http://localhost:8080` 启动。

2. **测试功能**

    - 打开浏览器，访问 `http://localhost:8080`。
    - 选择候选人并点击“投票”按钮。
    - 若投票成功，会显示相应的成功信息。

---

### **额外说明**

### **总结**

- **环境简化**：通过使用 Ganache、Truffle 和 React，您可以在本地快速搭建一个完整的 DApp 开发环境，无需花费大量时间在环境配置上。

- **快速迭代**：在本地环境中，可以快速地进行智能合约的编写、部署和测试，加速学习和开发进程。

