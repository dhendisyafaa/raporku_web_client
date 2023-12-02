import { useUpdateAvatar } from "@/pages/api/resolver/avatarResolver";
import { useState } from "react";
import { useForm } from "react-hook-form";
import LoadingOval from "../common/LoadingOval";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

const FormEditAvatar = ({ image, username, idUser, levelUser }) => {
  const [loadingButton, setloadingButton] = useState(false);
  const { mutateAsync: updateAvatar } = useUpdateAvatar();
  const [preview, setPreview] = useState("");
  const [file, setFile] = useState("");

  const form = useForm({});

  const onSubmit = async () => {
    setloadingButton(true);
    try {
      const formData = new FormData();
      formData.append("avatar", file);
      const data = [{ level: levelUser }, { id: idUser }, { data: formData }];
      await updateAvatar(data);
      setloadingButton(false);
    } catch (error) {
      setloadingButton(false);
      console.log("error catch", error);
    }
  };

  const getImageData = (event) => {
    const image = event.target.files[0];
    setFile(image);
    const dataTransfer = new DataTransfer();
    Array.from(event.target?.files).forEach((image) =>
      dataTransfer.items.add(image)
    );

    const files = dataTransfer.files;
    const displayUrl = URL.createObjectURL(event.target?.files[0]);

    return { files, displayUrl };
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex items-center sm:items-end flex-wrap gap-3">
          {preview ? (
            <Avatar className="w-20 h-20 border-primary border-2">
              <AvatarImage
                className="object-cover"
                alt="new avatar"
                src={preview}
              />
              <AvatarFallback>newAvatar</AvatarFallback>
            </Avatar>
          ) : (
            <Avatar className="w-20 h-20 border-primary border-2">
              <AvatarImage
                className="object-cover"
                alt={`avatar from @${username}`}
                src={image}
              />
              <AvatarFallback>{username}</AvatarFallback>
            </Avatar>
          )}
          <div className="grid w-full max-w-[200px] gap-1.5">
            <FormField
              control={form.control}
              name="avatar"
              render={({ field: { onChange, value, ...rest } }) => (
                <>
                  <FormItem>
                    <FormLabel>Ganti Foto Profil</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        name="avatar"
                        multiple={true}
                        disabled={form.formState.isSubmitting}
                        {...rest}
                        onChange={(event) => {
                          const { files, displayUrl } = getImageData(event);
                          setPreview(displayUrl);
                          onChange(files);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </>
              )}
            />
          </div>
          <Button
            type="submit"
            disabled={loadingButton || !preview}
            className="flex gap-3 w-full sm:max-w-fit"
          >
            {loadingButton && <LoadingOval />}
            Ganti Foto
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default FormEditAvatar;
