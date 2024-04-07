import { Contract, ContractProvider, Address, Cell, beginCell, Sender, DictionaryKey, DictionaryValue, Dictionary, Address } from "@ton/core";

export default class Main implements Contract {

  constructor(readonly address: Address, readonly init?: { code: Cell, data: Cell }) {}

  async sendAddTrustedAddr(provider: ContractProvider, via: Sender, address: Address) {
    const messageBody = beginCell()
      .storeUint(3931840720, 32)
      .storeAddress(address)
      .endCell();

    await provider.internal(via, {
      value: "0.007",
      body: messageBody
    });
  }

  async sendRemoveTrustedAddr(provider: ContractProvider, via: Sender, address: Address) {
    const messageBody = beginCell()
      .storeUint(1071771491, 32)
      .storeAddress(address)
      .endCell();

    await provider.internal(via, {
      value: "0.007",
      body: messageBody
    });
  }

  async sendChangeOwner(provider: ContractProvider, via: Sender, address: Address) {
    const messageBody = beginCell()
      .storeUint(2174598809, 32)
			.storeUint(0, 64)
      .storeAddress(address)
      .endCell();

    await provider.internal(via, {
      value: "0.01",
      body: messageBody
    });
  }

  async getOwner(provider: ContractProvider) {
    const { stack } = await provider.get("owner", []);
    return stack.readAddress();
  }

  async getTrustedAddresses(provider: ContractProvider) {
    const { stack } = await provider.get("get_trusted_addresses", []);
    const cell = stack.readCellOpt();
    if (!cell) return [];
    const dict = cell
      .beginParse()
      .loadDictDirect(Dictionary.Keys.Address(), Dictionary.Values.Bool());
    return dict.keys();
  }

  async getBalance(provider: ContractProvider) {
    const state = await provider.getState();
    return state.balance;
  }
}
