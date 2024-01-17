import { useEffect } from "react";
import ApplicationNavigator from "./src/Navigator/Application";
import { useFont } from "./src/Hooks/useFonts";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

export default function App() {
  const [isLoaded] = useFonts(useFont);
  useEffect(() => {
    setTimeout(async () => {
      await SplashScreen.hideAsync();
    }, 3000);
  }, [isLoaded]);

  if (!isLoaded) {
    return null;
  }
  return <ApplicationNavigator />;
}
