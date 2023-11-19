import { Active, DragOverlay, useDndMonitor } from '@dnd-kit/core'
import React from 'react'
import { ElementType, FormElements } from './FormElements'
import { SidebarBtnElementDragOverlay } from './SidebarBtnElement'

const DragOverlayWrapper = () => {
    const [draggableItem, setDraggableItem] = React.useState<Active | null>(null)
    useDndMonitor({
        onDragStart: (event) => { console.log('onDragStart', event); setDraggableItem(event.active) },
        onDragCancel(event) {
            console.log('onDragCancel', event)
            setDraggableItem(null)
        },
        onDragOver: (event) => { console.log('onDragOver', event); setDraggableItem(event.active) },
        onDragEnd: (event) => { console.log('onDragEnd', event); setDraggableItem(null) },
    })
    let node = <div>No drag</div>
    if (!draggableItem) return null;
    const isSidebarBtnElement = draggableItem?.data?.current?.isDesignerBtnElement;
    if (isSidebarBtnElement) {
        const type = draggableItem?.data?.current?.type as ElementType;
        node = <SidebarBtnElementDragOverlay formElement={FormElements[type]} />
    }
    return (
        <DragOverlay>{node}</DragOverlay>
    )
}

export default DragOverlayWrapper