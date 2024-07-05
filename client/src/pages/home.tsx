import { FC } from "react";
import UnfinishedTasksTable from "../components/UnfinishedTasksTable";

const Home: FC = () => {
     return <> 
    {/* Tasks table */}
    <h1 className="my-5"><UnfinishedTasksTable limit={5}/></h1>
</>
}

export default Home;