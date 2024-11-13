import React from "react";
import {
  Dialog as DialogContainer,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface DialogProps {
  trigger?: React.ReactNode;
  withHeader?: boolean;
  heading?: React.ReactNode;
  description?: string;
  content?: React.ReactNode;
  className?: string;
  openDialog?: boolean;
  setOpenDialog?: (open: boolean) => void;
}

const CustomDialog = (props: DialogProps) => {
  return (
    <DialogContainer open={props.openDialog} onOpenChange={props.setOpenDialog}>
      <DialogTrigger>{props.trigger}</DialogTrigger>
      <DialogContent className={props.className}>
        {props.withHeader && (
          <DialogHeader>
            <DialogTitle className="text-center">
              <div>{props.heading}</div>
            </DialogTitle>
            <DialogDescription>{props.description}</DialogDescription>
          </DialogHeader>
        )}
        {props.content}
      </DialogContent>
    </DialogContainer>
  );
};

export default CustomDialog;
