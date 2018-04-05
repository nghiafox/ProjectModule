import { IWebPartContext } from '@microsoft/sp-webpart-base';
interface IProjectModuleProvider {
    webPartContext: IWebPartContext;
    getFoldersDocumentSetByListName(listName:string);
    getFoldersDocumentSetByRootFolder(rootFolder: string);
    getRootFolderById(listName:string,itemid:number);
    getItemsByListName(listName: string, columns:string);
}

export default IProjectModuleProvider;