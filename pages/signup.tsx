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
} from "@chakra-ui/react";
import React, { useState } from "react";
import Link from "next/link";
import { useUser } from "hooks";
import { Error, SignupData } from "@utils/types";
import Head from "next/head";
import { useForm } from "react-hook-form";
import axios from "axios";

const Signup: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Error>(null);
  const [alert, setAlert] = useState<string>(null);
  const { register, handleSubmit } = useForm();

  const { mutateUser } = useUser("/", true);

  async function handleSignup(data: SignupData) {
    try {
      setLoading(true);
      const res = await axios.post("/api/signup", data);
      setAlert(res.data.message);
      setLoading(false);
      setErrors(null);
    } catch (err) {
      setLoading(false);
      setErrors(err.response.data);
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
            <Box as="form" w="80%" onSubmit={handleSubmit(handleSignup)}>
              <Text fontSize="3xl">Hello there!</Text>
              {errors && (
                <Alert status="error">
                  <AlertIcon />
                  {Object.values(errors).map((error) => (
                    <React.Fragment key={error}>
                      {error}
                      <br />
                    </React.Fragment>
                  ))}
                </Alert>
              )}
              <Box display={["box", "flex", "flex"]} my="3">
                <FormControl id="firstname" mr="3" mb={["3", "0", "0"]}>
                  <Input
                    variant="outline"
                    placeholder="First name"
                    ref={register}
                    name="firstname"
                  />
                </FormControl>
                <FormControl id="lastname">
                  <Input
                    variant="outline"
                    placeholder="Last name"
                    ref={register}
                    name="lastname"
                  />
                </FormControl>
              </Box>
              <Box display={["box", "flex", "flex"]} my="3">
                <FormControl id="username" mr="3" mb={["3", "0", "0"]} flex="2">
                  <Input
                    variant="outline"
                    placeholder="Username"
                    ref={register}
                    name="username"
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
                    ref={register}
                    name="email"
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
                  ref={register}
                  name="password"
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
                  ref={register}
                  name="confirmPassword"
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
              {alert && (
                <Alert status="info">
                  <AlertIcon />
                  {alert}
                </Alert>
              )}
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
