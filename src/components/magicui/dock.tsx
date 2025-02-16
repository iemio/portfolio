"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const DEFAULT_MAGNIFICATION = 60;
const DEFAULT_DISTANCE = 140;

export interface DockProps {
    className?: string;
    magnification?: number;
    distance?: number;
    children: React.ReactNode;
}

/**
 * The Dock component is a container that tracks mouse movement to
 * provide a magnification effect on its child icons.
 */
const Dock = React.forwardRef<HTMLDivElement, DockProps>(
    (
        {
            className = "",
            children,
            magnification = DEFAULT_MAGNIFICATION,
            distance = DEFAULT_DISTANCE,
            ...props
        },
        ref
    ) => {
        const mouseX = useMotionValue(Infinity);

        // Clone and pass down the mouseX, magnification, and distance props to each child.
        const renderChildren = () =>
            React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                    return React.cloneElement(
                        child as React.ReactElement<DockIconProps>,
                        {
                            mouseX,
                            magnification,
                            distance,
                        }
                    );
                }
                return child;
            });

        const baseClasses =
            "mx-auto w-max h-full p-2 flex items-end rounded-full border shadow-lg backdrop-blur-xl bg-[rgba(245,245,245,0.1)] dark:bg-[rgba(31,41,55,0.6)]";

        return (
            <motion.div
                ref={ref}
                onMouseMove={(e) => mouseX.set(e.pageX)}
                onMouseLeave={() => mouseX.set(Infinity)}
                {...props}
                className={`${baseClasses} ${className}`}
            >
                {renderChildren()}
            </motion.div>
        );
    }
);

Dock.displayName = "Dock";

export interface DockIconProps {
    size?: number;
    magnification?: number;
    distance?: number;
    mouseX?: any;
    className?: string;
    children?: React.ReactNode;
}

/**
 * The DockIcon component uses the current mouse position to calculate a new size,
 * creating a magnification effect when the mouse hovers close.
 */
const DockIcon = ({
    size = 40,
    magnification = DEFAULT_MAGNIFICATION,
    distance = DEFAULT_DISTANCE,
    mouseX,
    className = "",
    children,
    ...props
}: DockIconProps) => {
    const ref = useRef<HTMLDivElement>(null);

    // Calculate the horizontal distance from the icon center to the mouse pointer
    const distanceCalc = useTransform(mouseX, (val: number) => {
        const bounds = ref.current?.getBoundingClientRect() || {
            x: 0,
            width: 0,
        };
        return val - (bounds.x + bounds.width / 2);
    });

    // Interpolate the width (and height) based on the distance to the mouse pointer
    const widthSync = useTransform(
        distanceCalc,
        [-distance, 0, distance],
        [size, magnification, size]
    );

    // Smooth the changes using a spring
    const width = useSpring(widthSync, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    });

    return (
        <motion.div
            ref={ref}
            style={{ width, height: width }}
            className={`flex aspect-square cursor-pointer items-center justify-center rounded-full ${className}`}
            {...props}
        >
            {children}
        </motion.div>
    );
};

DockIcon.displayName = "DockIcon";

export { Dock, DockIcon };
