import dot from "dot";
import fs from "fs";
import { Specs } from "./types/specs.interface";

const contributingTemplate = fs.readFileSync(
  `${__dirname}/templates/contributing.dot`,
  "utf8"
);
const codeOfConductTemplate = fs.readFileSync(
  `${__dirname}/templates/codeOfConduct.dot`,
  "utf8"
);
const licenseTemplate = fs.readFileSync(
  `${__dirname}/templates/license.dot`,
  "utf8"
);
const readmeTemplate = fs.readFileSync(
  `${__dirname}/templates/readme.dot`,
  "utf8"
);

export class ContributingGen {
  contributingCompiled: dot.RenderFunction;
  codeOfConductCompiled: dot.RenderFunction;
  licenseCompiled: dot.RenderFunction;
  readmeCompiled: dot.RenderFunction;

  /**
   * Create a new generator with pre compiled templates
   */
  constructor(contributingTemplate: string, codeOfConductTemplate: string, licenseTemplate: string, readmeTemplate: string) {
    dot.templateSettings.strip = false;
    this.contributingCompiled = dot.template(contributingTemplate);
    this.codeOfConductCompiled = dot.template(codeOfConductTemplate);
    this.licenseCompiled = dot.template(licenseTemplate);
    this.readmeCompiled = dot.template(readmeTemplate);
  }

  /**
   * Generate markdown output for the contribution guidelines.
   */
  generateContributing(specs: Specs) {
    if (!specs.contributing.generate) return "";
    specs.project.repoUrl = specs.project.repoUrl.replace(/\/\s*$/, "");
    return this.contributingCompiled(specs);
  }

  /**
   * Generate markdown output for the code of conduct.
   */
  generateCodeOfConduct(specs: Specs) {
    if (!specs.codeOfConduct.generate) return "";
    return this.codeOfConductCompiled(specs);
  }

  /**
   * Generate markdown output for the license.
   */
  generateLicense(specs: Specs) {
    if (!specs.license.generate) return "";
    return this.licenseCompiled(specs);
  }

  /**
   * Generate markdown output for the readme.
   */
  generateReadme(specs: Specs) {
    if (!specs.readme.generate) return "";
    return this.readmeCompiled(specs);
  }
}

export const ContributingGenInstance = new ContributingGen(contributingTemplate, codeOfConductTemplate, licenseTemplate, readmeTemplate);