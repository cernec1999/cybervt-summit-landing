import * as React from "react"
import { Box, ChakraProvider } from "@chakra-ui/react"

// markup
const NotFoundPage = () => {
  return (
    <ChakraProvider>
      <Box bg='tomato' w='100%' p={4} color='white'>
        404 Page Not Found
      </Box>
    </ChakraProvider>
  )
}

export default NotFoundPage
