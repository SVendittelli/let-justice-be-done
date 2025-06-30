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
import { Switch } from "~/components/ui/switch";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "~/trpc/react";

const clueSchema = z.object({
  title: z.string().min(1),
  text: z.string().min(1),
  revealed: z.boolean(),
});
type Clue = z.infer<typeof clueSchema>;

export default function ClueForm() {
  const utils = api.useUtils();
  const createClue = api.clues.create.useMutation({
    onSuccess: () => utils.clues.invalidate(),
  });

  const form = useForm<Clue>({
    resolver: zodResolver(clueSchema),
    defaultValues: {
      title: "",
      text: "",
      revealed: false,
    },
  });

  function onSubmit(clue: Clue) {
    createClue.mutate(clue);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Clue 1" {...field} />
              </FormControl>
              <FormDescription>The title of the clue.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Text</FormLabel>
              <FormControl>
                <Input
                  placeholder="Colonel Mustard has an addition to..."
                  {...field}
                />
              </FormControl>
              <FormDescription>The text of the clue.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="revealed"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Revealed</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormDescription>
                Whether the clue should be visible to the players yet.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Create Clue</Button>
      </form>
    </Form>
  );
}
