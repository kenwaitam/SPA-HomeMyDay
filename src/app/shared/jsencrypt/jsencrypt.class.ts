import JSEncrypt from '../../../assets/js/jsencrypt/src';

export class RSA {

    crypt: JSEncrypt;
    privateKey: string;

    constructor() {
        this.crypt = new JSEncrypt({ default_key_size: '2048' });
    }

    public generateKeypair(): string {
        this.privateKey = this.crypt.getPrivateKey();

        // Only return the public key, keep the private key hidden
        return this.crypt.getPublicKey();
    }

    /** Encrypt the provided string with the destination public key */
    public encrypt(content, publicKey) {
        this.crypt.setKey(publicKey);
        return this.crypt.encrypt(content);
    }

  /** Decrypt the provided string with the local private key */
  public decrypt(content) {
    this.crypt.setKey(this.privateKey);
    return this.crypt.decrypt(content);
}

}
