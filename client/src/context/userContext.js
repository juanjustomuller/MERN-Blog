import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

/*Este contexto te permite tener un "estado global" para manejar el usuario actual. Así, en cualquier parte de tu frontend, puedes verificar si un usuario está logueado, mostrar su perfil, o incluso permitirle realizar acciones específicas, como crear o editar un blog, sin pasar currentUser como props por cada componente intermedio.*/
