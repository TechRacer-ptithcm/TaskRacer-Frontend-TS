export type TaskCardProps = {
  date: string;
  title: string;
  description: string;
  members: string[];
  daysLeft: string;
};

export const tasks: TaskCardProps[] = [
  {
    date: "Mar 2, 2024",
    title: "Web Dashboard",
    description: "Designing",
    members: ["K", "N"],
    daysLeft: "3 days left",
  },
  {
    date: "Mar 6, 2024",
    title: "Mobile App",
    description: "Shopping",
    members: ["K", "N"],
    daysLeft: "25 days left",
  },
  {
    date: "Mar 8, 2024",
    title: "Animation",
    description: "Designing",
    members: ["K"],
    daysLeft: "7 days left",
  },
];
