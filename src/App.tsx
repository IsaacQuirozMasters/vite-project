import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, FormControl, FormLabel } from "@chakra-ui/react";
import { useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {useAxiosPrivate} from './hooks/useAxiosPrivate';

interface AlertProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FileInput {
  picture: FileList;
} 

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
          <AlertDialogHeader fontSize='lg' fontWeight='bold' className="text-white shadow-md">
            Search File
          </AlertDialogHeader>

          <AlertDialogBody>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col p-4 justify-center max-w-screen-lg mx-auto h-full">
              <FormControl >
                <FormLabel>File</FormLabel>
                <input {...register("picture")} type="file" />
              </FormControl>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              data-ripple-light="true">
                Accepts
              </Button>
            </form>
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='red' type="submit" onClick={onClose} ml={3}>
              Accept
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  </>
  )
}