import React from 'react'
import SideNavTopSection from './SideNavTopSection'
import SideNavBottomSection from './SideNavBottomSection'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';


function SideNav() {
    const { user }: any = useKindeBrowserClient();
    return (
        <div className=' h-screen fixed w-72 border-r border-[1px] p-6'>
            <SideNavTopSection user={user} />
            <SideNavBottomSection />
        </div>
    )
}

export default SideNav
