import { FileListContext } from '@/app/_contex/FileListContext'
import { iFile } from '@/lib/utils';
import React, { useContext, useState, useEffect } from 'react'
import moment from 'moment';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import Image from 'next/image';
import { Archive, MoreHorizontal } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from 'next/navigation';

function FileList() {
    const { fileList_, setFileList_ } = useContext(FileListContext);
    const [fileList, setFileList] = useState<any>();
    const { user }: any = useKindeBrowserClient();
    const router = useRouter();
    useEffect(() => {
        fileList_ &&
            setFileList(fileList_);
        console.log("file list made che ?", fileList);
    }, [fileList_])
    return (
        <div className='mt-10'>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                    <thead className="ltr:text-left rtl:text-right">
                        <tr>
                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">File Name</td>
                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Created At</td>
                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Edited</td>
                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Author</td>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">

                        {fileList && fileList.map((item: iFile, index: number) => {
                            return (
                                <tr className="odd:bg-gray-50 cursor-pointer" key={index}
                                    onClick={() => { router.push('/workspace/' + item._id) }}>
                                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{item.filename}</td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">{moment(item._creationTime).format("Do MMMM YYYY")}</td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">{moment(item._creationTime).format("Do MMMM YYYY")}</td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700"><Image src={user?.picture} alt='user' width={30} height={30} className='rounded-lg' /> </td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger><MoreHorizontal /></DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuItem className='flex gap-1'><Archive className='h-4 w-4' /> Archive</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </td>
                                </tr>)
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default FileList
