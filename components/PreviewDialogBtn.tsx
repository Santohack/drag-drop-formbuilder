import React from 'react'
import { MdPreview } from "react-icons/md";
import { Button } from './ui/button';
import userDesigner from './hooks/userDesigner';
const PreviewDialogBtn = () => {
  const {elements} = userDesigner()
  return (
    <div><Button variant="outline">
        
        <MdPreview />Preview</Button></div>
  )
}

export default PreviewDialogBtn