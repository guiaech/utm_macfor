import { useState, useEffect } from "react";
import { Router, Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider, ThemeToggle } from "@/providers/theme-provider";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";

function useHashLocation(): [string, (to: string) => void] {
  const [location, setLocation] = useState(() => window.location.hash.slice(1) || "/");

  useEffect(() => {
    const onHashChange = () => setLocation(window.location.hash.slice(1) || "/");
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const navigate = (to: string) => {
    if (to !== location) {
      window.location.hash = to;
    }
  };

  return [location, navigate];
}

function RouterComponent() {
  return (
    <Router hook={useHashLocation}>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <div className="flex items-center justify-end p-4 fixed top-0 right-0 z-10">
            <ThemeToggle />
          </div>
          <Toaster />
          <RouterComponent />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
