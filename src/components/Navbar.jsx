import { useAuth } from "../modules/context/authContext";
import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    HStack,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure,
    useToast,
    VStack,
  } from "@chakra-ui/react";
import Cookies from "js-cookie";
import Link from "next/link";
import { loginUser } from "../modules/fetch";

const Navbar = () => {
  const { isLoggedIn, setLoggedIn } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  return (
    <Flex className="w-full navbar align-center justify-between wrap padding-10 bg-gray-100 color-black">
      <Link href={"/"}>
        <Flex className="align-center margin-right-10 cursor-pointer">
          <Text className="font-bold font-size-20">Home</Text>
        </Flex>
      </Link>
      <HStack>
        {isLoggedIn && (
          <Link href={"/newbook"}>
            <>
              <Button colorScheme={"blue"}>Create New Book</Button>
            </>
          </Link>
        )}
        {!isLoggedIn ? (
          <Button colorScheme={"blue"} onClick={onOpen}>
            Login
          </Button>
        ) : (
          <Button
            colorScheme={"blue"}
            onClick={() => {
              Cookies.remove("isLoggedIn");
              setLoggedIn(false);
            }}
          >
            Logout
          </Button>
        )}
      </HStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <form
          id="login-form"
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              await loginUser(e.target.email.value, e.target.password.value);
              Cookies.set("isLoggedIn", true);
              setLoggedIn(true);
              onClose();
            } catch (err) {
              toast({
                title: "Error",
                description: err.message,
                status: "error",
                duration: 3000,
                isClosable: true,
              });
            }
          }}
        >
          <ModalOverlay>
            <ModalContent>
              <ModalHeader>Login</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <VStack>
                  <FormControl isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input
                      type="email"
                      name="email"
                      placeholder="Enter your email here"
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Password</FormLabel>
                    <Input
                      type="password"
                      name="password"
                      placeholder="Enter your password here"
                    />
                  </FormControl>
                </VStack>
              </ModalBody>
              <ModalFooter>
                <Button type="submit" form="login-form" marginright={3} colorScheme="blue">
                  Login
                </Button>
                <Link href={"/register"} onClick={onClose}>
                  <Button colorScheme="blue" variant="ghost">Does&apos;t have an account?</Button>
                </Link>
              </ModalFooter>
            </ModalContent>
          </ModalOverlay>
        </form>
      </Modal>
    </Flex>
  );
};

export default Navbar;
