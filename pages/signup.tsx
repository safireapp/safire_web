import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Alert,
  AlertIcon,
  Box,
  Button,
  Center,
  FormControl,
  Image,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import Link from "next/link";
import { useUser } from "hooks";
import { Error } from "@utils/types";
import Head from "next/head";
import { useRouter } from "next/router";
import fetcher from "@lib/fetcher";

const Signup: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Error>(null);
  const username = useRef<HTMLInputElement>(null);
  const firstname = useRef<HTMLInputElement>(null);
  const lastname = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const confirmPassword = useRef<HTMLInputElement>(null);
  const toast = useToast();
  const router = useRouter();

  const { mutateUser } = useUser("/", false);

  async function handleLogin(e: React.SyntheticEvent) {
    try {
      e.preventDefault();
      setLoading(true);
      const user = await mutateUser(
        fetcher("/api/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          data: {
            firstname: firstname.current.value,
            lastname: lastname.current.value,
            username: username.current.value,
            email: email.current.value,
            password: password.current.value,
            confirmPassword: confirmPassword.current.value,
          },
        })
      );

      setLoading(false);
      setErrors(null);
      toast({
        title: "Signed up successfully",
        description: `Welcome to Safire, ${user.username}!`,
        status: "success",
        variant: "subtle",
        duration: 2000,
      });
      router.push("/");
    } catch (err) {
      setLoading(false);
      console.log(err);
      const data = err.response.data;
      setErrors(data);
    }
  }

  return (
    <>
      <Head>
        <title>Signup on Safire</title>
      </Head>
      <Box
        className="login-page"
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <Box
          display="flex"
          alignItems="center"
          bgColor="white"
          pos="relative"
          flexDir={["column-reverse", "column-reverse", "row"]}
          boxShadow="2xl"
          h="85vh"
          w="80vw"
          m="8"
          borderRadius="2xl"
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            flex="1 0 0"
          >
            <Box as="form" w="80%" onSubmit={handleLogin}>
              <Text fontSize="3xl">Hello there!</Text>
              {errors && (
                <Alert status="error">
                  <AlertIcon />
                  {errors.message ||
                    errors.username ||
                    errors.email ||
                    errors.password ||
                    errors.confirmPassword}
                </Alert>
              )}
              <Box display={["box", "flex", "flex"]}>
                <FormControl id="firstname" mr="3" mb={["3", "0", "0"]}>
                  <Input
                    variant="outline"
                    placeholder="First name"
                    ref={firstname}
                  />
                </FormControl>
                <FormControl id="lastname">
                  <Input
                    variant="outline"
                    placeholder="Last name"
                    ref={lastname}
                  />
                </FormControl>
              </Box>
              <Box display={["box", "flex", "flex"]} my="3">
                <FormControl id="username" mr="3" mb={["3", "0", "0"]} flex="2">
                  <Input
                    variant="outline"
                    placeholder="Username"
                    ref={username}
                    isInvalid={errors?.username ? true : false}
                    errorBorderColor="crimson"
                    required
                  />
                </FormControl>
                <FormControl id="email" flex="3">
                  <Input
                    variant="outline"
                    placeholder="Enter your email"
                    type="email"
                    ref={email}
                    isInvalid={errors?.email ? true : false}
                    errorBorderColor="crimson"
                    required
                  />
                </FormControl>
              </Box>
              <FormControl id="password" mb="3">
                <Input
                  variant="outline"
                  type="password"
                  placeholder="Password"
                  ref={password}
                  isInvalid={errors?.password ? true : false}
                  errorBorderColor="crimson"
                  required
                />
              </FormControl>
              <FormControl id="confirm-password" mb="3">
                <Input
                  variant="outline"
                  type="password"
                  placeholder="Confirm password"
                  ref={confirmPassword}
                  isInvalid={errors?.confirmPassword ? true : false}
                  errorBorderColor="crimson"
                  required
                />
              </FormControl>
              <Button
                bgColor="#6577f3"
                color="white"
                variant="solid"
                isLoading={loading}
                w="100%"
                mb="3"
                type="submit"
              >
                Signup
              </Button>

              <Accordion allowToggle>
                <AccordionItem>
                  <AccordionButton>
                    <AccordionIcon />
                    Info
                  </AccordionButton>
                  <AccordionPanel>
                    If you don't feel like sharing your first name and last
                    name, it's ok! Not required anyways!
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>

              <Center>
                <Text pos="absolute" bottom="3" fontSize={["sm", "md", "md"]}>
                  Already have an account? <Link href="/login">Login</Link>
                </Text>
              </Center>
            </Box>
          </Box>
          <Box
            display={["none", "none", "flex"]}
            alignItems="center"
            justifyContent="center"
            bgColor="#6577f3"
            height="100%"
            flex="1 0 0"
            borderRadius="2xl"
          >
            <Image
              src="login.png"
              objectFit="cover"
              maxW="100%"
              maxH="100%"
              display="block"
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Signup;
