import { Spinner,Alert,AlertIcon,AlertTitle,useToast, useDisclosure} from '@chakra-ui/react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Button
} from '@chakra-ui/react'

function Alerts({para, func,ref,body,header})
{
    const { isOpen,onClose } = para;
    const cancelRef = ref;

    return(
        <>
            <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>{header}</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            {body}
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button colorScheme='red' ml={3} onClick = {()=> {func();onClose()}}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
        </>
    )
}

export default Alerts;