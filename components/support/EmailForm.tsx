"use client";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { sendEmail } from "@/lib/send-email";
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Please Enter Your Name" }),
  email: z.string().email({ message: "Please Enter a Valid Email Address" }),
  message: z.string().min(10, {
    message: "Please make sure your message is at least 10 characters long.",
  }),
});
export default function EmailForm() {
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["sendEmail"],
    mutationFn: sendEmail,
    onError: (error) => {
      console.log(error);
    },
    onSuccess: () => {
      form.reset();
    },
  });
  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });
  const onSubmit = async ({
    name,
    message,
    email,
  }: z.infer<typeof contactFormSchema>) => {
    const handlSubmitToast = async () => {
      await mutateAsync({
        subject: `New message from ${name}`,
        text: message + `\n\nSent by: ${email}`,
      });
    };

    toast.promise(handlSubmitToast, {
      loading: "Sending Email...",
      success: "Email Sent Successfully!",
      error: "Failed to send email. Please try again later.",
    });
  };
  return (
    <Form {...form}>
      <form
        className="grid w-full max-w-xl grid-cols-3 items-center p-4 lg:p-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="col-span-3 flex flex-col gap-4 lg:col-span-3 lg:gap-6">
          <h2 className="lg:text-xl">Enter Your Good Name Here:</h2>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <h2 className="lg:text-xl">Enter Your Email Address:</h2>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="john@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <h2 className="lg:text-xl">Enter Your Message Here:</h2>
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="My question is what the dog doing?"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isPending}>Send</Button>
        </div>
      </form>
    </Form>
  );
}
