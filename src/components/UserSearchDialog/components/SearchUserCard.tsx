import Loader from '@/components/Loader';
import { SearchUser } from '@/types/userType'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { UserCircle, UserMinus, UserPlus } from '@phosphor-icons/react';
import clsx from 'clsx';
import { HTMLAttributes } from 'react'

interface SearchUserCardProps extends HTMLAttributes<HTMLDivElement> {
    user: SearchUser,
    handleFollow: () => void;
    handleUnfollow: () => void;
}

const SearchUserCard = (props: SearchUserCardProps) => {
    const { className, onClick, ...filteredProps } = props;

    return (
        <div className={clsx("flex p-3 hover:bg-appTertiaryBg rounded-md cursor-pointer justify-between items-center", className)} {...filteredProps}>
            <div className='flex flex-1 gap-2 items-center' onClick={onClick}>
                <div>
                    {props.user.avatar_url && <img src={props.user.avatar_url} className="aspect-square h-10 w-10 circle" alt={props.user.full_name} />}
                    {!props.user.avatar_url &&
                        <UserCircle className='h-10 w-10' />
                    }
                </div>
                <div>
                    <p className='text-xl hover:underline'>
                        {props.user.username}
                    </p>
                    <p className='hover:underline'>
                        {props.user.full_name}
                    </p>
                </div>
            </div>
            <div className=''>
                {
                    props.user.following === undefined ? <Loader /> :
                        props.user.following ?
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <button onClick={props.handleUnfollow}>
                                            <UserMinus size={28} />
                                        </button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <div>Unfollow</div>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            :
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <button onClick={props.handleFollow}>
                                            <UserPlus size={28} />
                                        </button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <div>Follow</div>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                }
            </div>
        </div>
    )
}

export default SearchUserCard
