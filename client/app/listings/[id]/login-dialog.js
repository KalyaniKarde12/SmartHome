"use client"

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function LoginDialog({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sign in to book</DialogTitle>
          <DialogDescription>Please sign in or create an account to continue with your booking.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <Button variant="default">Sign In</Button>
          <Button variant="outline">Create Account</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}