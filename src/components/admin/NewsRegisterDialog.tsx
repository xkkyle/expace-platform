"use client";

import React from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  NewsRegisterForm,
} from "@/components";
import { useMediaQuery } from "@/hooks";
import screenSize from "@/constants/screenSize";

function TriggerButton({ open, ...props }: { open: () => void }) {
  return (
    <Button
      type="button"
      size="icon-lg"
      onClick={open}
      className="min-w-20"
      {...props}
    >
      Register
    </Button>
  );
}

function RegisterBody({ close }: { close: () => void }) {
  return <NewsRegisterForm inDialog={true} close={close} />;
}

export default function NewsRegisterDialog() {
  const isMobile = useMediaQuery(screenSize.MAX_SM);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const title = "뉴스 등록";
  const close = () => setIsDialogOpen(false);

  return (
    <>
      {isMobile ? (
        <Drawer open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DrawerTrigger asChild>
            <TriggerButton open={() => setIsDialogOpen(true)} />
          </DrawerTrigger>
          <DrawerContent className="">
            <DrawerHeader className="py-3 text-left">
              <DrawerTitle className="text-start text-lg">{title}</DrawerTitle>
            </DrawerHeader>
            <div className="px-3">
              <RegisterBody close={close} />
            </div>
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <TriggerButton open={() => setIsDialogOpen(true)} />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-start text-xl">{title}</DialogTitle>
            </DialogHeader>
            <RegisterBody close={close} />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
