import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
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
import { Textarea } from "~/components/ui/textarea";
import { ExternalLink, LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import z from "zod";
import TraitSelect from "./TraitSelect";

const formSchema = z.object({
  name: z.string().min(1),
  pronouns: z.string().min(1),
  description: z.string().min(1),
  traits: z.tuple([z.string().min(1), z.string().min(1)]),
});
export type CharacterChange = z.infer<typeof formSchema>;

type Props = {
  defaultValues?: CharacterChange;
  onSubmit: (data: CharacterChange) => void;
  isPending: boolean;
};

export default function CharacterForm({
  defaultValues,
  onSubmit,
  isPending,
}: Props) {
  const form = useForm<CharacterChange>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues ?? {
      name: "",
      pronouns: "",
      description: "",
      traits: ["", ""],
    },
  });

  return (
    <Card className="w-full sm:w-sm">
      <CardHeader>
        <CardTitle>
          {defaultValues ? "Edit Character" : "Create Character"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
            autoComplete="off"
          >
            <FormField
              control={form.control}
              name="traits.0"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Trait 1</FormLabel>
                  <TraitSelect form={form} field={field} />
                  <FormDescription>
                    The first trait your character is famous for.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="traits.1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Trait 2</FormLabel>
                  <TraitSelect form={form} field={field} />
                  <FormDescription>
                    The second trait your character is famous for.
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
                    <Textarea
                      placeholder="An elderly woman with a kind face, sensible glasses, and unassuming clothing."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    How you&apos;d describe your character in a book.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Jessica Fletcher" {...field} />
                  </FormControl>
                  <FormDescription>
                    What people call your character. If you&apos;re struggling,
                    try this{" "}
                    <Link
                      href="https://www.fantasynamegenerators.com/detective-names.php"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-dark"
                    >
                      name generator{" "}
                      <ExternalLink className="inline" size={14} />
                    </Link>
                    .
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pronouns"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pronouns</FormLabel>
                  <FormControl>
                    <Input placeholder="She/Her" {...field} />
                  </FormControl>
                  <FormDescription>
                    The pronouns your character uses.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending && <LoaderCircle className="animate-spin" />}
              {defaultValues ? "Update" : "Create"} Character
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
