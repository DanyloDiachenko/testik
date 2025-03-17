import { useState, useEffect } from "react";
import { TreeNode } from "./components/TreeNode";
import { City } from "./interfaces/city.interface";

const App = () => {
    const [workforceData, setWorkforceData] = useState<City[]>([]);

    useEffect(() => {
        import("./data/workforce.json")
            .then((data) => setWorkforceData(data.default))
            .catch((err) => console.error("Error loading data:", err));
    }, []);

    return (
        <div className="min-h-screen bg-black text-white p-6">
            <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-100">
                Company Structure
            </h1>
            <div className="space-y-4">
                {workforceData.map((city) => (
                    <TreeNode key={city.cityId} node={city} />
                ))}
            </div>
        </div>
    );
};

export default App;
