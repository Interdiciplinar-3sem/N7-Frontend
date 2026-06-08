import { useParams } from "react-router";
import { PaginaResumo } from "./PaginaResumo";

export function PaginaCriacaoResumoWrapper() {
    const { id } = useParams();
    return <PaginaResumo key={id ?? "novo"} />;
}