import { SignIn } from "@clerk/nextjs";
 
export default function Page() {
  return(<>
  <div className=" hello justify-center d-flex align-items-center min-vh-100 m-auto">
  <SignIn  />
  </div>
  </>);
}