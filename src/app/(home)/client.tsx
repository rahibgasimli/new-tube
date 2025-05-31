"use client";

import { trpc } from "@/trpc/client";

export const PageClient = () => {

    const [ data ] = trpc.hello.useSuspenseQuery({
        text: "Rahib2"
    });

    return (
        <div>
            Page Client says { data.greeting }
        </div>
    );
}