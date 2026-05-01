import { CardPerfil } from "../componentes/ui/cardPerfil";
import { CardResumo } from "../componentes/ui/cardResumo";

export function PaginaFeed() {
   const resumos = [
        {
            "id": "1",
            "titulo": "Variáveis e Tipagem",
            "texto": "Variáveis armazenam dados na memória. Em linguagens como TypeScript, a tipagem estática ajuda a evitar erros garantindo que uma variável 'string' não receba um 'number'."
        },
        {
            "id": "2",
            "titulo": "Funções de Ordem Superior",
            "texto": "São funções que recebem outras funções como argumento ou as retornam. Exemplos clássicos em JavaScript são o .map(), .filter() e .reduce()."
        },
        {
            "id": "3",
            "titulo": "Estruturas de Condição",
            "texto": "O 'if/else' e o 'switch' controlam o fluxo do código. Eles permitem que o programa tome decisões baseadas em comparações lógicas e valores booleanos."
        },
        {
            "id": "4",
            "titulo": "Promessas e Assincronismo",
            "texto": "Promises representam valores que estarão disponíveis no futuro. O uso de async/await torna a leitura de operações assíncronas (como chamadas de API) mais linear."
        },
        {
            "id": "5",
            "titulo": "Manipulação de DOM",
            "texto": "O DOM é a representação em árvore do HTML. Através do JavaScript, podemos selecionar elementos, alterar estilos e ouvir eventos como cliques do usuário."
        },
        {
            "id": "6",
            "titulo": "Variáveis e Tipagem",
            "texto": "Variáveis armazenam dados na memória. Em linguagens como TypeScript, a tipagem estática ajuda a evitar erros garantindo que uma variável 'string' não receba um 'number'."
        },
        {
            "id": "7",
            "titulo": "Funções de Ordem Superior",
            "texto": "São funções que recebem outras funções como argumento ou as retornam. Exemplos clássicos em JavaScript são o .map(), .filter() e .reduce()."
        },
        {
            "id": "8",
            "titulo": "Estruturas de Condição",
            "texto": "O 'if/else' e o 'switch' controlam o fluxo do código. Eles permitem que o programa tome decisões baseadas em comparações lógicas e valores booleanos."
        },
        {
            "id": "9",
            "titulo": "Promessas e Assincronismo",
            "texto": "Promises representam valores que estarão disponíveis no futuro. O uso de async/await torna a leitura de operações assíncronas (como chamadas de API) mais linear."
        },
        {
            "id": "10",
            "titulo": "Manipulação de DOM",
            "texto": "O DOM é a representação em árvore do HTML. Através do JavaScript, podemos selecionar elementos, alterar estilos e ouvir eventos como cliques do usuário."
        },
        {
            "id": "11",
            "titulo": "Funções de Ordem Superior",
            "texto": "São funções que recebem outras funções como argumento ou as retornam. Exemplos clássicos em JavaScript são o .map(), .filter() e .reduce()."
        },
        {
            "id": "12",
            "titulo": "Estruturas de Condição",
            "texto": "O 'if/else' e o 'switch' controlam o fluxo do código. Eles permitem que o programa tome decisões baseadas em comparações lógicas e valores booleanos."
        },
        {
            "id": "13",
            "titulo": "Promessas e Assincronismo",
            "texto": "Promises representam valores que estarão disponíveis no futuro. O uso de async/await torna a leitura de operações assíncronas (como chamadas de API) mais linear."
        },
        {
            "id": "14",
            "titulo": "Manipulação de DOM",
            "texto": "O DOM é a representação em árvore do HTML. Através do JavaScript, podemos selecionar elementos, alterar estilos e ouvir eventos como cliques do usuário."
        }
    ]

    const seguindo = [
        {
            id: "1",
            nome: 'Fulano',
            semestre: 4,
            seguidores: 900,
        },
        {
            id: "2",
            nome: 'Cliclano',
            semestre: 6,
            seguidores: 400,
        },
        {
            id: "3",
            nome: 'Fulano',
            semestre: 4,
            seguidores: 900,
        },
        {
            id: "4",
            nome: 'Cliclano',
            semestre: 6,
            seguidores: 400,
        }
    ]

    return (
        <main className="w-full h-full flex justify-around p-16">
            <section className="
                w-2/3 min-h-screen p-6 mb-20 sm:mb-0
                sm:grid sm:grid-cols-2 flex flex-col sm:grid-flow-dense gap-8 grid-auto-rows-[180px] 
            ">
                {resumos.map((resumo, index) => {
                    let formato:'quadrado' | 'horizontal' | 'vertical' = "quadrado";
                    if(index % 5 === 0) formato = "horizontal";
                    if(index % 5 === 3) formato = "vertical";

                    let cores:("verde" | "salmao" | "rosa" | "azul")[] = ["verde", "salmao", "rosa", "azul"]
                    let cor = cores[index % cores.length]

                    return (
                        <CardResumo key={resumo.id} titulo={resumo.titulo} texto={resumo.texto} formato={formato} cor={cor}/>
                    )
                })}
            </section>

            <section className={`min-w-96 flex flex-col gap-6 `}>
                <CardPerfil className="" nome="SeuNome" seguidores={30} semestre={2}/>

                <h2>Seguindo: </h2>
                {seguindo.map((s) => {

                    return (
                        <CardPerfil key={s.id} className="" nome={s.nome} seguidores={s.seguidores} semestre={s.semestre}/>
                    )
                })}

                <div className="min-h-20 min-w-20 relative z-51 flex gap-1 text-xs">
                    
                      <a className="hover:underline" href="#">Sobre</a>
                      <h2>.</h2>
                      <a className="hover:underline">Ajuda</a>
                      <a className="hover:underline" href="#">Contato</a>
                      <h2>.</h2>
                      <a className="hover:underline">API</a>
                      <a className="hover:underline" href="#">Termos</a>
                      <h2>.</h2>
                      <a className="hover:underline">Privacidade</a>
              
                </div>
            </section>
        </main>
    )
}
