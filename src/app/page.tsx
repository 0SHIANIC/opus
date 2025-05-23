import { Navbar } from "./_components/navbar";
import { auth } from "~/server/auth";
import { HydrateClient } from "~/trpc/server";
import { NewUserModalWrapper } from "./_components/modalWrappers";
import Header from "./_components/header";
import HomeClient from "./_components/pages/HomeClient";
import styles from "./index.module.css";
import NotLoggedIn from "./_components/pages/NotLoggedIn";
import { PWAInstallHelper } from "./_components/pwaInstallHelper";

export default async function Home() {
  const session = await auth();
  const userId = session?.user.id || "null";

  if (session) {
    return (
      <HydrateClient>
        <Header userId={userId} theme={session.user.themePreset} />
        <HomeClient session={session} theme={session.user.themePreset} />
        <NewUserModalWrapper displayName={session?.user.displayName ?? null} />
        <Navbar />
      </HydrateClient>
    );
  }
  return (
    <HydrateClient>
      {<PWAInstallHelper />}
      <NotLoggedIn />
    </HydrateClient>
  );
}
