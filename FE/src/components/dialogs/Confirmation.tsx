import type { FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";

interface ConfirmationProps {
  open: boolean;
  onClose: (response: boolean) => void;
}

const Confirmation: FC<ConfirmationProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
        <DialogContent>
          <DialogTitle>Confirmation</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this item?
          </DialogDescription>
          <DialogFooter>
            <Button variant="outline" onClick={() => onClose(false)}>
              No
            </Button>
            <Button onClick={() => onClose(true)}>Yes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
  );
};

export default Confirmation;
