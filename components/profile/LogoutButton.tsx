"use client";

import { logoutService } from "@/db/service/user-service";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "../ui/button";

const LogoutButton = () => {
  const { push } = useRouter();
  const { mutate, isPending } = useMutation({
    mutationKey: ["logout"],
    mutationFn: logoutService,
    onError: () => {
      toast.error("Failed to logout!");
    },
    onSuccess: () => {
      toast.success("Logged out successfully!");
      push("/login");
    },
  });
  return (
    <Button
      onClick={() => mutate()}
      disabled={isPending}
      variant={"destructive"}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
