import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./services/queryClient";
import { AppRoutes } from './Routes'

export function App() {
  return (
    <QueryClientProvider client={queryClient} >
      <AppRoutes />
    </QueryClientProvider>
  )
}

