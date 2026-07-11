import { Tabs } from "radix-ui";
import { useEffect, useRef, useState } from "react";

export const TabsTrigger = (props: Tabs.TabsTriggerProps) => (
  <Tabs.Trigger
    className="h-8 w-24 rounded-md data-[state=active]:font-semibold
     flex-1 select-none text-base  cursor-pointer hover:bg-bg-secondary "
    {...props}
  />
);

export const TabsContent = (props: Tabs.TabsContentProps) => (
  <Tabs.Content
    className="grow rounded-b-md p-5 outline-none"
    {...props}
  ></Tabs.Content>
);

export const TabsRoot = (props: Tabs.TabsProps) => (
  <Tabs.Root className="flex flex-col " defaultValue="tab1" {...props} />
);

export const TabsList = (props: Tabs.TabsListProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [indicator, setIndicator] = useState({
    left: 0,
    width: 0,
    visible: false,
  });

  const updateIndicator = () => {
    const container = containerRef.current;
    if (!container) return;
    const active = container.querySelector(
      '[data-state="active"]',
    ) as HTMLElement | null;
    if (!active) {
      setIndicator({ left: 0, width: 0, visible: false });
      return;
    }
    const containerRect = container.getBoundingClientRect();
    const activeRect = active.getBoundingClientRect();
    const left = activeRect.left - containerRect.left + container.scrollLeft;
    const width = activeRect.width;
    setIndicator({ left, width, visible: true });
  };

  useEffect(() => {
    updateIndicator();
    const container = containerRef.current;

    if (!container) return;

    const ro = new ResizeObserver(() => updateIndicator());
    ro.observe(container);
    // Also observe active element size changes
    const mo = new MutationObserver(() => updateIndicator());
    mo.observe(container, {
      subtree: true,
      attributes: true,
      attributeFilter: ["data-state"],
    });

    const onWinResize = () => updateIndicator();
    window.addEventListener("resize", onWinResize);

    return () => {
      ro.disconnect();
      mo.disconnect();
      window.removeEventListener("resize", onWinResize);
    };
    // intentionally no deps: we want to observe DOM changes
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <Tabs.List className="flex shrink-0" {...props} />
      <div
        aria-hidden
        className="absolute bottom-0 h-0.5 bg-fg-primary
         rounded-full transition-all duration-300 ease-out"
        style={{
          left: indicator.visible ? indicator.left : 0,
          width: indicator.visible ? indicator.width : 0,
        }}
      />
    </div>
  );
};
