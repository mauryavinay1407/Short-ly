import {auth} from "@clerk/nextjs/server"
import { UserButton } from "@clerk/nextjs";

 const Dashboard : React.FC = ()=>{
   const userId = auth();
  return(
    <div className="flex ">
        My Dashboard...
        <div className="ml-4">
          <UserButton afterSignOutUrl="/" />
          </div>
    </div>
  )
}

export default Dashboard;