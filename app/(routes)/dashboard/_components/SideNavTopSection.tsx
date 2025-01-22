import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { ChevronDown, LogOut, Settings, Users } from 'lucide-react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"

import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs'
import { useConvex } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { iTeam } from '@/lib/utils'
import { useRouter } from 'next/navigation'
function SideNavTopSection({ user }: any) {
    const menu = [
        {
            id: 1,
            name: 'Create Team',
            path: '/teams/create',
            icon: Users
        },
        {
            id: 2,
            name: 'Settings',
            path: '',
            icon: Settings
        }
    ]
    const router = useRouter();
    const [teamList, setTeamList] = useState<iTeam[]>();
    const [activeTeam, setActiveTeam] = useState<iTeam>();
    const convex = useConvex();


    const getTeamList = async () => {
        const result = await convex.query(api.teams.getTeam, { email: user.email });
        // console.log("team list is :", result);
        setTeamList(result);
        setActiveTeam(result[0]);
    }
    const onMenuClick = (item: any) => {
        item?.path && router.push(item.path);
    }

    useEffect(() => {
        user && getTeamList();
    }, [user])
    return (
        <div>
            <Popover>
                <PopoverTrigger>
                    <div className="flex items-center gap-3 hover:bg-slate-200 p-2 rounded-lg cursor-pointer">
                        <Image src='/logo.png' alt='logo' width={40} height={40} />
                        <h2 className="flex gap-2 items-center font-bold text-[17px]">{activeTeam?.teamName}
                            <ChevronDown className='' />
                        </h2>
                    </div>
                </PopoverTrigger>
                <PopoverContent className='ml-7 p-4'>
                    {/* Team Section */}
                    <div className="">
                        {teamList && teamList.map((item, index) => {
                            return (
                                <h2 key={index}
                                    onClick={() => setActiveTeam(item)}
                                    className={`p-2 hover:bg-blue-500 cursor-pointer rounded-lg mb-1 ${item._id === activeTeam?._id && "bg-blue-500 text-white"}`}>{item.teamName}</h2 >
                            )
                        })}
                    </div>
                    <Separator className='mt-2 bg-slate-100' />

                    {/* option section */}
                    <div className="">
                        {menu.map((item, index) => {
                            return (
                                <h2 className='flex item-center gap-2 p-2 hover:bg-gray-200 rounded-lg cursor-pointer' key={index} onClick={() => onMenuClick(item)}>
                                    <item.icon className='h-4 w-4' />{item.name}</h2>
                            )
                        })}

                        <LogoutLink>
                            <h2 className='flex item-center gap-2 p-2 hover:bg-gray-200 rounded-lg cursor-pointer' >
                                <LogOut className='h-4 w-4 items-center' />Logout</h2>
                        </LogoutLink>
                        <Separator className='mt-2 bg-slate-100' />
                        {/* user info section */}
                        {user &&
                            <div className="flex gap-2 items-center">
                                <Image src={user?.picture} alt='user' width={30} height={30} className='rounded-full' />
                                <div className="">
                                    <h2 className=' text-[14px] font-bold'>{user?.given_name}{" "}{user?.family_name}</h2>
                                    <h2 className='text-gray-500 text-[12px]'>{user?.email}</h2>

                                </div>
                            </div>
                        }
                    </div>
                </PopoverContent>
            </Popover>

        </div >
    )
}

export default SideNavTopSection
