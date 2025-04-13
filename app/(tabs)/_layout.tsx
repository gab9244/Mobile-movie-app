import React from "react";
import { Tabs } from "expo-router";
import { Image, ImageBackground,ImageSourcePropType,Text,View } from "react-native";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
 interface tabTypes {
  focused: any,
  icon: ImageSourcePropType,
  title: string
 }

const TabIcon = ({focused, icon, title}: tabTypes) => {
  if(focused) {
  return (
    <ImageBackground source={images.highlight} className="flex flex-row w-full flex-1 min-w-[112px] min-h-14 mt-4 justify-center items-center rounded-full overflow-hidden">
    <Image source={icon} tintColor={"#151312"} className="size-5"/>
      <Text className="text-secondary text-base font-semibold ml-2">{title}</Text>
  </ImageBackground>
  )}
  return (
   <View className="size-full justify-center items-center mt-4 rounded-full">
    <Image source={icon} tintColor={"#A8B5DB"} className="size-5"/>

   </View>
  )
}
const _layout = () => {
  return (
    <Tabs
    screenOptions={{
      tabBarShowLabel: false,
      tabBarItemStyle: {
       width: '100%',
       height: '100%',
       justifyContent: 'center',
       alignItems: 'center'
      },
      tabBarStyle: {
        backgroundColor: '#0f0D23',
        borderRadius: 50,
        marginHorizontal: 20,
        marginBottom:36,
        height: 52,
        position: "absolute",
        borderWidth: 1,
        borderColor: '0f0d23'
      }
    }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarIcon :({focused}) => (
            <>
          <TabIcon focused={focused} icon={icons.home} title={"home"}/>
            </>
          )
            
          
        }}
      />  
      <Tabs.Screen
        name="search"
        options={{
          headerShown: false,
          tabBarIcon :({focused}) => (
            <>
          <TabIcon focused={focused} icon={icons.home} title={"search"}/>
            </>
          )
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          headerShown: false,
          tabBarIcon :({focused}) => (
            <>
          <TabIcon focused={focused} icon={icons.home} title={"Saved"}/>
            </>
          )
          
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          tabBarIcon :({focused}) => (
            <>
          <TabIcon focused={focused} icon={icons.home} title={"Profile"}/>
            </>
          )
        }}
      />
    </Tabs>
  );
};

export default _layout;
