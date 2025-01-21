import React from 'react'
import SideNavTopSection from './SideNavTopSection'
import SideNavBottomSection from './SideNavBottomSection'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';


function SideNav() {
    const { user }: any = useKindeBrowserClient();
    return (
        <div className='bg-gray-100 h-screen fixed w-72 border-r p-6'>
            <SideNavTopSection user={user} />
            <SideNavBottomSection />
        </div>
    )
}

export default SideNav
