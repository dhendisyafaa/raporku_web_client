import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginFormStudent from "./LoginFormStudent";
import LoginFormTeacher from "./LoginFormTeacher";

const UserAuthForm = () => {
  return (
    <Tabs defaultValue="student" className="w-[90%] md:w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="student">Siswa</TabsTrigger>
        <TabsTrigger value="teacher">Guru</TabsTrigger>
      </TabsList>
      <TabsContent value="student">
        <LoginFormStudent />
      </TabsContent>
      <TabsContent value="teacher">
        <LoginFormTeacher />
      </TabsContent>
    </Tabs>
    // <div className="justify-center items-center flex w-full h-screen">
    // </div>
  );
};

export default UserAuthForm;
