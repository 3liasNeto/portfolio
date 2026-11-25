import Image from "next/image";
import { profile } from "../../data";

// Face crop of the full-art card, used as the author avatar
export function AuthorAvatar({ className = "size-11" }: { className?: string }) {
  return (
    <span className={`relative block shrink-0 overflow-hidden rounded-full border-2 border-signal ${className}`}>
      <Image
        src={profile.cardArt}
        alt=""
        fill
        sizes="96px"
        className="scale-[2.6] object-cover"
        style={{ objectPosition: "55% 18%", transformOrigin: "55% 20%" }}
      />
    </span>
  );
}
