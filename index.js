"use strict";

const fs = require("fs")
const dot = require("dot")
dot.templateSettings.strip = false
const dots = dot.process({ path: "./templates" })


class ContributingGen {
    /** The default specifications */
    specs = {
        projectName: "Our Cool Project",
        projectSlug: "our-cool-project",
        contributing: {
            generate: true,
            tableOfContents: true,
        },
        codeOfConduct: {
            generate: true,
            enforcementEmail: "email@example.com",
            enforcementGuidelines: false,
        },
    }
    markdownOutput = {
        contributing: "",
        codeOfConduct: "",
    }

    /**
     * Creates a generator for contribution guidelines.
     * @param {object} specification - An object to specify the contribution guidelines.
     */
    constructor(specification) {
        this.specs = specification !== undefined ? specification : this.specs
    }

    /**
     * Generates the markdown output of each specified file.
     * @return {object} markdownOutput - An object with properties of generated markdown output from all files.
     */
    generateMarkdown() {
        this.markdownOutput.contributing = this.specs.contributing.generate ? dots.contributing(this.specs) : ""
        this.markdownOutput.codeOfConduct = this.specs.codeOfConduct.generate ? dots.codeOfConduct(this.specs) : ""
        return this.markdownOutput
    }

    /**
     * Writes the markdown output to the appropriate files.
     * Depending on which files were specified, several files are written on the same file path.
     */
    writeMarkdownFiles() {
        if (this.specs.contributing.generate && this.markdownOutput.contributing) {
            fs.writeFile("CONTRIBUTING.md", this.markdownOutput.contributing, "utf8", (err) => {
                if (err) throw err;
                console.log('Your CONTRIBUTING.md has been saved!');
            });
        }
        if (this.specs.codeOfConduct.generate && this.markdownOutput.codeOfConduct) {
            fs.writeFile("CODE_OF_CONDUCT.md", this.markdownOutput.codeOfConduct, "utf8", (err) => {
                if (err) throw err;
                console.log('Your CODE_OF_CONDUCT.md has been saved!');
            });
        }
    }
}

module.exports = ContributingGen
