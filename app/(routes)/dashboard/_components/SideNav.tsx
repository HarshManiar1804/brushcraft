import React from 'react'
import SideNavTopSection from './SideNavTopSection'
import SideNavBottomSection from './SideNavBottomSection'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
function SideNav() {
    const { user }: any = useKindeBrowserClient();
    const onFileCreate = (newFileName: string) => {
        console.log("new file name is here", newFileName);
    }
    return (
        <div className=' h-screen fixed w-72 border-r border-[1px] p-6 flex flex-col'>
            <div className="flex-1">
                <SideNavTopSection user={user} />
            </div>
            <div className="mb-16">
                <SideNavBottomSection onFileCreate={onFileCreate} />
            </div>
        </div>
    )
}

export default SideNav
