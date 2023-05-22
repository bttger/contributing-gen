import { Specs } from "../types/specs.interface";
import * as prompts from '@inquirer/prompts';
import fs from "fs";
import { ContributingGen } from "..";
import { writeFile } from "../utils/file.util";
import {root_package_json_schema, workspace_package_json_schema} from '../utils/validation/package-json'
import { isArray } from "../utils/function.util";

export const generate = async (): Promise<void> => {
    // Load configuration
    // load and validate the root package.json
    const p_json = root_package_json_schema.parse(
        JSON.parse(
          fs.readFileSync('./package.json', {encoding: 'utf-8'}),
        ),
      )
  
      const _config = {
        run: '.',
        monorepo: false,
      }
  
      // is a monorepo ?
      const workspaces = p_json.workspaces
      if (isArray(workspaces)) {
        const workspace = await prompts.select({
          message: 'Choose the workspace',
          choices:
            workspaces.map((workspace_path: string) => {
              return {
                value: workspace_path,
              }
            }),
        })
        // update config
        _config.run = workspace
        _config.monorepo = true
      }

    // STEP 0
    // Project configurations
    const organizationName = await prompts.input({ message: 'Insert the GitHub organization name:', default: 'futura-dev' });
    const projectName = await prompts.input({ message: 'Insert the project name:' });
    const projectSlug = await prompts.input({ message: 'Insert the project slug (name of the project in package.json):', default: `${projectName.toLowerCase().replace(new RegExp(" ", "g"), "-")}` });
    const repositorySlug = await prompts.input({ message: 'Insert the repository slug slug (name of the repository on github):', default: `${projectName.toLowerCase().replace(new RegExp(" ", "g"), "-")}` });
    const defaultBranch = await prompts.input({ message: 'Insert the default branch:', default: 'main' });
    const repoUrl = `https://github.com/${organizationName}/${repositorySlug}`;
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
            repositorySlug,
            defaultBranch,
            repoUrl: repoUrl,
            docsUrl: docsUrl,
            monorepo: _config.monorepo
        },
        contributing: {
            generate: doesContribuiting,
            emailSensitiveBugs: emailSensitiveBugs
        },
        codeOfConduct: {
            generate: doesCodeOfConduct
        },
        license: {
            generate: doesLicense
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

    if (contributingMd) writeFile(`${process.env.NODE_ENV === 'development' ? 'out' : `${_config.run}`}`, contributingMd, "CONTRIBUTING.md");
    if (codeOfConductMd) writeFile(`${process.env.NODE_ENV === 'development' ? 'out' : `${_config.run}`}`, codeOfConductMd, "CODE_OF_CONDUCT.md");
    if (licenseMd) writeFile(`${process.env.NODE_ENV === 'development' ? 'out' : `${_config.run}`}`, licenseMd, "LICENSE");
    if (readmeMd) writeFile(`${process.env.NODE_ENV === 'development' ? 'out' : `${_config.run}`}`, readmeMd, "README.md");

    console.log('Contribution files successfully created 🚀')
    return Promise.resolve()
}
