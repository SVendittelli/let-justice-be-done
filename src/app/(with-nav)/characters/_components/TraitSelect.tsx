import { Button } from "~/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import { FormControl } from "~/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { cn } from "~/lib/utils";
import { CheckIcon, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import type { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import type { CharacterChange } from "./CharacterForm";

const traits = [
  "amateur",
  "animal whisperer",
  "author",
  "child",
  '"corruptible"',
  '"coward"',
  "doctor",
  "encyclopaedic mind",
  '"incompetent"',
  "lie detector",
  "masked",
  "master of disguise",
  "migrant",
  "mind reader",
  "old",
  "perfect memory",
  "priest/nun",
  "recovering addict",
  "reformed cop",
  "reformed criminal",
  "reformed magician",
  "rich",
  "scientist",
  "soldier",
  "spirit medium",
  "working class",
];

type Props = {
  form: UseFormReturn<CharacterChange>;
  field: ControllerRenderProps<CharacterChange, "traits.0" | "traits.1">;
};

export default function TraitSelect({ form, field }: Props) {
  const [traitSearch, setTraitSearch] = useState("");

  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            className="justify-between capitalize"
          >
            {field.value || "Select Trait"}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput
            placeholder="Search traits..."
            onValueChange={setTraitSearch}
          />
          <CommandList>
            <CommandEmpty>Shouldnt ever see this</CommandEmpty>
            <CommandGroup>
              {Array.from(
                new Set([...traits, traitSearch, `${traitSearch} Expert`]),
              )
                .filter((trait) => !!trait)
                .map((trait) => (
                  <CommandItem
                    key={trait}
                    value={trait}
                    onSelect={() => {
                      form.setValue(field.name, trait);
                    }}
                    className="capitalize"
                  >
                    <CheckIcon
                      className={cn(
                        "mr-2 h-4 w-4",
                        trait === field.value ? "opacity-100" : "opacity-0",
                      )}
                    />
                    {trait}
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
