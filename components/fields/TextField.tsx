"use client"

import { MdTextFields } from "react-icons/md"
import { ElementType, FormElement, FormElementInstance } from "../FormElements"
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import userDesigner from "../hooks/userDesigner";
import { Switch } from "../ui/switch";

const type:ElementType ="TextField";
const extraAttributes={
    label:"Text Field",
    placeholder:"Enter text",
    helperText:"Helper text",
    required:false
}
 const propertiesSchema= z.object({
    label:z.string(),
    placeholder:z.string(),
    helperText:z.string(),
    required:z.boolean().default(false) 
 })
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
    formComponent:FormComponent,
    propertiesComponents: PropertiesComponent
}
type customInstance = FormElementInstance & {
    extraAttributes: typeof extraAttributes;
}
type propertiesSchemaTpye = z.infer<typeof propertiesSchema>
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
function FormComponent({elementInstance}: {elementInstance:FormElementInstance}) {
  const element = elementInstance as customInstance;
  const { label, required,placeholder, helperText} = element.extraAttributes
return <div className="flex flex-col gap-2 items-center">
  <Label>
      {label}
      {required && "*"}
  </Label>
  <Input  placeholder={placeholder} />
  {helperText && <p className="text-muted-foreground text-sm">{helperText}</p>}
</div>
}
function PropertiesComponent({elementInstance}: {elementInstance:FormElementInstance}) {
    const { updateElement } = userDesigner();
    const element = elementInstance as customInstance;
    const form = useForm<propertiesSchemaTpye>({
        resolver: zodResolver(propertiesSchema),
        mode: "onBlur",
        defaultValues: {
          label: element.extraAttributes.label,
          helperText: element.extraAttributes.helperText,
          required: element.extraAttributes.required,
          placeholder: element.extraAttributes.placeholder,
        },
      });
    
      useEffect(() => {
        form.reset(element.extraAttributes);
      }, [element, form]);
      function applyChanges(values: propertiesSchemaTpye) {
        const { label, helperText, placeholder, required } = values;
        updateElement(element.id, {
          ...element,
          extraAttributes: {
            label,
            helperText,
            placeholder,
            required,
          },
        });
      }
    return (
        <>
        <Form {...form} >
        <form
        onBlur={form.handleSubmit(applyChanges)}
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="space-y-3"
      >
        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
                  }}
                />
              </FormControl>
              <FormDescription>
                The label of the field. <br /> It will be displayed above the field
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
        control={form.control}
        name="placeholder"
        render={({ field }) => (
            
          <FormItem>
            <FormLabel>Placeholder</FormLabel>
            <FormControl>
              <Input
                {...field}
                onKeyDown={(e) => {
                  if (e.key === "Enter") e.currentTarget.blur();
                }}
              />
            </FormControl>
            <FormDescription>
              The placeholder of the field. <br /> It will be displayed when the field is empty
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
<FormField
        control={form.control}
        name="helperText"
        render={({ field }) => (
            
          <FormItem>
            <FormLabel>HelperText</FormLabel>
            <FormControl>
              <Input
                {...field}
                onKeyDown={(e) => {
                  if (e.key === "Enter") e.currentTarget.blur();
                }}
              />
            </FormControl>
            <FormDescription>
              The placeholder of the HelperText. <br /> It will be displayed when the field is empty
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
   <FormField
          control={form.control}
          name="required"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel>Required</FormLabel>
                <FormDescription>
                  The helper text of the field. <br />
                  It will be displayed below the field.
                </FormDescription>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </form>

        </Form>
        </>
    )
    
}
