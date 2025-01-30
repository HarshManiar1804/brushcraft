import React from 'react'
import WorkspaceHeader from '../_components/WorkspaceHeader'
import Editor from '../_components/Editor'

function Workspace() {
    return (
        <div>
            <WorkspaceHeader />
            {/* workspace layout */}
            <div className="grid grid-col-1 md:grid-cols-2">
                {/* document  */}
                <div className="h-screen">
                    <Editor />
                </div>
                {/* canvas */}
                <div className="h-screen">hello</div>
            </div>
        </div>
    )
}

export default Workspace
