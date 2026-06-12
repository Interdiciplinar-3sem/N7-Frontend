import { useParams } from "react-router-dom";
import { PaginaResumo } from "./PaginaResumo";

export function PaginaCriacaoResumoWrapper() {
    const { id } = useParams();
    return <PaginaResumo key={id ?? "novo"} />;
}