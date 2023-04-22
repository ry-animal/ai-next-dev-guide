import { useState } from "react";

export const Prompt = ({onSubmit}) => {
    const [promptInput, setPromptInput] = useState("");

  return (
    <>
        <textarea 
            onChange={(e) => setPromptInput(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                    e.preventDefault();
                    if(promptInput.trim().length > 0) {
                        onSubmit(promptInput);
                        setPromptInput("");
                    }
            }}}
            value={promptInput}
            rows="4" 
            placeholder="Write your prompt here..."
            className="w-full p-3 text-sm text-gray-900 bg-slate-200 border rounded-lg border-gray-300"
        />
    </>
  )
}
