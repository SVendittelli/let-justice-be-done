import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "~/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { addOrRemove, cn } from "~/lib/utils";
import type { RouterOutputs } from "~/trpc/react";
import { api } from "~/trpc/react";
import { CheckIcon, ChevronsUpDown, LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";

const linkSchema = z.object({
  crimeScenes: z.array(z.string().cuid2()),
  clues: z.array(z.string().cuid2()),
});
type Links = z.infer<typeof linkSchema>;

type Props = {
  npc: RouterOutputs["npcs"]["getAll"][0];
};

export default function NonPlayerCharacterLinkForm({ npc }: Props) {
  const utils = api.useUtils();
  const clues = api.clues.getAll.useQuery();
  const crimeScenes = api.scenes.getAll.useQuery();
  const save = api.npcs.link.useMutation({
    onSuccess: () => utils.invalidate(),
  });

  const form = useForm<Links>({
    resolver: zodResolver(linkSchema),
    defaultValues: {
      crimeScenes: npc.crimeScenes.map(({ id }) => id),
      clues: npc.clues.map(({ id }) => id),
    },
  });

  if (!crimeScenes.data || !clues.data) {
    return null;
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) =>
          save.mutate({ id: npc.id, ...data }),
        )}
        className="flex w-full flex-col gap-2"
      >
        <FormField
          control={form.control}
          name="crimeScenes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Crime Scenes</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className="justify-between capitalize"
                    >
                      {field.value.length
                        ? `${field.value.length} Crime Scenes`
                        : "Select Crime Scenes"}
                      <ChevronsUpDown className="opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                  <Command>
                    <CommandInput placeholder="Search Crime Scenes..." />
                    <CommandList>
                      <CommandEmpty>No Crime Scene found.</CommandEmpty>
                      <CommandGroup>
                        {crimeScenes.data.map((scene) => (
                          <CommandItem
                            key={scene.id}
                            value={scene.id}
                            onSelect={() => {
                              form.setValue(
                                field.name,
                                addOrRemove(field.value, scene.id),
                              );
                            }}
                          >
                            <CheckIcon
                              className={cn(
                                "mr-2 h-4 w-4",
                                field.value.includes(scene.id)
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            {scene.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="clues"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Clues</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className="justify-between capitalize"
                    >
                      {field.value.length
                        ? `${field.value.length} Clues`
                        : "Select Clues"}
                      <ChevronsUpDown className="opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                  <Command>
                    <CommandInput placeholder="Search Clues..." />
                    <CommandList>
                      <CommandEmpty>No NPC found.</CommandEmpty>
                      <CommandGroup>
                        {clues.data.map((clue) => (
                          <CommandItem
                            key={clue.id}
                            value={clue.id}
                            onSelect={() => {
                              form.setValue(
                                field.name,
                                addOrRemove(field.value, clue.id),
                              );
                            }}
                          >
                            <CheckIcon
                              className={cn(
                                "mr-2 h-4 w-4",
                                field.value.includes(clue.id)
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            {clue.title}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />
        <Button type="submit" className="mt-2 w-full" disabled={save.isPending}>
          {save.isPending && <LoaderCircle className="animate-spin" />}
          Link
        </Button>
      </form>
    </Form>
  );
}
