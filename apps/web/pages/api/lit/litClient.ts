import LitJsSdk from "@lit-protocol/sdk-browser";

const client = new LitJsSdk.LitNodeClient();
const chain = "ethereum";

const accessControlConditions = [
  {
    contractAddress: "",
    standardContractType: "",
    chain: "ethereum",
    method: "eth_getBalance",
    parameters: [":userAddress", "latest"],
    returnValueTest: {
      comparator: ">=",
      value: "0000000000000", 
    },
  },
];

console.log({ client });

class Lit {
  private litNodeClient: any

  async connect() {
    await client.connect()
    this.litNodeClient = client
    console.log({ client })
  }

async encrypt(message: string) {
    if (!this.litNodeClient) {
      await this.connect()
    }

    const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain })
    const { encryptedString, symmetricKey } = await LitJsSdk.encryptString(message)

    const encryptedSymmetricKey = await this.litNodeClient.saveEncryptionKey({
      accessControlConditions,
      symmetricKey,
      authSig,
      chain,
    })

    return {
      encryptedString,
      encryptedSymmetricKey: LitJsSdk.uint8arrayToString(encryptedSymmetricKey, "base16")
    }
  }

  async decrypt(encryptedString: string, encryptedSymmetricKey: string) {
    if (!this.litNodeClient) {
      await this.connect()
    }

    const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain })
    const symmetricKey = await this.litNodeClient.getEncryptionKey({
      accessControlConditions,
      toDecrypt: encryptedSymmetricKey,
      chain,
      authSig
    })

    const decryptedString = await LitJsSdk.decryptString(
      encryptedString,
      symmetricKey
    );

  return { decryptedString }
  }
}



export default new Lit()
