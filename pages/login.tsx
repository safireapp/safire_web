import {
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
import React, { useState } from "react";
import Link from "next/link";
import { useUser } from "hooks";
import { Error, LoginData } from "@utils/types";
import Head from "next/head";
import axios from "axios";
import { User } from ".prisma/client";
import { useForm } from "react-hook-form";

const Login: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Error>(null);
  const toast = useToast();
  const { register, handleSubmit } = useForm();

  const { mutateUser } = useUser("/", true);

  async function handleLogin(data: LoginData) {
    try {
      setLoading(true);

      const { data: user } = await axios.post<User>("/api/login", data);

      await mutateUser(user);
      setLoading(false);
      setErrors(null);
      toast({
        title: "Logged in successfully",
        description: `Welcome back, ${user.username}!`,
        status: "success",
        variant: "subtle",
        duration: 2000,
      });
    } catch (err) {
      setLoading(false);
      setErrors(err.response.data);
    }
  }

  return (
    <>
      <Head>
        <title>Login</title>
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
          h="80vh"
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
            <Box as="form" w="80%" onSubmit={handleSubmit(handleLogin)}>
              <Text fontSize="3xl">Welcome back</Text>
              {errors && (
                <Alert status="error">
                  <AlertIcon />
                  {errors.message || errors.email || errors.password}
                </Alert>
              )}
              <FormControl id="email" my="3">
                <Input
                  variant="outline"
                  placeholder="Enter your email"
                  type="email"
                  name="email"
                  ref={register}
                  isInvalid={errors?.email ? true : false}
                  errorBorderColor="crimson"
                  required
                />
              </FormControl>
              <FormControl id="password" mb="3">
                <Input
                  variant="outline"
                  type="password"
                  placeholder="Password"
                  name="email"
                  ref={register}
                  isInvalid={errors?.password ? true : false}
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
                type="submit"
              >
                Login
              </Button>
              <Center>
                <Text pos="absolute" bottom="3">
                  Need an account? <Link href="/signup">Signup</Link>
                </Text>
              </Center>
            </Box>
          </Box>
          <Box
            display="flex"
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

export default Login;
