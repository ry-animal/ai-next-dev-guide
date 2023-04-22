import Image from "next/image";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/cjs/styles/prism";

export const Message = ({avatar, text: initialText, idx, author}) => {

    const [text, setText] = useState(author === "human" ? initialText : "");

    useEffect(() => {
        const timeout = setTimeout(() => {
            setText(initialText.slice(0, text.length + 1));
        }, 20);

        return () => {
            clearTimeout(timeout);
        }
    }, [initialText, text]);

    const bgColor = idx % 2 === 0 ? "bg-slate-100" : "bg-slate-200 flex-row-reverse";

    const blinkingCursorClass = initialText.length === text.length ? "" : "blinking-cursor";

    return (
        <div className={`flex gap-4 p-4 ${bgColor} items-center rounded-lg`}>
            <div className="w-[48px] relative mr-4">
                <Image src={avatar} alt="oshi avatar" width={60} height={60} className="rounded-full"/>
            </div>
            <div className="flex text-md w-full items-center">
                <ReactMarkdown 
                className={blinkingCursorClass} 
                components={{
                    code({ inline, className, children, style, ...props}) {
                        const match = /language-(\w+)/.exec(className || '');
                        return !inline && match ? (
                            <SyntaxHighlighter
                                language={match[1]}
                                PreTag="div"
                                style={darcula}
                                {...props}
                            >
                                {children}
                            </SyntaxHighlighter>
                        ) : (
                            <code className={className} {...props}>
                                {children}
                            </code>
                        ); 
                    }
                }}>
                    {text}
                </ReactMarkdown>
            </div>
        </div>
  )
};
