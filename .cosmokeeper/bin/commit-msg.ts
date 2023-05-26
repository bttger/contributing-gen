import * as fs from "fs";
import { ParamsOf } from "../../src/utils/types";
import { spawnSync } from "child_process";
import * as rl from "readline";

const question = (q: string): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    readline.question(q, res => {
      resolve(res);
    });
  });
};

// read interface
const readline = rl.createInterface({
  input: process.stdin,
  output: process.stdout
});

const normalizePath = (path: string): string => {
  return path.replace(/^\.\//g, "");
};

export const controlledSpawn = (...params: ParamsOf<typeof spawnSync>) => {
  params[2] && !params[2].encoding && (params[2].encoding = "utf8");
  const output = spawnSync(...params);
  if (output.status !== 0) {
    console.error(output.stderr?.toString() ?? "");
    process.exit(1);
  }

  return output.stdout.toString();
};

// RUN
const run = async () => {
  const GIT_ROOT = controlledSpawn("git", [
    "rev-parse",
    "--show-toplevel"
  ]).trim();

  console.log("reading", `${GIT_ROOT}/.cosmokeeper.json`);
  // read the configuration
  if (!fs.existsSync(`${GIT_ROOT}/.cosmokeeper.json`)) {
    console.error(
      "missing .cosmokeeper configuration file, please run 'npx @futura-dev/cosmokeeper init' to create it."
    );
    process.exit(1);
  }
  const config = JSON.parse(
    fs.readFileSync(`${GIT_ROOT}/.cosmokeeper.json`, { encoding: "utf8" })
  );
  const package_json = JSON.parse(
    fs.readFileSync(`${GIT_ROOT}/package.json`, { encoding: "utf8" })
  );

  // TODO: validate package.json
  // TODO: validate config

  const IS_MONO_REPO = !!package_json.workspaces;
  const STAGED_FILES = controlledSpawn("git", [
    "diff",
    "--cached",
    "--name-only"
  ]).split(/(\s|\n|\r|\r\n)/);

  // MONOREPO
  if (IS_MONO_REPO) {
    const packages: string[] = package_json.workspaces;
    // find all the package slugs
    const visited_slugs = new Set<string>();
    const slugs = packages
      .map((pkg: string) => `${pkg}/package.json`)
      .map((pkg_json: string) => {
        const json = JSON.parse(
          fs.readFileSync(pkg_json, { encoding: "utf8" })
        );
        if (json.slug === undefined) {
          console.error(`missing slug in ${pkg_json}.`);
          process.exit(1);
        }
        if (visited_slugs.has(json.slug)) {
          console.error(`slug ${json.slug} must be unique in your packages.`);
          process.exit(1);
        }
        visited_slugs.add(json.slug);
        return json.slug;
      });

    // Check if the branch name contains any slug
    const current_branch = controlledSpawn("git", [
      "symbolic-ref",
      "--short",
      "HEAD"
    ]).trim();
    const branch_name_contains_a_slug = slugs.reduce((acc, slug) => {
      return (
        acc ||
        new RegExp(`${slug}@${config.patterns.branch}`).test(current_branch) ||
        ["main", "master"].includes(current_branch)
      );
    }, false);
    if (!branch_name_contains_a_slug) {
      console.error(
        `branch name \'${current_branch}\' does not respect the pattern '[slug]@${config.patterns.branch}|main|master'`
      );
      process.exit(1);
    }

    /**
     * - take staged files
     * - foreach staged file take the corresponding package
     * - save the package ( path or name )
     * - check if is unique
     */
    const visited_packages = new Set<string>();
    for (const file of STAGED_FILES) {
      // take the package
      const pkg =
        packages.find(pkg =>
          new RegExp(`${normalizePath(pkg)}`).test(normalizePath(file))
        ) ?? "root";
      if (visited_packages.has(pkg)) {
        // ask
        console.log("Warning: Modified files found in multiple packages.");
        const input = await question(
          "Do you want to allow this commit? (y/N):"
        );
        if (input.toLowerCase() !== "y") {
          console.error("execution stopped");
          process.exit(1);
        }
        break;
      }
      visited_packages.add(pkg);
    }
  } else {
    // Check if the branch name matches the configured patters
    const current_branch = controlledSpawn("git", [
      "symbolic-ref",
      "--short",
      "HEAD"
    ]);
    if (new RegExp(`${config.patterns.branch}`).test(current_branch)) {
      console.error(
        `branch name \'${current_branch}\' does not respect the pattern '${config.patterns.branch}'`
      );
      process.exit(1);
    }
  }

  // COMMON
  // ( lint, prettier )
  const TO_LINT = STAGED_FILES.filter(file =>
    new RegExp(`${config.lint.matches}`).test(file)
  );

  if (config.lint.eslintb && TO_LINT.length > 0)
    controlledSpawn("npx", ["eslint", ...TO_LINT, "--fix"]);

  if (config.lint.prettier && TO_LINT.length > 0)
    controlledSpawn("npx", ["prettier", ...TO_LINT, "--write"]);

  process.exit(0);
};
run();
