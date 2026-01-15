import type { PageData } from "../types/types";
import { sayfaBulunamadi } from "./404";
import { gizlilikPolitikasi } from "./terms";

export const pageData: PageData[] = [
  {
    ...gizlilikPolitikasi,
  },
  {
    ...sayfaBulunamadi,
  },
];
