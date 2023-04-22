import Image from "next/image";
import { useEffect, useState } from "react";

export const Message = ({avatar, text: initialText, idx, author}) => {

    const [text, setText] = useState(author === "human" ? initialText : "");

    useEffect(() => {
        const timeout = setTimeout(() => {
            setText(initialText.slice(0, text.length + 1));
        }, 50);

        return () => {
            clearTimeout(timeout);
        }
    });

    const bgColor = idx % 2 === 0 ? "bg-slate-100" : "bg-slate-200 flex-row-reverse";

    const blinkingCursorClass = initialText.length === text.length ? "" : "blinking-cursor";

    return (
        <div className={`flex gap-4 p-4 ${bgColor} items-center rounded-lg`}>
            <div className="w-[48px] relative mr-4">
                <Image src={avatar} alt="oshi avatar" width={60} height={60} className="rounded-full"/>
            </div>
            <div className={`flex text-md w-full items-center ${bgColor}`}>
                <div className={blinkingCursorClass}>
                    {text}
                </div>
            </div>
        </div>
  )
};
