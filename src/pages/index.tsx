import { ChakraProvider } from '@chakra-ui/provider'
import '@fontsource/source-code-pro'
import Typewriter from 'typewriter-effect';

import
{
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useColorMode,
  FormHelperText,
  Grid,
  GridItem,
  Center,
  VStack,
  Progress
} from '@chakra-ui/react'

import * as React from 'react'
import theme from '../theme'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { useEffect, useState } from 'react'

const compDT = new Date(0);
compDT.setUTCSeconds(1651266000);



// markup
const IndexPage = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [days, setDays] = useState('00');
  const [hours, setHours] = useState('00');
  const [minutes, setMinutes] = useState('00');
  const [seconds, setSeconds] = useState('00');

  useEffect(() => {
    const interval = setInterval(() => {
      /* Get current Date */
      const now = new Date();

      /* Get the difference in seconds between now and the countdown date */
      const diff = Math.floor((compDT.getTime() - now.getTime()) / 1000);

      /* Calculate days, hours, minutes and seconds */
      const d = Math.floor(diff / (24 * 60 * 60));
      const h = Math.floor(diff % (24 * 60 * 60) / (60 * 60));
      const m = Math.floor(diff % (24 * 60 * 60) % (60 * 60) / 60);
      const s = Math.floor(diff % (24 * 60 * 60) % (60 * 60) % 60);

      /* Turn the results into a string with padding */
      const dStr = d.toString().padStart(2, '0');
      const hStr = h.toString().padStart(2, '0');
      const mStr = m.toString().padStart(2, '0');
      const sStr = s.toString().padStart(2, '0');

      /* Display the result */
      setDays(dStr);
      setHours(hStr);

      setMinutes(mStr);
      setSeconds(sStr);

    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <ChakraProvider theme={theme}>
      {/* Dark mode machine broke
      <Box textAlign="right" p={4} m={4} position='fixed' right='0'>
        <IconButton
          icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          onClick={toggleColorMode}
          variant="ghost" aria-label={''} />
      </Box>*/}
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        color={useColorModeValue('gray.700', 'gray.100')}
        bg={useColorModeValue('cybervt.50', 'cybervt.900')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>CyberVT Summit 2022</Heading>
            <Text fontSize={'lg'}>
            <Typewriter
              onInit={(typewriter) => {
                typewriter.typeString('Virginia Tech\'s annual CTF competition')
                .pauseFor(1000 * 60 * 2)
                .deleteAll()
                /* Good on you for reading the source code, challenger! */
                .typeString('Okay, you waited this long. Here\'s a flag for your patience. Submit it during the competition: summitCTF{p01Ntz_b4_Th3_coMp3t1tion_r_t0t4lly_f41r}')
                .start();
              }}
            />
            </Text>
          </Stack>

          <Box bg={useColorModeValue('gray.50', 'cybervt.800')} rounded={'lg'} p={4} alignItems='center'>
            <Grid templateColumns='repeat(4, 1fr)' gap={6} rounded={'lg'}>
              <GridItem w='100%' h='100%'>
                <Center>
                  <VStack>
                    <Box bg='blackAlpha.800' rounded='lg' fontSize={'5xl'} p={4}>
                      {days}
                    </Box>
                    <Box fontSize={'l'}>
                      Day(s)
                    </Box>
                  </VStack>
                </Center>
              </GridItem>
              <GridItem w='100%' h='100%'>
                <Center>
                  <VStack>
                    <Box bg='blackAlpha.800' rounded='lg' fontSize={'5xl'} p={4}>
                      {hours}
                    </Box>
                    <Box fontSize={'l'}>
                      Hour(s)
                    </Box>
                  </VStack>
                </Center>
              </GridItem>
              <GridItem w='100%' h='100%'>
                <Center>
                  <VStack>
                    <Box bg='blackAlpha.800' rounded='lg' fontSize={'5xl'} p={4}>
                      {minutes}
                    </Box>
                    <Box fontSize={'l'}>
                      Minute(s)
                    </Box>
                  </VStack>
                </Center>
              </GridItem>
              <GridItem w='100%' h='100%'>
                <Center>
                  <VStack>
                    <Box bg='blackAlpha.800' rounded='lg' fontSize={'5xl'} p={4}>
                      {seconds}
                    </Box>
                    <Box fontSize={'l'}>
                      Second(s)
                    </Box>
                  </VStack>
                </Center>
              </GridItem>
            </Grid>
            <Center>
              <Heading>until launch</Heading>
            </Center>
            <Center>
              <Text>Summit CTF begins {compDT.toLocaleDateString()} at {compDT.toLocaleTimeString()}</Text>
            </Center>
          </Box>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('gray.50', 'cybervt.800')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              {/* TODO: Fix the light mode form */}
              <FormControl isRequired>
                <FormLabel>Email address</FormLabel>
                <Input variant='outline' id='email' placeholder='hacker1337@vt.edu' type='email' />
              </FormControl>
              <FormControl isRequired>
                <FormLabel id='size'>Team size</FormLabel>
                <NumberInput max={5} min={1} defaultValue={1} isRequired>
                  <NumberInputField id='size' />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <FormHelperText color={useColorModeValue('gray.500', 'gray.300')}>You can update your team size later</FormHelperText>
              </FormControl>
              <FormControl>
                <FormLabel>Inconspicuous form element</FormLabel>
                <Input id='password' colorScheme='gray' placeholder='what is this?' type='password' />
              </FormControl>
              <Stack spacing={10}>
                <Button
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Remind Me
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </ChakraProvider>
  )
}

export default IndexPage
