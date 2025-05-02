//  Rastreia a pesquisa feita pelo usuário
import { Client, Databases, ID, Query } from "react-native-appwrite";
// É o id do banco de dados no appwrite
const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_DATABASE_ID!;
// É o id da coleção no appwrite

const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_COLLECTION_ID!;

const client = new Client()
  // Define o endpoint to app
  .setEndpoint("https://cloud.appwrite.io/v1")
  // Define o id do projeto
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const database = new Databases(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("searchTerm", query),
    ]);
    // Caso algum filme tenha sido encontrado aumentamos o valor do atributo count de um filme em 1, outra palavras usamos o id do banco de dados, da coleção e do filme em si para encontrar o filme e adicionar 1 ou seu count
    if (result.documents.length > 0) {
      const existingMovie = result.documents[0];

      // Passamos os atributos
      await database.updateDocument(
        // Passamos o id do banco de dados para saber qual banco de dados atualizar
        DATABASE_ID,
        // Passamos o id da coleção para saber qual coleção atualizar

        COLLECTION_ID,
        // Passamos o id do item que queremos atualizar
        existingMovie.$id,
        // Por fim fazemos a atualização do item aumentando o valor do seu count em 1
        {
          count: existingMovie.count + 1,
        }
      );
    }
    // Caso o filme ainda não tenha sido salvo na coleção para poder ter a quantidade de pesquisa feita nele, vamos adiciona-lo ao banco de dados e a coleção
    else {
      // Fazemos uma promise para poder criar o item no banco de dados, usamos o createDocument onde pegamoso id do bd, da coleção e adicionamos um id único ao item que será criado, fazemos isso usando ID.unique() e por fim criamos um objeto que representa como o documento que estamos salvando no banco de dados deve parecer
      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm: query,
        movie_id: movie.id,
        count: 1,
        title: movie.title,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getTredingMovies = async (): Promise<TrendingMovie[] | undefined> =>{
    try {
      // Aqui fazemos uma promessa onde mandamos o id do banco de dados e da coleção para retornar uma lista dos itens no documento que batem com as informações dentro da array, nesse caso Query.limit(5) limita o tamanho dos elementos listados para 5 e Query.orderDesc('count') ordena os documentos em ordem decrescente com base no atributo count 
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.limit(5),
            Query.orderDesc('count'),
          ])

          // Retornamos a lista de documentos e usamos as unknown as TrendingMovie[] para dizer ao TS que os documentos devem ser tratados como TrendingMovie[]
          return  result.documents as unknown as TrendingMovie[];
    }
    catch(error){
        console.log(error) 
        return undefined}
}
