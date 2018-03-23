declare interface IProjectModuleStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'projectModuleStrings' {
  const strings: IProjectModuleStrings;
  export = strings;
}
