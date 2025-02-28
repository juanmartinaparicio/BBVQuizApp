import React from "react";
import { Redirect } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const App = () => {
  return <Redirect href="/home" />;
};

export default App;
