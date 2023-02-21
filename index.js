"use strict";
import dot from "dot";

export class ContributingGen {
  /**
   * Create a new generator with pre compiled templates
   */
  constructor(contributingTemplate, codeOfConductTemplate) {
    dot.templateSettings.strip = false;
    this.contributingCompiled = dot.template(contributingTemplate);
    this.codeOfConductCompiled = dot.template(codeOfConductTemplate);
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
}
