import { MetaFunction } from "@remix-run/react";

const meta: MetaFunction = () => {
  return [
    { title: "Dashboard" },
    { name: "description", content: "Dashboard" },
  ];
};

export default function Dashboard() {
  return <div>Dashboard</div>;
}