module.exports = {
  // Uncommenting the defaults below 
  // provides for an easier quick-start with Ganache.
  // You can also follow this format for other networks;
  // see <http://truffleframework.com/docs/advanced/configuration>
  // for more details on how to specify configuration options!
  //
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*",
      from: "0x3590aca93338b0721966a8d0c96ebf2c4c87c544"
    },
	  development1: {
      host: "127.0.0.1",
      port: 8546,
      network_id: "*",
      from: "0xa1dd179d921ae78ba76e32c405fc10cfcddd2ba1"
    },
    gnache: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "5777",
      from: "0x0207316d3C423cF5466579be2359e029c6D1c2dc"
    }
  //  test: {
  //    host: "127.0.0.1",
  //    port: 7545,
  //    network_id: "*"
  //  }
  }
  //
};
