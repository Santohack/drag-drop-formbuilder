"use client"

import { MdTextFields } from "react-icons/md"
import { ElementType, FormElement, FormElementInstance } from "../FormElements"
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const type:ElementType ="TextField";
const extraAttributes={
    label:"Text Field",
    placeholder:"Enter text",
    helperText:"Helper text",
    required:false
}
export const TextFieldFormElement:FormElement = {
    type,
    construct: (id:string) => ({
        id,
        type,
        extraAttributes
    }),
    designerBtnElelemnt:{
      
        icon:MdTextFields,
        label:"Text Field",
    },
    designerComponent: DesignerComponent,
    formComponent: () => <div>form component</div>,
    propertiesComponents: () => <div>properties components</div>
}
type customInstance = FormElementInstance & {
    extraAttributes: typeof extraAttributes;
}
function DesignerComponent({elementInstance}: {elementInstance:FormElementInstance}) {
    const element = elementInstance as customInstance;
    const { label, required,placeholder, helperText} = element.extraAttributes
  return <div className="flex flex-col gap-2 items-center">
    <Label>
        {label}
        {required && "*"}
    </Label>
    <Input readOnly disabled placeholder={placeholder} />
    {helperText && <p className="text-muted-foreground text-sm">{helperText}</p>}
  </div>
}