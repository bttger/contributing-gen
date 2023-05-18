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
    defaultBranch: string;
    repoUrl: string;
    docsUrl: string;
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
  