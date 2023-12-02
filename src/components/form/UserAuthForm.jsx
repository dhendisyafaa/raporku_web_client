import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginFormAdmin from "./LoginFormAdmin";
import LoginFormStudent from "./LoginFormStudent";
import LoginFormTeacher from "./LoginFormTeacher";

const UserAuthForm = () => {
  return (
    <Tabs defaultValue="student" className="w-[90%] md:w-[400px]">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="student">Siswa</TabsTrigger>
        <TabsTrigger value="teacher">Guru</TabsTrigger>
        <TabsTrigger value="admin">Admin</TabsTrigger>
      </TabsList>
      <TabsContent value="student">
        <LoginFormStudent />
      </TabsContent>
      <TabsContent value="teacher">
        <LoginFormTeacher />
      </TabsContent>
      <TabsContent value="admin">
        <LoginFormAdmin />
      </TabsContent>
    </Tabs>
  );
};

export default UserAuthForm;
