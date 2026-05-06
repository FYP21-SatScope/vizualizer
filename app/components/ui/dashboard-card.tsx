interface Props {
  title: string;
  children: React.ReactNode;
}

export default function DashboardCard({
  title,
  children,
}: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 border">
      <h2 className="text-lg font-semibold mb-4">
        {title}
      </h2>

      {children}
    </div>
  );
}