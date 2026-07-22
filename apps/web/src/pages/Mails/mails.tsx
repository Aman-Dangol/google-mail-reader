import { NavContext } from "@src/utils/context/nav-context";
import { useContext } from "react";
import { useGetAllMailInfiniteQuery } from "@src/utils/hooks/query-hooks/mails";
import { MailBox } from "@src/components/mail-box/mail-box";
import { useIniniteQueryloading } from "@src/utils/hooks/infinite-query-loader/infinite-query-loading-hooks";

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
    <section className="overflow-auto h-full scrollbar">
      <section>
        {allMails?.map((mail) => (
          <MailBox {...mail} key={mail.id} />
        ))}
        {loaderElement}
      </section>
    </section>
  );
}
