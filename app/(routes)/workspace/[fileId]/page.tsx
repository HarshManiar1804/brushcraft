"use client";
import React, { useState, use, useEffect } from 'react'
import WorkspaceHeader from '../_components/WorkspaceHeader'
import Editor from '../_components/Editor'
import { useConvex } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { iFile } from '@/lib/utils';
import { FileEdit } from 'lucide-react';

function Workspace({ params }: any) {
    const { fileId }: any = use(params);
    const [triggerSave, setTriggerSave] = useState(false);
    const convex = useConvex();
    const [fileData, setFileData] = useState<iFile | any>();
    useEffect(() => {
        fileId && getFileData();
    }, []);

    const getFileData = async () => {
        const result = await convex.query(api.files.getFileById, { _id: fileId });
        setFileData(result);
    }
    return (
        <div>
            <WorkspaceHeader onSave={() => setTriggerSave(!triggerSave)} />
            {/* workspace layout */}
            <div className="grid grid-col-1 md:grid-cols-2">
                {/* document  */}
                <div className="h-screen">
                    <Editor onSaveTrigger={triggerSave} fileId={fileId} fileData={fileData} />
                </div>
                {/* canvas */}
                <div className="h-screen">hello</div>
            </div>
        </div>
    )
}

export default Workspace
