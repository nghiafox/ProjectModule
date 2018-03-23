import * as React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import pnp from "sp-pnp-js";
export default class ProjectModule extends React.Component<any, any > {

  public  nameFormatter(cell, row){
     var imgSrc = `/_layouts/15/images/${row.Type}`;
     return <a href={row.ServerRelativeUrl}><img src={imgSrc} ></img> {cell}</a>;
  }
  public render(): React.ReactElement<object> {
        return(<section>
                 <BootstrapTable data={this.props.data} striped={true} hover={true}>
                    <TableHeaderColumn dataField="UniqueId" isKey={true} hidden={true}  dataSort={true}></TableHeaderColumn>
                    <TableHeaderColumn dataField="Name"  dataSort={true} dataFormat={ this.nameFormatter.bind(this)}>Name</TableHeaderColumn>
                    <TableHeaderColumn dataField="TimeCreated"  dataSort={true} >Created</TableHeaderColumn>
                    
                  </BootstrapTable>
            </section>)
  }
}