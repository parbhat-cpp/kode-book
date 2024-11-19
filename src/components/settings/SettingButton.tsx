import clsx from "clsx";
import React, { HTMLAttributes } from "react"

interface SettingButtonProps extends HTMLAttributes<HTMLDivElement> {
    title: string;
    icon: React.ReactNode;
}

const SettingButton = (props: SettingButtonProps) => {
    const { className, ...filteredProps } = props;

    return (
        <div className={clsx("flex items-center gap-2 p-2 text-lpPrimaryText hover:text-white cursor-pointer", className)} {...filteredProps}>
            <span>
                {props.icon}
            </span>
            <p className="text-lg">{props.title}</p>
        </div>
    )
}

export default SettingButton
