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