import { Specs } from "../types/specs.interface";
import * as prompts from "@inquirer/prompts";
import fs from "fs";
import { ContributingGen } from "..";
import { writeFile } from "../utils/file.util";
import { root_package_json_schema } from "../utils/validation/package-json";
import { isArray } from "../utils/function.util";

export const generate = async (): Promise<void> => {
  // Global configurations
  const organizationName = await prompts.input({
    message: "Insert the GitHub organization name:",
    default: "futura-dev"
  });
  const repositorySlug = await prompts.input({
    message: "Insert the repository slug (name of the repository on github):"
  });
  const defaultBranch = await prompts.input({
    message: "Insert the default branch:",
    default: "main"
  });
  const repoUrl = `https://github.com/${organizationName}/${repositorySlug}`;

  // Load configuration
  // load and validate the root package.json
  const p_json = root_package_json_schema.parse(
    JSON.parse(fs.readFileSync("./package.json", { encoding: "utf-8" }))
  );

  const _config = {
    run: ["."],
    monorepo: false
  };
  console.log("");

  // is a monorepo ?
  let workspaces = p_json.workspaces;
  if (isArray(workspaces)) {
    workspaces = workspaces.concat(".");
    const workspace = await prompts.checkbox({
      message: "Choose the workspace(s):",
      choices: workspaces.map((workspace_path: string) => {
        return {
          value: workspace_path
        };
      })
    });
    // update config
    _config.run = workspace;
    _config.monorepo = true;
  }
  console.log("");

  for (const configPath of _config.run) {
    if (_config.monorepo)
      console.log(`Creating contributing files for ${configPath}`);

    // STEP 0
    // Project configurations
    const projectName = (
      await prompts.input({ message: "Insert the project name:" })
    ).trim();
    const projectSlug = (
      await prompts.input({
        message:
          "Insert the project slug (name of the project in package.json):",
        default: `${projectName
          .toLowerCase()
          .replace(new RegExp(" ", "g"), "-")}`
      })
    ).trim();
    const docsUrl = (
      await prompts.input({
        message: "Insert the documentation URL (README):",
        default: _config.monorepo
          ? `${repoUrl}/blob/${defaultBranch}/packages/${projectSlug}/README.md`
          : `${repoUrl}/blob/${defaultBranch}/README.md`
      })
    ).trim();

    // STEP 1
    // Contribuiting
    const doesContribuiting = await prompts.confirm({
      message: "Do you want to create the CONTRIBUITING.md file ?"
    });
    let emailSensitiveBugs = "";
    if (doesContribuiting) {
      emailSensitiveBugs = (
        await prompts.input({
          message: "Insert the email for sensitive bugs:",
          default: "opensource@futura-dev.com"
        })
      ).trim();
    }

    // STEP 2
    // Code of Conduct
    const doesCodeOfConduct = await prompts.confirm({
      message: "Do you want to create the CODE_OF_CONDUCT.md file ?"
    });

    // STEP 3
    // LICENSE
    const doesLicense = await prompts.confirm({
      message: "Do you want to create the LICENSE file ?"
    });

    // STEP 4
    // README
    const doesReadme = await prompts.confirm({
      message: "Do you want to create the README.md file ?"
    });
    let supportEmail = "";
    if (doesReadme) {
      supportEmail = (
        await prompts.input({
          message: "Insert the email for support:",
          default: "opensource@futura-dev.com"
        })
      ).trim();
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
      }
    };

    const contributingMd = contributingGen.generateContributing(specs);
    const codeOfConductMd = contributingGen.generateCodeOfConduct(specs);
    const licenseMd = contributingGen.generateLicense(specs);
    const readmeMd = contributingGen.generateReadme(specs);

    if (contributingMd != null)
      writeFile(
        `${process.env.NODE_ENV === "development" ? "out" : `${configPath}`}`,
        contributingMd,
        "CONTRIBUTING.md"
      );
    if (codeOfConductMd != null)
      writeFile(
        `${process.env.NODE_ENV === "development" ? "out" : `${configPath}`}`,
        codeOfConductMd,
        "CODE_OF_CONDUCT.md"
      );
    if (licenseMd != null)
      writeFile(
        `${process.env.NODE_ENV === "development" ? "out" : `${configPath}`}`,
        licenseMd,
        "LICENSE"
      );
    if (readmeMd != null)
      writeFile(
        `${process.env.NODE_ENV === "development" ? "out" : `${configPath}`}`,
        readmeMd,
        "README.md"
      );

    console.log("");
  }

  console.log("Contribution files successfully created 🚀");
  return Promise.resolve();
};
