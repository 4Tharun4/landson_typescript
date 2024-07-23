import React from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  

interface DialogBoxProps {
  title: string;
  desc: string;
  triger: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  BtnText: string;
  children: React.ReactNode; // Define the children prop
  onclick: () => void; // Function type for onclick
}

const Dailogbox: React.FC<DialogBoxProps> = ({ title, desc, triger, open, setOpen, BtnText, children, onclick }) => {
  return (
    <AlertDialog   open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger className='' asChild>
        <button onClick={onclick}>{triger}</button>
      </AlertDialogTrigger>
      <AlertDialogContent className='w-full   '>
        <AlertDialogTitle>{title}</AlertDialogTitle>
        <AlertDialogDescription>{children}</AlertDialogDescription>
         {/* Render the children prop */}
        <AlertDialogAction>
          <button onClick={() => setOpen(false)}>{BtnText}</button>
        </AlertDialogAction>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Dailogbox;
