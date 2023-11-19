"use client"
import React from 'react'
import DesignerSideBar from './DesignerSideBar'
import { useDndMonitor, useDroppable } from '@dnd-kit/core'
import { cn } from '@/lib/utils'
import userDesigner from './hooks/userDesigner'
import { ElementType, FormElementInstance, FormElements } from './FormElements'
import { idGenerator } from '@/lib/idGenerator'
import { Button } from './ui/button'
import { MdDelete } from 'react-icons/md'
const Designer = () => {
    const {elements, addElement} = userDesigner()
    const droppable = useDroppable({
        id: 'droppable',
        data: {
            isDesignDropArea: true,
        }

    })
    console.log('elements', elements);
    useDndMonitor({
        onDragEnd(event) {
            console.log('onDragEnd', event)
            const {active, over} = event
            if(!active || !over) return
        const isDesignerBtnElement = active?.data?.current?.isDesignerBtnElement
            if(isDesignerBtnElement) {
                const type = active?.data?.current?.type as ElementType;
                const newElement = FormElements[type as ElementType].construct(
                    idGenerator()
                );
                addElement(0,newElement);
                console.log('newElement', newElement);
                
            }
        },
    })
    return (
        <div className='w-full flex  h-full'>
            <div className='p-4 w-full'>
                <div
                    ref={droppable.setNodeRef}
                    className={cn('bg-background  max-w-[800px] h-full m-auto rounded-xl flex flex-col items-center flex-grow overflow-y-auto',
                        droppable.isOver && 'ring-2 ring-primary')}>
                    {!droppable.isOver && elements.length === 0 && <p className='text-2xl teex-muted-foreground flex items-center justify-center'>
                        drop here
                    </p>}
                    {droppable.isOver && <div className='p-4 w-full'>
                        <div className='h-[80px] rounded-md bg-primary/10 '>

                        </div>
                    </div>}
                    {
                        elements.length > 0 && (
                            <div className='flex flex-col  w-full gap-2 text-bac'>
                                {elements.map((element, index) => (
                                   <DesignerElementWrapper key={element.id}  element={element} />
                                ))}
                            </div>
                        )
                    }
                </div>
            </div>
            <DesignerSideBar />
        </div>
    )
}

function DesignerElementWrapper({  element }: {element: FormElementInstance }) {
    const { removeElement } = userDesigner();
    const [mouseOver, setMouseOver] = React.useState(false);
    const topHalf = useDroppable({
        
        id:element.id+'-top',
       data: {
            type:element.type,
            elementId:element.id,
            isTopHalfDesignerElement:true

        }
    })
    const bottomHalf = useDroppable({
        
        id:element.id+'-bottom',
       data: {
            type:element.type,
            elementId:element.id,
            isBottomHalfDesignerElement:true

        }
    })
    const DesignerElement = FormElements[element.type ].designerComponent;
    return (
        <div 
        onMouseEnter={() => {setMouseOver(true); console.log('onMouseEnter')}}
        onMouseLeave={() => {setMouseOver(false); console.log('onMouseLeave')}}
        className='w-full flex items-center rounted bg-primary/10'        
        > <div 
        ref={topHalf.setNodeRef}
        />
        <div ref={bottomHalf.setNodeRef} />
        {mouseOver && (
  <><div className='absolute pr-7  right-1/2 m-auto ml-4 -translate-x-1/2 -translate-y-1/2 animate-pulse'>
                    <Button variant="outline" onClick={() => removeElement(element.id)}>
                        <MdDelete />Delete
                    </Button>
                </div><div className='absolute justify-center left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse top-inherit'>

                        <p className='text-muted-foreground text-sm top-inherit'>click for properties</p>

                    </div></>
        )}
        <div className='w-full flex items-center rounted bg-primary/10'>
        <DesignerElement elementInstance={element} />
        </div>
        </div>
    )
}
export default Designer

