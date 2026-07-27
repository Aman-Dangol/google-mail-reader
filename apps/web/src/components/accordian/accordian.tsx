import { Accordion } from "radix-ui";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { mergeClass } from "@src/utils/tailwind-class-merge/classMerge";

export const AccordionItem = (props: Accordion.AccordionItemProps) => {
  return <Accordion.Item {...props} />;
};

export const AccordionTrigger = (props: Accordion.AccordionTriggerProps) => {
  return (
    <Accordion.Header className='flex'>
      <Accordion.Trigger
        {...props}
        className={mergeClass(
          "group text-violet11 hover:bg-mauve2 flex h-[45px] flex-1 cursor-pointer items-center justify-between px-5 text-[15px] leading-none outline-none",
          props.className,
        )}>
        {props.children}
        <ChevronDownIcon
          className='text-violet10 transition-transform duration-300 ease-[cubic-bezier(0.87,0,0.13,1)] group-data-[state=open]:rotate-180'
          aria-hidden
        />
      </Accordion.Trigger>
    </Accordion.Header>
  );
};

export const AccordionContent = (props: Accordion.AccordionContentProps) => {
  return (
    <Accordion.Content
      className={mergeClass(
        "bg-mauve2 text-mauve11 data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown overflow-hidden text-[15px]",
        props.className,
      )}
      {...props}>
      <div className='px-5 py-[15px]'>{props.children}</div>
    </Accordion.Content>
  );
};

export const AccordianRoot = (
  props: Accordion.AccordionSingleProps | Accordion.AccordionMultipleProps,
) => {
  return <Accordion.Root {...props} />;
};
