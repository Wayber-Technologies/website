import Image from "next/image";
import Link from "next/link";

const Logo: React.FC = () => {
  return (
    <Link href="/">
      <Image
        src="/images/logo/logo.svg"
        alt="logo"
        width={177}
        height={54}
        style={{ width: "177px", height: "54px" }}
        quality={100}
        priority={true}
        className="dark:hidden"
      />
      <Image
        src="/images/logo/DarkModeLogo.svg"
        alt="logo"
        width={177}
        height={54}
        style={{ width: "177px", height: "54px" }}
        quality={100}
        className="dark:block hidden"
      />
    </Link>
  );
};

export default Logo;
