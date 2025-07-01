import Image from "next/image";

export default function Billboard() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Image
        className="aspect-square max-h-[256px] max-w-[256px] rounded-full border-8 border-gold object-contain"
        src="/icon.svg"
        alt="Let Justice Be Done logo"
        width={256}
        height={256}
      />
    </div>
  );
}
