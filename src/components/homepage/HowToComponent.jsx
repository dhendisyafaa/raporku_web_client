import { phoneNumberAdmin } from "@/configs/config";
import { useRouter } from "next/router";
import ButtonComponent from "../button/ButtonComponent";

const HowToComponent = () => {
  const { push } = useRouter();
  return (
    <div className="flex flex-col items-center m-auto justify-center gap-5 text-center min-h-[50vh] md:w-[70%] lg:w-[60%]">
      <p className="text-navy text-2xl lg:text-4xl font-medium lg:font-semibold">
        Bagaimana pembuatan akun siswa, guru, dan admin sekolah?
      </p>
      <p className="text-lg text-grey leading-snug">
        Hubungi admin dibawah untuk siswa atau guru yang baru bergabung dalam
        lingkungan sekolah ini, atau untuk mendapatkan akses sebagai admin!
      </p>
      <ButtonComponent
        defaultButton={true}
        title="Hubungi Admin"
        onClick={() => push(`${phoneNumberAdmin}`)}
        customStyle={
          "bg-orange shadow-lg shadow-orange/40 text-white px-6 py-3 hover:bg-orange/90"
        }
      />
    </div>
  );
};

export default HowToComponent;
