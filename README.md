# Welcome to contributing-gen
A configurable CONTRIBUTING.md generator - The guideline to communicate how people should contribute to your project.

> The generated artifacts should serve as basis, adviser and inspiration. We do not guarantee completeness, but a good starting point for a well-structured guide.

## Getting Started
- Clone this repository to your local machine
- Open your favored terminal within the project folder and run `npm install`
- Open the `generate.js` file and insert your information
- After you are done, get back to the terminal and run `npm run gen`

In the following listing you see the specification, which you have to fill with your information:
```javascript
const specs = {
    project: {
        name: "Our Cool Project",
        slug: "our-cool-project",
        repoUrl: "https://github.com/user/slug/",
        docsUrl: "https://github.com/user/slug/blob/master/README.md",
    },
    contributing: {
        generate: true,
    },
    codeOfConduct: {
        generate: true,
        // enforcement email must not be omitted if 'generate' is true
        enforcementEmail: "email@example.com",
        // additional info about how the code of conduct will be enforced
        enforcementGuidelines: false,
    },
}

```

## Contributing
We encourage you to contribute to contributing-gen! Please check out the
[Contribution Guide](https://github.com/bttger/contributing-gen/blob/master/CONTRIBUTING.md) for guidelines about how to proceed.

Everyone interacting in the contributing-gen community is expected to follow our [Code of Conduct](https://github.com/bttger/contributing-gen/blob/master/CODE_OF_CONDUCT.md).

## License
contributing-gen is released under the [MIT License](https://opensource.org/licenses/MIT).

## Acknowledgment
For the templates we have looked at several open source projects as examples:
- [Ruby on Rails](https://github.com/rails/rails/blob/master/CONTRIBUTING.md)
- [Open Government](https://github.com/opengovernment/opengovernment/blob/master/CONTRIBUTING.md)
- [Atom](https://github.com/atom/atom/blob/master/CONTRIBUTING.md)
- [weallcontribute](https://github.com/WeAllJS/weallcontribute/blob/latest/CONTRIBUTING.md)
- [generate-contributing](https://github.com/generate/generate-contributing/blob/master/templates/contributing.md)
- [contributing-template](https://github.com/nayafia/contributing-template/blob/master/CONTRIBUTING-template.md)
- [idiomatic-contributing](https://github.com/jonschlinkert/idiomatic-contributing)
- []()
- []()
