# Contributing Gen

[![Version](https://img.shields.io/github/v/release/futura-dev/contributing-gen)](https://github.com/futura-dev/contributing-gen)
[![License](https://img.shields.io/github/license/futura-dev/contributing-gen)](https://github.com/futura-dev/contributing-gen/blob/main/LICENSE)
[![Open Issues](https://img.shields.io/github/issues/futura-dev/contributing-gen)](https://github.com/futura-dev/contributing-gen/issues?q=is%3Aissue+is%3Aopen)
[![Closed Issues](https://img.shields.io/github/issues-closed/futura-dev/contributing-gen)](https://github.com/futura-dev/contributing-gen/issues?q=is%3Aissue+is%3Aclosed)

## Table of Contents

- [Getting Started](#getting-started)
- [Example](#example)
- [Code of Conduct](#code-of-conduct)
- [Contributing](#contributing)
- [Support](#support)
- [License](#license)

## Getting Started

This package can be installed globally or locally using:

```sh
    $ npm install @futura-dev/contributing-gen
```

Now you can use our CLI issuing:

```sh
    $ npx @futura-dev/contributing-gen generate
```

The CLI asks you to fill the points needed to generate all the files.
At the end you'll have all the files inside the root directory.

## Local configuration

- Clone this repository
- Open the terminal, cd to the project folder, use our .nvmrc with `nvm use` to use the right node version and run `npm i`

Now you're all set to edit our project.
In the following listing you see the specification, which you have to fill with your information:

```typescript
const specs = {
  project: {
    organizationName: "futura-dev",
    name: "Contributing Gen",
    slug: "contributing-gen",
    defaultBranch: "main",
    repoUrl: "https://github.com/futura-dev/contributing-gen/",
    docsUrl:
      "https://github.com/futura-dev/contributing-gen/blob/main/README.md"
  },
  contributing: {
    generate: true,
    emailSensitiveBugs: "opensource@futura-dev.com"
  },
  codeOfConduct: {
    generate: true
  },
  license: {
    generate: true
  },
  readme: {
    generate: true,
    supportEmail: "opensource@futura-dev.com"
  }
};
```

## Example

## Code of Conduct

As contributors and maintainers of this open-source web project, we pledge to provide a welcoming and inclusive environment for everyone. We value the participation of individuals from diverse backgrounds and perspectives and aim to foster a respectful and harassment-free community.

To ensure a positive experience for all community members, we have established the following code of conduct that applies to all project-related activities and interactions, both online and offline. By participating in this project, you are expected to uphold these [guidelines](https://github.com/futura-dev/contributing-gen/blob/main/CODE_OF_CONDUCT.md).

## Contributing

Thank you for considering contributing to this open-source web project! We appreciate your interest and support. To ensure a smooth collaboration process, please follow the [guidelines](https://github.com/futura-dev/contributing-gen/blob/main/CONTRIBUTING.md)

## Support

If you need assistance, have questions, or want to provide feedback related to this open-source web project, there are several ways to get support:

- **Issue Tracker**: Check the project's issue tracker on [GitHub](https://github.com/futura-dev/contributing-gen/issues) to see if your question or issue has already been addressed. If not, feel free to open a new issue with a detailed description.

- **Email**: You can also reach out to the project maintainers directly via email at opensource@futura-dev.com. Please allow for a reasonable response time.

Before seeking support, make sure to review the project's documentation and readme file, as they may contain helpful information and answers to common questions.

When seeking support or reporting issues, please provide as much relevant information as possible, such as the version of the project you are using, the steps to reproduce the problem, and any error messages encountered. This will help us better understand and assist you with your query.

While we strive to provide timely and helpful support, please note that response times may vary depending on the availability of project maintainers and the complexity of the issue.

We appreciate your interest in this project and look forward to assisting you!

## License

This project is under MIT License. Please check our [LICENSE](https://github.com/futura-dev/contributing-gen/blob/main/LICENSE) page.
