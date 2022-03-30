import { ChakraProvider } from '@chakra-ui/provider'
import '@fontsource/source-code-pro'
import Typewriter from 'typewriter-effect';
import ReCAPTCHA from "react-google-recaptcha";

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
  Progress,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  CloseButton,
  AlertStatus,
  WrapItem,
  SimpleGrid,
  useMediaQuery
} from '@chakra-ui/react'

import * as React from 'react'
import theme from '../theme'

import { Helmet } from "react-helmet"

const compDT = new Date(0);
compDT.setUTCSeconds(1651266000);

const serverURL = "https://t8itx51tpi.execute-api.us-east-1.amazonaws.com/subscribe";


const IndexPage = () => {
  const [days, setDays] = React.useState('00');
  const [hours, setHours] = React.useState('00');
  const [minutes, setMinutes] = React.useState('00');
  const [seconds, setSeconds] = React.useState('00');

  /* Create variables for the form element values */
  const [email, setEmail] = React.useState('');
  const [teamSize, setTeamSize] = React.useState(1);
  const [secret, setSecret] = React.useState('');
  const [recaptcha, setRecaptcha] = React.useState('');

  /* Create variable for the form submission */

  /* Create optional variable of type AlertStatus */
  let undefinedAlertStatus: "info" | "warning" | "success" | "error" | null | undefined = null;

  const [formSubmittedDialog, setFormSubmittedDialog] = React.useState({status: undefinedAlertStatus, message: ''});

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    /* Check if email is valid */
    if (!/([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(\.[A-Z|a-z]{2,})+/.test(email)) {
      setFormSubmittedDialog({status: 'error', 'message': 'Please enter a valid email address.'});
      return;
    }

    if (teamSize < 1 || teamSize > 5) {
      setFormSubmittedDialog({status: 'error', 'message': 'Please enter a valid team size.'});
      return;
    }

    if (recaptcha === '') {
      setFormSubmittedDialog({status: 'error', 'message': 'Please verify that you are not a robot.'});
      return;
    }

    /* Send data to the server and get response */
    fetch(serverURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        size: teamSize,
        secret: secret,
        recaptcha: recaptcha
      })
    }).then(response => {
      if (response.status === 200) {
        setFormSubmittedDialog({status: 'success', message: 'You have been added to the list! We will notify you when registration is open.'});
      } else if (response.status === 400) {
        response.json().then(data => {
          setFormSubmittedDialog({status: 'error', message: 'Bad request: ' + data.error});
        });
      } else {
        setFormSubmittedDialog({status: 'error', message: 'An internal server error occurred. Please try again later.'});
      }
    })
  }


  React.useEffect(() => {
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

  const [mobile] = useMediaQuery('(max-width: 640px)');

  return (
    <ChakraProvider theme={theme}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Summit CTF</title>
        <link rel="canonical" href="https://summitctf.org" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Helmet>
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        color={useColorModeValue('gray.700', 'gray.100')}
        bg={useColorModeValue('cybervt.50', 'cybervt.900')}>
        <Stack spacing={8} mx={'auto'} p={6} minW='xs' maxW='md'>
          <Stack textAlign={'center'}>
            <Heading fontSize={'3xl'}>CyberVT Summit 2022</Heading>
            <WrapItem>
              <Text fontSize={'lg'} wordBreak='break-word'>
              <Typewriter
                onInit={(typewriter) => {
                  typewriter.typeString('Virginia Tech\'s annual CTF competition')
                  .pauseFor(1000 * 60 * 3)
                  .deleteAll()
                  /* Good on you for reading the source code, challenger! */
                  .typeString('Okay, you waited this long. Here\'s a flag for your patience. Submit it during the competition: summitCTF{p01Ntz_b4_Th3_coMp3t1tion_r_t0t4lly_f41r}')
                  .start();
                }}
              />
              </Text>
            </WrapItem>
          </Stack>
          <Tabs variant='soft-rounded' colorScheme='cybervt' isFitted>
            <TabList>
              <Tab color='gray.100'>Subscribe</Tab>
              <Tab color='gray.100'>FAQ</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                {formSubmittedDialog.status && <Stack p={3} >
                  <Alert status={formSubmittedDialog.status} color={'gray.700'} variant='subtle'>
                    <AlertIcon />
                    {formSubmittedDialog.message}
                  </Alert>
                </Stack>}
                <Box
                  rounded={'lg'}
                  bg={useColorModeValue('gray.50', 'cybervt.800')}
                  boxShadow={'lg'}
                  p={8}>
                  <Stack spacing={4}>
                    <FormControl isRequired>
                      <FormLabel>Email address</FormLabel>
                      <Input variant='outline' id='email' placeholder='hacker1337@vt.edu' type='email' onChange={(e) => setEmail(e.target.value)} />
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel id='size'>Team size</FormLabel>
                      <NumberInput max={5} min={1} defaultValue={1} isRequired>
                        <NumberInputField id='size' onChange={(e) => setTeamSize(parseInt(e.target.value))} />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                      <FormHelperText color={useColorModeValue('gray.500', 'gray.300')}>You can update your team size later</FormHelperText>
                    </FormControl>
                    <FormControl>
                      <FormLabel>Inconspicuous form element</FormLabel>
                      <Input id='password' colorScheme='gray' placeholder='what is this?' type='password' onChange={(e) => setSecret(e.target.value)} />
                    </FormControl>
                    <Center>
                      <ReCAPTCHA
                        theme="dark"
                        sitekey="6Lc-4x4fAAAAAPvN3w8e1u3bkqOeM06vSQDq48Gp"
                        onChange={(e) => setRecaptcha(e || '')}
                        /* CAPTCHA seems too big for smaller devices */
                        size={mobile ? 'compact' : 'normal'}
                      />
                    </Center>
                    <Stack spacing={10}>
                      <Button
                        onClick={handleSubmit}
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
              </TabPanel>
              <TabPanel>
                <Box borderRadius='lg' borderWidth='1px' p={4} >
                    <Heading fontSize={'xl'}>When is the competition?</Heading>
                    <Text mb={8}>Summit CTF begins {compDT.toLocaleDateString()} at {compDT.toLocaleTimeString()} and lasts for 48 hours.</Text>

                    <Heading fontSize={'xl'}>Where is the competition?</Heading>
                    <Text mb={8}>Summit CTF will be hosted online.</Text>

                    <Heading fontSize={'xl'}>Will there be prizes?</Heading>
                    <Text mb={8}>Yes! CyberVT will purchase prizes for the top undergraduate performers, and send a limited number of swag bags.</Text>

                    <Heading fontSize={'xl'}>Who can compete?</Heading>
                    <Text mb={8}>Anyone can compete, but prizes will be reserved for undergraduate university students.</Text>

                    <Heading fontSize={'xl'}>How do I register?</Heading>
                    <Text mb={8}>We will send an email when the registration opens.</Text>

                    <Heading fontSize={'xl'}>What is the max team size?</Heading>
                    <Text mb={8}>Teams will be limited to five people. However, multiple teams from the same university can compete.</Text>

                    <Heading fontSize={'xl'}>Do I need to fill out this form to compete?</Heading>
                    <Text mb={8}>Nope. But we highly recommend that you do so we can get a headcount. As an added benefit, you'll get a nifty reminder email!</Text>

                    <Heading fontSize={'xl'}>Is there a flag hidden on this website?</Heading>
                    <Text>I'm not sure, is there?</Text>
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>

          <Box bg={useColorModeValue('gray.50', 'cybervt.800')} rounded={'lg'} p={4} alignItems='center'>
            <SimpleGrid columns={[2, 4, null]} spacing={6} rounded={'lg'}>
              <GridItem w='100%' h='100%'>
                <Center>
                  <VStack>
                    <Box bg='blackAlpha.800' rounded='lg' fontSize={'4xl'} p={4}>
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
                    <Box bg='blackAlpha.800' rounded='lg' fontSize={'4xl'} p={4}>
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
                    <Box bg='blackAlpha.800' rounded='lg' fontSize={'4xl'} p={4}>
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
                    <Box bg='blackAlpha.800' rounded='lg' fontSize={'4xl'} p={4}>
                      {seconds}
                    </Box>
                    <Box fontSize={'l'}>
                      Second(s)
                    </Box>
                  </VStack>
                </Center>
              </GridItem>
            </SimpleGrid>
            <Center>
              <Heading>until launch</Heading>
            </Center>
            <Center>
              <Text>Summit CTF begins {compDT.toLocaleDateString()} at {compDT.toLocaleTimeString()}</Text>
            </Center>
          </Box>
        </Stack>
      </Flex>
    </ChakraProvider>
  )
}

export default IndexPage
