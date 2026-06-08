import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSocios, postPrestamo } from "../redux/actions";
import { Link } from "react-router-dom";
import { Button, buttonClassName } from "./ui/Button";
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

const Ayuda = () => {
  const dispatch = useDispatch();
  const socios = useSelector((state) => state.socios);
  const [search, setSearch] = useState("");
  const [filteredSocios, setFilteredSocios] = useState([]);
  const [importes, setImportes] = useState({});

  // new lines
  //
  
  const handleAgregar = async (socio) => {
    const importeRaw = importes[socio.id];
    const importe = parseInt(importeRaw?.trim());

    if (!importe || isNaN(importe)) {
      alert("Por favor ingrese un monto válido");
      return;
    }

    const hoy = new Date();
    const mesActual = `${hoy.getFullYear()}-${(hoy.getMonth() + 1)
      .toString()
      .padStart(2, "0")}`;

    const nuevoPrestamo = {
      usuarioId: socio.id,
      importe: parseInt(importe),
      mes: mesActual,
      fecha: hoy.toISOString().split("T")[0],
    };

    try {
      await dispatch(postPrestamo(nuevoPrestamo));
      setImportes((prev) => ({ ...prev, [socio.id]: "" }));
    } catch (error) {
      console.error("Error al registrar el préstamo:", error);
      alert("Error al registrar el préstamo");
    }
  };

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

  const lista =
    search &&
    filteredSocios
      .slice()
      .sort((a, b) => a.dni - b.dni)
      .slice(0, 20);

  return (
    <PageLayout
      title="Registrar ayuda"
      description="Buscá un socio y cargá el importe del préstamo del mes."
      showHome={false}
    >
      <Card className="mb-6">
        <CardContent className="flex flex-col gap-4 pt-6 sm:flex-row sm:items-end">
          <div className="min-w-0 flex-1">
            <label htmlFor="buscar-ayuda" className="mb-2 block text-sm font-medium">
              Buscar socio
            </label>
            <Input
              id="buscar-ayuda"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Nombre, apellido o DNI"
            />
          </div>
          <Link
            to="/prestamoList"
            className={buttonClassName({ variant: "secondary", className: "w-full sm:w-auto" })}
          >
            Ver listado
          </Link>
        </CardContent>
      </Card>

      {!search ? (
        <p className="rounded-lg border border-dashed border-border bg-muted/40 px-4 py-8 text-center text-sm text-muted-foreground">
          Escribí en el buscador para ver socios y cargar importes.
        </p>
      ) : (
        <DataTable>
          <Table>
            <TableHead>
              <TableRow className="border-0 hover:bg-transparent">
                <Th>DNI</Th>
                <Th>Apellido</Th>
                <Th className="hidden sm:table-cell">Nombre</Th>
                <Th>Importe</Th>
                <Th className="text-center">Acción</Th>
              </TableRow>
            </TableHead>
            <tbody>
              {lista.length === 0 ? (
                <TableRow>
                  <Td colSpan={5} className="text-center text-muted-foreground">
                    No se encontraron socios
                  </Td>
                </TableRow>
              ) : (
                lista.map((socio) => (
                  <TableRow key={socio.id}>
                    <Td className="font-mono text-xs sm:text-sm">{socio.dni}</Td>
                    <Td>
                      <span className="font-medium">{socio.apellido}</span>
                      <span className="block text-xs text-muted-foreground sm:hidden">
                        {socio.nombre}
                      </span>
                    </Td>
                    <Td className="hidden sm:table-cell">{socio.nombre}</Td>
                    <Td>
                      <Input
                        type="text"
                        inputMode="numeric"
                        placeholder="Monto"
                        value={importes[socio.id] || ""}
                        className="min-w-[5.5rem] max-w-[8rem]"
                        onChange={(e) =>
                          setImportes((prev) => ({
                            ...prev,
                            [socio.id]: e.target.value,
                          }))
                        }
                      />
                    </Td>
                    <Td className="text-center">
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => handleAgregar(socio)}
                      >
                        Agregar
                      </Button>
                    </Td>
                  </TableRow>
                ))
              )}
            </tbody>
          </Table>
        </DataTable>
      )}
    </PageLayout>
  );
};

export default Ayuda;
