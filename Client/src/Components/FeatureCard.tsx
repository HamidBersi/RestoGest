type FeatureCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  color?: string;
};

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
}) => {
  return (
    <div className="flex flex-col items-center p-4 border border-gray-200 rounded-lg bg-gray-100">
      <div className=" flex justify-self-start pl-4 w-[99%] h-10 m-auto rounded-2xl bg-white items-center">
        {icon}
      </div>
      <h4 className="text-md font-bold my-4">{title}</h4>
      <p className="text-xs text-gray-600">{description}</p>
    </div>
  );
};

export default FeatureCard;
