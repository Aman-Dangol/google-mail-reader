import { NavContext } from "@src/utils/context/nav-context";
import { useContext } from "react";
import { useGetAllMailInfiniteQuery } from "@src/utils/hooks/query-hooks/mails";
import { MailBox } from "@src/components/mail-box/mail-box";
import { useIniniteQueryloading } from "@src/utils/hooks/infinite-query-loader/infinite-query-loading-hooks";
import { MailProvider } from "@src/utils/context/selected-mail-context";
import { MailPreview } from "@src/pages/Mails/components/mail-preview";

export default function MailPage() {
  const mailType = useContext(NavContext).currentTab;

  const {
    data: mailsReponse,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isError,
  } = useGetAllMailInfiniteQuery(mailType);

  const { loaderElement } = useIniniteQueryloading({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  if (isError) {
    return <div>error</div>;
  }
  if (isLoading) {
    return <div>content is Loading</div>;
  }

  const allMails = mailsReponse?.pages.flatMap((data) => data.data);

  return (
    <MailProvider>
      <section className="overflow-auto h-full scrollbar flex">
        <section className="flex-1">
          {allMails?.map((mail, index) => (
            <MailBox mail={mail} key={mail.id} index={index} />
          ))}
          {loaderElement}
        </section>
        <MailPreview className="w-[60%] sticky top-0 transition-[width] duration-500 border rounded-2xl rounded-l-none  p-4" />
      </section>
    </MailProvider>
  );
}
