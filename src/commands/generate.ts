import { Specs } from "../types/specs.interface";
import * as prompts from '@inquirer/prompts';
import fs from "fs";
import { ContributingGen } from "..";
import { writeFile } from "../utils/file.util";

export const generate = async (): Promise<void> => {
    // STEP 0
    // Project configurations
    const organizationName = await prompts.input({ message: 'Insert the GitHub organization name:', default: 'futura-dev' });
    const projectName = await prompts.input({ message: 'Insert the project name:' });
    const projectSlug = await prompts.input({ message: 'Insert the project slug (name of the repository):', default: `${projectName.toLowerCase().replace(" ", "-")}` });
    const defaultBranch = await prompts.input({ message: 'Insert the default branch:', default: 'main' });
    const repoUrl = await prompts.input({ message: 'Insert the repository URL:', default: `https://github.com/futura-dev/${projectSlug}` });
    const docsUrl = await prompts.input({ message: 'Insert the documentation URL (README):', default: `${repoUrl}/blob/${defaultBranch}/README.md` });

    // STEP 1
    // Contribuiting
    const doesContribuiting = await prompts.confirm({ message: 'Do you want to create the CONTRIBUITING.md file ?' });
    let emailSensitiveBugs: string = "";
    if (doesContribuiting) {
        emailSensitiveBugs = await prompts.input({ message: 'Insert the email for sensitive bugs:', default: 'opensource@futura-dev.com' });
    }

    // STEP 2
    // Code of Conduct
    const doesCodeOfConduct = await prompts.confirm({ message: 'Do you want to create the CODE_OF_CONDUCT.md file ?' });

    // STEP 3
    // LICENSE
    const doesLicense = await prompts.confirm({ message: 'Do you want to create the LICENSE file ?' });

    // STEP 4
    // README
    const doesReadme = await prompts.confirm({ message: 'Do you want to create the README.md file ?' });
    let supportEmail: string = "";
    if (doesReadme) {
        supportEmail = await prompts.input({ message: 'Insert the email for support:', default: 'opensource@futura-dev.com' });
    }

    const contributingTemplate = fs.readFileSync(
        `${__dirname}/../templates/contributing.dot`,
        "utf8"
    );
    const codeOfConductTemplate = fs.readFileSync(
        `${__dirname}/../templates/codeOfConduct.dot`,
        "utf8"
    );
    const licenseTemplate = fs.readFileSync(
        `${__dirname}/../templates/license.dot`,
        "utf8"
    );
    const readmeTemplate = fs.readFileSync(
        `${__dirname}/../templates/readme.dot`,
        "utf8"
    );

    const contributingGen = new ContributingGen(
        contributingTemplate,
        codeOfConductTemplate,
        licenseTemplate,
        readmeTemplate
    );

    const specs: Specs = {
        project: {
            organizationName,
            name: projectName,
            slug: projectSlug,
            defaultBranch,
            repoUrl: repoUrl,
            docsUrl: docsUrl,
        },
        contributing: {
            generate: doesContribuiting,
            emailSensitiveBugs: emailSensitiveBugs,
        },
        codeOfConduct: {
            generate: doesCodeOfConduct,
        },
        license: {
            generate: doesLicense,
        },
        readme: {
            generate: doesReadme,
            supportEmail
        },
    };

    const contributingMd = contributingGen.generateContributing(specs);
    const codeOfConductMd = contributingGen.generateCodeOfConduct(specs);
    const licenseMd = contributingGen.generateLicense(specs);
    const readmeMd = contributingGen.generateReadme(specs);

    if (contributingMd) writeFile(`${process.env.NODE_ENV === 'development' ? 'out' : ''}`, contributingMd, "CONTRIBUTING.md");
    if (codeOfConductMd) writeFile(`${process.env.NODE_ENV === 'development' ? 'out' : ''}`, codeOfConductMd, "CODE_OF_CONDUCT.md");
    if (codeOfConductMd) writeFile(`${process.env.NODE_ENV === 'development' ? 'out' : ''}`, licenseMd, "LICENSE");
    if (codeOfConductMd) writeFile(`${process.env.NODE_ENV === 'development' ? 'out' : ''}`, readmeMd, "README.md");

    console.log('Contribution files successfully created 🚀')
    return Promise.resolve()
}
