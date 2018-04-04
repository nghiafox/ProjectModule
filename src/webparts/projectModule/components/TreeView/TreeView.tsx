import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Treebeard } from 'react-treebeard';
import ProjectModuleProvider from '../../dataprovider/ProjectModuleProvider';
import ITreeViewProps from "./ITreeViewProps";
import { TreeList } from 'react-treeview-mui'
export default class TreeView extends React.Component<ITreeViewProps, any > {
  
  constructor(){
    super();
    this.state = {};
        this.onToggle = this.onToggle.bind(this);
  }

  onToggle(node, toggled) {
    if (this.state.cursor) { this.state.cursor.active = false; }
    node.active = true;
    if (node.children) { node.toggled = toggled; }
    this.setState({ cursor: node });
    this.props.onItemClick(node.path);
  }
  public render(): JSX.Element{
   

    

    return (<Treebeard
      data={this.props.data}
      onToggle={this.onToggle}
    />);
  }
  // private render_html(root) {
  //   if (root.Folders) {
  //     return (
  //       <div>
  //         <img src="/_layouts/15/images/folder.gif?rev=40" /><span data-path={root.ServerRelativeUrl} onClick={this.props.onItemClick}>{root.Name}</span>
  //         <ul>
  //           {root.Folders.map(c => (<li key={c.UniqueId} data-path={c.ServerRelativeUrl} onClick={this.props.onItemClick}>{this.render_html(c)} </li>))}
  //         </ul>
  //       </div>
  //     );
  //   }
  //   else {
  //     return <a href={root.ServerRelativeUrl}> {root.Name} </a>;
  //   }
  // }
  

}