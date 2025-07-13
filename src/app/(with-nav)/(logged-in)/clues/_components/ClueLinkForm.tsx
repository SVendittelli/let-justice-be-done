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
import { cn } from "~/lib/utils";
import type { RouterOutputs } from "~/trpc/react";
import { api } from "~/trpc/react";
import { CheckIcon, ChevronsUpDown, LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";

const linkSchema = z.object({
  crimeScenes: z.array(z.string().cuid2()),
  npcs: z.array(z.string().cuid2()),
});
type Links = z.infer<typeof linkSchema>;

type Props = {
  clue: RouterOutputs["clues"]["getAll"][0];
};

export default function ClueLinkForm({ clue }: Props) {
  const utils = api.useUtils();
  const crimeScenes = api.scenes.getAll.useQuery();
  const npcs = api.npcs.getAll.useQuery();
  const save = api.clues.link.useMutation({
    onSuccess: () => utils.invalidate(),
  });

  const form = useForm<Links>({
    resolver: zodResolver(linkSchema),
    defaultValues: {
      crimeScenes: clue.crimeScenes.map(({ id }) => id),
      npcs: clue.npcs.map(({ id }) => id),
    },
  });

  if (!crimeScenes.data || !npcs.data) {
    return null;
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) =>
          save.mutate({ id: clue.id, ...data }),
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
          name="npcs"
          render={({ field }) => (
            <FormItem>
              <FormLabel>NPCs</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className="justify-between capitalize"
                    >
                      {field.value.length
                        ? `${field.value.length} NPCs`
                        : "Select NPCs"}
                      <ChevronsUpDown className="opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                  <Command>
                    <CommandInput placeholder="Search NPCs..." />
                    <CommandList>
                      <CommandEmpty>No NPC found.</CommandEmpty>
                      <CommandGroup>
                        {npcs.data.map((npc) => (
                          <CommandItem
                            key={npc.id}
                            value={npc.id}
                            onSelect={() => {
                              form.setValue(
                                field.name,
                                addOrRemove(field.value, npc.id),
                              );
                            }}
                          >
                            <CheckIcon
                              className={cn(
                                "mr-2 h-4 w-4",
                                field.value.includes(npc.id)
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            {npc.name}
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

function addOrRemove(array: string[], value: string) {
  if (array.includes(value)) {
    return array.filter((item) => item !== value);
  }
  return array.concat(value);
}
