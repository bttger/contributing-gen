"use strict";
import dot from "dot";

export class ContributingGen {
  /**
   * Create a new generator with pre compiled templates
   */
  constructor(contributingTemplate, codeOfConductTemplate, licenseTemplate, readmeTemplate) {
    dot.templateSettings.strip = false;
    this.contributingCompiled = dot.template(contributingTemplate);
    this.codeOfConductCompiled = dot.template(codeOfConductTemplate);
    this.licenseCompiled = dot.template(licenseTemplate);
    this.readmeCompiled = dot.template(readmeTemplate);
  }

  /**
   * Generate markdown output for the contribution guidelines.
   */
  generateContributing(specs) {
    if (!specs.contributing.generate) return "";
    specs.project.repoUrl = specs.project.repoUrl.replace(/\/\s*$/, "");
    return this.contributingCompiled(specs);
  }

  /**
   * Generate markdown output for the code of conduct.
   */
  generateCodeOfConduct(specs) {
    if (!specs.codeOfConduct.generate) return "";
    return this.codeOfConductCompiled(specs);
  }

  /**
   * Generate markdown output for the license.
   */
  generateLicense(specs) {
    if (!specs.license.generate) return "";
    return this.licenseCompiled(specs);
  }

  /**
   * Generate markdown output for the readme.
   */
  generateReadme(specs) {
    if (!specs.readme.generate) return "";
    return this.readmeCompiled(specs);
  }
}
