import {
    SPHttpClient,
    SPHttpClientBatch,
    SPHttpClientResponse
} from '@microsoft/sp-http';
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import IProjectModuleProvider from '../dataprovider/IProjectModuleProvider';
import pnp from 'sp-pnp-js';
import * as $ from 'jquery';
export default class ProjectModuleProvider implements IProjectModuleProvider {

    public _webPartContext: IWebPartContext;

    public set webPartContext(value: IWebPartContext) {
        this._webPartContext = value;
    }


    /**
     * get getFolders*/
    public getFoldersDocumentSetByListName(listName:string) {
        var d = $.Deferred();
        pnp.sp.web.folders.getByName(listName).folders.get().then(function (item) {
            d.resolve(item);
        }).catch(function (data) {
            return d.reject(data);
        });
        return d.promise();
    }
    public getFoldersDocumentSetByRootFolder(rootFolder: string) {
        var d = $.Deferred();
        pnp.sp.web.getFolderByServerRelativeUrl(rootFolder).expand('Folders,Folders/Folders,Folders/Folders/Folders,Folders/Folders/Folders/Folders').get().then(function (item) {
            d.resolve(item);
        }).catch(function (data) {
            return d.reject(data);
        });
        return d.promise();
    }
    /** getRootFolderById 
     * listName: List Title,
     * itemid: item id
    */
    public getRootFolderById(listName:string,itemid: number) {
        var d = $.Deferred();
        pnp.sp.web.lists.getByTitle(listName).items.getById(itemid).get().then(function (item) {
            d.resolve(item.ServerRelativeUrl);
        }).catch(function (data) {
            return d.reject(data);
        });
        return d.promise();
    }
    /** getItemsByListName
     * listname: List Title
     * column: all columns name Ex: "Id,Title"
     */
    public getItemsByListName(listName: string,columns:string) {
        var d = $.Deferred();
        pnp.sp.web.lists.getByTitle(listName).items.select(columns).get().then(function (items) {
            d.resolve(items);
        });
        return d.promise();
    }
}