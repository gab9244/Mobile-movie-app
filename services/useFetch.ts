import { useEffect, useState } from "react"

// useFetch é um hook personalizado que recebe uma função e a tentar executa-la, caso consiga a resposta é colocada dentro do estado data que junto a outros dados e retornado pela função
// Usando o <T> é possível tornar uma função genérica 

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

    const reset = () =>{
        setData(null)
        setLoading(false)
        setError(null)
    }

    useEffect(() =>{
        if(autoFetch){
            fetchData()
        }
    },[])
    return {data,loading, error, refetch:fetchData, reset}
}

export default useFetch
// finally executa o código independente do resultado do bloco try