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

const clueSchema = z.object({
  title: z.string().min(1),
  text: z.string().min(1),
  revealed: z.boolean(),
});
type Clue = z.infer<typeof clueSchema>;

export default function ClueForm() {
  const form = useForm<Clue>({
    resolver: zodResolver(clueSchema),
    defaultValues: {
      title: "",
      text: "",
      revealed: false,
    },
  });

  function onSubmit(values: Clue) {
    console.log(values);
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
