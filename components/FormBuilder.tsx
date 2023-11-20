"use client"
import React, { useEffect } from 'react';

import PreviewDialogBtn from "./PreviewDialogBtn";
import PublishFormBtn from "./PublishFormBtn";
import SaveFormBtn from "./SaveFormBtn";
import Designer from './Designer';
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import DragOverlayWrapper from './DragOverlayWrapper';
import { Form } from '@/action/form';
import userDesigner from './hooks/userDesigner';

const FormBuilder = ({ form }: { form: Form }) => {
    const {setElements} = userDesigner()
    const mouseSenser = useSensor(MouseSensor, {
        activationConstraint: {
            distance: 10
        }
    });
   
    const touchSenser = useSensor(TouchSensor, {
        activationConstraint: {
            delay: 300,
            tolerance: 5
        }
    })
    const sensors = useSensors(mouseSenser, touchSenser);
    // useEffect(() => {
    //     if (form.content && typeof form.content === 'string') {
    //         try {
    //             const element = JSON.parse(form.content);
    //             setElements(element);
    //         } catch (error) {
    //             console.error("Error parsing form content:", error);
    //             // Handle the error appropriately
    //         }f
    //     }
    //     console.log(form);
    // }, [form, setElements]);
    return (
        <DndContext sensors={sensors}>


            <main className="flex w-full  flex-col ">
                <nav className="flex justify-between items-center ">
                    <h2 className=" font-bold">Drag and Drop</h2>
                    <div className="flex gap-2 items-center">
                        <PreviewDialogBtn />
                       {/* {!form.published && (
                         <><SaveFormBtn id={form.id} /><PublishFormBtn id={form.id} /></>
                       )} */}
                    </div>
                </nav>
                <div className='w-full flex flex-grow items-center justify-center relative overflow-y-auto h-[200px] bg-accent bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)]'>
                    <Designer />
                </div>
            </main>
            <DragOverlayWrapper />
        </DndContext>
    );
}

export default FormBuilder;
