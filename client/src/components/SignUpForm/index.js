import React from "react";

const SignUpForm = () => {
  //stuff
    const [formState, setFormState] = useState({
      username: "",
      email: "",
      password: "",
    });

    const [errorMessage, setErrorMessage] = useState("");

    const [create, { error }] = useMutation(ADD_PRODUCT);
  
    // handle form submission
    const handleFormSubmit = async (event) => {
      event.preventDefault();
  
      // set up variables to send to graphql
      const username = formState.userUsername;
      const email = formState.userEmail;
      const password = formState.userPassword;
      if (!username || username === "") {
        setErrorMessage("Username is required!");
        return;
      }
      if (!email || email === "") {
        setErrorMessage("Email is required!");
        return;
      }
      if (!password || password === "") {
        setErrorMessage("Password is required!");
        return;
      }

      try {
        const data = new FormData();
        data.append("username", formState.userUsername);
  
        const response = await axios.post("/user", data);
        if (!response) {
          console.log("ERROR");
        }
        username = response.data;
      } catch (e) {
        console.log(e);
      }

      try {
        const data = new FormData();
        data.append("email", formState.userEmail);
  
        const response = await axios.post("/user", data);
        if (!response) {
          console.log("ERROR");
        }
        email = response.data;
      } catch (e) {
        console.log(e);
      }

      try {
        const data = new FormData();
        data.append("password", formState.userPassword);
  
        const response = await axios.post("/user", data);
        if (!response) {
          console.log("ERROR");
        }
        password = response.data;
      } catch (e) {
        console.log(e);
      }

      try {
        const response = await create({
          variables: {
            product: {
              username: username,
              email: email,
              password: password,
            },
          },
        });
  
        if (!response) {
          console.log("Error creating user");
        } else {
          console.log(response);
          const userID = response.data.addUser._id;
          window.location.assign(`/view/${userID}`);
        }
      } catch (err) {
        console.log(err);
      }
}
  return <h1>Sign Up Form</h1>;
};

export default SignUpForm;