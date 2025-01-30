"use client";
import React, { useEffect } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
function Editor() {

    const initEditor = () => {
        const editor = new EditorJS({
            tools: {
                header: {
                    class: Header,
                    shortcut: 'CMD+SHIFT+H',
                },
            },
            holder: 'editorjs'

        });

    }

    useEffect(() => {
        initEditor();
    })
    return (
        <div>
            <div className="ml-8" id='editorjs'></div>
        </div>
    )
}

export default Editor
