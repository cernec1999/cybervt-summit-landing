// 1. import `extendTheme` function
import { extendTheme, useColorModeValue, type ThemeConfig} from '@chakra-ui/react'
import { mode, StyleFunctionProps } from '@chakra-ui/theme-tools'

// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

// 3. extend the theme
const theme = extendTheme({
    config,
    colors: {
        cybervt: {
            50: '#bbffbb',
            100: '#42e542',
            200: '#2ce22c',
            300: '#1dd71d',
            400: '#1ac11a',
            500: '#149414',
            600: '#0e670e',
            700: '#0b510b',
            800: '#083a08',
            900: '#002000',
        },
    },
    /* TODO: iOS Safari Scrolling? */
    styles: {
        global: (props: any) => ({
            html: {
                backgroundColor: useColorModeValue('gray.50', 'cybervt.900'),
            }
        })
    },
    fonts: {
        heading: 'Source Code Pro, monospace',
        body: 'Source Code Pro, monospace',
    },
    // components: {
    //     Input: {
    //         variants: {
    //             outline: (props: StyleFunctionProps) => ({
    //                 field: {
    //                     border: '0.5px solid',
    //                     borderColor: mode("gray.50", "gray.400")(props),
    //                     _hover: {
    //                         borderColor: mode("gray.700", "gray.100")(props),
    //                     },
    //                 }
    //             })
    //         }
    //     },
    //     NumberInput: {
    //         variants: {
    //             outline: (props: StyleFunctionProps) => ({
    //                 field: {
    //                     border: '0.5px solid',
    //                     borderColor: mode("gray.50", "gray.400")(props),
    //                     _hover: {
    //                         borderColor: mode("gray.700", "gray.100")(props),
    //                     },
    //                 }
    //             })
    //         },
    //         baseStyle: {
    //             stepper: {
    //                 borderStartColor: mode("gray.50", "gray.400"),
    //             }
    //         }
    //     }
    // },
})

export default theme