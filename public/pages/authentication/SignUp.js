import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  WrapItem,
  Button,
  TabPanel,
} from "@chakra-ui/react";
import { GoogleIcon } from "../../components/chakra-icons/GoogleIcon";
import "./SignUp.scss";
import { useToast } from "@chakra-ui/react";
import { useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../../public/Firebase";

const SignUp = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const toast = useToast();

  const handleSubmit = async () => {
    if (password !== confirmPass) {
      toast({
        title: "Password not matching",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      toast({
        title: "Account created.",
        description: "We've created your account for you.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      onClose();
    } catch (error) {
      toast({
        title: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // const handleGoogleSignIn = () => {
  //   const googleProvider = new GoogleAuthProvider();
  //   signInWithPopup(auth, googleProvider)
  //     .then((res) => {
  //       toast({
  //         title: "Account SignIn Successfully!!",
  //         status: "success",
  //         duration: 3000,
  //         isClosable: true,
  //       });
  //     })
  //     .catch((e) => {
  //       toast({
  //         title: e.message,
  //         status: "error",
  //         duration: 3000,
  //         isClosable: true,
  //       });
  //     });
  // };

  return (
    <TabPanel className="signup-body">
      <FormControl width="100%">
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          id="email"
          type="email"
          mb="16px"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <FormLabel htmlFor="password">Password</FormLabel>
        <Input
          id="password"
          type="password"
          mb="16px"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <FormLabel htmlFor="cpassword">Confirm Password</FormLabel>
        <Input
          id="cpassword"
          type="password"
          mb="20px"
          onChange={(e) => setConfirmPass(e.target.value)}
          value={confirmPass}
        />
      </FormControl>
      <WrapItem width="100%">
        <Button
          colorScheme="yellow"
          className="login-btn"
          onClick={() => handleSubmit()}
        >
          Sign Up
        </Button>
      </WrapItem>
      {/* <p className="or">Or</p>
      <Button className="google-btn" width="100%" onClick={handleGoogleSignIn}>
        <GoogleIcon />
        <p>Sign up with google</p>
      </Button> */}
    </TabPanel>
  );
};

export default SignUp;
