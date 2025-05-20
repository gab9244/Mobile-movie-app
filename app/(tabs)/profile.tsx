import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { images } from "@/constants/images";
import { LoginUser, saveUser } from "@/services/appwrite";
import { router } from "expo-router";
const profile = () => {
  const [UserName, setUserName] = useState("");
  const [Password, setPassword] = useState("");
  const [Email, setEmail] = useState("");

  const [Success, setSuccess] = useState(false);
  const [IsLogged, setIsLogged] = useState(true);
  const [Data, setData] = useState("");
  const [BGRColor, setBGRColor] = useState("");

  const colors = [
    "bg-red-500",
    "bg-green-500",
    "bg-blue-500",
    "bg-yellow-500",
    "bg-purple-500",
  ];

  const RandomBGColor = () => {
    setBGRColor(colors[Math.floor(Math.random() * colors.length)]);
  };

  useEffect(() => {
    RandomBGColor();
  });

  // CreatUser é uma função assíncrona que recebe o username e password onde executa uma promise passando os dados recebidos para essa promise, depois é perguntado se a promise foi executada com sucesso caso tenha sido mudamos o valor do estado Success para true e i valor dos dados do usuário são passados para o estado Data, caso a promise não tenha sido bem sucedida é retornado um erro no console
  const CreateUser = async (
    username: string,
    password: string,
    Email: string
  ) => {
    try {
      const result = await saveUser(username, password, Email);
      if (result!.status == "ok") {
        setSuccess(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // Primeiro passe a senho encritada para o appwrite na coleção que salva o usuário

  const Login = async (Email: string, password: string) => {
    try {
      const result = await LoginUser(Email, password);
      if (result!.status ) {
        setIsLogged(true);
        setSuccess(true);
        setData(result!.data.$id);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // Vamos criar a página de login, onde caso o usuário não tenha conta uma tela de cadastro
  // Primeiro vamos criar um usuário
  return (
    <View className="bg-primary flex-1 ">
      <Image source={images.bg} className="absolute w-full z-0" />

      <View className="flex justify-center items-center flex-1 flex-col gap-5">
        {/* Caso o usuário tenha sua conta criada com sucesso uma tela com informações dele é mostrada, caso contrario a um formulário para fazer sign in e mostrada */}
        {Success ? (
          <>
            <View
              className={` ${BGRColor} w-32 h-32 items-center justify-center rounded-full`}
            >
              {<Text className="text-black text-5xl">{Data.split("")[0]}</Text>}
            </View>
            <Text className="text-light-200">{Data}</Text>

            <TouchableOpacity onPress={() => router.push("/saved")}>
              <Text className=" bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center w-[100px] text-light-200 text-center text-white">
                Saved Movies
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            {IsLogged ? (
              <>
                <Text className="text-light-200 text-xl font-bold">Login</Text>
                {/* <TextInput
                  placeholder="Username"
                  className="bg-white w-[200px] rounded-lg"
                  value={UserName}
                  onChangeText={(e) => setUserName(e)}
                /> */}
                <TextInput
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={Email}
                  onChangeText={(e) => setEmail(e)}
                  placeholder="Email"
                  className="bg-white w-[200px] rounded-lg"
                ></TextInput>
                <TextInput
                  secureTextEntry={true}
                  placeholder="Password"
                  className="bg-white w-[200px] rounded-lg"
                  onChangeText={(e) => setPassword(e)}
                  value={Password}
                />
                <TouchableOpacity
                  className=" bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center  w-[150px]"
                  onPress={() => {
                    Login(Email, Password );
                  }}
                >
                  <Text className="text-white font-semibold text-base ">
                    Login
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text className="text-light-200 text-xl font-bold">
                  Create account
                </Text>
                {/*Como o TextInput não tem tipos de input usar as configurações abaixo ajuda na criação de um input do tipo email */}
                <TextInput
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={Email}
                  onChangeText={(e) => setEmail(e)}
                  placeholder="Email"
                  className="bg-white w-[200px] rounded-lg"
                ></TextInput>
                <TextInput
                  placeholder="Username"
                  className="bg-white w-[200px] rounded-lg"
                  value={UserName}
                  onChangeText={(e) => setUserName(e)}
                />
                <TextInput
                  secureTextEntry={true}
                  placeholder="Password"
                  className="bg-white w-[200px] rounded-lg"
                  onChangeText={(e) => setPassword(e)}
                  value={Password}
                />
                <TouchableOpacity
                  className=" bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center  w-[150px]"
                  onPress={() => {
                    CreateUser(UserName, Password, Email);
                  }}
                >
                  <Text className="text-white font-semibold text-base ">
                    Sign in
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </>
        )}
      </View>
    </View>
  );
};

export default profile;
