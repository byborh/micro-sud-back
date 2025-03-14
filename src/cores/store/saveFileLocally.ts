import fs from 'fs/promises';

export async function saveFileLocally(pdfBytes: Uint8Array, fileName: string, folderPath: string) {
  // à faire en sorte que ça puisse sauvegarder plusieurs types de fichiers (videos, images, pdf, etc.)
  // actuellement que le pdf est disponible !
  try {
    // Verify if folder exist, else create
    await fs.mkdir(folderPath, { recursive: true });
    
    // Create the full file path
    const filePath = `${folderPath}/${fileName}`;
    
    // Save the PDF
    await fs.writeFile(filePath, pdfBytes);

    console.log("✅ PDF saved locally in this path: ", filePath, "with this name: ", fileName);
    console.log(`Longueur du fichier à écrire : ${pdfBytes.length} octets`);

    const exists = await fs.access(filePath).then(() => true).catch(() => false);
    console.log(`🔍 Vérification de l'existence du fichier : ${exists ? 'OK' : '❌ NON TROUVÉ'}`);
    
    
    return filePath;
  } catch (error) {
    console.error(`Erreur lors de la sauvegarde du fichier: ${error}`);
    throw error;
  }
}