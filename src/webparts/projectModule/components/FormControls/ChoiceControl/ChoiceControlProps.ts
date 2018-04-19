interface ChoiceControlProps{
    value : string;
    label : string;
    choices : any[];
    isRequired : boolean;
    internalName : string;
    onChange : (value :any,internalName : string)=>void;
}
export default ChoiceControlProps;