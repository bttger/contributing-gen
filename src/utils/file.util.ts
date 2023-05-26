import fs from "fs";

/**
 * Write the markdown output to a markdown file. Code of conduct is optional.
 */
export const writeFile = (
  subfolderName: string,
  content: string,
  fileName: string
) => {
  if (subfolderName != null && subfolderName) {
    if (!fs.existsSync(subfolderName)) fs.mkdirSync(subfolderName);
    subfolderName = subfolderName + "/";
  }
  fs.writeFile(subfolderName + fileName, content, "utf8", err => {
    if (err) throw err;
  });
};
