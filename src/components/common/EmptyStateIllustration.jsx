import clsx from "clsx";
import Image from "next/image";

const EmptyStateIllustration = ({
  textButton,
  headerText,
  bodyText,
  illustration,
  size = "h-[75vh] w-full",
  textWidth = "w-[70%]",
}) => {
  return (
    <div className={`${size} flex flex-col items-center justify-center gap-6`}>
      <div>
        <Image src={illustration} alt="Illustration" width={300} height={300} />
      </div>
      <div className="text-center">
        <div className="mx-auto w-[75vw] font-medium md:max-w-md">
          <p className="text-base">{headerText}</p>
          <p className={clsx(`mx-auto mt-1 text-xs text-gray-600`, textWidth)}>
            {bodyText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmptyStateIllustration;
