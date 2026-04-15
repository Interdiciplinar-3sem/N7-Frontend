import { Pen, Search, Book, Heart } from "lucide-react";
import { Hero } from "../componentes/Hero";
import { Card } from "../componentes/ui/card";
import { FormResumo } from "../componentes/formResumo";
import { Footer } from "../componentes/footer";

export function PaginaInicial() {
    return (
        <>
            <main className="
                flex flex-col w-screen h-auto xxs:gap-14
                bg-[#F5F5F5]
            ">
                <Hero />
                <section className="px-0 py-6 xs:p-6 w-screen min-h-[80vh] flex flex-col">
                    <div className="flex flex-col items-center xxs:items-start xxs:flex-row xxs:justify-center gap-2">
                        <h2 className="lg:text-6xl sm:text-4xl xs:text-2xl xxs:text-lg text-sm font-bold">Como funciona</h2>
                        <h2 className="lg:text-6xl sm:text-4xl xs:text-2xl xxs:text-lg text-sm font-bold text-[#4C9AE4]"> a plataforma</h2>
                    </div>
                    <div className="
                        p-6 w-full flex-1 gap-2
                        sm:grid sm:grid-cols-2 sm:auto-rows-[minmax(300px,auto)] sm:gap-6
                        flex flex-col 
                        ">
                        <Card className="bg-[#AAEBBB]" icone={Search} titulo="Encontre conteúdos rapidamente." texto="Pesquise resumos das matérias do seu curso e estude de forma mais prática."/>
                        <Card className="bg-[#F8B7E2]" icone={Pen} titulo="Compartilhe seu conhecimento." texto="Escreva resumos das matérias e publique para ajudar outros estudantes."/>
                        <Card className="bg-[#F4EB8C]" icone={Heart} titulo="Valorize bons resumos." texto="Curta os resumos mais úteis e ajude a destacar conteúdos de qualidade."/>
                        <Card className="bg-[#BDEBFF]" icone={Book} titulo="Estude com seus colegas." texto="Aprenda junto com estudantes do seu curso e troque conhecimento."/>
                    </div>
                </section>
            <FormResumo />
            </main>
           <Footer />
        </>
    )
}