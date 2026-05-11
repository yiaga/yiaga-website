import { useState, useEffect, useCallback, useRef } from "react";

interface UseInfiniteScrollProps<T> {
  items: T[];
  itemsPerPage: number;
}

export function useInfiniteScroll<T>({ items, itemsPerPage }: UseInfiniteScrollProps<T>) {
  const [displayedItems, setDisplayedItems] = useState<T[]>(items.slice(0, itemsPerPage));
  const [hasMore, setHasMore] = useState(items.length > itemsPerPage);
  const [isLoading, setIsLoading] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    
    // Simulate loading delay for better UX
    setTimeout(() => {
      const currentLength = displayedItems.length;
      const nextItems = items.slice(0, currentLength + itemsPerPage);
      setDisplayedItems(nextItems);
      setHasMore(nextItems.length < items.length);
      setIsLoading(false);
    }, 500);
  }, [displayedItems.length, hasMore, isLoading, items, itemsPerPage]);

  useEffect(() => {
    // Reset when items change
    setDisplayedItems(items.slice(0, itemsPerPage));
    setHasMore(items.length > itemsPerPage);
  }, [items, itemsPerPage]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    observerRef.current = observer;

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loadMore, hasMore, isLoading]);

  return {
    displayedItems,
    hasMore,
    isLoading,
    loadMoreRef,
    loadMore,
  };
}
