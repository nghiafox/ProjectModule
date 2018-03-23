import * as React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { ConsoleListener, Web, Logger, LogLevel, ODataRaw } from "sp-pnp-js";
import pnp from "sp-pnp-js";
var ReactDOMServer = require('react-dom/server');
import {DropzoneComponent} from 'react-dropzone-component';
require('react-dropzone-component/styles/filepicker.css');
require('dropzone/dist/min/dropzone.min.css');
export default class UploadDocument extends React.Component<any, any > {
    uploadFile(file) {
       let web = pnp.sp.web;
       var that= this;
       web.getFolderByServerRelativeUrl("/sites/dev/ProjectDocument/").files.add(file.name, file, true).then(f => {
            f.file.getItem().then(item => {
                item.update({
                    TemplateFolder: "TemplateFolder",
                }).then(function(){
                        that.props.loadDocument();
                        //change progress finish
                         var progressElement = file.previewElement.querySelector('[data-dz-uploadprogress]');
                         progressElement.style.width = '100%';
                });
            });
        });

    
    }
    public render(): React.ReactElement<object> {
        var that = this;
        var componentConfig = {
      
                showFiletypeIcon: true,
                postUrl: 'no-url' 
        };
        var djsConfig = { autoProcessQueue: false }
        var eventHandlers = {

             addedfile: function (file) {
                    that.uploadFile.bind(that)(file);
                  
             }
            
        }
        return(
            <section style={{marginTop:'20px'}}>
                <DropzoneComponent  config={componentConfig} 
                   eventHandlers={eventHandlers}
                  djsConfig={djsConfig} 
                  />
            </section>
         )
    }
}