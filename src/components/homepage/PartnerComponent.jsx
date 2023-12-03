import Image from "next/image";
const PartnerComponent = () => {
  return (
    <div className="text-center">
      <p className="text-navy text-xl lg:text-2xl font-medium lg:font-semibold my-3">
        <span className="underline decoration-primary">Partner</span> kami
      </p>
      <div className="flex justify-around max-w-sm mx-auto p-5">
        <Image
          src={"/images/smk2_logo_gray.png"}
          alt="smk 2 logo"
          width={58}
          height={54}
        />
        <Image
          src={"/images/rpl_logo_gray.png"}
          alt="rpl logo"
          width={52}
          height={52}
        />
        <Image
          src={"/images/avenir_logo_gray.png"}
          alt="avenir logo"
          width={60}
          height={60}
          className="bg-transparent"
        />
      </div>
    </div>
  );
};

export default PartnerComponent;
