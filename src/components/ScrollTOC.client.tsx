// "use client";

// import React, { useLayoutEffect, useRef, useState } from "react";

// interface Heading {
//     id: string;
//     text: string;
//     level: number;
//     position: number;
// }

// interface ScrollTOCProps {
//     headings: Heading[];
// }

// export const ScrollTOC: React.FC<ScrollTOCProps> = ({ headings }) => {
//     const [activeId, setActiveId] = useState<string | null>(null);
//     const containerRef = useRef<HTMLDivElement>(null);
//     const observerRef = useRef<IntersectionObserver>();

//     useLayoutEffect(() => {
//         // Observe all heading elements.
//         const elements = headings
//             .map((heading) => document.getElementById(heading.id))
//             .filter((el): el is HTMLElement => el !== null);

//         if (observerRef.current) {
//             observerRef.current.disconnect();
//         }

//         // Use IntersectionObserver to determine which heading is in view.
//         observerRef.current = new IntersectionObserver(
//             (entries) => {
//                 const visibleEntries = entries.filter(
//                     (entry) => entry.intersectionRatio > 0.2
//                 );
//                 if (visibleEntries.length) {
//                     visibleEntries.sort(
//                         (a, b) =>
//                             a.boundingClientRect.top - b.boundingClientRect.top
//                     );
//                     setActiveId(visibleEntries[0].target.id);
//                 }
//             },
//             {
//                 threshold: 0.2,
//             }
//         );

//         elements.forEach((elem) => {
//             observerRef.current?.observe(elem);
//         });

//         return () => {
//             observerRef.current?.disconnect();
//         };
//     }, [headings]);

//     const handleClick = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
//         e.preventDefault();
//         const element = document.getElementById(id);
//         if (element) {
//             element.scrollIntoView({ behavior: "smooth", block: "start" });
//         }
//     };

//     return (
//         <div
//             ref={containerRef}
//             className="fixed top-1/4 right-4 z-50 h-1/2 w-8"
//         >
//             {/* Vertical stick/line */}
//             <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-gray-800 mx-auto" />
//             {headings.map((heading) => (
//                 <div
//                     key={heading.id}
//                     onClick={(e) => handleClick(e, heading.id)}
//                     className="absolute group cursor-pointer"
//                     style={{ top: `${heading.position}%`, left: 0, right: 0 }}
//                 >
//                     {/* Marker bar */}
//                     <div
//                         className={`h-2 w-full transition-colors duration-200 ${
//                             activeId === heading.id
//                                 ? "bg-blue-500"
//                                 : "bg-gray-800"
//                         }`}
//                     ></div>
//                     {/* Tooltip on hover */}
//                     <div className="absolute left-full ml-2 hidden group-hover:block whitespace-nowrap rounded bg-gray-700 px-2 py-1 text-xs text-white shadow-md">
//                         {heading.text}
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default ScrollTOC;

"use client";

import React, { useLayoutEffect, useRef, useState } from "react";

interface Heading {
    id: string;
    text: string;
    level: number;
    position: number;
}

interface ScrollTOCProps {
    headings: Heading[];
}

export const ScrollTOC: React.FC<ScrollTOCProps> = ({ headings }) => {
    const [activeId, setActiveId] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const observerRef = useRef<IntersectionObserver>();

    useLayoutEffect(() => {
        // Get heading elements by ID.
        const elements = headings
            .map((heading) => document.getElementById(heading.id))
            .filter((el): el is HTMLElement => el !== null);

        if (observerRef.current) {
            observerRef.current.disconnect();
        }

        observerRef.current = new IntersectionObserver(
            (entries) => {
                // Filter out entries with low intersection.
                const visibleEntries = entries.filter(
                    (entry) => entry.intersectionRatio > 0.2
                );
                if (visibleEntries.length) {
                    // Sort by vertical position.
                    visibleEntries.sort(
                        (a, b) =>
                            a.boundingClientRect.top - b.boundingClientRect.top
                    );
                    setActiveId(visibleEntries[0].target.id);
                }
            },
            { threshold: 0.2 }
        );

        elements.forEach((elem) => observerRef.current?.observe(elem));

        return () => {
            observerRef.current?.disconnect();
        };
    }, [headings]);

    const handleClick = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    // Set different marker widths based on heading level.
    const getMarkerWidth = (level: number) => {
        switch (level) {
            case 1:
                return "100%";
            case 2:
                return "75%";
            case 3:
                return "50%";
            default:
                return "100%";
        }
    };

    return (
        <div
            ref={containerRef}
            className="fixed top-1/4 right-4 z-50 h-1/2 w-8"
        >
            {/* Vertical stick/line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-gray-800 mx-auto" />
            {headings.map((heading) => (
                <div
                    key={heading.id}
                    onClick={(e) => handleClick(e, heading.id)}
                    className="absolute group cursor-pointer"
                    style={{
                        top: `${heading.position}%`,
                        left: 0,
                        right: 0,
                        textAlign: "center",
                    }}
                >
                    {/* Marker bar with dynamic width */}
                    <div
                        className={`h-2 transition-colors duration-200 ${
                            activeId === heading.id
                                ? "bg-blue-500"
                                : "bg-gray-800"
                        }`}
                        style={{
                            width: getMarkerWidth(heading.level),
                            margin: "0 auto",
                        }}
                    ></div>
                    {/* Tooltip on hover */}
                    <div className="absolute left-full ml-2 hidden group-hover:block whitespace-nowrap rounded bg-gray-700 px-2 py-1 text-xs text-white shadow-md">
                        {heading.text}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ScrollTOC;
