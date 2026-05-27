import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoNegro from "../assets/logoNegro.jpg";
import { Button, buttonClassName } from "./ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/Card";
import { Input } from "./ui/Input";
import { Modal, ModalActions } from "./ui/Modal";

const Home = () => {
  const navigate = useNavigate();
  const password = "3794";
  const inputRef = useRef(null);

  const [showModal, setShowModal] = useState(false);
  const [inputPassword, setInputPassword] = useState("");

  const handleAyuda = () => {
    setShowModal(true);
  };

  const handlePasswordSubmit = () => {
    if (inputPassword === password) {
      setShowModal(false);
      setInputPassword("");
      navigate("/ayuda");
    } else {
      alert("contraseña incorrecta");
      setInputPassword("");
    }
  };

  useEffect(() => {
    if (showModal && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showModal]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-10 sm:px-6">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,oklch(42%_0.11_185/0.12),transparent_55%)]" />

      <Card className="w-full max-w-md animate-slide-up">
        <CardHeader className="items-center text-center">
          <img
            src={logoNegro}
            alt="Logo Círculo"
            className="mx-auto h-40 w-auto object-contain sm:h-52"
          />
          <CardTitle className="mt-2">Círculo</CardTitle>
          <CardDescription>
            Gestión de socios y ayudas económicas
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-3 sm:gap-4">
          <Link
            to="/socios"
            className={buttonClassName({ variant: "default", size: "lg", className: "w-full" })}
          >
            Socios
          </Link>
          <Button size="lg" className="w-full" variant="outline" onClick={handleAyuda}>
            Ayuda
          </Button>
        </CardContent>
      </Card>

      <Modal
        open={showModal}
        onClose={() => {
          setShowModal(false);
          setInputPassword("");
        }}
        title="Ingrese la contraseña"
        footer={
          <ModalActions
            confirmLabel="Ingresar"
            cancelLabel="Cancelar"
            onConfirm={handlePasswordSubmit}
            onCancel={() => {
              setShowModal(false);
              setInputPassword("");
            }}
          />
        }
      >
        <Input
          ref={inputRef}
          type="password"
          placeholder="Contraseña"
          value={inputPassword}
          onChange={(e) => setInputPassword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handlePasswordSubmit();
          }}
        />
      </Modal>
    </div>
  );
};

export default Home;
