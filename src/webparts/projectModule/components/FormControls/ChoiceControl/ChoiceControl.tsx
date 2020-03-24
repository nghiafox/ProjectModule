import * as React from 'react';
import ChoiceControlProps from './ChoiceControlProps';
import {  Dropdown ,Fabric ,IDropdownOption } from 'office-ui-fabric-react';
export default class ChoiceControl extends React.Component<ChoiceControlProps, any> {
    private choices : any[]
    private defaultSelectedKey : any;
    private defaultIndex:number;
    constructor(props){
        super(props)
        this.choices = this.props.choices.map((obj,index)=>{
            return{
                key : obj,
                text: obj
            }
        })
        this.defaultIndex=1;
   
    }

    render(){
        return(
            <Fabric>
                <Dropdown
                    label={this.props.label}
                    options={this.props.choices}
                    required={this.props.isRequired}
                    onChanged={this.onChange.bind(this)}
                />

            </Fabric>
        )
    }
    private onChange(option: IDropdownOption, index?: number){
        this.props.onChange(option.key,this.props.internalName);
    }

    
}