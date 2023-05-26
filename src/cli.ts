#! /usr/bin/env node

import { program } from "commander";
import { generate } from "./commands/generate";
import * as process from "process";

// program definition
program
  .name("@futura-dev/contributing-gen")
  .description("Contributing Gen 🚀")
  .version(process.env.npm_package_version ?? "0.0.0");

// 'init' command definition
program.command("generate").action(generate);

// parse program
program.parse(process.argv);
