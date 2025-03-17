import { useState, useEffect } from "react";
import { TreeNode } from "./components/TreeNode";
import { City } from "./interfaces/city.interface";

const App = () => {
    const [workforceData, setWorkforceData] = useState<City[]>([]);

    const getWorkforceData = async () => {
        try {
            const response = await fetch("/data/workforce.json");
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setWorkforceData(data as City[]);
        } catch (err) {
            console.error("Error fetching data:", err);
        }
    };

    useEffect(() => {
        getWorkforceData();
    }, []);

    return (
        <div className="min-h-screen bg-black text-white p-6">
            <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-100">
                Workforce Structure
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
