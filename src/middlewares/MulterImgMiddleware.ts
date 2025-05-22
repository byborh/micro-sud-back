import multer from "multer";

const storage = multer.memoryStorage(); // Pour traîter en RAM et l'envoyer à s3
export const upload = multer({ storage });