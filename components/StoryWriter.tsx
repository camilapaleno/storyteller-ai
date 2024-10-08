"use client"

import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from "./ui/select"
import { Textarea } from "./ui/textarea"
import { Button } from "./ui/button"
import { useEffect, useState } from "react"
import { Frame } from "@gptscript-ai/gptscript"
import renderEventMessage from "@/lib/renderEventMessage"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

const storiesPath = "public/stories";

function StoryWriter() {
    const [story, setStory] = useState<string>("");
    const [pages, setPages] = useState<number>();
    const [progress, setProgress] = useState("");
    const [runStarted, setRunStarted] = useState<boolean>(false);
    const [runFinished, setRunFinished] = useState<boolean | null>(null);
    const [currentTool, setCurrentTool] = useState("");
    const [events, setEvents] = useState<Frame[]>([]);
    const router = useRouter();
    
    async function runScript() {
        setRunStarted(true);
        setRunFinished(false);

        const response = await fetch('/api/run-script',
        {
            method: 'POST',
            headers: {
                "Content-Type":"application/json",
            },
            body: JSON.stringify({ story, pages, path: storiesPath })
        }
        );

        if (response.ok && response.body) {
            console.log("Streaming started");
            const reader = response.body.getReader();
            const decoder = new TextDecoder();

            handleStream(reader, decoder);
        } else {
            setRunFinished(true);
            setRunStarted(false);
            console.log("Failed to Start Streaming")
        }
    }

    async function handleStream(
        reader:ReadableStreamDefaultReader<Uint8Array>, 
        decoder:TextDecoder
        ) {
        while(true) {
            const { done, value } = await reader.read();

            if (done) break;

            //decoder used to decode Uint8array into string
            const chunk = decoder.decode(value , {stream: true});

            //split the chunk into events using event: keyword
            const eventData = chunk
            .split("\n\n")
            .filter((line) => line.startsWith("event: "))
            .map((line) => line.replace(/^event: /, ""));

            //parse JSON data
            eventData.forEach((data) => {
                try {
                    const parsedData = JSON.parse(data);

                    if (parsedData.type === "callProgress") {
                        setProgress (
                            parsedData.output[parsedData.output.length - 1].content
                        );
                        setCurrentTool(parsedData.tool?.description || "");
                    } else if (parsedData.type === "callStart") {
                        setCurrentTool(parsedData.tool?.description || "");
                    } else if (parsedData.type === "runFinish") {
                        setRunFinished(true);
                        setRunStarted(false);
                    } else {
                        setEvents((prevEvents) => [...prevEvents, parsedData]);
                    }
                    
                } catch (error) {
                    console.error("Failed to parse JSON", error);
                }
            })

        }
    }

  useEffect(() => {
    if (runFinished) {
        toast.success("Story generated successfully!", {
            action: (
            <Button
            onClick={() => router.push("/stories")}
            className="bg-purple-500 ml-auto"
            >
                View Stories
            </Button>
            )
        });
    }
  }, [runFinished])

  return (
    <div className="flex flex-col container">
      <section className="flex-1 flex flex-col border border-slate-300 bg-white/30 rounded-md p-10 space-y-2">
        <Textarea 
            value={story}
            onChange={(e) => setStory(e.target.value)}
            placeholder="Write a story about a robot and a human become friends..." 
            className="flex-1 text-black"
        />
        <Select onValueChange={(value) => setPages(parseInt(value))}>
            <SelectTrigger>
                <SelectValue placeholder="How many pages should the story be?"/>
            </SelectTrigger>    
            <SelectContent className="w-full">
                {Array.from({ length: 10 }, (_, i) => (
                    <SelectItem key={i} value={String(i + 1)}>
                        {i + 1}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
        <Button disabled={!story || !pages} className="w-full" size="lg"
            onClick={runScript}
        >Generate Story</Button>
      </section>
      <section className="flex-1 pb-5 mt-5">
            <div className="flex flex-col-reverse w-full space-y-2 bg-gray-800 rounded-md text-gray-200 font-mono p-10 h-96 overflow-y-auto">
                <div>
                    {runFinished === null && (
                        <>
                        <p className="animate-pulse mr-5">I'm waiting for you to generate a story above</p>
                        <br />
                        </>
                    )}

                    <span className="mr-5">{">>"}</span>
                    {progress}
                </div>

                {currentTool && (
                    <div className="py-10">
                        <span className="mr-5">{"--- [Current Tool] ---"}</span>
                        {currentTool}
                    </div>
                )}

                <div className="space-y-5">
                    {events.map((event, index) => (
                        <div key={index}>
                            <span className="mr-5">{">>"}</span>
                            {renderEventMessage(event)}
                        </div>
                    ))}
                </div>

                {runStarted && (
                    <div>
                        <span className="mr-5 animate-in">
                            {" --- [AI Storyteller Has Started] --- "}
                        </span>
                        <br/>
                    </div>
                )}

            </div>
      </section>
    </div>
  )
}

export default StoryWriter
