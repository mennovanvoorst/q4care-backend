import pdf from "pdf-creator-node";
import path from "path";

const generate = async (
  options: {
    fileName: string;
    filePath: string;
    format: string;
    orientation: string;
  },
  template: string,
  vars: any
) => {
  const folder = path.join(__dirname, "../views/certificates/assets", "/");

  const document = {
    html: template,
    data: { ...vars, folder },
    path: options.filePath,
    type: "buffer",
  };

  return pdf.create(document, {
    ...options,
    localUrlAccess: true,
    base: `file:/${folder.replace(/\\/g, "/")}`,
  });
};

export default {
  generate,
};
