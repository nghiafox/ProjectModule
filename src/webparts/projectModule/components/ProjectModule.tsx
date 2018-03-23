import * as React from 'react';
import styles from './ProjectModule.module.scss';
import { IProjectModuleProps } from './IProjectModuleProps';
import { escape } from '@microsoft/sp-lodash-subset';
import DocumentGridView from './DocumentGridView';
import UploadDocument from './UploadDocument';
import pnp from "sp-pnp-js";
export default class ProjectModule extends React.Component<IProjectModuleProps, any> {
  constructor(props: any){  
        super(props);
        this.state = { documents :  [] };
  }
  public loadDocument(){
        var result=[];
        var that = this;
        pnp.sp.web.getFolderByServerRelativeUrl("ProjectDocument").files.get().then((items: any[])=>{
                // pnp.sp.web.mapToIcon()
                items.forEach(async (item,index) => {
                        pnp.sp.web.mapToIcon(item.Name,16).then(function(data){
                                item.Type = data;
                                items[index] = item;
                                result =items;
                                that.setState({documents:result});
                          });
                  });                     
        });
  }
  public  componentDidMount() {
    
        this.loadDocument();
  }
  public render(): React.ReactElement<IProjectModuleProps> {
    return (
      <section> 
          <DocumentGridView data={this.state.documents} />
          <UploadDocument loadDocument={this.loadDocument.bind(this)} />
      </section>
    );
  }
}
