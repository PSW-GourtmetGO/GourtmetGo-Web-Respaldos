import React, { useState } from "react";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
/* Modal */
type Errors = {
  name: string;
  email: string;
  phone: string;
};
type ModalProps = {
  plan: string;
  onClose: () => void;
  onSubmit: () => void;
};

const Modal: React.FC<ModalProps> = ({ plan, onClose, onSubmit }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Errors>({
    name: "",
    email: "",
    phone: "",
  });

  const validateForm = () => {
    const newErrors: Errors = {
      name: "",
      email: "",
      phone: "",
    };

    if (!name) {
      newErrors.name = "El nombre es obligatorio.";
    } else if (!/^[a-zA-Z\s]+$/.test(name)) {
      newErrors.name = "El nombre solo debe contener letras.";
    }

    if (!email) {
      newErrors.email = "El email es obligatorio.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "El email no es válido.";
    }

    if (!phone) {
      newErrors.phone = "El teléfono es obligatorio.";
    } else if (!/^\d+$/.test(phone)) {
      newErrors.phone = "El teléfono solo debe contener números.";
    } else if (phone.length !== 10) {
      newErrors.phone = "El teléfono debe tener 10 dígitos.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).every(
      (key) => !newErrors[key as keyof Errors]
    );
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (validateForm()) {
      onSubmit();
      toast.success("Información enviada exitosamente", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      window.location.href = "/registro";
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">Contacta a un asesor</h2>
        <p className="mb-4">
          Déjanos tus datos y un asesor se pondrá en contacto contigo para más
          información sobre el plan <span className="font-bold">{plan}</span>.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Nombre:</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email:</label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Teléfono:</label>
            <input
              type="tel"
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="py-2 px-4 bg-gray-400 text-white rounded-lg"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-[#7EB693] text-white rounded-lg"
            >
              Aceptar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
const Planes = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const openModal = (plan: any) => {
    setSelectedPlan(plan);
  };

  const closeModal = () => {
    setSelectedPlan(null);
  };

  const handleFormSubmit = () => {
    closeModal();
  };

  return (
    <div
      className="w-full grid grid-cols-5 grid-rows-auto pb-[100px]"
      id="planes"
    >
      <div className="ml-[100px] mt-16 col-start-1 col-span-2 row-start-2">
        <h1
          className="text-[60px] leading-[72px] max-w-md"
          style={{ fontFamily: "David Libre" }}
        >
          Planes
        </h1>
      </div>
      <div className="ml-[100px] mt-8 col-start-1 col-span-6 row-start-3">
        <div>
          <section>
            <div className="w-[95%]">
              <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
                {/* <!-- Plan 1 --> */}
                <div
                  data-aos="fade-left"
                  data-aos-anchor-placement="top-center"
                >
                  <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:text-white hover:bg-[#274c5b] hover:text-white transition-all duration-300 min-h-[607px]">
                    <div className="group">
                      <h4 className="text-right text-sm font-bold text-black transition-all duration-300 group-hover:text-[#ff4e9d]">
                        BASICO
                      </h4>
                      <h3 className="mb-4 text-2xl font-semibold text-black transition-all duration-300 group-hover:text-white">
                        Inicio
                      </h3>
                      <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                        Ideal para pequeños restaurantes y cafeterías que recién
                        comienzan su camino hacia la digitalización.
                      </p>
                      <div className="flex justify-center items-baseline my-8 text-black">
                        <span className="mr-2 text-5xl font-extrabold text-black transition-all duration-300 group-hover:text-white">
                          $9,99
                        </span>
                        <span className="text-gray-500 dark:text-gray-400">
                          /mes
                        </span>
                      </div>
                      {/* <!-- List --> */}
                      <ul
                        role="list"
                        className="mb-8 space-y-4 text-left text-black transition-all duration-300 group-hover:text-white"
                      >
                        <li className="flex items-center space-x-3">
                          {/* <!-- Icon --> */}
                          <svg
                            className="flex-shrink-0 w-7 h-7 text-white dark:text-white p-1 bg-[#3c5e6b] rounded-full shadow-md"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          <span>Acceso al sistema base</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          {/* <!-- Icon --> */}
                          <svg
                            className="flex-shrink-0 w-7 h-7 text-white dark:text-white p-1 bg-[#3c5e6b] rounded-full shadow-md"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          <span>Gestión de empleados limitados</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          {/* <!-- Icon --> */}
                          <svg
                            className="flex-shrink-0 w-7 h-7 text-white dark:text-white p-1 bg-[#3c5e6b] rounded-full shadow-md"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          <span>
                            Categorías disponibles:{" "}
                            <span className="font-semibold">3 categorias</span>
                          </span>
                        </li>
                        <li className="flex items-center space-x-3">
                          {/* <!-- Icon --> */}
                          <svg
                            className="flex-shrink-0 w-7 h-7 text-white dark:text-white p-1 bg-[#3c5e6b] rounded-full shadow-md"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          <span>
                            Platos disponibles:{" "}
                            <span className="font-semibold">25 platos</span>
                          </span>
                        </li>
                        <li className="flex items-center space-x-3">
                          {/* <!-- Icon --> */}
                          <svg
                            className="flex-shrink-0 w-7 h-7 text-white dark:text-white p-1 bg-[#3c5e6b] rounded-full shadow-md"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          <span>
                            Actualizaciones gratuitas:{" "}
                            <span className="font-semibold">
                              6 primeros meses
                            </span>
                          </span>
                        </li>
                      </ul>
                      <button
                        onClick={() => openModal("BASICO")}
                        className="py-2 px-5 bg-[#7EB693] rounded-lg"
                      >
                        Escoger plan
                      </button>
                    </div>
                  </div>
                </div>
                {/* <!-- Plan 2 --> */}
                <div
                  data-aos="zoom-in"
                  data-aos-delay="200"
                  data-aos-anchor-placement="top-center"
                >
                  <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:text-white hover:bg-[#274c5b] hover:text-white transition-all duration-300 min-h-[607px]">
                    <div className="group">
                      <h4 className="text-right text-sm font-bold text-black transition-all duration-300 group-hover:text-[#ff7a29]">
                        POPULAR
                      </h4>
                      <h3 className="mb-4 text-2xl font-semibold text-black transition-all duration-300 group-hover:text-white">
                        Profesional
                      </h3>
                      <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                        Ideal para restaurantes medianos que buscan optimizar
                        sus operaciones y mejorar la experiencia del cliente.
                      </p>
                      <div className="flex justify-center items-baseline my-8 text-black">
                        <span className="mr-2 text-5xl font-extrabold text-black transition-all duration-300 group-hover:text-white">
                          $54
                        </span>
                        <span className="text-gray-500 dark:text-gray-400">
                          /mes
                        </span>
                      </div>
                      {/* <!-- List --> */}
                      <ul
                        role="list"
                        className="mb-8 space-y-4 text-left text-black transition-all duration-300 group-hover:text-white"
                      >
                        <li className="flex items-center space-x-3">
                          {/* <!-- Icon --> */}
                          <svg
                            className="flex-shrink-0 w-7 h-7 text-white dark:text-white p-1 bg-[#3c5e6b] rounded-full shadow-md"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          <span>Acceso al sistema base</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          {/* <!-- Icon --> */}
                          <svg
                            className="flex-shrink-0 w-7 h-7 text-white dark:text-white p-1 bg-[#3c5e6b] rounded-full shadow-md"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          <span>Mayor número de gestión en empleados</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          {/* <!-- Icon --> */}
                          <svg
                            className="flex-shrink-0 w-7 h-7 text-white dark:text-white p-1 bg-[#3c5e6b] rounded-full shadow-md"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          <span>
                            Categorías Disponibles:{" "}
                            <span className="font-semibold">
                              hasta 10 categorías
                            </span>
                          </span>
                        </li>
                        <li className="flex items-center space-x-3">
                          {/* <!-- Icon --> */}
                          <svg
                            className="flex-shrink-0 w-7 h-7 text-white dark:text-white p-1 bg-[#3c5e6b] rounded-full shadow-md"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          <span>
                            Platos Disponibles:{" "}
                            <span className="font-semibold">
                              gestiona hasta 100 platos
                            </span>
                          </span>
                        </li>
                        <li className="flex items-center space-x-3">
                          {/* <!-- Icon --> */}
                          <svg
                            className="flex-shrink-0 w-7 h-7 text-white dark:text-white p-1 bg-[#3c5e6b] rounded-full shadow-md"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          <span>
                            Actualizaciones Gratuitas:{" "}
                            <span className="font-semibold">
                              acceso a actualizaciones gratuitas durante el
                              primer año
                            </span>
                          </span>
                        </li>
                      </ul>
                      <button
                        onClick={() => openModal("POPULAR")}
                        className="py-2 px-5 bg-[#7EB693] rounded-lg"
                      >
                        Escoger plan
                      </button>
                    </div>
                  </div>
                </div>
                {/* <!-- Plan 3 --> */}
                <div
                  data-aos="fade-right"
                  data-aos-delay="400"
                  data-aos-anchor-placement="top-center"
                >
                  <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:text-white hover:bg-[#274c5b] hover:text-white transition-all duration-300 min-h-[600px]">
                    <div className="group">
                      <h4 className="text-right text-sm font-bold text-black transition-all duration-300 group-hover:text-[#b7ffcf]">
                        MAS POPULAR
                      </h4>
                      <h3 className="mb-4 text-2xl font-semibold text-black transition-all duration-300 group-hover:text-white">
                        Empresa
                      </h3>
                      <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                        Solución definitiva para grandes cadenas de restaurantes
                        y franquicias. Este plan ofrece una gestión completa y
                        personalizada.
                      </p>
                      <div className="flex justify-center items-baseline my-8 text-black">
                        <span className="mr-2 text-5xl font-extrabold text-black transition-all duration-300 group-hover:text-white">
                          $89
                        </span>
                        <span className="text-gray-500 dark:text-gray-400">
                          /mes
                        </span>
                      </div>
                      {/* <!-- List --> */}
                      <ul
                        role="list"
                        className="mb-8 space-y-4 text-left text-black transition-all duration-300 group-hover:text-white"
                      >
                        <li className="flex items-center space-x-3">
                          {/* <!-- Icon --> */}
                          <svg
                            className="flex-shrink-0 w-7 h-7 text-white dark:text-white p-1 bg-[#3c5e6b] rounded-full shadow-md"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          <span>Acceso al Sistema Completo</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          {/* <!-- Icon --> */}
                          <svg
                            className="flex-shrink-0 w-7 h-7 text-white dark:text-white p-1 bg-[#3c5e6b] rounded-full shadow-md"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          <span>Gestión de Empleados Ilimitada</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          {/* <!-- Icon --> */}
                          <svg
                            className="flex-shrink-0 w-7 h-7 text-white dark:text-white p-1 bg-[#3c5e6b] rounded-full shadow-md"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          <span>
                            Categorías Disponibles:{" "}
                            <span className="font-semibold">ilimitado</span>
                          </span>
                        </li>
                        <li className="flex items-center space-x-3">
                          {/* <!-- Icon --> */}
                          <svg
                            className="flex-shrink-0 w-7 h-7 text-white dark:text-white p-1 bg-[#3c5e6b] rounded-full shadow-md"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          <span>
                            Platos Disponibles:{" "}
                            <span className="font-semibold">ilimitado</span>
                          </span>
                        </li>
                        <li className="flex items-center space-x-3">
                          {/* <!-- Icon --> */}
                          <svg
                            className="flex-shrink-0 w-7 h-7 text-white dark:text-white p-1 bg-[#3c5e6b] rounded-full shadow-md"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          <span>
                            Actualizaciones Gratuitas:{" "}
                            <span className="font-semibold">
                              actualizaciones al día
                            </span>
                          </span>
                        </li>
                      </ul>
                      <button
                        onClick={() => openModal("MAS POPULAR")}
                        className="py-2 px-5 bg-[#7EB693] rounded-lg"
                      >
                        Escoger plan
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {selectedPlan && (
        <Modal
          plan={selectedPlan}
          onClose={closeModal}
          onSubmit={handleFormSubmit}
        />
      )}
    </div>
  );
};

export default Planes;
