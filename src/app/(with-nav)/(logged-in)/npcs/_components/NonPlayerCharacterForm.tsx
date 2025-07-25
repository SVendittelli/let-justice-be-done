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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Switch } from "~/components/ui/switch";
import { Textarea } from "~/components/ui/textarea";
import { LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";

const npcSchema = z.object({
  name: z.string().min(1),
  moniker: z.string().min(1),
  description: z.string().min(1),
  type: z.enum(["AUTHORITY", "SUSPECT"]),
  imageUrl: z.string().url(),
  imageBlurData: z.string().min(1),
  revealed: z.boolean(),
});
export type NpcChange = z.infer<typeof npcSchema>;

type Props = {
  defaultValues?: NpcChange;
  onSubmit: (clue: NpcChange) => void;
  isPending: boolean;
};

export default function NonPlayerCharacterForm({
  defaultValues,
  onSubmit,
  isPending,
}: Props) {
  const form = useForm<NpcChange>({
    resolver: zodResolver(npcSchema),
    defaultValues: defaultValues ?? {
      name: "",
      moniker: "",
      description: "",
      type: "SUSPECT",
      imageUrl: "",
      imageBlurData: "",
      revealed: false,
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
        autoComplete="off"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Leonard Clement" {...field} />
              </FormControl>
              <FormDescription>The name the NPC.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="moniker"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Moniker</FormLabel>
              <FormControl>
                <Input placeholder="The Vicar" {...field} />
              </FormControl>
              <FormDescription>
                The job title/notable feature of the NPC.
              </FormDescription>
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
                <Textarea placeholder="Faded and indeterminate..." {...field} />
              </FormControl>
              <FormDescription>The description of the NPC.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select the NPC type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="AUTHORITY">Authority</SelectItem>
                  <SelectItem value="SUSPECT">Suspect</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>The description of the NPC.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input placeholder="https://..." {...field} />
              </FormControl>
              <FormDescription>Image of the NPC.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageBlurData"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image Blur Data</FormLabel>
              <FormControl>
                <Input placeholder="data:image/png;base64," {...field} />
              </FormControl>
              <FormDescription>Data URL of the blured image.</FormDescription>
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
                Whether the NPC should be visible to the players yet.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending && <LoaderCircle className="animate-spin" />}
          {defaultValues ? "Update" : "Create"} NPC
        </Button>
      </form>
    </Form>
  );
}
