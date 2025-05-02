import { useEffect, useState } from "react"


// useFetch será usado para renderizar os filmes mais populares assim como os filmes que mostraremos na página inicial 
// useFetch é um hook personalizado que recebe uma função e tentar executa-la, caso consiga a resposta é colocada dentro do estado data que junto a outros dados e retornado pela função
// Usando o <T> é possível tornar uma função genérica 

// Quando usar useFetch em outro componente ele vai receber uma promise e ela retornará os dados que ela recebeu, assim como que está carregando ou não, erros 
const useFetch = <T>(fetchFunction : () => Promise<T>, autoFetch = true) =>{
    
    const [data, setData] = useState<T | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<Error | null>(null)

    const fetchData = async () =>{
        // Caso os dados sejam retornados defina o estado de carregamento como true e espere uma resposta da função fetchFunction depois coloque a resposta dentro do estado data
        try {
            setLoading(true)
            setError(null)

            const result = await fetchFunction()

            setData(result)

        }catch (err) {
            setError(err instanceof Error ? err : new Error('An error occurred'))
        } finally {
            setLoading(false)
        }
    }

    // Esta função simplesmente faz com que os estados dos dados, carregamento e erros tenham seus valores falsos ou null
    const reset = () =>{
        setData(null)
        setLoading(false)
        setError(null)
    }

    // Faz com que os dados sejam buscado caso autoFetch seja true
    useEffect(() =>{
        if(autoFetch){
            fetchData()
        }
    },[])
    return {data,loading, error, refetch:fetchData, reset}
}

export default useFetch
// finally executa o código independente do resultado do bloco try