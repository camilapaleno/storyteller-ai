'use client'

import { useEffect, useState } from "react";
import { Story as StoryType } from "../types/stories"
import { 
    Carousel, 
    CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from "@/components/ui/carousel";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";

interface Props {
    story: StoryType;
}

const Story = ({story}: Props) => {
    const [api, setApi] = useState<CarouselApi>()

    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!api) return;
        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap() + 1);

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1);
        });
    }, [api]);

  return (
    <div>
      <div className="px-20">
        <Carousel setApi={setApi} className="w-full lg:w-4/5 h-56 mx-auto">
            <CarouselPrevious />
            <CarouselContent className="px-5">
                {story.pages.map((page, i) => (
                    <CarouselItem key={i}>
                        <Card className="p-5 md:p-10 border">
                            <h2 className="text-center text-gray-400 pb-5">{story.story}</h2>
                            <CardContent>
                                <Image 
                                    src={page.png}
                                    alt={`Page ${i + 1} image`}
                                    width={500}
                                    height={500}
                                    className="w-80 h-8w-80 xl:w-[500px] xl:h-[500px] rounded-3xl mx-auto float-right p-5 xl-order-last"
                                />
                                <p className="font-semibold text-xl whitespace-pre-wrap">{page.txt}</p>
                            </CardContent>
                            <p className="text-center text-gray-400">
                                Page {current} of {count}
                            </p>
                        </Card>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselNext />
        </Carousel>
      </div>
    </div>
  )
}

export default Story
