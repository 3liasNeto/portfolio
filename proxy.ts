import { type NextRequest } from "next/server";
import { withDict } from "./dictionaries/middleware";

export function proxy(request: NextRequest) {
  return withDict(request);
}

export const config = {
  // Skip Next internals, files with an extension and the generated app icons
  matcher: ["/((?!_next|api|icon|apple-icon|.*\\..*).*)"],
};
