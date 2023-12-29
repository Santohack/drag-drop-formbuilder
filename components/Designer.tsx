"use client"
import React, { useState } from 'react'
import DesignerSideBar from './DesignerSideBar'
import { useDndMonitor, useDraggable, useDroppable } from '@dnd-kit/core'
import { cn } from '@/lib/utils'
import userDesigner from './hooks/userDesigner'
import { ElementType, FormElementInstance, FormElements } from './FormElements'
import { idGenerator } from '@/lib/idGenerator'
import { Button } from './ui/button'
import { MdDelete } from 'react-icons/md'
const Designer = () => {
  const { elements, addElement, selectedElement, removeElement, setSelectedElement } = userDesigner()
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
      const { active, over } = event
      if (!active || !over) return
      const isDesignerBtnElement = active?.data?.current?.isDesignerBtnElement
      const isDroppingOverDesignerDropArea = over?.data?.current?.isDesignDropArea
      const droppingSidebarBtnOverDesignerDropArea = isDesignerBtnElement && isDroppingOverDesignerDropArea;
      // First scenario
      if (droppingSidebarBtnOverDesignerDropArea) {
        const type = active.data?.current?.type;
        const newElement = FormElements[type as ElementType].construct(idGenerator());

        addElement(elements.length, newElement);
        return;
      }

      const isDroppingOverDesignerElementTopHalf = over.data?.current?.isTopHalfDesignerElement;

      const isDroppingOverDesignerElementBottomHalf = over.data?.current?.isBottomHalfDesignerElement;

      const isDroppingOverDesignerElement =
        isDroppingOverDesignerElementTopHalf || isDroppingOverDesignerElementBottomHalf;

      const droppingSidebarBtnOverDesignerElement = isDesignerBtnElement && isDroppingOverDesignerElement;

      // Second scenario
      if (droppingSidebarBtnOverDesignerElement) {
        const type = active.data?.current?.type;
        const newElement = FormElements[type as ElementType].construct(idGenerator());

        const overId = over.data?.current?.elementId;

        const overElementIndex = elements.findIndex((el) => el.id === overId);
        if (overElementIndex === -1) {
          throw new Error("element not found");
        }

        let indexForNewElement = overElementIndex; // i assume i'm on top-half
        if (isDroppingOverDesignerElementBottomHalf) {
          indexForNewElement = overElementIndex + 1;
        }

        addElement(indexForNewElement, newElement);
        return;
      }

      // Third scenario
      const isDraggingDesignerElement = active.data?.current?.isDesignerElement;

      const draggingDesignerElementOverAnotherDesignerElement =
        isDroppingOverDesignerElement && isDraggingDesignerElement;

      if (draggingDesignerElementOverAnotherDesignerElement) {
        const activeId = active.data?.current?.elementId;
        const overId = over.data?.current?.elementId;

        const activeElementIndex = elements.findIndex((el) => el.id === activeId);

        const overElementIndex = elements.findIndex((el) => el.id === overId);

        if (activeElementIndex === -1 || overElementIndex === -1) {
          throw new Error("element not found");
        }

        const activeElement = { ...elements[activeElementIndex] };
        removeElement(activeId);

        let indexForNewElement = overElementIndex; // i assume i'm on top-half
        if (isDroppingOverDesignerElementBottomHalf) {
          indexForNewElement = overElementIndex + 1;
        }

        addElement(indexForNewElement, activeElement);
      }
    },
  });
  return (
    <div className='w-full flex  h-full'>
      <div className='ok p-4 w-full' onClick={() => { if (selectedElement) setSelectedElement(null) }}>
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
                  <DesignerElementWrapper key={element.id} element={element} />
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



function DesignerElementWrapper({ element }: { element: FormElementInstance }) {
  const { removeElement, selectedElement, setSelectedElement } = userDesigner();

  const [mouseIsOver, setMouseIsOver] = useState<boolean>(false);
  const topHalf = useDroppable({
    id: element.id + "-top",
    data: {
      type: element.type,
      elementId: element.id,
      isTopHalfDesignerElement: true,
    },
  });

  const bottomHalf = useDroppable({
    id: element.id + "-bottom",
    data: {
      type: element.type,
      elementId: element.id,
      isBottomHalfDesignerElement: true,
    },
  });

  const draggable = useDraggable({
    id: element.id + "-drag-handler",
    data: {
      type: element.type,
      elementId: element.id,
      isDesignerElement: true,
    },
  });

  if (draggable.isDragging) return null; // temporary remove the element from designer
  console.log('selectedElement', selectedElement);
  const DesignerElement = FormElements[element.type].designerComponent;
  return (
    <div
      ref={draggable.setNodeRef}
      {...draggable.listeners}
      {...draggable.attributes}
      className=" h-[120px] flex flex-col text-foreground hover:cursor-pointer rounded-md ring-1 ring-accent ring-inset"
      onMouseEnter={() => {
        setMouseIsOver(true);
      }}
      onMouseLeave={() => {
        setMouseIsOver(false);
      }}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedElement(element);
      }}

    >
      <div ref={topHalf.setNodeRef} className=" w-full h-1/2 rounded-t-md" />
      <div ref={bottomHalf.setNodeRef} className="  w-full bottom-0 h-1/2 rounded-b-md" />
      {mouseIsOver && (
        <>
          <div className=" right-0 h-full">
            <Button
              className="flex justify-center h-full border rounded-md rounded-l-none bg-red-500"
              variant={"outline"}
              onClick={(e) => {
                e.stopPropagation(); // avoid selection of element while deleting
                removeElement(element.id);
              }}
            >
              <MdDelete className="h-6 w-6" />
            </Button>
          </div>
          <div className=" top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse">
            <p className="text-muted-foreground text-sm">Click for properties or drag to move</p>
          </div>
        </>
      )}
      {topHalf.isOver && <div className=" top-0 w-full rounded-md h-[7px] bg-primary rounded-b-none" />}
      <div
        className={cn(
          "flex w-full h-[120px] items-center rounded-md bg-accent/40 px-4 py-2 pointer-events-none opacity-100",
          mouseIsOver && "opacity-30",
        )}
      >
        <DesignerElement elementInstance={element} />
      </div>
      {bottomHalf.isOver && <div className=" bottom-0 w-full rounded-md h-[7px] bg-primary rounded-t-none" />}
    </div>
  );
}
export default Designer

