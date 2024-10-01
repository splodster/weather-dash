interface Props {
  label: string;
  value: number | string;
  icon?: JSX.Element | string;
}

const Widgets = ({ label, value, icon }: Props) => {
  return (
    <div className="flex items-center bg-white shadow-md rounded-md p-4">
      {icon && typeof icon === "string" ? (
        <img src={icon} alt={label} className="mr-4 w-10 h-10" />
      ) : (
        <div className="mr-4 text-2xl">{icon}</div>
      )}
      <div>
        <p className="text-gray-500 text-sm">{label}</p>
        <p className="text-xl text-bold">{value}</p>
      </div>
    </div>
  );
};

export default Widgets;
