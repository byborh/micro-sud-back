// Générer automatiquement une id

// À télécharger le 'crypto' : Ceci est une bibliothèque Node.js qui fournit des fonctionnalités de cryptographie, incluant la génération d'UUIDs.
import { randomUUID } from 'crypto';

// La classe IdGenerator va s'assurer que l'ID généré est unique en utilisant le pattern Singleton pour éviter plusieurs instances de la classe.
export class IdGenerator {
  // Propriété statique pour maintenir l'unique instance de la classe (Singleton).
  private static instance: IdGenerator;

  // Le constructeur est privé pour empêcher la création d'instances de IdGenerator de l'extérieur (contrôle d'accès au Singleton).
  private constructor() {}

  // Méthode statique pour obtenir l'instance unique de la classe IdGenerator.
  // Si l'instance n'existe pas encore, elle est créée ici.
  public static getInstance(): IdGenerator {
    // Si l'instance n'existe pas, on la crée
    if (!IdGenerator.instance) {
      IdGenerator.instance = new IdGenerator();
    }
    // Retourner l'instance unique de IdGenerator.
    return IdGenerator.instance;
  }

  // Méthode pour générer une nouvelle ID en appelant la fonction randomUUID de 'crypto'.
  public generateId(): string {
    // randomUUID génère un identifiant unique basé sur un algorithme de cryptographie (UUID v4).
    return randomUUID();
  }
}

// Utilisation
// On récupère l'instance unique du générateur d'ID.
const idGenerator = IdGenerator.getInstance();

// Générer un ID unique en appelant la méthode generateId().
const uniqueId = idGenerator.generateId();

// Afficher l'ID unique généré dans la console.
console.log(uniqueId);
