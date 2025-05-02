import { Stack } from "expo-router";
import "./globals.css";
import { StatusBar } from "react-native";
export default function RootLayout() {
  return (
    <>
    {/* Stack usa os arquivos e pasta de um projeto para renderizar o conteúdo desses arquivos como páginas do projeto, nesse caso uma pasta será criada para cada item dentro da pasta tabs e também para cada item dentro da pasta movies, nesse caso as páginas são criadas dinamicamente usando o id de   */}
    {/* Aqui escondemos a barra superior do dispositivo em todas as páginas do projeto, primeiro chamamos o componente dp react native statusbar e depois o escondemos usando a propriedade hidden com valor true  */}
      <StatusBar hidden={true} />
      <Stack>
        {/* Aqui o texto padrão dos componentes é removido usando o opção headerShown: false */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="movies/[id]" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
