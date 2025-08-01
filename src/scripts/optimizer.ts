import fg from "fast-glob";
import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { pathsToOptimize } from "./optimizer.config";

const EXTENSIONS = [".jpg", ".jpeg", ".png", ".JPG"];

(async () => {
  const files = await fg(pathsToOptimize, { dot: false, onlyFiles: true });

  // 1. Optimize edilecek dosyaları seç
  const filesToConvert = files
    .filter((file) => EXTENSIONS.includes(path.extname(file)))
    .filter((file) => {
      const webpPath = file.replace(/\.(jpg|jpeg|png|JPG)$/i, ".webp");
      return !fs.existsSync(webpPath);
    });

  // 2. Artık karşılığı olmayan .webp dosyalarını bul ve sil
  const webpFiles = files.filter((file) => file.endsWith(".webp"));
  webpFiles.forEach((webpFile) => {
    const originalFile = webpFile.replace(/\.webp$/i, "");
    const hasSource = EXTENSIONS.some((ext) =>
      fs.existsSync(originalFile + ext),
    );
    if (!hasSource) {
      fs.unlinkSync(webpFile);
      console.log("🧹 Silindi:", path.basename(webpFile));
    }
  });

  // 3. Yeni optimize edilecek dosyaları işle
  if (filesToConvert.length === 0) {
    console.log("✅ Tüm dosyalar zaten optimize edilmiş.");
    process.exit(0);
  }

  filesToConvert.forEach((file) => {
    const output = file.replace(/\.(jpg|jpeg|png|JPG)$/i, ".webp");
    const cmd = `cwebp -q 75 "${file}" -o "${output}"`;
    console.log("📦", path.basename(file), "→", path.basename(output));
    execSync(cmd);
  });

  console.log("🎉 Optimize işlemi tamamlandı.");
})();
