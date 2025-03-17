import { useState, useMemo } from "react";
import { TreeNodeType } from "../../interfaces/tree-node.type";
import { Employee } from "../../interfaces/employee.interface";

interface TreeNodeProps {
    node: TreeNodeType;
}

const getSalary = (node: TreeNodeType): number => {
    if (!("children" in node)) return (node as Employee).salary;
    return (node.children as Array<TreeNodeType>).reduce(
        (sum, child) => sum + getSalary(child),
        0,
    );
};

const getAge = (node: TreeNodeType): number => {
    if (!("children" in node)) return (node as Employee).age;

    const employees: Employee[] = [];
    const collectEmployees = (n: TreeNodeType) => {
        if (!("children" in n)) {
            employees.push(n as Employee);
        } else (n.children as Array<TreeNodeType>).forEach(collectEmployees);
    };

    collectEmployees(node);

    return employees.length
        ? Math.round(
              (employees.reduce((sum, emp) => sum + emp.age, 0) /
                  employees.length) *
                  10,
          ) / 10
        : 0;
};

const getNodeId = (node: TreeNodeType): string => {
    return "cityId" in node
        ? node.cityId
        : "shopId" in node
        ? node.shopId
        : "managerId" in node
        ? node.managerId
        : Math.random().toString(36).substring(2, 11);
};

export const TreeNode = ({ node }: TreeNodeProps) => {
    const [isNodeExpanded, setIsNodeExpanded] = useState(false);

    const salary = useMemo(() => getSalary(node), [node]);
    const age = useMemo(() => getAge(node), [node]);
    const _ = useMemo(() => getNodeId(node), [node]);

    return (
        <div className="relative ml-8">
            <div
                onClick={() =>
                    "children" in node && setIsNodeExpanded(!isNodeExpanded)
                }
                className={`relative mt-2 flex items-center p-3 rounded-lg transition-all duration-200 ${
                    "children" in node
                        ? "cursor-pointer hover:bg-gray-800 hover:shadow-md"
                        : "cursor-default"
                } bg-gray-900 text-white`}
                role="button"
                aria-expanded={isNodeExpanded}
                aria-label={
                    "children" in node ? `Toggle ${node.name}` : node.name
                }
                tabIndex={0}
            >
                <span
                    className={`mr-2 text-gray-400 ${
                        "children" in node ? "font-bold" : ""
                    }`}
                >
                    {"children" in node ? (isNodeExpanded ? "▼" : "▶") : "•"}
                </span>
                <span className="font-semibold text-gray-100">{node.name}</span>
                <span className="ml-3 text-gray-400">
                    Salary:{" "}
                    <span className="font-bold text-white">{salary}</span>
                </span>
                <span className="ml-3 text-gray-400">
                    Age: <span className="font-bold text-white">{age}</span>
                </span>
            </div>
            {isNodeExpanded && "children" in node && node.children && (
                <div className="relative mt-2 ml-4 before:absolute before:left-[-1rem] before:top-[-0.5rem] before:h-[calc(100%+0.5rem)] before:w-px before:bg-gray-600 before:content-['']">
                    {node.children.map((child) => (
                        <div
                            key={getNodeId(child)}
                            className="relative before:absolute before:left-[-1rem] before:top-4 before:h-px before:w-4 before:bg-gray-600 before:content-['']"
                        >
                            <TreeNode node={child} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
