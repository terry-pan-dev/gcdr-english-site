declare module "react-responsive-masonry" {
  import { ReactNode } from "react";

  interface MasonryProps {
    columnsCount?: number;
    gutter?: string;
    children: ReactNode;
    className?: string;
  }

  const Masonry: React.FC<MasonryProps>;
  export default Masonry;
}

