import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSocios } from "../redux/actions";
import { Input } from "./ui/Input";
import { Card, CardContent } from "./ui/Card";
import {
  PageLayout,
  DataTable,
  Table,
  TableHead,
  TableRow,
  Th,
  Td,
} from "./ui/PageLayout";

const Socios = () => {
  const dispatch = useDispatch();
  const socios = useSelector((state) => state.socios);
  const [search, setSearch] = useState("");
  const [filteredSocios, setFilteredSocios] = useState([]);

  const normalizar = (texto) => {
    return texto
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  };

  useEffect(() => {
    dispatch(getSocios());
  }, [dispatch]);

  useEffect(() => {
    const termino = normalizar(search).split(" ").filter(Boolean);

    const filtro = socios.filter((socio) => {
      const dni = socio.dni.toString();
      const nombre = normalizar(socio.nombre);
      const apellido = normalizar(socio.apellido);
      const datosSocio = `${apellido} ${nombre} ${dni}`;

      return termino.every((palabra) => datosSocio.includes(palabra));
    });

    setFilteredSocios(filtro);
  }, [search, socios]);

  const lista = (search ? filteredSocios : socios)
    .slice()
    .sort((a, b) => a.dni - b.dni)
    .slice(0, 20);

  return (
    <PageLayout
      title="Buscar socios"
      description="Consultá por nombre, apellido o DNI. Se muestran hasta 20 resultados."
    >
      <Card className="mb-6">
        <CardContent className="pt-6">
          <label htmlFor="buscar-socio" className="mb-2 block text-sm font-medium">
            Buscar
          </label>
          <Input
            id="buscar-socio"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Nombre, apellido o DNI"
            className="max-w-xl"
          />
        </CardContent>
      </Card>

      <DataTable>
        <Table>
          <TableHead>
            <TableRow className="border-0 hover:bg-transparent">
              <Th>DNI</Th>
              <Th>Apellido</Th>
              <Th>Nombre</Th>
            </TableRow>
          </TableHead>
          <tbody>
            {lista.length === 0 ? (
              <TableRow>
                <Td colSpan={3} className="text-center text-muted-foreground">
                  {search ? "No se encontraron socios" : "Cargando socios…"}
                </Td>
              </TableRow>
            ) : (
              lista.map((socio) => (
                <TableRow key={socio.id}>
                  <Td className="font-mono text-xs sm:text-sm">{socio.dni}</Td>
                  <Td>{socio.apellido}</Td>
                  <Td>{socio.nombre}</Td>
                </TableRow>
              ))
            )}
          </tbody>
        </Table>
      </DataTable>
    </PageLayout>
  );
};

export default Socios;
