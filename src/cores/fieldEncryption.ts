import { randomBytes, createCipheriv, createDecipheriv, createHash, createHmac } from 'crypto';

/**
 * EncryptionManager
 * A modular and secure encryption manager supporting multiple types of encryption and hashing.
 *
 * Features:
 * - AES-256-GCM for symmetric encryption.
 * - SHA-256 for secure hashing.
 * - HMAC for message authentication.
 * - Key management abstraction for better security.
 */

// Key management module
class KeyManager {
  private static instance: KeyManager;
  private keys: Map<string, Buffer> = new Map();

  private constructor() {}

  public static getInstance(): KeyManager {
    if (!KeyManager.instance) {
      KeyManager.instance = new KeyManager();
    }
    return KeyManager.instance;
  }

  // Generate and store a key securely
  public generateKey(name: string, length: number = 32): Buffer {
    const key = randomBytes(length);
    this.keys.set(name, key);
    return key;
  }

  // Retrieve a key by name
  public getKey(name: string): Buffer {
    const key = this.keys.get(name);
    if (!key) {
      throw new Error(`Key with name "${name}" not found.`);
    }
    return key;
  }
}

// Encryption module
class EncryptionManager {
  private static instance: EncryptionManager;
  private readonly algorithm = 'aes-256-gcm';
  private keyManager = KeyManager.getInstance();

  private constructor() {}

  public static getInstance(): EncryptionManager {
    if (!EncryptionManager.instance) {
      EncryptionManager.instance = new EncryptionManager();
    }
    return EncryptionManager.instance;
  }

  // Encrypt data using AES-256-GCM
  public encrypt(data: string, keyName: string): { encrypted: string; iv: string; tag: string } {
    const key = this.keyManager.getKey(keyName);
    const iv = randomBytes(16);
    const cipher = createCipheriv(this.algorithm, key, iv);

    const encrypted = Buffer.concat([cipher.update(data, 'utf8'), cipher.final()]);
    const tag = cipher.getAuthTag();

    return {
      encrypted: encrypted.toString('hex'),
      iv: iv.toString('hex'),
      tag: tag.toString('hex'),
    };
  }

  // Decrypt data using AES-256-GCM
  public decrypt(encryptedData: { encrypted: string; iv: string; tag: string }, keyName: string): string {
    const { encrypted, iv, tag } = encryptedData;
    const key = this.keyManager.getKey(keyName);
    const decipher = createDecipheriv(this.algorithm, key, Buffer.from(iv, 'hex'));
    decipher.setAuthTag(Buffer.from(tag, 'hex'));

    const decrypted = Buffer.concat([
      decipher.update(Buffer.from(encrypted, 'hex')),
      decipher.final(),
    ]);

    return decrypted.toString('utf8');
  }
}

// Hashing module
class HashManager {
  private static instance: HashManager;

  private constructor() {}

  public static getInstance(): HashManager {
    if (!HashManager.instance) {
      HashManager.instance = new HashManager();
    }
    return HashManager.instance;
  }

  // Hash data with SHA-256
  public hash(data: string): string {
    return createHash('sha256').update(data).digest('hex');
  }

  // Create an HMAC using SHA-256
  public createHmac(data: string, keyName: string): string {
    const key = KeyManager.getInstance().getKey(keyName);
    return createHmac('sha256', key).update(data).digest('hex');
  }
}

// Example usage
const keyManager = KeyManager.getInstance();
const encryptionManager = EncryptionManager.getInstance();
const hashManager = HashManager.getInstance();

// Key generation
keyManager.generateKey('encryptionKey');
keyManager.generateKey('hmacKey');

// Data encryption and decryption
const secretData = 'Sensitive information';
const encryptedData = encryptionManager.encrypt(secretData, 'encryptionKey');
console.log('Encrypted:', encryptedData);

const decryptedData = encryptionManager.decrypt(encryptedData, 'encryptionKey');
console.log('Decrypted:', decryptedData);

// Hashing and HMAC
const hashedData = hashManager.hash(secretData);
console.log('Hashed:', hashedData);

const hmac = hashManager.createHmac(secretData, 'hmacKey');
console.log('HMAC:', hmac);
