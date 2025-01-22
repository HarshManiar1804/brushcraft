import React, { useState } from 'react'
import { Archive, Flag } from 'lucide-react';
import { Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

function SideNavBottomSection({ onFileCreate }: any) {
  const menuListForBottomSection = [
    {
      id: 1,
      name: "Getting Started",
      icon: Flag,
      path: ''
    }, {
      id: 2,
      name: "Github",
      icon: Github,
      path: ''
    },
    {
      id: 3,
      name: "Archive",
      icon: Archive,
      path: ''
    }
  ]
  const [newFileName, setNewFileName] = useState('');
  return (
    <div>
      {menuListForBottomSection.map((item, index) => {
        return (
          <h2 className='flex items-center cursor-pointer p-1 px-2 gap-2 hover:bg-gray-200 rounded-lg text-[14px]' key={index}>
            <item.icon className='h-5 w-5' />
            {item.name}</h2>
        )
      })}

      {/* Add new file button */}

      <Dialog>
        <DialogTrigger className='w-full'><Button className='w-full bg-blue-600 hover:bg-blue-800 justify-start mt-3'>New File</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New File</DialogTitle>
            <DialogDescription>
              <Input
                type="text"
                onChange={(e) => { setNewFileName(e.target.value) }}
              />
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="">
            <DialogClose asChild>
              <Button type="button" className='bg-blue-600 hover:bg-blue-800'
                disabled={!(newFileName && newFileName.length > 3)}
                onClick={() => onFileCreate(newFileName)}>
                Create
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Progress Bar */}

      <div className="h-4 w-full bg-gray-200 rounded-full mt-3">

        <div className="h-4 w-[40%] bg-blue-600 rounded-full"></div>
        <h2 className='text-[12px] mt-3'><strong>1</strong> out of 5 Files is used</h2>
        <h2 className='mt-1 text-[12px]'>Upgrade your plan to unlimited access.</h2>
      </div>
    </div>
  )
}

export default SideNavBottomSection
