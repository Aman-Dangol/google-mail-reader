import { Loader2 } from "lucide-react";
import { useEffect, useRef } from "react";

interface Props {
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  hasNextPage: boolean;
}

export const useIniniteQueryloading = ({
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && !isFetchingNextPage && hasNextPage) {
          fetchNextPage();
        }
      },
      {
        threshold: 0.2,
      },
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const loaderElement = (
    <div ref={ref} className="h-8 flex items-center justify-center">
      {isFetchingNextPage && (
        <Loader2 className="animate-spin [animation-duration:2s]" />
      )}
    </div>
  );

  return {
    loaderElement,
  };
};
