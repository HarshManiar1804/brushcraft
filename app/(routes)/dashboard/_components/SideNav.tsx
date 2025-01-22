import React, { useEffect, useState } from 'react'
import SideNavTopSection from './SideNavTopSection'
import SideNavBottomSection from './SideNavBottomSection'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useConvex, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';
import { iTeam } from '@/lib/utils';
import { get } from 'http';
function SideNav() {
    const { user }: any = useKindeBrowserClient();
    const convex = useConvex();
    const createFile = useMutation(api.files.createFile);
    const [activeTeamInfo, setActiveTeamInfo] = useState<iTeam>();
    const onFileCreate = (newFileName: string) => {
        // console.log("new file name is here", newFileName);
        createFile({
            filename: newFileName,
            teamId: activeTeamInfo?._id || '',
            createdBy: user?.email,
            archive: false,
            document: "",
            whiteboard: ""
        }).then((resp) => {
            resp &&
                toast.success("File created successfully");
            getFiles();
        }, (err) => {
            toast.error("Error in creating file");
        })
    }
    const [totalFiles, setTotalFiles] = useState<Number>();

    const getFiles = async () => {
        const result = await convex.query(api.files.getFiles, { teamId: activeTeamInfo?._id || '' });
        // console.log("files list: ", result);
        setTotalFiles(result?.length);
    }

    useEffect(() => {
        activeTeamInfo &&
            getFiles();
    }, [activeTeamInfo])
    return (
        <div className=' h-screen fixed w-72 border-r border-[1px] p-6 flex flex-col'>
            <div className="flex-1">
                <SideNavTopSection user={user} setActiveTeamInfo={(activeTeamInfo: iTeam) => setActiveTeamInfo(activeTeamInfo)} />
            </div>
            <div className="mb-16">
                <SideNavBottomSection onFileCreate={onFileCreate} totalFiles={totalFiles} />
            </div>
        </div>
    )
}

export default SideNav
