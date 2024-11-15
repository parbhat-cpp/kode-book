import { SearchUser } from '@/types/userType'
import { UserCircle } from '@phosphor-icons/react';
import clsx from 'clsx';
import { HTMLAttributes } from 'react'

interface SearchUserCardProps extends HTMLAttributes<HTMLDivElement> {
    user: SearchUser,
}

const SearchUserCard = (props: SearchUserCardProps) => {
    const { className, ...filteredProps } = props;

    return (
        <div className={clsx("flex p-3 hover:bg-appTertiaryBg rounded-md cursor-pointer", className)} {...filteredProps}>
            <div className='flex gap-2 items-center'>
                <div>
                    {props.user.avatar_url && <img src={props.user.avatar_url} height={50} width={50} alt={props.user.full_name} />}
                    {!props.user.avatar_url &&
                        <UserCircle size={35} />
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
            <div>
                {/* Add follow/unfollow button */}
            </div>
        </div>
    )
}

export default SearchUserCard
