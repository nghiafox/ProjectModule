import * as React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import pnp from "sp-pnp-js";
export default class ProjectModule extends React.Component<any, any > {
  constructor(props: any){  
        super(props);

  }
  public dragStart(event){
       event.dataTransfer.setData("Id", event.target.id);
  }     
  public  nameFormatter(cell, row){
     var imgSrc = `/_layouts/15/images/${row.Type}`;
     return <a onDragStart={(e)=>this.dragStart(e)} id={cell}  draggable={true} href={row.ServerRelativeUrl}><img src={imgSrc} ></img> {cell}</a>;
  }
  public render(): React.ReactElement<object> {
       const options = {
            onPageChange: this.props.onPageChange,
            page: this.props.page,
            sizePerPage: this.props.sizePerPage,
            onSizePerPageList: this.props.sizePerPageListChange,
        };
        return(<section>
                  <div className="form-group col-xs-6 pull-right">
                      <input className="form-control" type="text" placeholder="Type your keywords" onChange={(e)=>{this.props.onSearch(e.target)}} />
                  </div>
                 <BootstrapTable 
                     data={this.props.data} 
                     striped={true} hover={true}   
                     fetchInfo={{ dataTotalSize: this.props.total} }  
                     options={options}
                     remote
                     pagination>
                    <TableHeaderColumn dataField="UniqueId" isKey={true} hidden={true}  dataSort={true}></TableHeaderColumn>
                    <TableHeaderColumn dataField="Name"  dataSort={true} dataFormat={ this.nameFormatter.bind(this)}>Name</TableHeaderColumn>
                    <TableHeaderColumn dataField="TimeCreated"  dataSort={true} >Created</TableHeaderColumn>
                    
                  </BootstrapTable>
            </section>)
  }
}