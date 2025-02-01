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
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';
import { iFile } from '@/lib/utils';


const rawDocument = {
    "time": 1550476186479,
    "blocks": [{
        type: 'header',
        data: {
            text: 'Document Name',
            level: 2
        },
        id: "123"
    }],
    "version": "2.8.1"
}
function Editor({ onSaveTrigger, fileId, fileData }: { onSaveTrigger: any, fileId: any, fileData: iFile }) {
    const ref = useRef<EditorJS>(null);
    const [document, setDocument] = useState(rawDocument);
    const updateDocument = useMutation(api.files.updateDocument);
    useEffect(() => {
        console.log('trigger value', onSaveTrigger);
        onSaveTrigger && onSaveDocument();
    }, [onSaveTrigger])
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
            data: fileData?.document ? JSON.parse(fileData.document) : rawDocument
        });

        ref.current = editor;
    }
    const onSaveDocument = () => {
        if (ref.current) {
            ref.current.save().then((outputData) => {
                console.log('Article data: ', outputData)
                updateDocument({
                    _id: fileId, document: JSON.stringify(outputData)
                }).then(resp => {
                    toast.success('Document Updated!');
                }, (e) => {
                    console.log(e)
                    toast.error("Server Error!");
                })
            }).catch((error) => {
                console.log('Saving failed: ', error)
            });
        }
    }
    useEffect(() => {
        fileData && initEditor();
    }, [fileData]);
    return (
        <div>
            <div className="ml-8" id='editorjs'></div>
        </div>
    )
}

export default Editor
