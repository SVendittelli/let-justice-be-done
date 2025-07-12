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
import { Textarea } from "~/components/ui/textarea";
import { LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";

const sceneSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  revealed: z.boolean(),
});
export type CrimeSceneChange = z.infer<typeof sceneSchema>;

type Props = {
  defaultValues?: CrimeSceneChange;
  onSubmit: (clue: CrimeSceneChange) => void;
  isPending: boolean;
};

export default function CrimeSceneForm({
  defaultValues,
  onSubmit,
  isPending,
}: Props) {
  const form = useForm<CrimeSceneChange>({
    resolver: zodResolver(sceneSchema),
    defaultValues: defaultValues ?? {
      name: "",
      description: "",
      revealed: false,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="The Vicarage" {...field} />
              </FormControl>
              <FormDescription>The name the crime scene.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="A small, quaint building..."
                  {...field}
                />
              </FormControl>
              <FormDescription>
                The description of the crime scene.
              </FormDescription>
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
                Whether the Crime Scene should be visible to the players yet.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending && <LoaderCircle className="animate-spin" />}
          {defaultValues ? "Update" : "Create"} Crime Scene
        </Button>
      </form>
    </Form>
  );
}
