import { Button } from '@/components/ui/button';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { Search, Send } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

function Header() {
    const { user }: any = useKindeBrowserClient();
    return (
        <div className='flex justify-end w-full gap-2 items-center'>
            <div className="flex gap-2 items-center border rounded-md p-1">
                <Search className="w-4 h-4 " />
                <input type="text" placeholder="Search " className="" />
            </div>
            <div className="">
                {user &&
                    <Image src={user?.picture} alt="user" width={30} height={30} className="rounded-full" />}
            </div>
            <Button className='flex gap-2 h-8 bg-blue-600 text-sm hover:bg-blue-800 cursor-pointer'><Send className='h-4 w-4' /> Invite</Button>
        </div>
    )
}

export default Header
