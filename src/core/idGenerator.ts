import { randomBytes, createHash } from 'crypto';

export class IdGenerator {
  private static instance: IdGenerator;

  private constructor() {}

  public static getInstance(): IdGenerator {
    if (!IdGenerator.instance) {
      IdGenerator.instance = new IdGenerator();
    }
    return IdGenerator.instance;
  }

  // Générer un ID plus court, basé sur un hash SHA-256 de données aléatoires
  public generateId(): string {
    // Générer des données aléatoires pour garantir l'unicité
    const randomData = randomBytes(16).toString('hex'); // 16 octets = 32 caractères hexadécimaux

    // Créer un hash SHA-256 à partir de ces données aléatoires
    const hash = createHash('sha256').update(randomData).digest('base64');

    // Retourner une version raccourcie de l'ID, par exemple en prenant les 16 premiers caractères.
    return hash.replace(/\+/g, '').replace(/\//g, '').substring(0, 16);
  }
}

// Utilisation
const idGenerator = IdGenerator.getInstance();
const uniqueId = idGenerator.generateId();
console.log(uniqueId); // Exemple : "eFJj9lHVZbQtY0Ep"
