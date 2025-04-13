import MoviesCard from "@/components/MoviesCard";
import SearchBar from "@/components/SearchBar";
import Searchbar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import { Image, Text, View, ScrollView, ActivityIndicator, FlatList } from "react-native";

export default function Index() {
  const router = useRouter();

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesErrors,
  } = useFetch(() =>
    fetchMovies({
      query: "",
    })
  );
  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />
      {/*  ScrollView serve para melhorar a experiência do usuário no mobile, nas configurações de estilo removemos a barra de scroll*/}
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: "100%",
          paddingBottom: 10,
        }}
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
        {moviesLoading ? (
          <ActivityIndicator
            size="large"
            color={"#0000ff"}
            className="mt-10 self-center"
          />
        ) : moviesErrors ? (
          <Text> Error: {moviesErrors?.message}</Text>
        ) : (
          <View className="flex-1 mt-5">
            <Searchbar
              onPress={() => router.push("/search")}
              placeholder="Search for movie"
            />
            <>
            <Text className="text-lg text-white font-bold mt-5 mb-3">Latest Movies</Text>
            <FlatList 
            data={movies}
            renderItem={({item})=>(
             <MoviesCard {...item} />
            )}
            keyExtractor={(item) => item.id.toString()}
            numColumns={3}
            columnWrapperStyle ={{
              justifyContent: 'flex-start',
              gap:20,
              paddingRight: 5,
              marginBottom: 10
              
            }}
            className="mt-2 pb-12"
            scrollEnabled = {false}
              
           />
            </>
          </View>

        )}
      </ScrollView>
    </View>
  );
}
