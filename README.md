# Welcome to contributing-gen

A CONTRIBUTING.md generator - A guideline to communicate how people should contribute to your project.

**[Generate it](https://bttger.github.io/contributing-gen-web/) directly in your browser with the [web frontend (contributing-gen-web)](https://github.com/bttger/contributing-gen-web). 🎉**

> The generated artifacts should serve as basis, adviser and inspiration. We do not guarantee completeness, but a good starting point for a well-structured guide.

## Getting Started

- Clone this repository
- Open the terminal, cd to the project folder and run `npm install`
- Open the `generate.js` file and update it with your project information
- Run `npm run gen` to generate new files

The files have now been generated and you can copy them into your project repository. And don't forget to mention them in your readme.

In the following listing you see the specification, which you have to fill with your information:

```javascript
const specs = {
  project: {
    name: "XYZ",
    defaultBranch: "main",
    repoUrl: "https://github.com/user/project-slug/",
    docsUrl: "https://github.com/user/project-slug/blob/main/README.md",
  },
  contributing: {
    generate: true,
    emailSensitiveBugs: "security@example.com",
  },
  codeOfConduct: {
    generate: true,
    // enforcement email must not be omitted if 'generate' is true
    enforcementEmail: "email@example.com",
    // additional info about how the code of conduct will be enforced
    enforcementGuidelines: false,
  },
};
```

## Contributing

Although this project should serve as a good example, we don't have an extra guideline for contributions, since the project has a small scope without any programming. Nevertheless, anyone who wants to participate, in whatever form, must follow our [Code of Conduct](https://github.com/bttger/contributing-gen/blob/master/CODE_OF_CONDUCT.md).

**Everyone who has ideas and suggestions for improvement is encouraged to contribute**. Be it with a simple issue or a pull request. Our goal is to create the best template for contribution guidelines, which helps every open source developer to create an individual guide. It should be made clear to project owners how comprehensible and simple guidelines are structured and how to encourage the community to participate in the project. And don't hesitate, even if it is just a small typo you have spotted.

The community looks forward to your contributions. 🤩

## License

contributing-gen is released under the [MIT License](https://opensource.org/licenses/MIT).

## Acknowledgment

For the templates we have looked at several open source projects:

- [Ruby on Rails](https://github.com/rails/rails/blob/master/CONTRIBUTING.md)
- [Open Government](https://github.com/opengovernment/opengovernment/blob/master/CONTRIBUTING.md)
- [Atom](https://github.com/atom/atom/blob/master/CONTRIBUTING.md)
- [weallcontribute](https://github.com/WeAllJS/weallcontribute/blob/latest/CONTRIBUTING.md)
- [generate-contributing](https://github.com/generate/generate-contributing/blob/master/templates/contributing.md)
- [contributing-template](https://github.com/nayafia/contributing-template/blob/master/CONTRIBUTING-template.md)
- [idiomatic-contributing](https://github.com/jonschlinkert/idiomatic-contributing)
- [Celery](https://github.com/celery/celery/blob/master/CONTRIBUTING.rst)
- [Ember](https://github.com/emberjs/ember.js/blob/master/CONTRIBUTING.md)
- [Bootstrap](https://github.com/twbs/bootstrap/blob/main/.github/CONTRIBUTING.md)
