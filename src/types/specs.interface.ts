export interface Specs {
  project: Project;
  contributing: Contributing;
  codeOfConduct: CodeOfConduct;
  license: License;
  readme: Readme;
}

export interface Project {
  organizationName: string;
  name: string;
  slug: string;
  repositorySlug: string;
  defaultBranch: string;
  repoUrl: string;
  docsUrl: string;
  monorepo: boolean;
}

export interface Contributing {
  generate: boolean;
  emailSensitiveBugs: string;
}

export interface CodeOfConduct {
  generate: boolean;
}

export interface License {
  generate: boolean;
}

export interface Readme {
  generate: boolean;
  supportEmail: string;
}
