const EtherStore = artifacts.require("EtherStore");
const Attacker = artifacts.require("Attacker");

module.exports = function (deployer) {
    deployer.link(EtherStore, Attacker);
    deployer.deploy(Attacker, EtherStore.address);
}