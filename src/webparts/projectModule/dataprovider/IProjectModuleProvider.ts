import { IWebPartContext } from '@microsoft/sp-webpart-base';
<<<<<<< HEAD
=======

>>>>>>> c0da373cb66caf33cbc3c06064942ec8ddda8a13
interface IProjectModuleProvider {
    webPartContext: IWebPartContext;
    getFoldersDocumentSetByListName(listName:string);
    getFoldersDocumentSetByRootFolder(rootFolder: string);
    getRootFolderById(listName:string,itemid:number);
    getItemsByListName(listName: string, columns:string);
}

export default IProjectModuleProvider;