import { type LoaderData, handle } from "~/root.tsx";
import { useMatchLoaderData } from "./providers.tsx";

export const useRootLoader = () => useMatchLoaderData<LoaderData>(handle.id)