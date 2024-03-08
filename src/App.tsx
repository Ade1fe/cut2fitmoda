import { RouterProvider } from "react-router-dom";
import { ChakraBaseProvider } from "@chakra-ui/react";
import router from "./Router";
function App() {
  return (
    <>
      <ChakraBaseProvider >
        <RouterProvider router={router}></RouterProvider>
      </ChakraBaseProvider>
    </>
  );
}

export default App;