import ActiveLink from "./ActiveLink";

const Menu = () => {
  return (
    <div className='d-flex justify-content-center bg-light'>
      <div className='mx-3 p-4'>
        <ActiveLink href={"/"}>Register</ActiveLink>
      </div>
      <div className='mx-3 p-4'>
        <ActiveLink href={"/login"}>Login</ActiveLink>
      </div>
    </div>
  );
};

export default Menu;
