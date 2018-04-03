import * as React from 'react';
import ProjectModuleProvider from '../dataprovider/ProjectModuleProvider';

export default class TreeView extends React.Component<any, any > {
  
  private dataProvider;
  private DOMElement;
  constructor(){
    super();
    this.dataProvider=new ProjectModuleProvider();
    this.DOMElement=null;
    var uls:HTMLUListElement;
  
    this.state = { hideClass:"upt_nav_item_hide",DOMElement:uls}
  }

  private loadFolders(){
    var result = [];
    var that = this;
    that.dataProvider.getFoldersDocumentSetByRootFolder("/sites/dev/Projects/test Nghia").done((item: any[]) => {

      this.DOMElement= this.render_Folder(item, "/sites/dev/Projects/test Nghia", false);
        //this.setState({ dataSource: [], DOMElement: ul});
    });
  }

  private render_Folder(dataSource: any, currentPath:string, isExpand:boolean){

    //var uls = $("<ul/>", { class: "upt_nav_item_hide" });
    let ulElement=  new HTMLUListElement ();
    ulElement.setAttribute("className",this.state.hideClass);

    if (isExpand == true) {
     this.setState({hideClass:""});
    }
    for(let obj of dataSource){
      let liChild:HTMLLIElement;
      liChild.setAttribute("className","upt_nav_item");

      let img:HTMLImageElement;
      img.setAttribute("src","/_layouts/15/images/folder.gif?rev=40");

      let span=new HTMLSpanElement();
      span.setAttribute("id", obj.UniqueId);
      span.setAttribute("folder-url",  obj.ServerRelativeUrl);
      span.setAttribute("expand", "false");
      span.setAttribute("style", "cursor:pointer");
      span.onclick=(()=>{
        this.expandClick();
      });

      liChild.appendChild(img);
      liChild.appendChild(span);
      
      ulElement.appendChild(liChild);
      if (obj.Folders !== undefined) {
        if (obj.Folders.length > 0) {
          liChild.appendChild(this.renderChild_Folder(obj.Folders, currentPath, true));
        }
      }
    }
    return ulElement;
  }

 private renderChild_Folder(dataSource, currentPath, isExpand) {
    let ulElement: HTMLUListElement;
    ulElement.setAttribute("className", this.state.hideClass);
    if (isExpand == true) {
      this.setState({ hideClass: "" });
    }
    for (let obj of dataSource) {
      let liChild: HTMLLIElement;
      liChild.setAttribute("className", "upt_nav_item");

      let img: HTMLImageElement;
      img.setAttribute("src", "/_layouts/15/images/folder.gif?rev=40");

      let span = new HTMLSpanElement();
      span.setAttribute("id", obj.UniqueId);
      span.setAttribute("folder-url", obj.ServerRelativeUrl);
      span.setAttribute("expand", "false");
      span.setAttribute("style", "cursor:pointer");
      span.onclick = (() => {
        this.expandClick();
      });

      liChild.appendChild(img);
      liChild.appendChild(span);


      ulElement.appendChild(liChild);
      if (obj.Folders !== undefined) {
        if (obj.Folders.length > 0) {
          liChild.appendChild(this.renderChild_Folder(obj.Folders, currentPath, true));
        }
      }
      ulElement.appendChild(liChild);
    }
    return ulElement;
}
  
  /**
   * getFolders
"Projects"   */
 private expandClick(){
    alert("expandClick !");
  }

  

  public componentDidMount() {

   this.loadFolders();
  }
  public render(): React.ReactElement<any>{
 
    var html=this.DOMElement;
     if(html==null)
     {
          html=React.createElement("ul");
     }
    return (<section>{html}</section>);
  }
}