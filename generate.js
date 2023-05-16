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
    emailSensitiveBugs: "opensource@futura-dev.com",
  },
  codeOfConduct: {
    generate: true,
    // enforcement email must not be omitted if 'generate' is true
    enforcementEmail: "opensource@futura-dev.com",
    // additional info about how the code of conduct will be enforced
    enforcementGuidelines: false,
  },
  license: {
    generate: true,
  },
  readme: {
    generate: true,
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
const licenseTemplate = fs.readFileSync(
  "templates/license.dot",
  "utf8"
);
const readmeTemplate = fs.readFileSync(
  "templates/readme.dot",
  "utf8"
);
const contributingGen = new ContributingGen(
  contributingTemplate,
  codeOfConductTemplate,
  licenseTemplate,
  readmeTemplate
);

const contributingMd = contributingGen.generateContributing(specs);
const codeOfConductMd = contributingGen.generateCodeOfConduct(specs);
const licenseMd = contributingGen.generateLicense(specs);
const readmeMd = contributingGen.generateReadme(specs);

if (contributingMd) writeFile("out", contributingMd, "CONTRIBUTING.md");
if (codeOfConductMd) writeFile("out", codeOfConductMd, "CODE_OF_CONDUCT.md");
if (codeOfConductMd) writeFile("out", licenseMd, "LICENSE.md");
if (codeOfConductMd) writeFile("out", readmeMd, "README.md");
