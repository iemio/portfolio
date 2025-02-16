// // "use client";

// // import React, { useEffect, useState } from "react";
// // import ScrollTOC from "./ScrollTOC.client";

// // interface Heading {
// //     id: string;
// //     text: string;
// //     level: number;
// // }

// // interface BlogLayoutProps {
// //     children: React.ReactNode;
// // }

// // export const BlogLayout: React.FC<BlogLayoutProps> = ({ children }) => {
// //     const [headings, setHeadings] = useState<Heading[]>([]);

// //     useEffect(() => {
// //         const article = document.querySelector("article");
// //         if (!article) return;

// //         const headingElements = article.querySelectorAll("h1, h2, h3");

// //         // Object to track counts for duplicate IDs.
// //         const idCount: Record<string, number> = {};

// //         const newHeadings: Heading[] = Array.from(headingElements).map(
// //             (elem) => {
// //                 // Generate a base id from text content if the element doesn't have one.
// //                 let baseId =
// //                     elem.id ||
// //                     (elem.textContent
// //                         ?.trim()
// //                         .replace(/\s+/g, "-")
// //                         .toLowerCase() ??
// //                         "heading");
// //                 // Remove any characters that are not alphanumeric or dash.
// //                 baseId = baseId.replace(/[^a-z0-9\-]/g, "");

// //                 // Update count if the baseId has already been used.
// //                 if (idCount[baseId] != null) {
// //                     idCount[baseId]++;
// //                     baseId = `${baseId}-${idCount[baseId]}`;
// //                 } else {
// //                     idCount[baseId] = 0;
// //                 }

// //                 // Optionally set the generated id back to the element.
// //                 if (!elem.id) {
// //                     elem.id = baseId;
// //                 }

// //                 return {
// //                     id: baseId,
// //                     text: elem.textContent || "",
// //                     level: parseInt(elem.tagName.substring(1), 10),
// //                 };
// //             }
// //         );

// //         setHeadings(newHeadings);
// //     }, [children]);

// //     return (
// //         <div className="relative">
// //             <ScrollTOC headings={headings} />
// //             <div className="max-w-3xl mx-auto p-4">{children}</div>
// //         </div>
// //     );
// // };

// // export default BlogLayout;

// "use client";

// import React, { useLayoutEffect, useState } from "react";
// import ScrollTOC from "./ScrollTOC.client";

// interface Heading {
//     id: string;
//     text: string;
//     level: number;
// }

// interface BlogLayoutProps {
//     children: React.ReactNode;
// }

// export const BlogLayout: React.FC<BlogLayoutProps> = ({ children }) => {
//     const [headings, setHeadings] = useState<Heading[]>([]);

//     useLayoutEffect(() => {
//         const article = document.querySelector("article");
//         if (!article) return;

//         const headingElements = article.querySelectorAll("h1, h2, h3");

//         const newHeadings: Heading[] = Array.from(headingElements).map(
//             (elem) => {
//                 let id = elem.id;
//                 if (!id) {
//                     id = elem.textContent
//                         ? elem.textContent
//                               .trim()
//                               .toLowerCase()
//                               .replace(/\s+/g, "-")
//                               .replace(/[^a-z0-9\-]/g, "")
//                         : "";
//                     elem.id = id;
//                 }
//                 return {
//                     id,
//                     text: elem.textContent || "",
//                     level: parseInt(elem.tagName.substring(1), 10),
//                 };
//             }
//         );
//         setHeadings(newHeadings);
//     }, [children]);

//     return (
//         <div className="relative">
//             <ScrollTOC headings={headings} />
//             <div className="max-w-3xl mx-auto p-4">{children}</div>
//         </div>
//     );
// };

// export default BlogLayout;

"use client";

import React, { useLayoutEffect, useState } from "react";
import ScrollTOC from "./ScrollTOC.client";

interface Heading {
    id: string;
    text: string;
    level: number;
    position: number; // percentage (0-100) relative to the article
}

interface BlogLayoutProps {
    children: React.ReactNode;
}

export const BlogLayout: React.FC<BlogLayoutProps> = ({ children }) => {
    const [headings, setHeadings] = useState<Heading[]>([]);

    useLayoutEffect(() => {
        const article = document.querySelector("article");
        if (!article) return;

        const articleRect = article.getBoundingClientRect();
        const articleTop = articleRect.top;
        const articleHeight = articleRect.height;

        const headingElements = article.querySelectorAll("h1, h2, h3");

        const newHeadings: Heading[] = Array.from(headingElements).map(
            (elem) => {
                // Generate an ID if not present.
                let id = elem.id;
                if (!id) {
                    id = elem.textContent
                        ? elem.textContent
                              .trim()
                              .toLowerCase()
                              .replace(/\s+/g, "-")
                              .replace(/[^a-z0-9\-]/g, "")
                        : "";
                    elem.id = id;
                }
                // Compute the vertical position relative to the article.
                const elemRect = elem.getBoundingClientRect();
                const relativeTop = elemRect.top - articleTop;
                const position = (relativeTop / articleHeight) * 100;

                return {
                    id,
                    text: elem.textContent || "",
                    level: parseInt(elem.tagName.substring(1), 10),
                    position,
                };
            }
        );

        setHeadings(newHeadings);
    }, [children]);

    return (
        <div className="relative">
            <ScrollTOC headings={headings} />
            <div className="max-w-3xl mx-auto p-4">{children}</div>
        </div>
    );
};

export default BlogLayout;
