"use client";
import React, { useEffect, useRef, useState } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import EditorjsList from '@editorjs/list';
import ImageTool from '@editorjs/image';
// @ts-ignore
import Checklist from '@editorjs/checklist';
// @ts-ignore

import LinkTool from '@editorjs/link';
import Paragraph from '@editorjs/paragraph';


const rawDocument = {
    "time": 1550476186479,
    "blocks": [{
        type: 'header',
        data: {
            text: 'document name',
            level: 2
        },
        id: "123"
    }],
    "version": "2.8.1"
}
function Editor() {
    const ref = useRef<EditorJS>(null);
    const [document, setDocument] = useState(rawDocument);
    const initEditor = () => {
        const editor = new EditorJS({
            tools: {
                header: {
                    // @ts-ignore
                    class: Header,
                    shortcut: 'CMD+SHIFT+H',
                    config: {
                        placeholder: 'Enter a header',
                    }
                },
                list: {
                    // @ts-ignore
                    class: EditorjsList,
                    inlineToolbar: true,
                    config: {
                        defaultStyle: 'unordered'
                    },
                },
                image: {
                    class: ImageTool,
                    config: {
                        endpoints: {
                            byFile: 'http://localhost:8008/uploadFile', // Your backend file uploader endpoint
                            byUrl: 'http://localhost:8008/fetchUrl', // Your endpoint that provides uploading by Url
                        }
                    }
                },
                checklist: {
                    class: Checklist,
                    inlineToolbar: true,
                },
                linkTool: {
                    class: LinkTool,
                    config: {
                        endpoint: 'http://localhost:8008/fetchUrl', // Your backend endpoint for url data fetching,
                    }
                },
                paragraph: {
                    // @ts-ignore
                    class: Paragraph,
                    inlineToolbar: true,
                },
            },
            holder: 'editorjs',
            data: document,

        });

        ref.current = editor;
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
