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
  heading?: string;
  description?: string;
  content?: React.ReactNode;
}

const CustomDialog = (props: DialogProps) => {
  return (
    <DialogContainer>
      <DialogTrigger>{props.trigger}</DialogTrigger>
      <DialogContent>
        {props.withHeader && (
          <DialogHeader>
            <DialogTitle className="text-center">
              <h4>{props.heading}</h4>
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
