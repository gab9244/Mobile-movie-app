import MoviesCard from "@/components/MoviesCard";
import Searchbar from "@/components/SearchBar";
import TrendingCard from "@/components/TrendingCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import { getTredingMovies } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from "react-native";

export default function Index() {
  const router = useRouter();
  // Extrai os dados pegos pelo hook personalizado useFetch para os filmes mais populares
  const {
    data: trendingMovies,
    loading: trendingLoading,
    error: trendingError,
  } = useFetch(getTredingMovies);
  // Extrai os dados pegos pelo hook personalizado useFetch

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesErrors,
  } = useFetch(() =>
    fetchMovies({
      query: "",
    })
  );
  // Remove filmes populares duplicados 
  const seen = new Set();
  const uniqueMovies = trendingMovies?.filter((movie) => {
    if (seen.has(movie.movie_id)) {
      return false;
    }
    seen.add(movie.movie_id);
    return true;
  });
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
        {/* Caso estejamos carregando os filmes que serão mostrados carregaremos o ActivityIndicator ue nada mais é um simbolo de carregamento */}
        {moviesLoading || trendingLoading ? (
          <ActivityIndicator
            size="large"
            color={"#0000ff"}
            className="mt-10 self-center"
          />
          // Se houver um erro ao pegar os dados um texto mostrando o erro será mostrado
        ) : moviesErrors || trendingError ? (
          <Text> Error: {moviesErrors?.message || trendingError?.message}</Text>
        ) : (
          // Caso não haja erro e nada esteja sendo carregado, carregaremos os filmes mais populares e os filmes em geral
          <View className="flex-1 mt-5">
            {/* Quando usuário clicar na barra de pesquisa ele será enviado para a página de pesquisa */}
            <Searchbar
              onPress={() => router.push("/search")}
              placeholder="Search for movie"
              value={""}
            />
            <>
            {/* Caso trendingMovies seja true os filmes mais populares serão renderizados  */}
              {trendingMovies && (
                <View className="mt-10">
                  <Text className="text-lg text-white font-bold mb-3">
                    Trending Movies
                  </Text>
                </View>
              )}
              <FlatList
              // Usamos uma FlatList para renderizar os itens 

                horizontal
                // Isto faz com que a linha horizontal não seja mostrada
                showsHorizontalScrollIndicator={false}
                // Renderiza algo entre os itens da lista, nesse caso usamos um view para da um espaço entre os itens 
                ItemSeparatorComponent={() => <View className="w-4" />}
                className="mb-4 mt-3 "
                // Aqui 
                data={uniqueMovies}
                renderItem={({ item, index }) => <TrendingCard movie = {item} index= {index}/>}
                keyExtractor={(item) => item.movie_id.toString()}
              />
              <Text className="text-lg text-white font-bold mt-5 mb-3">
                Latest Movies
              </Text>

              <FlatList
                data={movies}
                renderItem={({ item }) => <MoviesCard {...item} />}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  gap: 20,
                  paddingRight: 5,
                  marginBottom: 10,
                }}
                className="mt-2 pb-12"
                scrollEnabled={false}
              />
            </>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
