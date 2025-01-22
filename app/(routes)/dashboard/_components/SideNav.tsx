import React, { useState } from 'react'
import SideNavTopSection from './SideNavTopSection'
import SideNavBottomSection from './SideNavBottomSection'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useConvex, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';
import { iTeam } from '@/lib/utils';
function SideNav() {
    const { user }: any = useKindeBrowserClient();
    const createFile = useMutation(api.files.createFile);
    const [activeTeamInfo, setActiveTeamInfo] = useState<iTeam>();
    const onFileCreate = (newFileName: string) => {
        // console.log("new file name is here", newFileName);

        createFile({
            filename: newFileName,
            teamId: activeTeamInfo?._id,
            createdBy: user?.email,
            archive: false,
            document: "",
            whiteboard: ""
        }).then((resp) => {
            resp &&
                toast.success("File created successfully");
        }, (err) => {
            toast.error("Error in creating file"); s
        })
    }
    return (
        <div className=' h-screen fixed w-72 border-r border-[1px] p-6 flex flex-col'>
            <div className="flex-1">
                <SideNavTopSection user={user} setActiveTeamInfo={(activeTeamInfo: iTeam) => setActiveTeamInfo(activeTeamInfo)} />
            </div>
            <div className="mb-16">
                <SideNavBottomSection onFileCreate={onFileCreate} />
            </div>
        </div>
    )
}

export default SideNav
