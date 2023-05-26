import dot from "dot";
import { Specs } from "./types/specs.interface";

export class ContributingGen {
  contributingCompiled: dot.RenderFunction;
  codeOfConductCompiled: dot.RenderFunction;
  licenseCompiled: dot.RenderFunction;
  readmeCompiled: dot.RenderFunction;

  /**
   * Create a new generator with pre compiled templates
   */
  constructor(
    contributingTemplate: string,
    codeOfConductTemplate: string,
    licenseTemplate: string,
    readmeTemplate: string
  ) {
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
    if (!specs.contributing.generate) return null;
    specs.project.repoUrl = specs.project.repoUrl.replace(/\/\s*$/, "");
    return this.contributingCompiled(specs);
  }

  /**
   * Generate markdown output for the code of conduct.
   */
  generateCodeOfConduct(specs: Specs) {
    if (!specs.codeOfConduct.generate) return null;
    return this.codeOfConductCompiled(specs);
  }

  /**
   * Generate markdown output for the license.
   */
  generateLicense(specs: Specs) {
    if (!specs.license.generate) return null;
    return this.licenseCompiled(specs);
  }

  /**
   * Generate markdown output for the readme.
   */
  generateReadme(specs: Specs) {
    if (!specs.readme.generate) return null;
    return this.readmeCompiled(specs);
  }
}
