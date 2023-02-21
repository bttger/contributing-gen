import { ContributingGen } from "./index.js";
import { writeFile } from "./utils.js";
import fs from "fs";

// Update with your project's info
const specs = {
  project: {
    name: "XYZ",
    defaultBranch: "main",
    repoUrl: "https://github.com/user/project-slug",
    docsUrl: "https://github.com/user/project-slug/blob/main/README.md",
  },
  contributing: {
    generate: true,
    emailSensitiveBugs: "security@example.com",
  },
  codeOfConduct: {
    generate: true,
    // enforcement email must not be omitted if 'generate' is true
    enforcementEmail: "email@example.com",
    // additional info about how the code of conduct will be enforced
    enforcementGuidelines: false,
  },
};

const contributingTemplate = fs.readFileSync(
  "templates/contributing.dot",
  "utf8"
);
const codeOfConductTemplate = fs.readFileSync(
  "templates/codeOfConduct.dot",
  "utf8"
);
const contributingGen = new ContributingGen(
  contributingTemplate,
  codeOfConductTemplate
);

const contributingMd = contributingGen.generateContributing(specs);
const codeOfConductMd = contributingGen.generateCodeOfConduct(specs);

if (contributingMd) writeFile("out", contributingMd, "CONTRIBUTING.md");
if (codeOfConductMd) writeFile("out", codeOfConductMd, "CODE_OF_CONDUCT.md");
