import fm from "front-matter";
import type { CardData } from "../types/types";

export function getContentsRecursiveForAktivite(): CardData[] {
  const files = import.meta.glob("/src/data/contents/aktivite/**/*.md", {
    query: "?raw",
    import: "default",
    eager: true,
  });

  const images = import.meta.glob(
    "/src/data/contents/aktivite/**/images/*.{png,jpg,jpeg,svg}",
    {
      eager: true,
      import: "default",
    },
  );

  const logos = import.meta.glob(
    "/src/data/contents/aktivite/**/logo/*.{svg,png}",
    {
      eager: true,
      import: "default",
    },
  );

  const logosByFolder: Record<string, string> = {};
  for (const [path, url] of Object.entries(logos)) {
    const parts = path.split("/");
    const aktiviteIndex = parts.indexOf("aktivite");
    const folderName = parts[aktiviteIndex + 1];
    logosByFolder[folderName] = url as string;
  }

  const imagesByFolder: Record<string, string[]> = {};

  for (const [path, url] of Object.entries(images)) {
    const parts = path.split("/");
    const aktiviteIndex = parts.indexOf("aktivite");
    const folderName = parts[aktiviteIndex + 1];
    if (!imagesByFolder[folderName]) imagesByFolder[folderName] = [];
    imagesByFolder[folderName].push(url as string);
  }

  console.log("imagesByFolder:", imagesByFolder);

  const contents: CardData[] = Object.entries(files).map(
    ([fullPath, raw], index) => {
      const parsed = fm<CardData>(raw as string);
      const pathParts = fullPath.split("/");
      const folderName = pathParts.at(-2) || "";

      const { id, ...restAttributes } = parsed.attributes;

      // console.log(
      //   `Content id=${index + 1}, folder=${folderName}, images=`,
      //   imagesByFolder[folderName] || [],
      // );

      return {
        id: index + 1,
        ...restAttributes,
        content: parsed.body,
        logo:
          restAttributes.logo && restAttributes.logo.startsWith("./logo/")
            ? `/src/data/contents/aktivite/${folderName}/${restAttributes.logo.replace("./", "")}`
            : logosByFolder[folderName] || "",
        images: imagesByFolder[folderName] || [],
      };
    },
  );

  return contents;
}

export function getContents(contentType: "aktivite" | "diger" | "baska"): any {
  if (contentType === "aktivite") {
    return getContentsRecursiveForAktivite();
  }
  // Diğer içerikler için farklı fonksiyonlar yaz ve buraya ekle
  else if (contentType === "diger") {
    // Örnek: return getContentsForDiger();
    return [];
  } else if (contentType === "baska") {
    // Başka içerik fonksiyonu çağrılabilir
    return [];
  } else {
    throw new Error(`Unsupported contentType: ${contentType}`);
  }
}
