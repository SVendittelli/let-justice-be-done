"use client";

import { useForm } from "react-hook-form";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { api } from "~/trpc/react";

type Message = { text: string };
export default function ToastTrigger() {
  const message = api.toast.message.useMutation();
  const reveal = api.toast.reveal.useMutation();

  const form = useForm<Message>({ defaultValues: { text: "" } });

  const sendMessage = ({ text }: Message) => message.mutate(text);

  return (
    <div className="flex flex-col gap-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(sendMessage)}>
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Input placeholder="Hey!" {...field} />
                </FormControl>
                <FormDescription>The message in the toast.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Send Message
          </Button>
        </form>
      </Form>
      <Button onClick={() => reveal.mutate()}>Send Reveal Clue Toast</Button>
    </div>
  );
}
