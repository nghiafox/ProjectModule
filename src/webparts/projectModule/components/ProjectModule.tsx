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
        this.state = { documents :  [], 
            totalSize: 0,
            page: 1,
            sizePerPage: 10, };
  }
  public onSearch(target){
        debugger;
        this.loadDocument( this.state.page ,  this.state.sizePerPage,target.target.value); 
  }    
  public loadDocument(page = this.state.page , sizePerPage = this.state.sizePerPage, search=""){
      var result=[];
      var that = this;
      page = (page-1)*sizePerPage;
      pnp.sp.web.getFolderByServerRelativeUrl("ProjectDocument").files.filter("substringof('" + search + "',Name)").get().then((items:any[])=>{
                  debugger;
                  that.setState({
                         documents:that.state.documents,
                         totalSize:items.length,
                         page:that.state.page,
                         sizePerPage:that.state.sizePerPage
                  });
                  pnp.sp.web.getFolderByServerRelativeUrl("ProjectDocument").files.skip(page).top(sizePerPage).filter("substringof('" + search + "',Name)").get().then((items: any[])=>{
                  items.forEach(async (item,index) => {
                              pnp.sp.web.mapToIcon(item.Name,16).then(function(data){
                                    item.Type = data;
                                    items[index] = item;
                                    result =items;
                                    that.setState({
                                          documents:result,
                                          totalSize:that.state.totalSize,
                                          page:that.state.page,
                                          sizePerPage:that.state.sizePerPage
                                    });
                              });
                        });                     
                  });

      });
     
  }
  public onPageChange (page, sizePerPage) {
        this.loadDocument(page, sizePerPage); 
  }   
  public sizePerPageListChange  (sizePerPage) {
        this.loadDocument(0, sizePerPage);
  }  
  public  componentDidMount() {
    
        this.loadDocument(this.state.page,this.state.sizePerPage);
  }
  public render(): React.ReactElement<IProjectModuleProps> {
    return (
      <section> 
          <DocumentGridView onSearch={this.onSearch.bind(this)} data={this.state.documents} sizePerPageListChange={this.sizePerPageListChange.bind(this)} page={this.state.page} sizePerPage={this.state.sizePerPage} onPageChange={this.onPageChange.bind(this)} total={this.state.totalSize}/>
          <UploadDocument loadDocument={this.loadDocument.bind(this)} />
      </section>
    );
  }
}
