import JSEncrypt from '../../../assets/js/jsencrypt/src';

export class RSA {

    crypt: JSEncrypt;
    privateKey: string;

    constructor() {
        this.crypt = new JSEncrypt({default_key_size: '2048'});
        console.log(this.generateKeypair());
    }

    public generateKeypair(): string {
        this.privateKey = this.crypt.getPrivateKey();

        // Only return the public key, keep the private key hidden
        return this.crypt.getPublicKey();
    }
}
