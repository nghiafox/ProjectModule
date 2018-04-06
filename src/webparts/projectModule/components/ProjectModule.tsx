import * as React from 'react';
import styles from './ProjectModule.module.scss';
import ProjectModuleProvider from '../dataprovider/ProjectModuleProvider';
import { IProjectModuleProps } from './IProjectModuleProps';
import { escape } from '@microsoft/sp-lodash-subset';
import DocumentGridView from './DocumentGridView';
import UploadDocument from './UploadDocument';
import TreeView from "./TreeView/TreeView";
import ChoiceControl from "./FormControls/ChoiceControl/ChoiceControl";
import pnp from "sp-pnp-js";
export default class ProjectModule extends React.Component<IProjectModuleProps, any> {
      private dataProvider:any;
      private listNameProjects:string;
      constructor(props: any){  
            super(props);
            this.listNameProjects="Projects";
            this.state = { documents :  [] ,treeData:"",listProject:[]};
            this.dataProvider = new ProjectModuleProvider();
      }
      public loadDocument(path:string){
            
            var result=[];
            var that = this;
            pnp.sp.web.lists.getByTitle("ProjectDocument").items.get().then((items: any[])=>{
                  // pnp.sp.web.mapToIcon()
                  that.setState({ documents: [] });
                  if(items.length>0){
                  items.forEach(async (item,index) => {
                              pnp.sp.web.mapToIcon(item.Name,16).then(function(data){
                                    item.Type = data;
                                    items[index] = item;
                                    result =items;
                                    that.setState({documents:result});
                              });
                        });          
                  }           
            });
      }

      loadFolders(path:string) {
            var result = [];
            var that = this;
            pnp.sp.web.getFolderByServerRelativeUrl(path).expand('Folders,Folders/Folders,Folders/Folders/Folders,Folders/Folders/Folders/Folders').get().then((item:any)=>{
                  that.setState({ treeData: { name: item.Name, path: item.ServerRelativeUrl, toggled: false, children: that.render_structure(item.Folders) } });

            });
      }
      load_Project(){
            var that =this;

            pnp.sp.web.getFolderByServerRelativeUrl("/sites/dev/Projects").folders.get().then((items: any[]) => {
                  
                  var result = [];
                  if (items.length > 0) {
                        items.forEach(async (item, index) => {
                              if(item.Name!=="Forms"){
                                    result.push({ key: item.ServerRelativeUrl, text: item.Name });
                              }
                        });
                  }
                  that.setState({ listProject: result });
            });
      }

      render_structure(folders:any){
            var that =this;
            var result=[];
            if(folders!==undefined){
            if(folders.length>0){
                  folders.forEach(async (item, index) => {
                        var obj = { name: item.Name, path: item.ServerRelativeUrl, toggled: true, children:[]};
                        if(item.Folders!==undefined){
                              
                              obj.children = that.render_structure(item.Folders)
                        }
                        result.push(obj);
                  });    
                  }
            }
            return result;
      }

      public  componentDidMount() {
            this.load_Project();
           
            //this.loadDocument();
            
      }

      public render(): React.ReactElement<IProjectModuleProps> {
            return (
                  <section> 
                        <ChoiceControl internalName={""} onChange={this.onChangeListProject.bind(this)} ref={"listprojects"} value="" label={"Projects: "} isRequired={true} choices={this.state.listProject} />
                   <TreeView data={this.state.treeData} onItemClick={this.onItemClick.bind(this)}/>
                  <DocumentGridView data={this.state.documents} />
                  <UploadDocument loadDocument={this.loadDocument.bind(this)} />
                  </section>
            );
      }

      private onItemClick(path){
            this.loadDocument(path);
      }

      private onChangeListProject(path: any, internalName: string) {
            this.loadFolders(path);
      }
}
