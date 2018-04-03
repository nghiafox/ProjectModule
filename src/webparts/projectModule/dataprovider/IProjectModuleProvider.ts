import { IWebPartContext } from '@microsoft/sp-webpart-base';
import ITreeView from '../model/ITreeView';
interface IProjectModuleProvider {
    webPartContext: IWebPartContext;
    getFoldersDocumentSetByListName(listName:string);
    getFoldersDocumentSetByRootFolder(rootFolder: string);
    getRootFolderById(listName:string,itemid:number);
    getItemsByListName(listName: string, columns:string);
}

export default IProjectModuleProvider;