const Sample = artifacts.require("Metacoin");

contract("ContractFactory", () => {
  it("getting gas estimate...", async () => {
    const sampleInstance = await Sample.new();

    const gasEstimate = await sampleInstance.createInstance.estimateGas();

    // deploying a separate contract
    const tx = await sampleInstance.createInstance({
      gas: gasEstimate,
    });

    assert(tx);
  });
});
