import Image from "next/image";
import Slider from "react-infinite-logo-slider";

const SingleBrand = ({ brand }: { brand: any }) => {
  const { image, title, darkImg } = brand;

  return (
    <Slider.Slide>
      <div className="flex items-center justify-center h-20 px-8 group cursor-pointer">
        <div className="relative w-[120px] h-[60px] flex items-center justify-center transition-transform duration-300 ease-out hover:scale-105">
          <Image src={image} alt={title} fill className="dark:hidden object-contain  transition-opacity duration-300" />
          <Image
            src={darkImg}
            alt={title}
            fill
            className="dark:block hidden object-contain transition-opacity duration-300"
          />
        </div>
      </div>
    </Slider.Slide>
  );
};

export default SingleBrand;
