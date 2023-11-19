"use client"
import React, { useContext } from 'react'

import { DesignerContext } from '../context/DesignerContext'

const userDesigner = () => {
    const context = useContext(DesignerContext)
    if(!context) {
        throw new Error("useDesigner should be used within <Designer>")
    }
  return context
}

export default userDesigner