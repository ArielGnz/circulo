import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPrestamo, getSocios, eliminarPrestamo } from "../redux/actions";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Button, buttonClassName } from "./ui/Button";
import { Card, CardContent, CardFooter } from "./ui/Card";
import {
  PageLayout,
  DataTable,
  Table,
  TableHead,
  TableRow,
  Th,
  Td,
} from "./ui/PageLayout";

const PrestamoList = () => {
  const dispatch = useDispatch();
  const prestamos = useSelector((state) => state.prestamos);

  const [anio, setAnio] = useState("");
  const [mes, setMes] = useState("");
  const [prestamosFiltrados, setPrestamosFiltrados] = useState([]);

  const anios = ["2022", "2023", "2024", "2025", "2026"];
  const meses = [
    { value: "01", label: "Enero" },
    { value: "02", label: "Febrero" },
    { value: "03", label: "Marzo" },
    { value: "04", label: "Abril" },
    { value: "05", label: "Mayo" },
    { value: "06", label: "Junio" },
    { value: "07", label: "Julio" },
    { value: "08", label: "Agosto" },
    { value: "09", label: "Septiembre" },
    { value: "10", label: "Octubre" },
    { value: "11", label: "Noviembre" },
    { value: "12", label: "Diciembre" },
  ];

  useEffect(() => {
    dispatch(getPrestamo());
    dispatch(getSocios());
  }, [dispatch]);

  const obtenerDatosSocio = (prestamo) => {
    if (!prestamo.Usuario)
      return { nombreCompleto: "Desconocido", cuil: "", cbu: "" };
    const { apellido, nombre, cuil, cbu } = prestamo.Usuario;
    return {
      nombreCompleto: `${apellido}, ${nombre}`,
      cuil,
      cbu,
    };
  };

  const handleFiltrar = () => {
    if (!anio && !mes) {
      alert("Selecciona al menos un año o mes para filtrar");
      setPrestamosFiltrados([]);
      return;
    }

    const filtro = prestamos.filter((p) => {
      const fecha = new Date(p.fecha);
      const pAnio = fecha.getFullYear().toString();
      const pMes = String(fecha.getMonth() + 1).padStart(2, "0");

      return (anio ? pAnio === anio : true) && (mes ? pMes === mes : true);
    });

    const unicosPorSocio = [];
    const idsAgregados = new Set();

    for (const prestamo of filtro) {
      if (!idsAgregados.has(prestamo.usuarioId)) {
        unicosPorSocio.push(prestamo);
        idsAgregados.add(prestamo.usuarioId);
      }
    }

    setPrestamosFiltrados(unicosPorSocio);
  };

  useEffect(() => {
    if (anio || mes) {
      handleFiltrar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prestamos, anio, mes]);

  const handleDescargarPDF = () => {
    if (prestamosFiltrados.length === 0) {
      alert("No hay préstamos para descargar.");
      return;
    }

    const doc = new jsPDF();
    doc.text(`Listado de Préstamos ${mes} - ${anio}`, 14, 20);

    const tableColumn = ["Cuil", "Socio", "Importe", "CBU"];
    const tableRows = [];

    prestamosFiltrados.forEach((p) => {
      const { cuil } = obtenerDatosSocio(p);
      const { nombreCompleto } = obtenerDatosSocio(p);
      const importe = `$${p.importe}`;
      const { cbu } = obtenerDatosSocio(p);
      tableRows.push([cuil, nombreCompleto, importe, cbu]);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 30,
    });

    const total = prestamosFiltrados.reduce(
      (acc, p) => acc + parseFloat(p.importe),
      0
    );
    doc.text(
      `Total Prestado: $${total.toLocaleString()}`,
      14,
      doc.lastAutoTable.finalY + 10
    );

    const nombreMes = meses.find((m) => m.value === mes)?.label || "todos";
    const fileName = `prestamos_${anio || "todos"}-${nombreMes}.pdf`;

    doc.save(fileName);
  };

  const totalPrestado = prestamosFiltrados.reduce(
    (acc, p) => acc + parseFloat(p.importe),
    0
  );

  const selectClass =
    "h-10 w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-ring-offset sm:w-auto";

  return (
    <PageLayout
      title="Listado de préstamos"
      description="Filtrá por período y descargá el reporte en PDF."
      showHome={false}
    >
      <Card className="mb-6">
        <CardContent className="flex flex-col gap-4 pt-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end">
            <Link
              to="/ayuda"
              className={buttonClassName({ variant: "outline", className: "w-full sm:w-auto" })}
            >
              ← Volver a ayuda
            </Link>

            <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:flex-1">
              <div>
                <label htmlFor="filtro-anio" className="mb-1.5 block text-sm font-medium">
                  Año
                </label>
                <select
                  id="filtro-anio"
                  value={anio}
                  onChange={(e) => setAnio(e.target.value)}
                  className={selectClass}
                >
                  <option value="">Todos</option>
                  {anios.map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="filtro-mes" className="mb-1.5 block text-sm font-medium">
                  Mes
                </label>
                <select
                  id="filtro-mes"
                  value={mes}
                  onChange={(e) => setMes(e.target.value)}
                  className={selectClass}
                >
                  <option value="">Todos</option>
                  {meses.map((m) => (
                    <option key={m.value} value={m.value}>
                      {m.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-end">
                <Button onClick={handleFiltrar} className="w-full sm:w-auto">
                  Buscar
                </Button>
              </div>
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            Período: <span className="font-medium text-foreground">{anio || "cualquier año"}</span>
            {" · "}
            <span className="font-medium text-foreground">
              {meses.find((m) => m.value === mes)?.label || "cualquier mes"}
            </span>
          </p>
        </CardContent>
      </Card>

      {prestamosFiltrados.length > 0 ? (
        <>
          <DataTable>
            <Table>
              <TableHead>
                <TableRow className="border-0 hover:bg-transparent">
                  <Th>CUIL</Th>
                  <Th>Socio</Th>
                  <Th>Importe</Th>
                  <Th className="hidden md:table-cell">CBU</Th>
                  <Th className="text-center">Acción</Th>
                </TableRow>
              </TableHead>
              <tbody>
                {prestamosFiltrados.map((p) => {
                  const { nombreCompleto, cuil, cbu } = obtenerDatosSocio(p);
                  return (
                    <TableRow key={p.id}>
                      <Td className="font-mono text-xs">{cuil}</Td>
                      <Td>
                        <span className="font-medium">{nombreCompleto}</span>
                        <span className="mt-0.5 block font-mono text-xs text-muted-foreground md:hidden">
                          {cbu}
                        </span>
                      </Td>
                      <Td className="font-semibold">${p.importe}</Td>
                      <Td className="hidden font-mono text-xs md:table-cell">{cbu}</Td>
                      <Td className="text-center">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            if (
                              confirm("¿Estás seguro de eliminar este préstamo?")
                            ) {
                              dispatch(eliminarPrestamo(p.id)).then(() => {
                                dispatch(getPrestamo());
                              });
                            }
                          }}
                        >
                          Eliminar
                        </Button>
                      </Td>
                    </TableRow>
                  );
                })}
              </tbody>
            </Table>
          </DataTable>

          <Card className="mt-6">
            <CardFooter className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-lg font-semibold text-foreground">
                Total prestado:{" "}
                <span className="text-primary">${totalPrestado.toLocaleString()}</span>
              </p>
              <Button variant="success" onClick={handleDescargarPDF} className="w-full sm:w-auto">
                Descargar PDF
              </Button>
            </CardFooter>
          </Card>
        </>
      ) : (
        <p className="rounded-lg border border-dashed border-border bg-muted/40 px-4 py-10 text-center text-sm text-muted-foreground">
          No hay préstamos para mostrar. Elegí año y/o mes y pulsá Buscar.
        </p>
      )}
    </PageLayout>
  );
};

export default PrestamoList;
