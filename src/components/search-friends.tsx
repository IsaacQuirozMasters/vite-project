import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, FormControl, FormLabel } from "@chakra-ui/react";
import { useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAxiosPrivate } from "../hooks/useAxiosPrivate";
import { FileInput } from "../context/interfaces";
import { AlertProps } from "../context/interfaces";

const FILE_URL = '/api/files/upload';

export function ChangeUserProfile({ isOpen, onClose }: AlertProps) {
  const axiosPrivate = useAxiosPrivate();
  const cancelRef = useRef<HTMLButtonElement | null>(null)
  const { register, handleSubmit } = useForm<FileInput>();

  const onSubmit: SubmitHandler<FileInput> = async (data) => {
    const formData = new FormData()
    formData.append('file', data.picture[0])
    try {
      await axiosPrivate.post(FILE_URL,
        formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      );
    } catch (err) {
      console.log(err);
    }
    console.log(formData)
  }
  return (
    <>
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
        <AlertDialogHeader className="text-lg font-bold text-white shadow-md">
         Buscar Archivo
        </AlertDialogHeader>


          <AlertDialogBody>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col p-4 justify-center max-w-screen-lg mx-auto h-full">
              <FormControl >
                <FormLabel>Archivo</FormLabel>
                <input {...register("picture")} type="file" />
              </FormControl>
              <Button ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
              <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              data-ripple-light="true">
                Aceptar
              </Button>
            </form>
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancelar
            </Button>
            <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded ml-3" type="submit" onClick={onClose}>
            Aceptar
            </button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  </>
  )
}