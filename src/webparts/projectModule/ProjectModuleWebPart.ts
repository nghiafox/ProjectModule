import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'projectModuleStrings';
import ProjectModule from './components/ProjectModule';
import { IProjectModuleProps } from './components/IProjectModuleProps';
import { IProjectModuleWebPartProps } from './IProjectModuleWebPartProps';
import { SPComponentLoader } from '@microsoft/sp-loader';
export default class ProjectModuleWebPart extends BaseClientSideWebPart<IProjectModuleWebPartProps> {
   protected onInit(): Promise<void>{
  
     SPComponentLoader.loadCss("https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css");
     SPComponentLoader.loadCss('https://cdnjs.cloudflare.com/ajax/libs/react-bootstrap-table/4.3.1/react-bootstrap-table.min.css');
     return super.onInit();
  }
  public render(): void {
    const element: React.ReactElement<IProjectModuleProps > = React.createElement(
      ProjectModule,
      {
        description: this.properties.description
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
