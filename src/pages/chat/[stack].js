import { Header } from "@/components/Header";
import stacks from "@/data/stacks.json";
import { Message } from "@/components/Message";
import { Prompt } from "@/components/Prompt";
import { useState, useRef, useEffect } from "react";

const SESSION_KEYS = [
    "u1-2023-04-13T15:00:00.000Z",
    "u1-2023-04-13T15:01:00.000Z",
    "u1-2023-04-13T15:02:00.000Z",
    "u1-2023-04-13T15:03:00.000Z",
];

export default function Stack({stack, stackKey}) {
    const [messages, setMessages] = useState([]);
    const [activeSession, setActiveSession] = useState("");
    const chatRef = useRef(null);

    useEffect(() => {
        chatRef.current.scrollTo(0, chatRef.current.scrollHeight);
    }, [messages]);

    const onSubmit = async (prompt) => {
        setMessages((messages) => {
            return [
                ...messages,
                {
                    text: prompt, 
                    avatar: "https://thrangra.sirv.com/Avatar2.png", 
                    author: "human",
                    id: new Date().toISOString(),
                }
            ]; 
        });

        const response = await fetch(`/api/completion`, {
            method: "POST",
            body: JSON.stringify({prompt}),
            headers: {
                "Content-Type": "application/json",
            }
        });

        const data = await response.json();

        if(response.ok) {
            setMessages((messages) => {
                return [
                    ...messages,
                    {
                        text: data.result, 
                        avatar: stack.logo,
                        author: "agent",
                        id: new Date().toISOString(), 
                    }
                ]
            });
        } else {
            setMessages((messages) => {
                return [
                    ...messages,
                    {
                        text: "Oops! Something went wrong", 
                        avatar: stack.logo,
                        id: new Date().toISOString(),
                        author: "agent"
                    }
                ]
            });
        }
    }

    const handleSessionChange = (e) => {
        const session = e.target.value;

        if(!session) {
            console.warn("Not valid session");
            return;
        }

        setActiveSession(session);
    };

    return (
       <div className="h-full flex flex-col ">
        <Header logo={stack.logo} info={stack.info} />
        <div className="mt-4">Active session: {activeSession}</div>
        <select onChange={handleSessionChange} className="bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg w-full p-3 mt-5">
            <option value="">Choose session</option>
            {SESSION_KEYS.map((sk) => (
                <option key={sk} value={sk}>{sk}</option>
            ))}
        </select>
        <hr className="my-4" />
        <div ref={chatRef} className="flex flex-col h-full overflow-scroll gap-2">
            {messages.map((message, idx) => (
                <Message 
                    key={message.id}
                    idx={idx}
                    avatar={message.avatar} 
                    text={message.text}
                    author={message.author}
                />
            ))}
        </div>
        <div className="flex p-4">
            <Prompt onSubmit={onSubmit}/>
        </div>
       </div>
    )
}

export async function getStaticPaths() {
    const paths = Object.keys(stacks).map((key) => ({params: {stack: key}}));
    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    return {
        props: {
            stack: stacks[params.stack],
            stackKey: params.stack,
        },
    };
}