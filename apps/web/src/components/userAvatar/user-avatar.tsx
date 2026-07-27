import { getInitials } from "@src/utils/helpers/get-initials";

interface Props {
  name: string;
}

export const UserAvatar = ({ name }: Props) => {
  const initials = getInitials(name);

  return (
    <section className='bg-bg-secondary/85 flex size-4 items-center justify-center rounded-full p-4'>
      {initials}
    </section>
  );
};
