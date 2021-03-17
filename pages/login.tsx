import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Center,
	FormControl,
  Input,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "context/useAuth";
import CenterContainer from "@utils/centerContainer";
import { Error } from "@utils/types";

function Login() {
  const { user, email, password, loading, setEmail, setPassword } = useAuth();
	const [errors, setErrors] = useState<Error>(null)

  // return (
  //   <Box display="flex" alignItems="center" justifyContent="flex-end" flexDir="column">
  //     <Box w="sm" px="6" py="4" borderWidth="2px" borderRadius="md">
  //       <Text as="h2" fontSize="2xl" align="center" mb="8">
  //         👋 Log In
  //       </Text>
  //       {errors && (
  //         <Alert status="error">
  //           <AlertIcon />
  //           {errors}
  //         </Alert>
  //       )}
  //       <Box as="form" onSubmit={() => ""}>
  //         <FormControl id="email" my="3">
  //           <Input
  //             variant="flushed"
  //             placeholder="Enter your email"
  //             type="email"
  //             value={email}
  //             onChange={(e) => setEmail(e.target.value)}
  //             required
  //           />
  //         </FormControl>
  //         <FormControl id="password" mb="3">
  //           <Input
  //             variant="flushed"
  //             type="password"
  //             placeholder="Password"
  //             value={password}
  //             onChange={(e) => setPassword(e.target.value)}
  //             required
  //           />
  //         </FormControl>
  //         <Center>
  //           <Button
  //             colorScheme="cyan"
  //             variant="ghost"
  //             isLoading={loading}
  //             w="100"
  //             type="submit"
  //           >
  //             Login
  //           </Button>
  //         </Center>
  //       </Box>
  //       <Box as="div" w="100" textAlign="center">
  //         {/* <Link href="/reset-password">
  //           Forgot Password?
  //         </Link> */}
  //       </Box>
  //     </Box>
  //     <Box as="div" w="100" textAlign="center" mt="2">
  //       Need an account? <Link href="/signup">Signup</Link>
  //     </Box>
  //   </Box>
  // );

	return (
    <Box
      display="flex"
      alignItems="flex-end"
      justifyContent="center"
      flexDir="column"
    >
      <Box
        bgGradient="linear(to-t, #0fbcf9, #34e7e4)"
        width={["100%", "100%", "40%"]}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          minH="100vh"
          flexDirection="column"
        >
          <Text fontSize="3xl" align="center" pos="absolute" top="10%">
            Welcome Back!
          </Text>
          <Box as="form">
            <FormControl id="email" my="3">
              <Input
                variant="flushed"
                placeholder="Enter your email"
                type="email"
                _placeholder={{ color: "gray.600" }}
                borderColor="gray.800"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormControl>
            <FormControl id="password" mb="3">
              <Input
                variant="flushed"
                type="password"
                _placeholder={{ color: "gray.600" }}
                placeholder="Password"
                borderColor="gray.800"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </FormControl>
            <Center>
              <Button
                colorScheme="blackAlpha"
                variant="ghost"
                isLoading={loading}
                w="100"
                type="submit"
              >
                Login
              </Button>
            </Center>
          </Box>
          <Text textAlign="center" pos="absolute" bottom="5%">
            Need an account? <Link href="/signup">Signup</Link>
          </Text>
        </Box>
      </Box>
    </Box>
  );
}

export default Login;
