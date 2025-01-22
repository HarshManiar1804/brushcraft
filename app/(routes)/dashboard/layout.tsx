"use client";
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useConvex } from 'convex/react';
import React, { use, useEffect, useState } from 'react'
import { api } from "@/convex/_generated/api";
import { useRouter } from 'next/navigation';
import SideNav from './_components/SideNav';
import { FileListContext } from '@/app/_contex/FileListContext';

function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [fileList_, setFileList_] = useState();
    const { user }: any = useKindeBrowserClient();
    const convex = useConvex();
    const router = useRouter();
    useEffect(() => {
        user && checkTeam();
    }, [user])

    const checkTeam = async () => {
        const result = await convex.query(api.teams.getTeam, { email: user?.email });

        if (!result?.length) {
            router.push('teams/create');
        }
    }
    return (
        <div>
            <FileListContext.Provider value={{ fileList_, setFileList_ }}>
                <div className="grid grid-cols-4 ">
                    <div className="h-screen w-72 fixed">
                        <SideNav />
                    </div>
                    <div className="col-span-4 ml-72">
                        {children}
                    </div>
                </div>
            </FileListContext.Provider>
        </div>
    )
}

export default DashboardLayout
