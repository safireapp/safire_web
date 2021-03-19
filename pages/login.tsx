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
import { useAuth, useUser } from "hooks";
import { Context, Error } from "@utils/types";
import Head from "next/head";
import { useRouter } from "next/router";
import fetcher from "@lib/fetcher";

const Login: React.FC = () => {
  const {
    email,
    password,
    loading,
    setEmail,
    setPassword,
    setLoading,
  }: Context = useAuth();
  const [errors, setErrors] = useState<Error>(null);
  const toast = useToast();
  const router = useRouter();

  const { mutateUser } = useUser("/", true);

  async function handleLogin(e: React.SyntheticEvent) {
    try {
      e.preventDefault();
      setLoading(true);
      const user = await mutateUser(
        fetcher("/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          data: { email, password }
        })
      );

      setLoading(false);
      setErrors(null);
      toast({
        title: "Logged in successfully",
        description: `Welcome back, ${user.username}!`,
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
            <Box as="form" w="80%" onSubmit={handleLogin}>
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
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
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
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
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