import { glob } from 'glob';
import { copy, ensureDir, remove } from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import archiver from 'archiver';
import fs from 'fs';


// For __dirname in ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const paths = [
    'dist/**/*.js',
    'theme.yml',
    '**/*.twig',
];

const outputDir = 'archive';
const zipOutput = 'archive.zip';

const archiveFiles = async () => {
    const filesSet = new Set();

    // Resolve glob patterns
    for (const pattern of paths) {
        const files = await glob(pattern, { nodir: true });
        files.forEach(file => filesSet.add(file));
    }

    // Clean the output directory
    await remove(outputDir);
    await ensureDir(outputDir);

    // Copy files
    for (const file of filesSet) {
        const destPath = path.join(outputDir, file); // preserves folder structure
        await ensureDir(path.dirname(destPath));
        await copy(file, destPath);
    }

    console.log(`✅ Archived ${filesSet.size} files to '${outputDir}'`);
};


const zipDirectory = async (sourceDir, outPath) => {
  const output = fs.createWriteStream(outPath);
  const archive = archiver('zip', { zlib: { level: 9 } });

  return new Promise((resolve, reject) => {
    output.on('close', () => {
      console.log(`✅ Zipped to ${outPath} (${archive.pointer()} total bytes)`);
      resolve();
    });

    archive.on('error', err => reject(err));

    archive.pipe(output);
    archive.directory(sourceDir, false); // 'false' avoids nesting dist inside dist.zip
    archive.finalize();
  });
};

archiveFiles()
    .then(() => zipDirectory(outputDir, zipOutput))
    .then(() => {
        // Clean up the output directory after zipping
        return remove(outputDir);
    })
    .catch(err => {
        console.error('❌ Error archiving files:', err);
    });
