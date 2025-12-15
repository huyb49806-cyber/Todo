import { useState, useEffect, useRef, useCallback } from 'react';

const ITEM_HEIGHT = 60;
const CONTAINER_HEIGHT = 400;
const OVERSCAN = 3;

export const useVirtualScroll = (dataLength, itemHeight = ITEM_HEIGHT, containerHeight = CONTAINER_HEIGHT) => {
    
    const containerRef = useRef(null);
    
    const [visibleRange, setVisibleRange] = useState({
        startIndex: 0,
        endIndex: Math.ceil(containerHeight / itemHeight) + OVERSCAN
    });

    const updateVisibleRange = useCallback(() => {
        if (!containerRef.current) return;
        const scrollTop = containerRef.current.scrollTop;
        const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight));
        const visibleCount = Math.ceil(containerHeight / itemHeight);
        const endIndex = Math.min(
            dataLength, 
            startIndex + visibleCount + OVERSCAN
        );

        setVisibleRange({ startIndex, endIndex });
    }, [dataLength, itemHeight, containerHeight]);

    useEffect(() => {
        if (containerRef.current) {
            updateVisibleRange(); 
            
            containerRef.current.addEventListener("scroll", updateVisibleRange);
        }
        return () => {
            if (containerRef.current) {
                containerRef.current.removeEventListener("scroll", updateVisibleRange);
            }
        };
    }, [updateVisibleRange]);

    const totalHeight = dataLength * itemHeight;
    const offsetY = visibleRange.startIndex * itemHeight;

    return { 
        containerRef, 
        ...visibleRange, 
        totalHeight, 
        offsetY, 
        containerHeight,
        itemHeight
    };
};