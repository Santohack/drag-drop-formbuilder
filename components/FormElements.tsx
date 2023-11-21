"use client"
import React from "react";
import { TextFieldFormElement } from "./fields/TextField";
import { TitleFieldFormElement } from "./fields/TitleField";
import { SubTitleFieldFormElement } from "./fields/SubTitleField";
import { ParagraphFieldFormElement } from "./fields/ParagraphField";

export type ElementType = "TextField" | "TitleField" | "SubTitleField" | "ParagraphField" 
export type FormElement = {
    construct:(id:string)=>FormElementInstance;
    type:ElementType;
    designerBtnElelemnt:{
        icon:React.ElementType;
        label:string

    }
    designerComponent: React.FC<{
        elementInstance:FormElementInstance
    }>;
    formComponent:React.FC <{
        elementInstance:FormElementInstance
    }>;
    propertiesComponents:React.FC <{
        elementInstance:FormElementInstance
    }>;

}
export type FormElementInstance = {
    id:string;
    type:ElementType;
    extraAttributes?:Record<string,any>
}
type FormElementType = {
    [key in ElementType] :FormElement
}
export const FormElements:FormElementType={
    TextField:TextFieldFormElement,
    TitleField:TitleFieldFormElement,
    SubTitleField:SubTitleFieldFormElement,
    ParagraphField:ParagraphFieldFormElement
}