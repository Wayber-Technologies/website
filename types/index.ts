export type TtextHoverProps = {
  titile1: string;
  titile2: string;
};

export interface ExploreCardProps {
  title: string;
  id: string | number;
  imgUrl: string;
  number: string;
  description: string;
  index: number;
  active: string;
  handleClick: any;
}

export type TlogoMarqueeProps = {
  children: React.ReactNode;
  baseVelocity: string | number | any;
};

export type TMarqueeProps = {
  title: string;
  className: string;
};

export type TLinkHoverProps = {
  title: string;
  href: string;
  className?: string;
};

export type TButtonProps = {
  title: string;
  href: string;
};

export type TRoundedProps = {
  children: React.ReactNode;
  className?: string;
  backgroundColor: string;
};
