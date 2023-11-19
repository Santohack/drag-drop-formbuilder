import React from 'react'
import { Button } from './ui/button'
import { MdSave } from 'react-icons/md'

const SaveFormBtn = () => {
  return (
    <div><Button variant="outline">

    <MdSave />Save
    </Button>

    </div>
  )
}

export default SaveFormBtn