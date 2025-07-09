"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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
import { MessageSquareShare } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";

const reveals: {
  type: "CLUE" | "NPC" | "CRIME_SCENE";
  name: string;
  path: string;
}[] = [
  { type: "CLUE", name: "A Clue", path: "/clues" },
  { type: "NPC", name: "An NPC", path: "/npcs" },
  { type: "CRIME_SCENE", name: "A Crime Scene", path: "/crime-scenes" },
];

const messageSchema = z.object({ text: z.string().min(1) });
type Message = z.infer<typeof messageSchema>;

export default function ToastTrigger() {
  const message = api.toast.message.useMutation();
  const reveal = api.toast.reveal.useMutation();

  const form = useForm<Message>({
    resolver: zodResolver(messageSchema),
    defaultValues: { text: "" },
  });

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
            <MessageSquareShare /> Message
          </Button>
        </form>
      </Form>
      {reveals.map(({ type, name, path }) => {
        const message = `${name} has been revealed!`;
        return (
          <Button
            key={type}
            onClick={() => reveal.mutate({ message, path, type })}
          >
            <MessageSquareShare /> {name}
          </Button>
        );
      })}
    </div>
  );
}
