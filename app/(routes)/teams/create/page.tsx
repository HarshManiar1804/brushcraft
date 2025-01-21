"use client";
import Image from 'next/image';
import React, { useRef, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button';
import { useMutation } from 'convex/react';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { toast } from 'sonner';
import { api } from '@/convex/_generated/api';
import { useRouter } from 'next/navigation';

function CreateTeam() {
    const router = useRouter();
    const { user }: any = useKindeBrowserClient();
    const [teamName, setTeamName] = useState<string>('');
    const createTeam = useMutation(api.teams.createTeam);

    const createNewTeam = () => {
        createTeam({
            teamName: teamName,
            createdBy: user?.email
        }).then((resp) => {
            console.log(resp);
            if (resp) {
                toast.success('Team created successfully!!!');
                router.push('/dashboard');
            }
        })
    }
    const handleCreateTeam = () => {
        createNewTeam();
    }
    return (
        <div className='px-16 my-16 md:px-16'>
            <Image src='/logo-black.png' alt='logo' width={200} height={200} />

            <div className="flex flex-col items-center">
                <h2 className='font-bold text-[40px] py-3'>What should we call your team?</h2>
                <h2 className='text-gray-500'>You can always change this later from settings</h2>
                <div className="mt-7 w-[40%]">
                    <label className='text-gray-500'>Team Name</label>
                    <Input type="text" placeholder="Team name" className='mt-3'
                        onChange={(e) => setTeamName(e.target.value)} />
                </div>
                <Button onClick={handleCreateTeam} className='bg-blue-500 mt-9 w-[30%] hover:bg-blue-700'>Create team</Button>
            </div>
        </div>
    )
}

export default CreateTeam;
