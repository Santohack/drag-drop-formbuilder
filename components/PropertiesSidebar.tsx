import React from 'react'
import userDesigner from './hooks/userDesigner'
import { FormElements } from './FormElements'
import { Button } from './ui/button'

const PropertiesSidebar = () => {
    const {selectedElement, setSelectedElement} = userDesigner()
    if(!selectedElement) return null
    const PropertiesForm = FormElements[selectedElement?.type].propertiesComponents
  return (
    <div className='flex flex-col p-4'>
      <div className='flex justify-between items-center'>
        <p className='text-sm text-muted'> Element properties</p>
        <Button onClick={() => setSelectedElement(null)}>
          <p>Close</p>
        </Button>

      </div>
      <PropertiesForm  elementInstance={selectedElement}/>
    </div>
  )
}

export default PropertiesSidebar